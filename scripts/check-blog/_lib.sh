#!/usr/bin/env bash
set -euo pipefail

BASE="${BASE_URL:-http://localhost:3000}"

assert_status() {
  local expected="$1"
  local path="$2"
  local actual

  actual="$(curl -o /dev/null -s -w '%{http_code}' "$BASE$path")"

  if [ "$actual" != "$expected" ]; then
    echo "FAIL: $path expected $expected, got $actual" >&2
    exit 1
  fi
}

assert_body_contains() {
  local path="$1"
  local pattern="$2"
  local body

  body="$(curl -s "$BASE$path")"

  if ! grep -Eq "$pattern" <<<"$body"; then
    echo "FAIL: $path does not match /$pattern/" >&2
    exit 1
  fi
}

assert_body_not_contains() {
  local path="$1"
  local pattern="$2"
  local body

  body="$(curl -s "$BASE$path")"

  if grep -Eq "$pattern" <<<"$body"; then
    echo "FAIL: $path unexpectedly matches /$pattern/" >&2
    exit 1
  fi
}
