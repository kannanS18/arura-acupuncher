import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  const el = page.locator('[data-testid="tissue-depth-simulator"]').first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);

  // 1. Initial State: Whole Body Focus (Only human body with acupoints)
  await el.screenshot({ path: 'C:/Users/tamil/.gemini/antigravity/brain/f741c1d2-bbda-45e1-8b1b-8ed8d06c488e/histology_1_whole_body_initial.png' });

  // 2. Click "Dual Suite (Body + Strata)" to reveal tissue model
  const dualBtn = page.locator('button:has-text("Dual Suite")').first();
  if (await dualBtn.isVisible()) {
    await dualBtn.click();
    await page.waitForTimeout(1000);
    await el.screenshot({ path: 'C:/Users/tamil/.gemini/antigravity/brain/f741c1d2-bbda-45e1-8b1b-8ed8d06c488e/histology_2_stacked_solid_strata.png' });
  }

  // 3. Click "Exploded Anatomy" to view layers separated like the reference diagram
  const explodeBtn = page.locator('button:has-text("Exploded Anatomy"), button:has-text("Stacked Solid")').first();
  if (await explodeBtn.isVisible()) {
    await explodeBtn.click();
    await page.waitForTimeout(1000);
    await el.screenshot({ path: 'C:/Users/tamil/.gemini/antigravity/brain/f741c1d2-bbda-45e1-8b1b-8ed8d06c488e/histology_3_exploded_reference.png' });

    // Toggle back to Stacked Solid (Zero Gap)
    await explodeBtn.click();
    await page.waitForTimeout(800);
  }

  // 4. Zoom to Neck / Occiput
  const neckBtn = page.locator('button:has-text("Neck / Occiput")').first();
  if (await neckBtn.isVisible()) {
    await neckBtn.click();
    await page.waitForTimeout(1000);
    await el.screenshot({ path: 'C:/Users/tamil/.gemini/antigravity/brain/f741c1d2-bbda-45e1-8b1b-8ed8d06c488e/histology_4_neck_zoom_exam.png' });
  }

  // 5. Plunge Needle down to 12mm
  const slider = page.locator('[data-testid="tool-depth-slider"]').first();
  if (await slider.isVisible()) {
    await slider.fill('9.5');
    await page.waitForTimeout(600);
    await el.screenshot({ path: 'C:/Users/tamil/.gemini/antigravity/brain/f741c1d2-bbda-45e1-8b1b-8ed8d06c488e/histology_5_needle_penetration_strata.png' });
  }

  await browser.close();
  console.log('All histology suite screenshots captured successfully!');
})();
