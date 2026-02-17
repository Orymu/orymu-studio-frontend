# CI/CD and Deployment (DigitalOcean Droplet - Static)

This project is deployed as a static site to a DigitalOcean Standard Droplet using:

- GitHub Actions for CI/CD
- Next.js static export (`out/`)
- Docker Compose on droplet
- Caddy as static web server + automatic TLS

## Why this is lighter

- No Node.js runtime container in production
- No image build/push/pull pipeline
- No GHCR dependency for deployment
- One service only (`caddy`)

## Architecture

- Build output: `out/` (from `pnpm build`)
- Droplet deploy path: `/opt/orymu-studio`
- Caddy serves static files from `/opt/orymu-studio/site`
- Staged uploads land in `/opt/orymu-studio/site_next`, then promoted atomically by deploy script

## Repository Files

- `next.config.ts` (`output: "export"`)
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

1. Install dependencies
2. Build static output (`out/`)
3. Upload deploy assets to droplet (`/opt/orymu-studio`)
4. Upload static bundle to `/opt/orymu-studio/site_next`
5. Execute deploy script to promote `site_next -> site`
6. Caddy health check
7. Automatic rollback to previous bundle if health check fails

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
- `PRODUCTION_APP_DOMAIN` (e.g. `app.example.com`)
- `PRODUCTION_ACME_EMAIL` (Let's Encrypt email)

### 3. Branch Protection

Protect `main` and require CI checks before merge.

## Droplet Setup

### 1. Create droplet

- Ubuntu LTS
- SSH key auth enabled

### 2. Harden network

Use DigitalOcean Cloud Firewall:

- Inbound `22` (restricted source)
- Inbound `80`, `443` (public)
- Outbound as required

### 3. Bootstrap docker runtime

Run on droplet as root:

```bash
sudo bash /path/to/bootstrap-droplet.sh <deploy-user> /opt/orymu-studio
```

### 4. Validate runtime

As deploy user:

```bash
docker --version
docker compose version
```

## First Production Deploy

1. Merge to `main` or run `Deploy Production` manually
2. Watch `deploy.yml` logs
3. Validate domain over HTTPS

## Manual Rollback

SSH to droplet:

```bash
cd /opt/orymu-studio
bash scripts/rollback.sh
```

## Operational Notes

- Active static bundle: `/opt/orymu-studio/site`
- Previous bundle: `/opt/orymu-studio/site_prev`
- Incoming bundle: `/opt/orymu-studio/site_next`
- Runtime config: `/opt/orymu-studio/.env`
- Caddy cert state in volumes `caddy_data` and `caddy_config`

## Optional further cost reduction

If traffic/requirements allow:

1. Move from droplet to static hosting product (no VM)
2. Keep droplet only for workloads that need compute runtime
