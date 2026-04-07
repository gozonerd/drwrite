import { test, expect, ElectronApplication, Page } from '@playwright/test';
import { launchApp, closeApp } from './helpers/launch';

let app: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
  ({ app, page } = await launchApp());
});

test.afterAll(async () => {
  await closeApp(app, page, 'dark-mode');
});

test('dark mode toggle button is visible', async () => {
  const toggle = page.locator('text=Light').or(page.locator('text=Dark'));
  await expect(toggle.first()).toBeVisible({ timeout: 10000 });
});

test('clicking toggle switches between light and dark', async () => {
  // Find current state
  const lightButton = page.locator('button:has-text("Light")');
  const darkButton = page.locator('button:has-text("Dark")');

  if (await lightButton.isVisible()) {
    // Currently dark mode (button says "Light" = switch to light)
    await lightButton.click();
    await expect(darkButton).toBeVisible({ timeout: 3000 });

    // Switch back
    await darkButton.click();
    await expect(lightButton).toBeVisible({ timeout: 3000 });
  } else {
    // Currently light mode
    await darkButton.click();
    await expect(lightButton).toBeVisible({ timeout: 3000 });
  }
});
