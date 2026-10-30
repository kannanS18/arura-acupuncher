const { chromium } = require('playwright');
const path = require('path');

async function auditImageAndFonts() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  const artifactDir = 'C:\\Users\\tamil\\.gemini\\antigravity\\brain\\f741c1d2-bbda-45e1-8b1b-8ed8d06c488e';

  console.log('--- AUDITING HERO IMAGE & TWO-FONT PAIRING ---');

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Take screenshot of the complete Hero Section with the newly integrated image
  const hero = page.locator('section').first();
  await hero.screenshot({ path: path.join(artifactDir, 'hero_with_clinical_image.png') });
  console.log('✓ Saved hero_with_clinical_image.png');

  // Verify the image loaded and is visible
  const heroImg = page.locator('img[src="/acupuncture_session.jpg"]').first();
  const isImgVisible = await heroImg.isVisible();
  console.log('✓ Clinical photography loaded and visible:', isImgVisible);

  // Take screenshot of the entire Home Page viewport
  await page.screenshot({ path: path.join(artifactDir, 'home_two_fonts_verified.png'), fullPage: false });
  console.log('✓ Saved home_two_fonts_verified.png');

  await browser.close();
  console.log(`--- AUDIT FINISHED. Total console errors: ${errors.length} ---`);
}

auditImageAndFonts().catch(console.error);
