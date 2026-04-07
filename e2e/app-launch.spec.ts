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

test('app window opens', async () => {
  expect(page).toBeTruthy();
});

test('window title contains DrWrite', async () => {
  const title = await page.title();
  expect(title).toContain('DrWrite');
});

test('toolbar is visible', async () => {
  const toolbar = page.locator('text=Untitled');
  await expect(toolbar.first()).toBeVisible({ timeout: 10000 });
});

test('status bar shows line count', async () => {
  const statusBar = page.locator('text=lines');
  await expect(statusBar.first()).toBeVisible({ timeout: 10000 });
});

test('status bar shows Markdown format', async () => {
  const format = page.locator('text=Markdown');
  await expect(format.first()).toBeVisible({ timeout: 10000 });
});
