#!/bin/bash

echo "🔄 Starting NoVNC and X11 setup..."

# Start Xvfb virtual display (headless GUI)
Xvfb :99 -screen 0 1920x1080x24 &

# Set virtual display environment variable
export DISPLAY=:99

# Start VNC server to expose display
x11vnc -display :99 -forever -nopw -rfbport 5900 &

# Start NoVNC Web Interface
websockify --web=/usr/share/novnc/ 6080 localhost:5900 &

echo "✅ NoVNC running at http://localhost:6080/vnc.html"
