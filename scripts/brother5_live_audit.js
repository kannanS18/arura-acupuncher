import fs from 'fs';
import { chromium } from 'playwright';

async function runLiveAudit() {
  console.log('================================================================================');
  console.log('    🧪 BROTHER 5 & ANTIGRAVITY — LIVE CHROMIUM INTERACTIVE LOOP TEST            ');
  console.log('================================================================================\n');

  const execPath = 'C:/Users/tamil/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe';
  const browser = await chromium.launch({
    executablePath: fs.existsSync(execPath) ? execPath : undefined,
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  console.log('🌐 Loading http://localhost:3000...');
  const res = await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 10000 });
  console.log(`📡 Response Status: ${res.status()}`);

  const title = await page.title();
  console.log(`📄 Page Title: "${title}"`);

  // Wait 1s for layout and Three.js ambient canvas
  await page.waitForTimeout(1000);

  // Capture Desktop Overview
  await page.screenshot({ path: 'public/desktop_preview.png', fullPage: false });
  console.log('📸 Desktop Preview Captured: public/desktop_preview.png');

  // Test 1: Open Booking Modal
  console.log('🖱️ Clicking "Book Priority Consultation"...');
  await page.click('button:has-text("Book Priority Consultation")', { timeout: 3000 });
  await page.waitForTimeout(500);

  const modalHeading = await page.textContent('h3:has-text("Book Holistic Appointment")');
  console.log(`✅ Booking Modal Opened: "${modalHeading}"`);
  await page.screenshot({ path: 'public/modal_preview.png' });

  // Close Modal by clicking backdrop or top-right button
  await page.keyboard.press('Escape');
  // Alternatively click the close icon button inside modal
  const closeBtn = await page.$('#bookingModal button, .fixed button:has(svg.lucide-x)');
  if (closeBtn) await closeBtn.click();
  await page.waitForTimeout(300);

  // Test 2: Council HUD
  console.log('🏛️ Opening Live Council of Brothers HUD...');
  await page.click('button:has-text("Council of Brothers")', { timeout: 3000 });
  await page.waitForTimeout(600);
  const hudHeader = await page.textContent('h3:has-text("Council of Brothers Swarm")');
  console.log(`✅ Council HUD Drawer Opened: "${hudHeader}"`);
  await page.screenshot({ path: 'public/hud_preview.png' });

  // Test 3: Mobile Viewport Inspection
  console.log('📱 Switching to Mobile Viewport (iPhone 14 / 390x844)...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'public/mobile_preview.png', fullPage: false });
  console.log('📸 Mobile Preview Captured: public/mobile_preview.png');

  await browser.close();

  console.log('\n================================================================================');
  console.log(`🏁 AUDIT VERDICT: ${consoleErrors.length === 0 ? '🟢 100% PERFECT ZERO-ERROR PASS' : '⚠️ ISSUES DETECTED'}`);
  console.log(`Total Console/Runtime Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach(e => console.error('  ❌', e));
  }
  console.log('================================================================================\n');
}

runLiveAudit().catch(console.error);
