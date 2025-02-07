const express = require('express');
const { runPlaywright } = require('./index.js'); // Import Playwright function

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ API Route that triggers Playwright but responds immediately
app.get('/run', (req, res) => {
    console.log('🔵 Received request to run Playwright');

    // Run Playwright in the background (no `await`)
    runPlaywright();

    // ✅ Immediately send response without waiting
    res.send(`✅ Playwright started in the background`);
});

// ✅ Start Express server
app.listen(PORT, () => {
    console.log(`🚀 Server running at: https://your-app-name.up.railway.app`);
});
