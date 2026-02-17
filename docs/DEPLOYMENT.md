# CI/CD and Deployment (DigitalOcean Droplet)

This project is set up for production deployment to a DigitalOcean Standard Droplet using:

- GitHub Actions for CI/CD
- GHCR (`ghcr.io`) for container images
- Docker Compose on droplet
- Caddy as reverse proxy + automatic TLS

## Architecture

- `app` service: Next.js container (built from `Dockerfile`)
- `caddy` service: terminates TLS on `443`, proxies to `app:3000`
- Health endpoint: `GET /api/health`
- Deploy path on droplet: `/opt/orymu-studio`

## Repository Files

- `Dockerfile`
- `.dockerignore`
- `deploy/docker-compose.yml`
- `deploy/Caddyfile`
- `deploy/.env.example`
- `deploy/scripts/bootstrap-droplet.sh`
- `deploy/scripts/deploy.sh`
- `deploy/scripts/rollback.sh`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`

## CI Pipeline

Workflow: `.github/workflows/ci.yml`

Runs on every push and pull request:

1. `pnpm install --frozen-lockfile`
2. `pnpm lint`
3. `pnpm type-check`
4. `pnpm build`

## CD Pipeline

Workflow: `.github/workflows/deploy.yml`

Trigger:

- Push to `main`
- Manual run via `workflow_dispatch`

Flow:

1. Build Docker image
2. Push image to GHCR with tags:
   - `sha-<12 chars>`
   - `main`
3. Upload `deploy/` assets to droplet (`/opt/orymu-studio`)
4. Execute remote deploy script (`scripts/deploy.sh`)
5. Health check (`http://127.0.0.1:3000/api/health`)
6. Auto rollback to previous image tag if deploy health check fails

## Required GitHub Setup

### 1. Production Environment

Create GitHub Environment named `production`.

Recommended:

- Enable required reviewers for deployment approval
- Scope deployment secrets to this environment

### 2. Environment Secrets

Add these secrets in `production` environment:

- `PRODUCTION_SSH_HOST` (droplet IP / hostname)
- `PRODUCTION_SSH_PORT` (optional, defaults to `22`)
- `PRODUCTION_SSH_USER` (deploy user)
- `PRODUCTION_SSH_KEY` (private key content)
- `PRODUCTION_APP_DOMAIN` (for Caddy virtual host, e.g. `app.example.com`)
- `PRODUCTION_ACME_EMAIL` (Let's Encrypt email)

### 3. Branch Protection

Protect `main` branch and require CI checks before merge.

## Droplet Setup

## 1. Create droplet

- Ubuntu LTS
- SSH key auth enabled

## 2. Harden network

Use DigitalOcean Cloud Firewall:

- Inbound `22` (restricted source)
- Inbound `80`, `443` (public)
- Outbound as required

## 3. Bootstrap docker runtime

Run on droplet as root:

```bash
sudo bash /path/to/bootstrap-droplet.sh <deploy-user> /opt/orymu-studio
```

If script is not on droplet yet, copy from repo first.

## 4. Validate runtime

As deploy user:

```bash
docker --version
docker compose version
```

## First Production Deploy

After secrets are configured:

1. Merge to `main`, or run `Deploy Production` manually from Actions
2. Watch `deploy.yml` logs
3. Verify:

```bash
curl -fsS http://127.0.0.1:3000/api/health
```

4. Validate public domain over HTTPS

## Manual Rollback

SSH to droplet:

```bash
cd /opt/orymu-studio
bash scripts/rollback.sh
```

Or rollback to specific tag:

```bash
cd /opt/orymu-studio
bash scripts/rollback.sh sha-<tag>
```

## Operational Notes

- Deploy script stores last successful tag in `/opt/orymu-studio/.last_known_good`
- Runtime config is in `/opt/orymu-studio/.env`
- Caddy cert data is stored in docker volume `caddy_data`

## Optional Next Steps

- Add uptime checks and alerting in DigitalOcean Monitoring
- Add staging environment with separate droplet and GitHub environment
- Move to two droplets + load balancer for high availability
