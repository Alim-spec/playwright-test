#!/bin/bash

echo "🔄 Starting GUI Services for Playwright..."

# ✅ Ensure no stale Xvfb lock files exist before starting
if [ -f /tmp/.X99-lock ]; then
    echo "🛑 Removing stale Xvfb lock file..."
    rm -f /tmp/.X99-lock
fi

# ✅ Check if Xvfb is already running before starting
if pgrep Xvfb > /dev/null; then
    echo "🟢 Xvfb is already running."
else
    Xvfb :99 -screen 0 1920x1080x24 &
    export DISPLAY=:99
    echo "✅ Xvfb Virtual Display started."
fi

# ✅ Ensure `x11vnc` is installed before running
if ! command -v x11vnc &> /dev/null; then
    echo "❌ Error: x11vnc not found!"
    exit 1
fi
x11vnc -display :
