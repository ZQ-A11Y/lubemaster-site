#!/usr/bin/env bash
# 部署 lubemaster-site 到 GitHub Pages（国内可直接访问）
# 用法：在仓库根目录运行 ./scripts/deploy-gh-pages.sh
set -euo pipefail

cd "$(dirname "$0")/.."

# 1. 以静态导出模式构建
BUILD_TARGET=gh-pages npm run build

# 2. 必须加 .nojekyll！否则 GitHub Pages 的 Jekyll 会忽略 _next/ 目录，页面打开空白
touch out/.nojekyll

# 3. 把 out/ 内容推送到 gh-pages 分支
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
cp -r out/. "$TMP"/
cd "$TMP"
git init -b gh-pages -q
git add -A
git -c user.name="鹊南" -c user.email="3496622752@qq.com" \
  commit -q -m "deploy: static export for GitHub Pages" || true
git remote add origin git@github.com:ZQ-A11Y/lubemaster-site.git
git push -f origin gh-pages

echo ""
echo "✅ 已推送到 gh-pages 分支。等 1-2 分钟 Pages 构建完成后访问："
echo "   https://zq-a11y.github.io/lubemaster-site/"
