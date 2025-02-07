const express = require('express');
const { exec } = require('child_process');
const { runPlaywright } = require('./index.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/run', (req, res) => {
    console.log("🔵 Received request to start Playwright with browser access...");

    // Start Playwright inside virtual display
    runPlaywright();

    // Start VNC Server (Expose GUI)
    exec('x11vnc -display :99 -forever -nopw -rfbport 5900 &', (error) => {
        if (error) console.error("❌ X11VNC Error:", error);
    });

    // Start NoVNC (Web Interface for Clients)
    exec('websockify --web=/usr/share/novnc/ 6080 localhost:5900 &', (error) => {
        if (error) console.error("❌ NoVNC Error:", error);
    });

    res.redirect('/vnc.html'); // Redirect user to browser interface
});

// Serve NoVNC Web Interface
app.use(express.static('/usr/share/novnc'));

app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}/run`);
    console.log(`🖥️  Access the browser at: http://localhost:6080/vnc.html`);
});
