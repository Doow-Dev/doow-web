#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/_lib.sh"
"$(dirname "$0")/s4.sh"

assert_status 404 /blog/category/engineering
assert_status 404 /blog/category/not-a-real-category
assert_status 308 /blog/tag/runway
assert_status 308 /blog/tag/this-tag-does-not-exist
assert_status 200 '/blog?category=engineering'
assert_status 200 '/blog?tag=runway'
assert_body_contains '/blog?category=engineering' '"@type":[[:space:]]*"BreadcrumbList"'
assert_body_contains '/blog?tag=runway' '"@type":[[:space:]]*"BreadcrumbList"'
assert_body_not_contains /sitemap.xml '/blog/category/engineering'
assert_body_contains /sitemap.xml '/blog/tag/runway'

echo "S5 runtime checks passed."
