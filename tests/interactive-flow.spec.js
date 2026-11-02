import { test, expect } from '@playwright/test';

test.describe('Acupuncture Pain Dissolver (Thanos Disintegration Experience)', () => {
  test('Complete pain disintegration flow with keyboard and mouse interactions', async ({ page }) => {
    // 1. Visit homepage
    await page.goto('/', { waitUntil: 'networkidle' });

    // 2. Scroll to simulator with clearance from sticky header
    const simulator = page.locator('[data-testid="tissue-depth-simulator"]').first();
    await simulator.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -150));
    await page.waitForTimeout(500);
    await expect(simulator).toBeVisible();

    // Verify initial pain state
    await expect(page.locator('text=THROBBING OCCIPITAL MIGRAINE').first()).toBeVisible();
    await expect(page.locator('text=88% Spasm Contraction').first()).toBeVisible();

    // 3. Trigger Thanos Disintegration by clicking the needle or pressing Space key
    const needle = page.locator('[title*="Drag needle"]').first();
    await expect(needle).toBeVisible();
    await needle.click({ force: true });
    await page.waitForTimeout(1200);

    // 4. Verify Disintegration & Relief Payoff
    await expect(page.locator('text=De-Qi Achieved (得气)').first()).toBeVisible();
    await expect(page.locator('text=Vice-Like Temple Grip Dissolved').first()).toBeVisible();
    await expect(page.locator('text=0%').first()).toBeVisible();
    await expect(page.locator('text=+340%').first()).toBeVisible();

    // 5. Test Reset to another condition
    const resetBtn = page.locator('text=Test Another Pain [R]').first();
    await resetBtn.click();
    await page.waitForTimeout(400);

    // 6. Test switching condition to Sciatica
    const sciaticaBtn = page.locator('button:has-text("Sciatic Nerve Pain")').first();
    await sciaticaBtn.click();
    await page.waitForTimeout(300);
    await expect(page.locator('text=BURNING SCIATIC NERVE AGONY').first()).toBeVisible();

    // Trigger Thanos Disintegration on Sciatica via Space key
    await page.keyboard.press('Space');
    await page.waitForTimeout(1000);
    await expect(page.locator('text=Radiating Sciatic Compression Cleared').first()).toBeVisible();

    // 7. Full Screen Toggle
    const fullScreenBtn = page.locator('button:has-text("Full Screen")').first();
    await fullScreenBtn.click();
    await expect(page.locator('text=Exit').first()).toBeVisible();

    // Exit Full Screen
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
  });
});
