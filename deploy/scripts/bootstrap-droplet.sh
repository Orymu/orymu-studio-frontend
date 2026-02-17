#!/usr/bin/env bash
set -euo pipefail

DEPLOY_USER="${1:-$USER}"
DEPLOY_PATH="${2:-/opt/orymu-studio}"

if [ "${EUID}" -ne 0 ]; then
  echo "Run as root (sudo)."
  exit 1
fi

apt-get update
apt-get install -y ca-certificates curl gnupg

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  > /etc/apt/sources.list.d/docker.list

apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

systemctl enable docker
systemctl start docker

if id "$DEPLOY_USER" >/dev/null 2>&1; then
  usermod -aG docker "$DEPLOY_USER"
else
  echo "User $DEPLOY_USER does not exist. Create it and add to docker group manually."
fi

mkdir -p "$DEPLOY_PATH"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$DEPLOY_PATH"

echo "Bootstrap complete. Re-login as $DEPLOY_USER so docker group membership is applied."
echo "Deployment directory: $DEPLOY_PATH"
