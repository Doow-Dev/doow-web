#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/_lib.sh"
bash "$(dirname "$0")/s8.sh"

assert_status 200 /blog/category/engineering/rss.xml
assert_status 404 /blog/category/not-a-real-category/rss.xml
assert_status 200 /blog/tag/runway/rss.xml
assert_status 404 /blog/tag/not-a-real-tag/rss.xml
assert_body_contains /blog/category/engineering/rss.xml '<rss'
assert_body_contains /blog/category/engineering/rss.xml 'running-out-of-runway'
assert_body_contains /blog/tag/runway/rss.xml '<rss'
assert_body_contains /blog/tag/runway/rss.xml 'running-out-of-runway'

echo "S9 taxonomy RSS runtime checks passed."
