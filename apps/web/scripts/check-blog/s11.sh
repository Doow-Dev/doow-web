#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/_lib.sh"
"$(dirname "$0")/s6.sh"

LAUNCH_POST="/blog/running-out-of-runway"

assert_status 200 /blog
assert_status 200 "$LAUNCH_POST"
assert_status 308 /blog/sample-post
assert_status 404 /blog/category/engineering
assert_status 308 /blog/tag/runway
assert_status 308 /blog/page/1
assert_status 404 /blog/page/999
assert_status 404 /blog/category/engineering/page/1
assert_status 308 /blog/tag/runway/page/1
assert_status 200 /blog/rss.xml
assert_status 200 /sitemap.xml

assert_body_contains /blog 'data-layout-shell="sitePageMain"'
assert_body_contains "$LAUNCH_POST" 'data-layout-shell="sitePageMain"'
assert_body_contains "$LAUNCH_POST" 'application/ld\+json'
assert_body_contains '/blog?category=engineering' 'Breadcrumb'
assert_body_contains '/blog?tag=runway' 'Breadcrumb'
assert_body_contains /blog/rss.xml '<rss'
assert_body_contains /blog/rss.xml "$LAUNCH_POST"
assert_body_contains /sitemap.xml '/blog</loc>'
assert_body_contains /sitemap.xml "$LAUNCH_POST"
assert_body_not_contains /sitemap.xml '/blog/category/engineering'
assert_body_contains /sitemap.xml '/blog/tag/runway'

if [ "${BLOG_LIVE:-false}" = "true" ]; then
  for path in /blog "$LAUNCH_POST" '/blog?category=engineering' '/blog?tag=runway'; do
    if curl -s "$BASE$path" | grep -Eq 'name="robots"[^>]*content="noindex'; then
      echo "FAIL: noindex still present on $path with BLOG_LIVE=true" >&2
      exit 1
    fi
  done

  node scripts/check-blog/content-launch.mjs --enforce
else
  for path in /blog "$LAUNCH_POST"; do
    assert_body_contains "$path" 'name="robots"[^>]*content="noindex'
  done

  node scripts/check-blog/content-launch.mjs
fi

echo "S11 launch-prep runtime checks passed."
