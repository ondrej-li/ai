# ai.ondralinek.cz

Bilingual (English / Czech) static [Hugo](https://gohugo.io/) site covering
Ondra Linek's thoughts, field notes, and essays on artificial intelligence.

Built with a modern, dark, minimalistic, robot-inspired design and zero external
runtime dependencies (no third-party scripts, webfonts, cookies, or trackers).

## Requirements

- **Hugo 0.146.0** (pinned in `.github/workflows/ci.yml`; extended is not needed)

## Local development

```sh
make dev     # live preview at http://127.0.0.1:1313
make build   # production build into public/
make clean   # remove generated build files
```

## Authoring

See [docs/AUTHORING.md](docs/AUTHORING.md) for the bilingual EN/CS article
workflow and front matter checklist.

## Modern Web Guidance reference

This repository vendors a local reference copy of
[GoogleChrome/modern-web-guidance](https://github.com/googlechrome/modern-web-guidance)
under `references/modern-web-guidance/` (wired into
`.claude/skills/modern-web-guidance`) so site agents always have offline access
to modern HTML, CSS, accessibility, and web-platform guidance. Run
`make update-guidance` to sync it with upstream.

## Deployment

See [deploy/DEPLOY.md](deploy/DEPLOY.md) for the VPS nginx vhost, strict CSP
headers, and `site-deploy` setup.
