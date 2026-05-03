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

| What | Where |
|------|-------|
| **Upstream** | `npm:pi-lens` · [GitHub](https://github.com/apmantza/pi-lens) by Apostolos Mantziris |
| **GitHub mirror** | [gaodes/pi-lens](https://github.com/gaodes/pi-lens) |
| **GitLab source** | `ssh://git@gitlab-ssh.elches.dev:2222/agents/primecodex/extensions/pi-lens.git` |
| **npm (fork)** | [`@gaodes/pi-lens`](https://www.npmjs.com/package/@gaodes/pi-lens) |
