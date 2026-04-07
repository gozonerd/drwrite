import { _electron as electron, ElectronApplication, Page } from '@playwright/test';
import path from 'node:path';
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const ROOT = path.join(__dirname, '..', '..');
const MAIN_JS = path.join(ROOT, '.vite', 'build', 'main.js');

/**
 * Ensure the Vite build exists. If not, run electron-forge's
 * Vite plugin to build main + preload + renderer.
 */
function ensureBuild(): void {
  if (!fs.existsSync(MAIN_JS)) {
    console.log('Building DrWrite for E2E tests...');
    execSync('npx electron-forge start &', {
      cwd: ROOT,
      timeout: 30000,
      stdio: 'ignore',
    });
    // Wait for the build to produce main.js
    const start = Date.now();
    while (!fs.existsSync(MAIN_JS) && Date.now() - start < 25000) {
      execSync('sleep 1');
    }
    // Kill the forge process — we just needed the build artifacts
    try {
      execSync('taskkill /F /IM electron.exe', { stdio: 'ignore' });
    } catch { /* may not be running */ }
  }
}

/**
 * Launch DrWrite for E2E testing.
 */
export async function launchApp(): Promise<{ app: ElectronApplication; page: Page }> {
  ensureBuild();

  const app = await electron.launch({
    args: [MAIN_JS],
    cwd: ROOT,
  });

  const page = await app.firstWindow();
  // Wait for React to mount
  await page.waitForSelector('[class*="flex"]', { timeout: 15000 });

  return { app, page };
}

export async function closeApp(app: ElectronApplication): Promise<void> {
  await app.close();
}
