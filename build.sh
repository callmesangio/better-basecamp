#!/usr/bin/env bash
# Assembles a loadable extension per browser in dist/<browser>/:
# the browser's manifest.json plus the shared sources from src/.
set -euo pipefail

cd "$(dirname "$0")"

browsers=(chrome firefox)
[[ $# -gt 0 ]] && browsers=("$@")

for browser in "${browsers[@]}"; do
  if [[ ! -f "$browser/manifest.json" ]]; then
    echo "Unknown browser: $browser" >&2
    exit 1
  fi
  out="dist/$browser"
  rm -rf "$out"
  mkdir -p "$out"
  cp -R src/. "$out/"
  cp "$browser/manifest.json" "$out/"
  echo "Built $out"
done
