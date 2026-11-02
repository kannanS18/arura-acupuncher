import { test, expect } from '@playwright/test';

test.describe('Acupuncture Clinical Interactive Experience & Educational Simulator', () => {
  test('Complete interactive clinical procedure with keyboard shortcuts & knowledge tabs', async ({ page }) => {
    // 1. Visit homepage
    await page.goto('/', { waitUntil: 'networkidle' });

    // 2. Scroll to interactive simulator section
    const simulator = page.locator('[data-testid="tissue-depth-simulator"]').first();
    await simulator.scrollIntoViewIfNeeded();
    await expect(simulator).toBeVisible();

    // Verify Active Keyboard Controls bar is displayed
    await expect(page.locator('text=Active Keyboard Controls:').first()).toBeVisible();

    // -------------------------------------------------------------
    // Step 1: Sterile Unseal (Blister Pack)
    // -------------------------------------------------------------
    await expect(page.locator('text=Myth Buster #1: 100% Single-Use Sterile Guarantee').first()).toBeVisible();

    // Trigger unseal via button or Space key
    const quickUnsealBtn = page.locator('text=Quick-Unseal [Space]').first();
    await quickUnsealBtn.click();
    await page.waitForTimeout(600);

    // -------------------------------------------------------------
    // Step 2: Acupoint Palpation & Knot Localization
    // -------------------------------------------------------------
    await expect(page.locator('text=Acupoint Palpation & Knot Localization').first()).toBeVisible();
    
    // Lock acupoint & proceed to guide tube placement
    const lockBtn = page.locator('text=Place Guide Tube Here [Space]').first();
    await expect(lockBtn).toBeVisible();
    await lockBtn.click();
    await page.waitForTimeout(600);

    // -------------------------------------------------------------
    // Step 3: Painless Dermal Breach (Guide Tube Tap)
    // -------------------------------------------------------------
    await expect(page.locator('text=Myth Buster #2: The 0.01s Painless Dermal Breach').first()).toBeVisible();
    await expect(page.locator('text=The Guide Tube Closes the Pain Gate').first()).toBeVisible();

    // Execute tap
    const tapBtn = page.locator('text=Execute Quick-Tap [Space]').first();
    await expect(tapBtn).toBeVisible();
    await tapBtn.click();
    await page.waitForTimeout(600);

    // -------------------------------------------------------------
    // Step 4: Fascial Strata Navigation & De-Qi Unlock
    // -------------------------------------------------------------
    await expect(page.locator('text=Fascial Navigation & De-Qi Unlock').first()).toBeVisible();

    // Adjust depth slider to 12.0 mm (target knot depth)
    await page.evaluate(() => {
      const slider = document.querySelector('input[type="range"]');
      if (slider) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(slider, 12.0);
        slider.dispatchEvent(new Event('input', { bubbles: true }));
        slider.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await page.waitForTimeout(300);

    // Verify depth readout
    await expect(page.locator('text=12.0 mm').first()).toBeVisible();

    // Execute Twirl (Roll L->R)
    const twirlBtn = page.locator('text=Twirl (Roll L→R)').first();
    await twirlBtn.click();
    await page.waitForTimeout(800);

    // Verify De-Qi unlock response
    await expect(page.locator('text=✓ SPASM UNLOCKED (DE-QI)').first()).toBeVisible();
    await expect(page.locator('text=DE-QI (得气)!').first()).toBeVisible();

    // -------------------------------------------------------------
    // Knowledge Educational Tabs Testing
    // -------------------------------------------------------------
    // Test clicking Gate Control Theory tab
    await page.locator('text=Gate Control Theory').click();
    await expect(page.locator('text=How the Guide-Tube Blocks Pain Reception')).toBeVisible();

    // Test clicking De-Qi Physiology tab
    await page.locator('text=De-Qi Physiology').click();
    await expect(page.locator('text=What is That Warm, Radiating Sensation (De-Qi)?')).toBeVisible();

    // Test clicking Aseptic Safety tab
    await page.locator('text=Aseptic Safety').click();
    await expect(page.locator('text=Hospital-Grade Aseptic Standards')).toBeVisible();

    // -------------------------------------------------------------
    // Fullscreen Mode Toggle Testing
    // -------------------------------------------------------------
    const fullscreenBtn = page.locator('button:has-text("Full Screen Mode")').first();
    await fullscreenBtn.click();
    await expect(page.locator('text=Exit Full Screen').first()).toBeVisible();

    // Exit Fullscreen
    const exitFullscreenBtn = page.locator('button:has-text("Exit Full Screen")').first();
    await exitFullscreenBtn.click();
    await expect(page.locator('button:has-text("Full Screen Mode")').first()).toBeVisible();
  });
});
