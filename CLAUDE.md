# CLAUDE.md — ai

**Read [`AGENTS.md`](AGENTS.md) first.** It is the canonical guide for this
repository: the site overview, bilingual rules, CSP constraints, build commands,
and the mandatory local Modern Web Guidance workflow.

## Layout

| Path | What |
|---|---|
| `hugo.toml` | Bilingual Hugo config (EN default `/`, CS `/cs/`), taxonomies, Chroma class-based highlighting |
| `content/en/`, `content/cs/` | Bilingual pages and articles (`posts/`, `about.md`, `privacy.md`), paired via `translationKey` |
| `i18n/en.toml`, `i18n/cs.toml` | Localized UI strings |
| `layouts/` | Semantic HTML5 templates, accessible code-block render hook, bespoke robot SVG partials |
| `assets/css/main.css`, `assets/js/main.js` | Modern CSS (cascade layers, subgrid, container queries, popover/anchor nav) + minimal ES module |
| `static/` | `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `og.png` |
| `references/modern-web-guidance/` | Local vendored copy of `googlechrome/modern-web-guidance` (linked from `.claude/skills/modern-web-guidance`) |
| `docs/AUTHORING.md` | How to write and publish a bilingual article pair |
| `deploy/` | nginx vhosts, strict CSP headers, and deployment map for the `deploy` account |

## Build

Hugo **0.146.0** (pinned in `.github/workflows/ci.yml` and on the VPS):

```sh
make build      # hugo --minify --cleanDestinationDir -> public/
make dev        # preview on http://127.0.0.1:1313
```

## Writing HTML, CSS and JavaScript

Before writing or changing HTML, CSS or client-side JavaScript here, consult the
local copy of `modern-web-guidance` in **`references/modern-web-guidance/`**
(also available via `.claude/skills/modern-web-guidance`): search for the
capability, read the matching guide(s), and apply them.

Browser support policy: Baseline Widely available as-is; Newly available only
with feature detection and a fallback of 20 lines or fewer, no dependencies, no
polyfills.

## Launch gate and deployment

Once deployed at https://ai.ondralinek.cz by the `deploy` account from `main`:

```sh
web-launch-check https://ai.ondralinek.cz
site-status --site ai
curl -fsS https://ai.ondralinek.cz/deployed.json
git -C ~/repos/ai rev-parse origin/main
```

- `FAIL` from `web-launch-check` blocks publish; `WARN` must be explicitly
  addressed or justified.
- Do not rsync into `/var/www/ai` or edit live files directly; deployment is
  owned by the `deploy` account (`site-deploy` timer).
