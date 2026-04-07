# Security Notes

## npm audit Vulnerabilities

As of 2026-04-07, `npm audit` reports 33 vulnerabilities (6 low, 2 moderate, 25 high).

**All vulnerabilities are in build-time dependencies** — specifically the `@electron-forge/*` CLI toolchain:

```
@electron-forge/cli → @electron-forge/core-utils → @electron/rebuild@3.7.2
  → @inquirer/prompts → @inquirer/editor → external-editor → tmp
```

### Why these don't affect users

1. **Build-time only.** These packages run during `npm run make` (building installers). They are NOT bundled into the packaged app.
2. **The `tmp` vulnerability** (the root cause) affects temporary file creation during CLI prompts in `@inquirer/editor`. This code path is never executed during app usage — only during interactive Electron Forge CLI operations.
3. **ASAR packaging** excludes `node_modules` from the distributable. The packaged `.exe` and `.dmg` do not contain these dependencies.

### Resolution path

These will be resolved when `@electron-forge` releases a version that upgrades `@electron/rebuild` past 3.7.2. We track the latest Forge releases and will upgrade when available.

### Runtime security measures

- Context isolation enabled (no `nodeIntegration: true`)
- Preload script uses `contextBridge` for secure IPC
- Interactive HTML/JS diagrams run in sandboxed iframe (`sandbox="allow-scripts"` — no parent access)
- Electron Fuses configured: RunAsNode disabled, cookie encryption, ASAR integrity validation
- D3.js bundled locally (no CDN dependency)
