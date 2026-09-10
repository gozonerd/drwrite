import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerDMG } from '@electron-forge/maker-dmg';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import path from 'node:path';
import fsExtra from 'fs-extra';
import { rebuild } from '@electron/rebuild';

/**
 * After Electron Forge copies the app into the packaged output,
 * copy externalized native modules from node_modules/ so they're
 * available at runtime via require().
 *
 * The copied binaries come from the project's node_modules, where `npm install` left
 * prebuild-install's build for the HOST NODE ABI. Forge's own "Preparing native dependencies"
 * step cannot correct them: it runs against the packaged output before this hook has put any
 * node_modules there, so it finds nothing to rebuild and reports success. Rebuilding here,
 * immediately after the copy, is order-independent — the modules are provably present.
 */
function copyNativeModules(
  buildPath: string,
  electronVersion: string,
  _platform: string,
  arch: string,
  callback: (err?: Error) => void,
) {
  const nativeModules = ['better-sqlite3', 'bindings', 'file-uri-to-path', 'prebuild-install', 'node-addon-api'];
  for (const mod of nativeModules) {
    const src = path.join(__dirname, 'node_modules', mod);
    const dest = path.join(buildPath, 'node_modules', mod);
    if (fsExtra.existsSync(src)) {
      fsExtra.copySync(src, dest);
    }
  }
  // Replace the host-ABI binaries with builds for the Electron runtime actually being packaged.
  rebuild({ buildPath, electronVersion, arch, force: true })
    .then(() => callback())
    .catch((err: Error) => callback(err));
}

const config: ForgeConfig = {
  packagerConfig: {
    asar: false, // Disabled — Squirrel doesn't include app.asar.unpacked, and native .node binaries can't load from inside an ASAR
    icon: './assets/icons/icon',
    // The Vite-built app dir has no assets/ — ship the icons to resources/icons
    // so main.ts can resolve the window icon in the packaged layout
    extraResource: ['./assets/icons'],
    afterCopy: [copyNativeModules],
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      setupIcon: './assets/icons/icon.ico',
      iconUrl: 'https://raw.githubusercontent.com/nerdykrystal/drwrite/master/assets/icons/icon.ico',
      setupExe: 'DrWrite-Setup.exe',
      name: 'drwrite',
    }),
    new MakerDMG({ format: 'ULFO' }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    // AutoUnpackNativesPlugin removed — ASAR disabled, native modules are loose files
    new VitePlugin({
      build: [
        {
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: false,
      [FuseV1Options.OnlyLoadAppFromAsar]: false,
    }),
  ],
};

export default config;
