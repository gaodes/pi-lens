/**
 * PrimeCodex statusbar widget integration for pi-lens.
 *
 * Self-contained module that emits pi-lens diagnostic summaries to the
 * pi-statusbar extension via `pi.events`.  Extracted from index.ts so
 * upstream rebases only need to re-wire three calls (register / emit /
 * unregister) instead of re-applying ~120 lines of inline code.
 *
 * Configured in `prime-settings.json` under the `"pi-lens".statusbar` key.
 */
import * as nodeFs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

// Re-import only the thin getters we need — keeps this module decoupled from
// the full pipeline internals.  Callers pass the references at init time so
// the module never reaches into the host's import graph directly.

export interface StatusBarDeps {
	getDiagnosticTracker: () => {
		getStats: () => {
			totalShown: number;
			totalUnresolved: number;
			totalAutoFixed: number;
		};
	};
	getLSPService: () => { getAliveClientCount: () => number };
	runtime: {
		getCrashEntries: () => [string, number][];
	};
}

// ── Settings ─────────────────────────────────────────────────────────────────

interface StatusBarConfig {
	icon: string;
	icon_color: string;
	text_font_color: string;
	show_icon: boolean;
	show_text: boolean;
	min_width: number;
	placement: { line: number; side: string; index: number };
	separator_before: Record<string, unknown>;
	separator_after: Record<string, unknown>;
}

function loadLensSettings(): Record<string, unknown> {
	try {
		const agentDir = path.join(os.homedir(), ".pi", "agent");
		const globalPath = path.join(agentDir, "prime-settings.json");
		const projectPath = path.join(process.cwd(), ".pi", "prime-settings.json");
		const settingsPath = nodeFs.existsSync(projectPath)
			? projectPath
			: globalPath;
		if (!nodeFs.existsSync(settingsPath)) return {};
		const raw = JSON.parse(nodeFs.readFileSync(settingsPath, "utf-8"));
		return (raw["pi-lens"] as Record<string, unknown>) ?? {};
	} catch {
		return {};
	}
}

function resolveStatusbarConfig(): StatusBarConfig {
	const settings = loadLensSettings();
	const cfg = (settings.statusbar ?? {}) as Record<string, unknown>;
	return {
		icon: (cfg.icon as string) ?? "f121",
		icon_color: (cfg.icon_color as string) ?? "accent",
		text_font_color: (cfg.text_font_color as string) ?? "dim",
		show_icon: (cfg.show_icon as boolean) ?? true,
		show_text: (cfg.show_text as boolean) ?? true,
		min_width: (cfg.min_width as number) ?? 12,
		placement: {
			line: ((cfg.placement as Record<string, unknown>)?.line as number) ?? 3,
			side:
				((cfg.placement as Record<string, unknown>)?.side as string) ?? "left",
			index: ((cfg.placement as Record<string, unknown>)?.index as number) ?? 1,
		},
		separator_before: (cfg.separator_before as Record<string, unknown>) ?? {
			icon: "eb8a",
			icon_color: "dim",
		},
		separator_after: (cfg.separator_after as Record<string, unknown>) ?? {
			icon: "eb8a",
			icon_color: "dim",
		},
	};
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Push a diagnostic summary update to the pi-statusbar widget.
 * Safe to call from any hook; no-ops when pi-statusbar is not loaded.
 */
export function emitStatusbarUpdate(
	pi: ExtensionAPI,
	deps: StatusBarDeps,
): void {
	try {
		const diagStats = deps.getDiagnosticTracker().getStats();
		const lspCount = deps.getLSPService().getAliveClientCount();
		const crashes = deps.runtime.getCrashEntries();
		const totalCrashes = crashes.reduce((sum, [, c]) => sum + c, 0);

		const parts: string[] = [];
		if (lspCount > 0) parts.push(`LSP:${lspCount}`);
		if (diagStats.totalShown > 0) {
			parts.push(`${diagStats.totalUnresolved} issues`);
		}
		if (totalCrashes > 0) parts.push(`${totalCrashes} crashes`);
		if (diagStats.totalAutoFixed > 0)
			parts.push(`${diagStats.totalAutoFixed} fixed`);

		const text = parts.length > 0 ? parts.join(" · ") : "OK";
		const color =
			totalCrashes > 0
				? "error"
				: diagStats.totalUnresolved > 0
					? "warning"
					: "success";

		pi.events.emit("statusbar:module:update", {
			id: "pi-lens",
			text,
			visible: true,
			style: { text_font_color: color },
		});
	} catch {
		// Statusbar may not be loaded; skip silently.
	}
}

/**
 * Register the pi-lens widget with pi-statusbar.
 * Call once at `session_start`.
 */
export function registerStatusbarWidget(pi: ExtensionAPI): void {
	try {
		const cfg = resolveStatusbarConfig();
		pi.events.emit("statusbar:module:register", {
			id: "pi-lens",
			text: "starting\u2026",
			visible: true,
			placement: cfg.placement,
			style: {
				show_icon: cfg.show_icon,
				icon: cfg.icon,
				icon_color: cfg.icon_color,
				text_font_color: cfg.text_font_color,
				text_font_caps: "small",
				text_font_style: "regular",
				min_width: cfg.min_width,
			},
		});
		pi.events.emit("statusbar:widget:contribute", {
			id: "pi-lens",
			label: "Pi Lens",
			description: "Code quality: LSP status, diagnostics, auto-fixes, crashes",
			default_placement: cfg.placement,
			separator_before: cfg.separator_before,
			separator_after: cfg.separator_after,
			priority: 0,
		});
	} catch {
		// Statusbar may not be loaded; skip silently.
	}
}

/**
 * Unregister the pi-lens widget from pi-statusbar.
 * Call once at `session_shutdown`.
 */
export function unregisterStatusbarWidget(pi: ExtensionAPI): void {
	try {
		pi.events.emit("statusbar:module:unregister", { id: "pi-lens" });
	} catch {
		// Statusbar may not be loaded; skip silently.
	}
}
