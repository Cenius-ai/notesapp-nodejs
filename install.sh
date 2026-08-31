#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "=== Notes App — Install ==="
echo "Installing dependencies…"
npm install --no-audit --no-fund

echo ""
echo "Setup complete."
echo "Run the app with: npm run dev"
echo "The app will seed demo notes on first launch."
