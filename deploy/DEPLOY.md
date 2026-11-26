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
