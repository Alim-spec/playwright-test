const { chromium } = require('playwright');
const readline = require('readline');
const path = require('path');  // Import the 'path' module
const fs = require('fs');

(async () => {
  let browser;
  let page;
  let responseData = null; // Variable to store the response data

  try {
    // Launch the browser in headed mode for manual interaction.
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();

     // Set the download folder to C:/statements
     const downloadFolder = 'C:/statements';  // Path to the folder

    // Set up a readline interface to listen for terminal input.
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Listen for any line of input. If the user types "break", exit the program.
    rl.on('line', (input) => {
      if (input.trim().toLowerCase() === 'break') {
        console.log('Break command received. Exiting program...');
        browser.close().then(() => process.exit(0));
      }
    });

    // Intercept and capture responses to the specific URL
    await page.route('https://ibank-back.forte.kz/api/v1/account/get-ids', async (route, request) => {
      // Continue the request (doesn't return a response object directly)
      route.continue();
    });

    // Listen for the response to the intercepted request
    page.on('response', async (response) => {
      const url = response.url();
      if (url === 'https://ibank-back.forte.kz/api/v1/account/get-ids') {
        // Only intercept the response for the specific API endpoint
        try {
          const contentType = response.headers()['content-type'] || '';
          if (contentType.includes('application/json')) {
            responseData = await response.json(); // Store JSON response in the variable
          } else {
            responseData = await response.text(); // Store text response in the variable
          }

          // Log the captured response data
          console.log('Captured Response:', responseData);
        } catch (error) {
          console.error('Error parsing response:', error);
        }
      }
    });

    // Navigate to the site
    await page.goto('https://ibank.forte.kz/customer/login');

    // Wait for the "Войти" button to appear and click it
    await page.waitForSelector('button:has-text("Войти")');
    await page.click('button:has-text("Войти")');

    // Wait for the page's URL to change after login
    await page.waitForURL('https://ibank.forte.kz/customer/', { timeout: 0 });

    // Now navigate to the "accounts-statement" page
    await page.goto('https://ibank.forte.kz/customer/accounts-statement');

    // Wait until the page's URL is confirmed as "https://ibank.forte.kz/customer/accounts-statement"
    await page.waitForURL('https://ibank.forte.kz/customer/accounts-statement', { timeout: 0 });

    // Print success2 to the terminal
    console.log('success2');

    // Click the "применить" button after the page is loaded
    await page.click('button:has-text("применить")');

    // Wait for 5 seconds to ensure the request is intercepted
    console.log('Waiting for API response...');
    await page.waitForTimeout(5000); // Wait for 5 seconds

    // Step 1: Click the 'Период' Textbox, then fill it with the dates '01.01.2024-05.02.2025'

await page.getByRole('textbox', { name: 'Период' }).click();
await page.getByRole('textbox', { name: 'Период' }).fill('01.01.2024-01.01.2025');
console.log('sss1')

//step2
await page.getByText('Не выбрано').first().click();
  await page.locator('div').filter({ hasText: /^EXCEL$/ }).click();
  console.log('sss2')
//step 3
await page.locator('div').filter({ hasText: /^НазваниеФилиалНомерВидОстатокСтатус$/ }).locator('span').click();
console.log('sss3')
//step 4
page.on('response', async (response) => {
    // Check if the response is for the specific URL
    if (response.url() === 'https://ibank-back.forte.kz/api/v1/account/statement' && response.status() === 200) {
      try {
        // Parse the JSON response body
        const data = await response.json();
        
        // Extract 'id' field from the JSON response and store it
        if (data && data.id) {
          statementId = data.id;
          console.log('Extracted statement ID:', statementId);
        }
      } catch (error) {
        console.error('Error parsing JSON response:', error);
      }
    }
  });
//step4.1
await page.getByRole('button', { name: 'Заказать выписку' }).click();
await page.getByRole('button', { name: 'Закрыть' }).click();
console.log('sss4')
//step 5
await page.getByText('История').click();

  console.log('sss5') 
 // Step 1: Use statementId to target the form dynamically
 await page.locator(`form[name="accountStatement${statementId}"]`).getByText('Скачать').click();

 // Step 2: Wait for the new page (this assumes the click opens a new page)
// const page1Promise = browser.waitForEvent('page');
 const downloadPromise = page.waitForEvent('download');  // Assuming download event is triggered

 // Step 3: Wait for the page and download to complete
 //const page1 = await page1Promise;  // Resolving the new page promise
 const download = await downloadPromise;  // Resolving the download promise

 // Step 1: Get the original filename suggested by the server
 const originalFilename = download.suggestedFilename();
 console.log('Original filename:', originalFilename);

 // Step 2: Define the full path to save the file in the "statements" folder
 const downloadPath = path.join(downloadFolder, originalFilename);

 // Step 3: Save the downloaded file to the specified folder with the original name
 await download.saveAs(downloadPath);

    // Wait for the "finish" command in the terminal
    

    // Print the response data stored in the variable
    console.log('Final Response Data:', responseData);

    // Close the readline interface and browser
    rl.close();
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    if (browser) {
      await browser.close();
    }
    process.exit(1);
  }
})();
