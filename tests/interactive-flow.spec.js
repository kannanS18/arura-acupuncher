import { test, expect } from '@playwright/test';

test.describe('3D Tissue Strata & Tool Tray Doctor Simulator', () => {
  test('Complete mouse-only 3D tool selection, tissue pathology treatment, and Thanos disintegration', async ({ page }) => {
    test.setTimeout(120000);
    // 1. Visit homepage
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // 2. Scroll to 3D simulator
    const simulator = page.locator('[data-testid="tissue-depth-simulator"]').first();
    await simulator.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -100));
    await expect(simulator).toBeVisible();

    // 3. Verify 3D Tray Tools are present
    const needleBtn = page.locator('[data-testid="tool-needle"]').first();
    const cupBtn = page.locator('[data-testid="tool-cup"]').first();
    const moxaBtn = page.locator('[data-testid="tool-moxa"]').first();
    await expect(needleBtn).toBeVisible();
    await expect(cupBtn).toBeVisible();
    await expect(moxaBtn).toBeVisible();

    // 4. Select needle tool with mouse
    await needleBtn.click();

    // 5. Test interactive drop needle to 12 mm
    const dropBtn = page.locator('button:has-text("Drop Needle to 12mm Knot")').first();
    await expect(dropBtn).toBeVisible();
    await dropBtn.click();
    await page.waitForTimeout(600);

    // 6. Verify 3D Disintegration Payoff
    await expect(page.locator('text=De-Qi Unlocked').first()).toBeVisible();
    await expect(page.locator('text=0%').first()).toBeVisible();

    // 7. Reset to treat another 3D pathology
    const resetBtn = page.locator('button:has-text("Treat Another 3D Pathology")').first();
    await resetBtn.click();
    await page.waitForTimeout(200);

    // 8. Select another pathology: Fascial Adhesion
    const adhesionBtn = page.locator('button:has-text("Fascial Adhesion")').first();
    await adhesionBtn.click();
    await page.waitForTimeout(200);

    // 9. Select Glass Fire Cup tool with mouse
    await cupBtn.click();
    await page.waitForTimeout(200);

    // 10. Trigger cupping vacuum decompression
    const cupDropBtn = page.locator('[data-testid="target-acupoint"]').first();
    await cupDropBtn.click();
    await page.waitForTimeout(600);
    await expect(page.locator('text=Myofascial Adhesion Unlocked').first()).toBeVisible();

    // 11. Fullscreen Toggle
    const fullScreenBtn = page.locator('button:has-text("Full Screen")').first();
    await fullScreenBtn.click();
    await expect(page.locator('text=Exit').first()).toBeVisible();

    const exitBtn = page.locator('button:has-text("Exit")').first();
    await exitBtn.click();
  });
});
