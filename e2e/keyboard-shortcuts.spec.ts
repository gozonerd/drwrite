import { test, expect, ElectronApplication, Page } from '@playwright/test';
import { launchApp, closeApp } from './helpers/launch';

let app: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
  ({ app, page } = await launchApp());
});

test.afterAll(async () => {
  await closeApp(app, page, 'keyboard-shortcuts');
});

test('Ctrl+N resets to default document', async () => {
  // Type something first to modify the document
  await page.keyboard.press('Control+n');
  // Should show "Welcome to DrWrite" heading
  const heading = page.locator('text=Welcome to DrWrite');
  await expect(heading.first()).toBeVisible({ timeout: 5000 });
});

test('Ctrl+E opens export dialog', async () => {
  await page.keyboard.press('Control+e');
  const dialog = page.locator('text=Export Settings');
  await expect(dialog).toBeVisible({ timeout: 5000 });

  // Close it by pressing Escape or clicking cancel
  const cancel = page.locator('text=Cancel');
  await cancel.click();
  await expect(dialog).not.toBeVisible();
});

test('Ctrl+F opens search panel in source editor', async () => {
  // Click in the source editor area first
  const sourcePane = page.locator('.cm-editor').first();
  await sourcePane.click();

  await page.keyboard.press('Control+f');
  // CodeMirror search panel should appear
  const searchInput = page.locator('.cm-search input, .cm-searchField');
  await expect(searchInput.first()).toBeVisible({ timeout: 5000 });

  // Close search
  await page.keyboard.press('Escape');
});
