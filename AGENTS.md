# pi-lens (PrimeCodex fork)

> **Fork of** [pi-lens](https://github.com/apmantza/pi-lens) by Apostolos Mantziris — published upstream as `npm:pi-lens`.
> PrimeCodex fork published as `@gaodes/pi-lens` with statusbar widget integration and config loader.

## What this fork adds

- **Statusbar widget** — emits `pi-lens` module to pi-statusbar via `pi.events` plugin API (line 3, left side)
- **Settings integration** — reads statusbar config from `prime-settings.json` under the `"pi-lens"` key
- **Separator support** — configurable `separator_before` / `separator_after` around the widget

## Statusbar widget

Displays live code quality summary: LSP count, unresolved issues, pipeline crashes, auto-fixed count.

Configured in `prime-settings.json`:

```json
{
  "pi-lens": {
    "statusbar": {
      "icon": "f121",
      "icon_color": "accent",
      "text_font_color": "dim",
      "show_icon": true,
      "show_text": true,
      "min_width": 12,
      "placement": { "line": 3, "side": "left", "index": 1 },
      "separator_before": { "icon": "eb8a", "icon_color": "dim" },
      "separator_after": { "icon": "eb8a", "icon_color": "dim" }
    }
  }
}
```

## Provenance

| What              | Where                                                                                |
| ----------------- | ------------------------------------------------------------------------------------ |
| **Upstream**      | `npm:pi-lens` · [GitHub](https://github.com/apmantza/pi-lens) by Apostolos Mantziris |
| **GitHub mirror** | [gaodes/pi-lens](https://github.com/gaodes/pi-lens)                                  |
| **GitLab source** | `ssh://git@gitlab-ssh.elches.dev:2222/agents/primecodex/packages/pi-lens.git`      |
| **npm (fork)**    | [`@gaodes/pi-lens`](https://www.npmjs.com/package/@gaodes/pi-lens)                   |

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **pi-lens** (8933 symbols, 13805 relationships, 207 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/pi-lens/context` | Codebase overview, check index freshness |
| `gitnexus://repo/pi-lens/clusters` | All functional areas |
| `gitnexus://repo/pi-lens/processes` | All execution flows |
| `gitnexus://repo/pi-lens/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
