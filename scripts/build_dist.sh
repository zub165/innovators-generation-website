#!/usr/bin/env bash
# Build production dist for innovatorsgeneration.com
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
npm ci --silent
npm run build
cp dist/index.html dist/404.html
touch dist/.nojekyll
echo "Built: $ROOT/dist"
ls -la dist/
