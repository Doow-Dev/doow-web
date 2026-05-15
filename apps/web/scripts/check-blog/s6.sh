#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/_lib.sh"
"$(dirname "$0")/s5.sh"

assert_status 308 /blog/page/1
assert_status 404 /blog/page/999
assert_status 404 /blog/category/engineering/page/1
assert_status 308 /blog/tag/runway/page/1

echo "S6 runtime checks passed."
