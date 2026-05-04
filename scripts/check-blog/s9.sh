#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/_lib.sh"
bash "$(dirname "$0")/s8.sh"

assert_status 200 /blog/category/finance-operations/rss.xml
assert_status 404 /blog/category/not-a-real-category/rss.xml
assert_status 200 /blog/tag/saas-management/rss.xml
assert_status 404 /blog/tag/not-a-real-tag/rss.xml
assert_body_contains /blog/category/finance-operations/rss.xml '<rss'
assert_body_contains /blog/category/finance-operations/rss.xml 'finance-teams-lose-track-of-saas-spend'
assert_body_contains /blog/tag/saas-management/rss.xml '<rss'
assert_body_contains /blog/tag/saas-management/rss.xml 'finance-teams-lose-track-of-saas-spend'

echo "S9 taxonomy RSS runtime checks passed."
