const express = require('express');
const { runPlaywright } = require('./index.js'); // Import Playwright function

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ API Route to trigger Playwright
app.get('/run', async (req, res) => {
    console.log('🔵 Received request to run Playwright');
    try {
        const title = await runPlaywright();
        res.send(`✅ Page Title: ${title}`);
    } catch (error) {
        res.status(500).send(`❌ Error: ${error.message}`);
    }
});

// ✅ Start Express Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

