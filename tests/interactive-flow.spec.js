import { test, expect } from '@playwright/test';

test.describe('3D Tissue Strata & Tool Tray Doctor Simulator', () => {
  test('Complete mouse-only 3D tool selection, tissue pathology treatment, and Thanos disintegration', async ({ page }) => {
    test.setTimeout(60000);
    // 1. Visit homepage
    await page.goto('/', { waitUntil: 'networkidle' });

    // 2. Scroll to 3D simulator
    const simulator = page.locator('[data-testid="tissue-depth-simulator"]').first();
    await simulator.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -100));
    await page.waitForTimeout(500);
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
    await page.waitForTimeout(300);

    // 5. Test interactive mouse drag on slider to plunge needle to 12 mm
    const depthSlider = page.locator('[data-testid="tool-depth-slider"]').first();
    await expect(depthSlider).toBeVisible();
    await depthSlider.fill('12');
    await page.waitForTimeout(1400);

    // 6. Verify 3D Disintegration Payoff
    await expect(page.locator('text=De-Qi Unlocked (得气)').first()).toBeVisible();
    await expect(page.locator('text=0%').first()).toBeVisible();

    // 7. Reset to treat another 3D pathology
    const resetBtn = page.locator('button:has-text("Treat Another 3D Pathology")').first();
    await resetBtn.click();
    await page.waitForTimeout(300);

    // 8. Select another pathology: Fascial Adhesion
    const adhesionBtn = page.locator('button:has-text("Fascial Adhesion")').first();
    await adhesionBtn.click();
    await page.waitForTimeout(300);

    // 9. Select Glass Fire Cup tool with mouse
    await cupBtn.click();
    await page.waitForTimeout(300);

    // 10. Drag suction slider to trigger cupping vacuum decompression
    const suctionSlider = page.locator('[data-testid="tool-depth-slider"]').first();
    await suctionSlider.fill('6');
    await page.waitForTimeout(1400);
    await expect(page.locator('text=Myofascial Adhesion Unlocked').first()).toBeVisible();

    // 11. Fullscreen Toggle
    const fullScreenBtn = page.locator('button:has-text("Full Screen")').first();
    await fullScreenBtn.click();
    await expect(page.locator('text=Exit').first()).toBeVisible();

    const exitBtn = page.locator('button:has-text("Exit")').first();
    await exitBtn.click();
    await page.waitForTimeout(200);
  });
});
