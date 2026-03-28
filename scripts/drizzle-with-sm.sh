#!/usr/bin/env bash
set -euo pipefail
REGION="${AWS_REGION:-ap-south-1}"
PREFIX="${AWS_SECRETS_PREFIX:-onenexium/platform}"
CMD="${1:-push}"
export DATABASE_URL
DATABASE_URL="$(aws secretsmanager get-secret-value --secret-id "${PREFIX}/DATABASE_URL" --region "${REGION}" --query SecretString --output text)"

case "$DATABASE_URL" in
  *sslmode=*|*ssl=* ) ;;
  *rds.amazonaws.com* )
    if [[ "$DATABASE_URL" == *\?* ]]; then
      DATABASE_URL="${DATABASE_URL}&sslmode=require"
    else
      DATABASE_URL="${DATABASE_URL}?sslmode=require"
    fi
    ;;
esac

case "$CMD" in
  push) exec npx drizzle-kit push ;;
  migrate) exec npx drizzle-kit migrate ;;
  generate) exec npx drizzle-kit generate ;;
  studio) exec npx drizzle-kit studio ;;
  *)
    echo "usage: $0 [push|migrate|generate|studio]" >&2
    exit 1
    ;;
esac
