#!/usr/bin/env bash
set -euo pipefail

DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$DEPLOY_DIR/.env"
LAST_KNOWN_GOOD_FILE="$DEPLOY_DIR/.last_known_good"

required_vars=(IMAGE_REPO IMAGE_TAG APP_DOMAIN ACME_EMAIL)
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

previous_tag=""
if [ -f "$ENV_FILE" ]; then
  previous_tag="$(grep '^IMAGE_TAG=' "$ENV_FILE" | head -n 1 | cut -d '=' -f 2- || true)"
fi

cat > "$ENV_FILE" <<ENV_VARS
IMAGE_REPO=$IMAGE_REPO
IMAGE_TAG=$IMAGE_TAG
APP_DOMAIN=$APP_DOMAIN
ACME_EMAIL=$ACME_EMAIL
ENV_VARS

cd "$DEPLOY_DIR"
docker compose pull app
docker compose up -d --remove-orphans app caddy

healthcheck() {
  if command -v curl >/dev/null 2>&1; then
    curl -fsS "http://127.0.0.1:3000/api/health" >/dev/null
    return
  fi

  wget -q -O - "http://127.0.0.1:3000/api/health" >/dev/null
}

max_wait_seconds=150
elapsed=0
until healthcheck; do
  sleep 3
  elapsed=$((elapsed + 3))

  if [ "$elapsed" -ge "$max_wait_seconds" ]; then
    echo "Health check failed for IMAGE_TAG=$IMAGE_TAG"

    if [ -n "$previous_tag" ]; then
      echo "Rolling back to IMAGE_TAG=$previous_tag"
      sed -i "s/^IMAGE_TAG=.*/IMAGE_TAG=$previous_tag/" "$ENV_FILE"
      docker compose pull app
      docker compose up -d --remove-orphans app caddy
    fi

    exit 1
  fi
done

echo "$IMAGE_TAG" > "$LAST_KNOWN_GOOD_FILE"
echo "Deploy succeeded with IMAGE_TAG=$IMAGE_TAG"
