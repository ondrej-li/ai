# ai.ondralinek.cz — deployment map

Static Hugo site. nginx serves the rendered files; the **deploy** account builds
and publishes `main` via the `site-deploy` timer (every 5 minutes) once wired in.

| | |
|---|---|
| Host | `ai.ondralinek.cz` |
| Repository | `https://github.com/ondrej-li/ai` (`main`) |
| Web root | `/var/www/ai` |
| Build command | `hugo --minify --cleanDestinationDir` |
| Hugo version | **0.146.0** (pinned in CI and on the VPS) |
| vhost | `deploy/nginx/ai.conf` (`ai-http.conf` before TLS) |
| headers | `deploy/nginx/ai-headers.conf` |
| TLS | `/etc/letsencrypt/live/ai.ondralinek.cz/` |

## First-time setup (deploy account)

1. Point DNS (`A` / `AAAA`) for `ai.ondralinek.cz` at the VPS.
2. Register `ai` in the `site-deploy` config (repo `ondrej-li/ai`, branch `main`,
   builder `hugo`, web root `/var/www/ai`).
3. Install `deploy/nginx/ai-headers.conf` to `/etc/nginx/snippets/ai-headers.conf`
   and install the vhost + TLS certificate (`vps-site vhost check/install`,
   `vps-site tls`).
4. Run `web-launch-check https://ai.ondralinek.cz` and verify `/deployed.json`
   matches `origin/main`.

## Wired on the VPS (2026-11-26)

The infrastructure side is done; the site is live and deploys from `main`.

| | |
|---|---|
| Repository | `ondrej-li/ai` (public), `main`, initial commit `bd0924c` |
| `site-deploy` | `/etc/site-deploy/sites.toml` → Hugo 0.146.0, `public/` → `/var/www/ai`, timer every 5 min |
| vhost | `/etc/nginx/sites-available/ai` (this repo's `ai.conf`), enabled; `ai-http.conf` was used only until TLS existed |
| headers | `/etc/nginx/snippets/ai-headers.conf` in every location that sets its own `add_header` |
| TLS | certbot webroot lineage `ai.ondralinek.cz`, expires 2027-02-24; `certbot.timer` renews and the deploy hook reloads nginx |
| marker | `https://ai.ondralinek.cz/deployed.json` — compared against `origin/main` by the timer |
| DNS | `A 2.31.33.21`, `AAAA 2a01:4f8:c016:e828::1` (already live) |

`web-launch-check https://ai.ondralinek.cz` → 22 pass, 2 warn, 0 fail. The two
warnings are content decisions, not infrastructure: no `/terms/` link and no
analytics. Publishing is now `git push` to `main`; the agent account cannot
publish this web root (`vps-site` refuses deploy-managed sites).
