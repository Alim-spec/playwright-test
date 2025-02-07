const { chromium } = require('playwright');
const { exec } = require('child_process');

async function runPlaywright() {
    try {
        console.log("🔵 Starting X11 Virtual Display...");
        exec('Xvfb :99 -screen 0 1920x1080x24 &', (error) => {
            if (error) console.error("❌ Xvfb Error:", error);
        });

        process.env.DISPLAY = ':99'; // Set virtual display

        console.log("🌐 Launching Playwright Browser...");
        const browser = await chromium.launch({
            headless: false, // Headed mode for interaction
            args: ['--start-maximized']
        });

        const page = await browser.newPage();
        await page.goto('https://ib.jusan.kz/');
        console.log("✅ Browser Loaded at: https://ib.jusan.kz/");

    } catch (error) {
        console.error("❌ Error launching Playwright:", error);
    }
}

module.exports = { runPlaywright };
