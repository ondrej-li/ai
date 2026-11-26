# Authoring Articles (EN / CS)

Every article is written in both **English** (`content/en/posts/`) and **Czech**
(`content/cs/posts/`), linked by the same `translationKey` so the language
switcher jumps directly between the two versions.

## 1. Create the bilingual pair

Pick a short, lowercase ASCII slug (dashes, no accents), e.g. `coding-agents-in-practice`:

- `content/en/posts/coding-agents-in-practice.md`
- `content/cs/posts/coding-agents-in-practice.md`

Front matter template (English):

```yaml
---
title: "Coding agents in practice"
date: 2026-11-26T12:00:00+01:00
description: "What actually works when running autonomous coding agents on real repositories, and where they still fail."
translationKey: "coding-agents-in-practice"
tags:
  - "agents"
  - "engineering"
---
```

Front matter template (Czech):

```yaml
---
title: "Kódovací agenti v praxi"
date: 2026-11-26T12:00:00+01:00
description: "Co skutečně funguje při nasazení autonomních kódovacích agentů v reálných repozitářích a kde stále selhávají."
translationKey: "coding-agents-in-practice"
tags:
  - "agenti"
  - "inzenyrstvi"
---
```

## 2. Front matter checklist

- `title`: 15–65 characters, unique.
- `description`: 50–160 characters; used in article cards, RSS, Open Graph, and `<meta name="description">`.
- `date`: full ISO-8601 timestamp with timezone offset.
- `translationKey`: identical across the English and Czech files.
- `draft`: omit or set `false` to publish.

## 3. Images and code blocks

- Store article images locally under `static/img/<slug>/` (prefer WebP/AVIF, include `width`, `height`, and descriptive `alt` text; use `loading="lazy"` below the fold). Never hot-link third-party images.
- Fenced code blocks are highlighted with Chroma CSS classes (no inline `style="..."` attributes) and wrapped in an accessible `<pre role="region" tabindex="0">` automatically via `layouts/_default/_markup/render-codeblock.html`.

## 4. Preview and publish

```sh
make dev     # preview at http://127.0.0.1:1313 (EN at /, CS at /cs/)
make build   # production build into public/
```

Commit both language files together and push to `main`.
