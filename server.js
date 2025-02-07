const express = require('express');
const { runPlaywright } = require('./index.js');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ API Route to launch an interactive browser
app.get('/run', (req, res) => {
    console.log('🔵 Received request to run Playwright');

    // Run Playwright **without sending a response**
    runPlaywright();
});

// ✅ Start Express Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}/run`);
});
