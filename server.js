const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Health check endpoint
app.get('/', (req, res) => {
    res.send("✅ Server is running!");
});

// ✅ Start NoVNC and VNC services
app.get('/run', (req, res) => {
    console.log("🔵 Received request to start Playwright with GUI...");

    exec('Xvfb :99 -screen 0 1920x1080x24 &', () => console.log("✅ Xvfb Started"));
    exec('x11vnc -display :99 -forever -nopw -rfbport 5900 &', () => console.log("✅ X11VNC Started"));
    exec('websockify --web=/usr/share/novnc/ 6080 localhost:5900 &', () => console.log("✅ NoVNC Started"));

    res.redirect('/vnc.html'); // Redirect user to browser UI
});

// ✅ Start Express Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}/`);
    console.log(`🖥️  VNC UI available at: http://localhost:6080/vnc.html`);
});
