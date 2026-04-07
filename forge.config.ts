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

/**
 * After Electron Forge copies the app into the packaged output,
 * copy externalized native modules from node_modules/ so they're
 * available at runtime via require().
 */
function copyNativeModules(
  buildPath: string,
  _electronVersion: string,
  _platform: string,
  _arch: string,
  callback: () => void,
) {
  const nativeModules = ['better-sqlite3', 'bindings', 'file-uri-to-path', 'prebuild-install', 'node-addon-api'];
  for (const mod of nativeModules) {
    const src = path.join(__dirname, 'node_modules', mod);
    const dest = path.join(buildPath, 'node_modules', mod);
    if (fsExtra.existsSync(src)) {
      fsExtra.copySync(src, dest);
    }
  }
  callback();
}

const config: ForgeConfig = {
  packagerConfig: {
    asar: false, // Disabled — Squirrel doesn't include app.asar.unpacked, and native .node binaries can't load from inside an ASAR
    icon: './assets/icons/icon',
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
