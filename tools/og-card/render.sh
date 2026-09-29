#!/usr/bin/env bash
# Render card.html to source/img/og-card.png (1200x630, the Open Graph size).
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --virtual-time-budget=8000 --window-size=1200,630 \
  --screenshot="$here/../../source/img/og-card.png" "file://$here/card.html" 2>/dev/null
echo "wrote source/img/og-card.png"
