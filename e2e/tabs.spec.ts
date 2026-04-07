import { test, expect, ElectronApplication, Page } from '@playwright/test';
import { launchApp, closeApp } from './helpers/launch';

let app: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
  ({ app, page } = await launchApp());
});

test.afterAll(async () => {
  await closeApp(app);
});

test('tab bar is visible on launch', async () => {
  const tab = page.locator('text=Untitled');
  await expect(tab.first()).toBeVisible({ timeout: 10000 });
});

test('clicking + creates a new tab', async () => {
  const addButton = page.locator('button[title="New tab"]');
  await addButton.click();

  // Should now have 2 "Untitled" texts (one per tab)
  const tabs = page.locator('[title="Close tab"]');
  const count = await tabs.count();
  expect(count).toBeGreaterThanOrEqual(2);
});

test('clicking close removes a tab', async () => {
  const closeButtons = page.locator('[title="Close tab"]');
  const countBefore = await closeButtons.count();

  await closeButtons.last().click();

  const countAfter = await page.locator('[title="Close tab"]').count();
  expect(countAfter).toBe(countBefore - 1);
});
