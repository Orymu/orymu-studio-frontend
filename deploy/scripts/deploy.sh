#!/usr/bin/env bash
set -euo pipefail

DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$DEPLOY_DIR/.env"
SITE_DIR="$DEPLOY_DIR/site"
SITE_NEXT_DIR="$DEPLOY_DIR/site_next"
SITE_PREV_DIR="$DEPLOY_DIR/site_prev"

required_vars=(APP_DOMAIN ACME_EMAIL)
for var_name in "${required_vars[@]}"; do
  if [ -z "${!var_name:-}" ]; then
    echo "Missing required variable: $var_name"
    exit 1
  fi
done

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required but not installed"
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "docker compose plugin is required but not available"
  exit 1
fi

if [ ! -d "$SITE_NEXT_DIR" ]; then
  echo "Missing $SITE_NEXT_DIR. Upload static artifact before running deploy."
  exit 1
fi

cat > "$ENV_FILE" <<ENV_VARS
APP_DOMAIN=$APP_DOMAIN
ACME_EMAIL=$ACME_EMAIL
ENV_VARS

cd "$DEPLOY_DIR"
rm -rf "$SITE_PREV_DIR"
if [ -d "$SITE_DIR" ]; then
  mv "$SITE_DIR" "$SITE_PREV_DIR"
fi
mv "$SITE_NEXT_DIR" "$SITE_DIR"

docker compose up -d --remove-orphans caddy

healthcheck() {
  if command -v curl >/dev/null 2>&1; then
    curl -fsS -H "Host: $APP_DOMAIN" "http://127.0.0.1/" >/dev/null
    return
  fi

  wget -q -O - --header="Host: $APP_DOMAIN" "http://127.0.0.1/" >/dev/null
}

max_wait_seconds=90
elapsed=0
until healthcheck; do
  sleep 3
  elapsed=$((elapsed + 3))

  if [ "$elapsed" -ge "$max_wait_seconds" ]; then
    echo "Health check failed for APP_DOMAIN=$APP_DOMAIN"

    if [ -d "$SITE_PREV_DIR" ]; then
      echo "Rolling back to previous static bundle"
      rm -rf "$SITE_DIR"
      mv "$SITE_PREV_DIR" "$SITE_DIR"
      docker compose up -d --remove-orphans caddy
    fi

    exit 1
  fi
done

echo "Deploy succeeded for APP_DOMAIN=$APP_DOMAIN"
