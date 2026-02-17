#!/usr/bin/env bash
set -euo pipefail

DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$DEPLOY_DIR/.env"
LAST_KNOWN_GOOD_FILE="$DEPLOY_DIR/.last_known_good"
TARGET_TAG="${1:-}"

if [ -z "$TARGET_TAG" ]; then
  if [ ! -f "$LAST_KNOWN_GOOD_FILE" ]; then
    echo "No rollback target provided and $LAST_KNOWN_GOOD_FILE not found"
    exit 1
  fi
  TARGET_TAG="$(cat "$LAST_KNOWN_GOOD_FILE")"
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE"
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required but not installed"
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "docker compose plugin is required but not available"
  exit 1
fi

if ! grep -q '^IMAGE_REPO=' "$ENV_FILE"; then
  echo "IMAGE_REPO is not set in $ENV_FILE"
  exit 1
fi

sed -i "s/^IMAGE_TAG=.*/IMAGE_TAG=$TARGET_TAG/" "$ENV_FILE"

cd "$DEPLOY_DIR"
docker compose pull app
docker compose up -d --remove-orphans app caddy

echo "Rollback completed to IMAGE_TAG=$TARGET_TAG"
