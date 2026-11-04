const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/#/ ...');
  await page.goto('http://localhost:3000/#/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  console.log('Scrolling to interactive-lab...');
  const lab = page.locator('#interactive-lab');
  await lab.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  const artifactDir = 'C:/Users/tamil/.gemini/antigravity/brain/f741c1d2-bbda-45e1-8b1b-8ed8d06c488e';

  // Screenshot 1: Whole body with physical 3D surgical tray on Mayo stand
  await page.screenshot({ path: `${artifactDir}/shot_physical_1_whole_body.png` });
  console.log('Saved shot_physical_1_whole_body.png');

  // Click on PC-6 (Inner Gate) button in left catalog
  console.log('Clicking PC-6 in left catalog...');
  const pc6Btn = page.getByRole('button', { name: /PC-6/i }).first();
  await pc6Btn.click();
  // Wait 3s for smooth camera flight and surgical tray repositioning
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${artifactDir}/shot_physical_2_pc6_closeup.png` });
  console.log('Saved shot_physical_2_pc6_closeup.png');

  // Click "Insert to Knot" button in PiP to plunge needle into knot
  console.log('Testing Insert to Knot in PiP...');
  const insertBtn = page.getByRole('button', { name: /Insert to Knot/i });
  if (await insertBtn.count() > 0) {
    await insertBtn.click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${artifactDir}/shot_physical_3_knot_cured.png` });
    console.log('Saved shot_physical_3_knot_cured.png');
  }

  // Switch to Fascial Adhesion (Glass Cupping)
  console.log('Switching to Fascial Adhesion (Glass Cupping)...');
  const adhesionBtn = page.getByRole('button', { name: /Fascial Adhesion/i });
  if (await adhesionBtn.count() > 0) {
    await adhesionBtn.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${artifactDir}/shot_physical_4_cupping.png` });
    console.log('Saved shot_physical_4_cupping.png');
  }

  await browser.close();
  console.log('All verification steps completed!');
})();
