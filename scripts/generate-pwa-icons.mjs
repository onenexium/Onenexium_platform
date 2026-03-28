/**
 * Rasterizes SVG marks to PNGs for the web app manifest (192 / 512 / maskable 512).
 * Run: npm run icons
 */
import { mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import sharp from "sharp"

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, "..", "public", "icons")

function svgStandard(size) {
  const r = Math.round(size * 0.2)
  const fs = Math.round(size * 0.45)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#080C14"/><stop offset="100%" stop-color="#141C2E"/>
</linearGradient></defs>
<rect width="${size}" height="${size}" rx="${r}" fill="url(#g)"/>
<text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="700" font-size="${fs}" fill="#F0F4FF">N</text>
</svg>`
}

/** Extra inset so Android maskable safe zone is respected. */
function svgMaskable(size) {
  const pad = size * 0.1
  const inner = size - pad * 2
  const r = inner * 0.2
  const fs = Math.round(inner * 0.45)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#080C14"/><stop offset="100%" stop-color="#141C2E"/>
</linearGradient></defs>
<rect x="${pad}" y="${pad}" width="${inner}" height="${inner}" rx="${r}" fill="url(#g)"/>
<text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="700" font-size="${fs}" fill="#F0F4FF">N</text>
</svg>`
}

async function writePng(filename, svg) {
  await sharp(Buffer.from(svg)).png().toFile(join(outDir, filename))
}

mkdirSync(outDir, { recursive: true })

await writePng("icon-192.png", svgStandard(192))
await writePng("icon-512.png", svgStandard(512))
await writePng("icon-maskable-512.png", svgMaskable(512))

console.log("Wrote public/icons/icon-192.png, icon-512.png, icon-maskable-512.png")
