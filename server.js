const express = require('express');
const { runPlaywright } = require('./index.js');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ API Route to launch an interactive browser
app.get('/run', (req, res) => {
    console.log('🔵 Received request to run Playwright');

    // Run Playwright in the background
    runPlaywright();

    // ✅ Respond immediately
    res.send(`✅ Playwright browser launched and ready for interaction`);
});

// ✅ Start Express Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at: https://your-app-name.up.railway.app`);
});
