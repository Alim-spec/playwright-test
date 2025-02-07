#!/bin/bash

echo "🔄 Starting GUI Services for Playwright..."

# ✅ Start Virtual Display (Xvfb)
Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99
echo "✅ Xvfb Virtual Display started."

# ✅ Start VNC server to expose GUI
x11vnc -display :99 -forever -nopw -rfbport 5900 &
echo "✅ X11VNC Server started."

# ✅ Start NoVNC Web Interface
websockify --web=/usr/share/novnc/ 6080 localhost:5900 &
echo "✅ NoVNC Web Interface started."

echo "🚀 GUI services running. Access VNC via: http://localhost:6080/vnc.html"
