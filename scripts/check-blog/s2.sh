#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/_lib.sh"

LAUNCH_POST="/blog/running-out-of-runway"

assert_status 200 /blog
assert_status 200 "$LAUNCH_POST"
assert_status 308 /blog/sample-post
assert_status 404 /blog/non-existent-slug

if [ "${BLOG_LIVE:-false}" = "true" ]; then
  assert_body_not_contains "$LAUNCH_POST" 'name="robots"[^>]*content="noindex'
else
  assert_body_contains "$LAUNCH_POST" 'name="robots"[^>]*content="noindex'
fi
assert_body_contains "$LAUNCH_POST" '"@type":[[:space:]]*"BlogPosting"'
assert_body_contains "$LAUNCH_POST" '"@type":[[:space:]]*"BreadcrumbList"'
assert_body_contains "$LAUNCH_POST" '"@type":[[:space:]]*"Person"'
assert_body_contains /sitemap.xml '/blog</loc>'
assert_body_contains /sitemap.xml "$LAUNCH_POST"

content_type="$(curl -o /dev/null -s -w '%{content_type}' "$BASE/api/og/blog?title=Test&category=Finance")"
case "$content_type" in
  image/png*) ;;
  *)
    echo "FAIL: OG image content-type was $content_type" >&2
    exit 1
    ;;
esac

echo "S2 runtime checks passed."
