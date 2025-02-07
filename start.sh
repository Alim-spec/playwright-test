#!/bin/bash

echo "🔄 Starting GUI Services for Playwright..."

# ✅ Start Virtual Display (Xvfb)
Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99
echo "✅ Xvfb Virtual Display started."

# ✅ Ensure `x11vnc` is installed before running
if ! command -v x11vnc &> /dev/null; then
    echo "❌ Error: x11vnc not found!"
    exit 1
fi
x11vnc -display :99 -forever -nopw -rfbport 5900 &
echo "✅ X11VNC Server started."

# ✅ Ensure `websockify` is installed before running
if ! command -v websockify &> /dev/null; then
    echo "❌ Error: websockify not found!"
    exit 1
fi
websockify --web=/usr/share/novnc/ 6080 localhost:5900 &
echo "✅ NoVNC Web Interface started."

echo "🚀 GUI services running. Access VNC via: http://localhost:6080/vnc.html"

# Keep the container running
tail -f /dev/null
