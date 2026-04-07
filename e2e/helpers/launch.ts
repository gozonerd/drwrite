import { _electron as electron, ElectronApplication, Page } from '@playwright/test';
import path from 'node:path';
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const ROOT = path.join(__dirname, '..', '..');
const MAIN_JS = path.join(ROOT, '.vite', 'build', 'main.js');
const NYC_OUTPUT = path.join(ROOT, '.nyc_output');

/**
 * Ensure the Vite build exists.
 */
function ensureBuild(): void {
  if (!fs.existsSync(MAIN_JS)) {
    console.log('Building DrWrite for E2E tests...');
    execSync('npx electron-forge start &', {
      cwd: ROOT,
      timeout: 30000,
      stdio: 'ignore',
    });
    const start = Date.now();
    while (!fs.existsSync(MAIN_JS) && Date.now() - start < 25000) {
      execSync('sleep 1');
    }
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
    env: { ...process.env, COVERAGE: process.env.COVERAGE || '' },
  });

  const page = await app.firstWindow();
  await page.waitForSelector('[class*="flex"]', { timeout: 15000 });

  return { app, page };
}

/**
 * Extract Istanbul coverage data from the renderer process
 * and write it to .nyc_output/ for merging.
 */
export async function extractCoverage(page: Page, testName: string): Promise<void> {
  try {
    const coverage = await page.evaluate(() => (window as Record<string, unknown>).__coverage__);
    if (coverage) {
      fs.mkdirSync(NYC_OUTPUT, { recursive: true });
      const fileName = `e2e-${testName}-${Date.now()}.json`;
      fs.writeFileSync(
        path.join(NYC_OUTPUT, fileName),
        JSON.stringify(coverage),
      );
    }
  } catch {
    // Coverage not available (not instrumented) — skip silently
  }
}

export async function closeApp(app: ElectronApplication, page?: Page, testName?: string): Promise<void> {
  if (page && testName) {
    await extractCoverage(page, testName);
  }
  await app.close();
}
