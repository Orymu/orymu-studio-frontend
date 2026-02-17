#!/usr/bin/env bash
set -euo pipefail

DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_DIR="$DEPLOY_DIR/site"
SITE_PREV_DIR="$DEPLOY_DIR/site_prev"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required but not installed"
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "docker compose plugin is required but not available"
  exit 1
fi

if [ ! -d "$SITE_PREV_DIR" ]; then
  echo "No rollback target found at $SITE_PREV_DIR"
  exit 1
fi

rm -rf "$SITE_DIR"
mv "$SITE_PREV_DIR" "$SITE_DIR"

cd "$DEPLOY_DIR"
docker compose up -d --remove-orphans caddy

echo "Rollback completed using previous static bundle"
