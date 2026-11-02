import { test, expect } from '@playwright/test';

test.describe('Clinical Acupuncture Sandbox & Procedure Tray', () => {
  test('Complete hands-on procedure tray workflow, flex inspection, and Thanos pain disintegration', async ({ page }) => {
    // 1. Visit homepage
    await page.goto('/', { waitUntil: 'networkidle' });

    // 2. Scroll to simulator
    const simulator = page.locator('[data-testid="tissue-depth-simulator"]').first();
    await simulator.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -100));
    await page.waitForTimeout(400);
    await expect(simulator).toBeVisible();

    // 3. Verify Procedure Tray tools are accessible
    await expect(page.locator('text=Procedure Tray').first()).toBeVisible();
    await expect(page.locator('text=0.18mm Sterile Needle').first()).toBeVisible();
    await expect(page.locator('text=Alcohol Prep Swab').first()).toBeVisible();
    await expect(page.locator('text=Pure Moxa Cigar').first()).toBeVisible();
    await expect(page.locator('text=Glass Fire Cup').first()).toBeVisible();
    await expect(page.locator('text=528Hz Tuning Fork').first()).toBeVisible();

    // 4. Test "Needle vs Hair Flex Test" Inspector Modal
    const inspectorBtn = page.locator('button:has-text("Needle vs Hair Flex Test")').first();
    await inspectorBtn.click();
    await page.waitForTimeout(300);
    await expect(page.locator('text=The 0.18mm Needle vs. Human Hair').first()).toBeVisible();

    // Close Inspector
    const closeBtn = page.locator('[data-testid="close-inspector"]').first();
    await closeBtn.click();
    await page.waitForTimeout(300);
    await expect(page.locator('[data-testid="close-inspector"]')).toHaveCount(0);

    // 5. Test Alcohol Swab tool on tray
    const swabTool = page.locator('text=Alcohol Prep Swab').first();
    await swabTool.click();
    await page.waitForTimeout(200);

    // 6. Verify Initial Condition is visible
    await expect(page.locator('text=TRAPEZIUS DESK SPASM').first()).toBeVisible();

    // 7. Treat the Acupoint directly (trigger Thanos Disintegration)
    const targetAcupoint = page.locator('[data-testid="target-acupoint"]').first();
    await targetAcupoint.click({ force: true });
    await page.waitForTimeout(1400);

    // 8. Verify Disintegration & De-Qi Relief Payoff
    await expect(page.locator('text=De-Qi Unlocked (得气)').first()).toBeVisible();
    await expect(page.locator('text=0%').first()).toBeVisible();
    await expect(page.locator('text=+340%').first()).toBeVisible();

    // 9. Fullscreen Toggle
    const fullScreenBtn = page.locator('button:has-text("Full Screen")').first();
    await fullScreenBtn.click();
    await expect(page.locator('text=Exit').first()).toBeVisible();

    // Exit Full Screen
    const exitBtn = page.locator('button:has-text("Exit")').first();
    await exitBtn.click();
    await page.waitForTimeout(200);
  });
});
