#!/usr/bin/env bash
# dist/ 를 옆에 클론된 Sub2n.github.io 저장소(master)에 복사해서 커밋·푸시한다.
# 토큰이 필요 없고, 로컬에서 push 권한만 있으면 된다.
set -euo pipefail
SRC="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${DEPLOY_DIR:-$SRC/../Sub2n.github.io}"

[ -d "$SRC/dist" ] || { echo "dist/ 가 없습니다. 먼저 npm run build"; exit 1; }
[ -d "$DEST/.git" ] || { echo "$DEST 가 git 저장소가 아닙니다"; exit 1; }

# .git 만 남기고 비운 뒤 dist 복사
find "$DEST" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R "$SRC/dist/." "$DEST/"
touch "$DEST/.nojekyll"

cd "$DEST"
git add -A
if git diff --cached --quiet; then echo "변경 없음"; exit 0; fi
git commit -m "Site updated: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin HEAD
echo "배포 완료 → https://sub2n.github.io/"
