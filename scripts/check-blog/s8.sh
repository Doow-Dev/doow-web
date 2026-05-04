#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/_lib.sh"
"$(dirname "$0")/s6.sh"

assert_status 200 /blog/search.json
assert_body_contains /blog/search.json '"slug"'
assert_body_contains /blog/search.json '"running-out-of-runway"'
assert_body_contains /blog/search.json '"finance-teams-lose-track-of-saas-spend"'
assert_body_contains /blog/search.json '"saas-management"'
assert_body_contains /blog 'Search articles'

echo "S8 search runtime checks passed."
