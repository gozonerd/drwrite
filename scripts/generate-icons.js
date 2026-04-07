const sharp = require('sharp');
const { imagesToIco } = require('png-to-ico');
const fs = require('fs');
const path = require('path');

const SVG_PATH = path.join(__dirname, '..', 'docs', 'design', 'logo', 'drwrite-logo-mark.svg');
const ICON_DIR = path.join(__dirname, '..', 'assets', 'icons');

const SIZES = [16, 32, 48, 64, 128, 256, 512];

async function generateIcons() {
  // Create output directory
  fs.mkdirSync(ICON_DIR, { recursive: true });

  const svgBuffer = fs.readFileSync(SVG_PATH);

  // Generate PNGs at all sizes
  for (const size of SIZES) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(ICON_DIR, `icon-${size}.png`));
    console.log(`Generated icon-${size}.png`);
  }

  // Copy 256px as the main icon.png
  await sharp(svgBuffer)
    .resize(256, 256)
    .png()
    .toFile(path.join(ICON_DIR, 'icon.png'));
  console.log('Generated icon.png (256x256)');

  // Generate .ico for Windows (16, 32, 48, 64, 128, 256)
  const icoPngs = [16, 32, 48, 64, 128, 256].map(
    (size) => fs.readFileSync(path.join(ICON_DIR, `icon-${size}.png`))
  );
  const icoBuffer = await imagesToIco(icoPngs);
  fs.writeFileSync(path.join(ICON_DIR, 'icon.ico'), icoBuffer);
  console.log('Generated icon.ico');

  console.log('\nAll icons generated in', ICON_DIR);
}

generateIcons().catch(console.error);
