const { chromium } = require('@playwright/test');

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();
    const url = 'https://www.google.com/search?q=No+45A%2C+Ground+floor%2C+Vaikasi+Street%2C+Chinmaya+Nagar%2C+Virugambakkam%2C+Chennai+-+600092#sv=CCYSqwMKEgoDdGJzEgtscmY6ITNzSUFFPQpaCgFxElVObyA0NUEsIEdyb3VuZCBmbG9vciwgVmFpa2FzaSBTdHJlZXQsIENoaW5tYXlhIE5hZ2FyLCBWaXJ1Z2FtYmFra2FtLCBDaGVubmFpIC0gNjAwMDkyCgcKA3VkbRIAEAEaEHB2LS9nLzExaDkxY3FoNDkqNQoNL2cvMTFoOTFjcWg0OSIaChRObyA0NUEsIEdyb3VuZCBmbG9vchACGAOJAV-g1t9HEF32MuQBClVObyA0NUEsIEdyb3VuZCBmbG9vciwgVmFpa2FzaSBTdHJlZXQsIENoaW5tYXlhIE5hZ2FyLCBWaXJ1Z2FtYmFra2FtLCBDaGVubmFpIC0gNjAwMDkySIn57JWkr4CACFpsEAAQARACEAMYARgCGAMYBBgFGAYYBxgIGAkYCiJObm8gNDVhIGdyb3VuZCBmbG9vciB2YWlrYXNpIHN0cmVldCBjaGlubWF5YSBuYWdhciB2aXJ1Z2FtYmFra2FtIGNoZW5uYWkgNjAwMDkykgESYWN1cHVuY3R1cmVfY2xpbmljGAogvZmAxQY';
    
    console.log('Navigating...');
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 }).catch(e => console.log('Navigation timeout/catch:', e.message));
    
    // Check page title
    console.log('Page Title:', await page.title());
    
    // Extract any image urls on the page
    const images = await page.$$eval('img', imgs => imgs.map(img => img.src));
    console.log('Found images count:', images.length);
    const unique = [...new Set(images)];
    console.log('Images:', unique.slice(0, 15));
    
    await browser.close();
  } catch (err) {
    console.error('Playwright error:', err);
  }
})();
