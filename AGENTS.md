# AGENTS.md — ai.ondralinek.cz

Canonical instructions for coding agents (Antigravity, Claude Code, Codex, Copilot)
working on this repository.

## The site in one paragraph

Bilingual (English default at `/`, Czech at `/cs/`) static Hugo site for Ondra
Linek's thoughts on artificial intelligence, themed around a modern, dark,
minimalistic robot aesthetic. Published at **https://ai.ondralinek.cz/** by the
`deploy` account from `main` once deployed. Zero external scripts, zero webfonts,
zero cookies, zero trackers.

## Local Modern Web Guidance reference (MANDATORY)

This repository keeps its own offline copy of
[`googlechrome/modern-web-guidance`](https://github.com/googlechrome/modern-web-guidance)
in **`references/modern-web-guidance/`** (and symlinked at
`.claude/skills/modern-web-guidance`). The pinned upstream commit hash is stored
in `references/modern-web-guidance/UPSTREAM_COMMIT`.

**Before writing or changing any HTML, CSS, or client-side JavaScript here:**

1. Consult the guides in `references/modern-web-guidance/skills/modern-web-guidance/guides/`
   (or run the `modern-web-guidance` skill workflow described in
   `references/modern-web-guidance/skills/modern-web-guidance/SKILL.md`).
2. Prefer native platform capabilities over JS/CSS hacks or libraries:
   - Cascade layers (`@layer`), logical properties, `:where()`, `:has()`, container queries, `subgrid`.
   - Native `<dialog>`, `[popover]`, CSS Anchor Positioning, `<details>`/`<summary>`, `@view-transition`, `@starting-style`.
   - Semantic landmarks, accessible names, `:focus-visible`, `forced-colors: active`, and `prefers-reduced-motion: no-preference`.
3. **Browser support policy:** Baseline Widely available as-is; Newly available only
   with feature detection (`@supports` or JS feature check) and a fallback of 20
   lines or fewer, no external dependencies, no polyfills.
4. To refresh the vendored copy from upstream: `make update-guidance`.

## Build and verify

Hugo **0.146.0** is pinned in CI and on the VPS (extended is not needed).

```sh
make build   # hugo --minify --cleanDestinationDir -> public/
make dev     # live preview at http://127.0.0.1:1313
```

Before finishing any change:

1. Run `make build` and check both English (`/`) and Czech (`/cs/`) outputs.
2. Keep the strict CSP in `deploy/nginx/ai-headers.conf` satisfied: **no inline
   `style="..."`**, **no inline `<script>`**, and **no third-party origins**.
3. Ensure every page has a unique `<title>` (15–65 chars), `<meta name="description">`
   (50–160 chars), valid `hreflang` alternates, and zero missing `alt` attributes.

## House rules

- **Bilingual parity:** Every UI string belongs in both `i18n/en.toml` and
  `i18n/cs.toml`. Every article and page belongs in both `content/en/` and
  `content/cs/` with a matching `translationKey` (see `docs/AUTHORING.md`).
- **Visual identity:** Keep the dark, minimalistic, precision-robot aesthetic and
  the WCAG AA contrast targets (≥ 4.5:1 text, ≥ 3:1 UI boundaries and focus rings).
- **No infinite unpauseable animations:** Any decorative motion must either be
  finite (< 5 s, gated behind `prefers-reduced-motion: no-preference`) or have an
  accessible pause control (WCAG 2.2.2).
- **No direct `/var/www` writes:** Deployment is handled exclusively by the
  `deploy` account from `main` (see `deploy/DEPLOY.md`).
