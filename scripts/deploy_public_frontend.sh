#!/usr/bin/env bash
# Push compiled dist/ to public deploy-only repo (innovators-generation-web).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_REPO="${PUBLIC_DEPLOY_REPO:-zub165/innovators-generation-web}"
REPO_NAME="${PUBLIC_REPO##*/}"

"$ROOT/scripts/build_dist.sh"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

if ! gh repo view "$PUBLIC_REPO" &>/dev/null; then
  echo "==> Creating public repo $PUBLIC_REPO"
  gh repo create "$REPO_NAME" --public \
    --description "Compiled site for innovatorsgeneration.com (deploy-only)" \
    --clone=false
fi

git clone "https://github.com/${PUBLIC_REPO}.git" "$TMP/repo"
cd "$TMP/repo"
git checkout --orphan deploy-clean
git rm -rf . 2>/dev/null || true
cp -R "$ROOT/dist/." .

cat > README.md <<'EOF'
# Innovators Generation — public website

Compiled static files only for [innovatorsgeneration.com](https://innovatorsgeneration.com).

Source is in the private `innovators-generation-website` repository.
EOF

git add -A
git -c user.name="IG Deploy" -c user.email="deploy@innovatorsgeneration.com" \
  commit -m "deploy: $(date -u +%Y-%m-%dT%H:%MZ)"
git branch -M main
git push -f origin main

gh api "repos/${PUBLIC_REPO}/pages" -X PUT \
  -f build_type=legacy \
  -f 'source[branch]=main' \
  -f 'source[path]=/' 2>/dev/null || \
gh api "repos/${PUBLIC_REPO}/pages" -X POST \
  -f build_type=legacy \
  -f 'source[branch]=main' \
  -f 'source[path]=/' 2>/dev/null || true

echo "Done: https://innovatorsgeneration.com"
