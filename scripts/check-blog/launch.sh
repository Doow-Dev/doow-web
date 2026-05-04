#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/_lib.sh"

if [ "${BLOG_LIVE:-false}" != "true" ]; then
  echo "FAIL: BLOG_LIVE=true is required for launch checks" >&2
  exit 1
fi

bash "$(dirname "$0")/s11.sh"

echo "Launch runtime checks passed."
