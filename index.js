const { chromium } = require('playwright');

async function runPlaywright() {
    try {
        // ✅ Launch Playwright browser in headless mode
        const browser = await chromium.launch({
            headless: true, // Runs without UI
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Needed for cloud environments like Railway
        });

        const page = await browser.newPage();

        console.log('🌐 Navigating to Jusan Bank...');
        await page.goto('https://ib.jusan.kz/');

        // ✅ Wait for the page to fully load
        await page.waitForLoadState('load');

        // ✅ Extract and return the page title
        const title = await page.title();
        console.log(`✅ Page Loaded: ${title}`);

        await browser.close();
        return title; // Return page title
    } catch (error) {
        console.error('❌ Error running Playwright:', error);
        return `Error: ${error.message}`;
    }
}

module.exports = { runPlaywright };

