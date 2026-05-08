#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/_lib.sh"
"$(dirname "$0")/s2.sh"

assert_body_contains /blog/rss.xml '<\?xml'
assert_body_contains /blog/rss.xml '<rss'
assert_body_contains /blog/rss.xml 'running-out-of-runway'
assert_body_contains /blog 'rel="alternate"[^>]*rss\.xml'
assert_body_contains /sitemap.xml '/blog</loc>'
assert_body_contains /sitemap.xml '/blog/running-out-of-runway'

echo "S4 runtime checks passed."
