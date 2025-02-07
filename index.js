const { chromium } = require('playwright');

async function runPlaywright() {
    try {
        // ✅ Connect to a remote browser instance (e.g., Browserless.io)
        const browser = await chromium.connectOverCDP('wss://chrome.browserless.io/');

        const page = await browser.newPage();
        console.log('🌐 Opening Jusan Bank for user interaction...');

        await page.goto('https://ib.jusan.kz/');

        // ✅ Keep the browser open for interaction
        console.log('✅ Browser is open and interactive');
    } catch (error) {
        console.error('❌ Error running Playwright:', error);
    }
}

module.exports = { runPlaywright };
