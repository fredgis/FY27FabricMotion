/**
 * Captures PNG screenshots of the GreenGrid workload screens using Playwright + Edge.
 */
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, 'out');
const imagesDir = join(here, '..', '..', '..', 'docs', 'images');
mkdirSync(imagesDir, { recursive: true });

const shots = [
  { html: 'scorecard.html', png: 'scenario2-scorecard.png' },
  { html: 'site-detail.html', png: 'scenario2-site-detail.png' },
];

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({
  viewport: { width: 1280, height: 760 },
  deviceScaleFactor: 2,
});

for (const shot of shots) {
  const url = pathToFileURL(join(outDir, shot.html)).href;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: join(imagesDir, shot.png), fullPage: true });
  console.log(`Captured ${shot.png}`);
}

await browser.close();
console.log(`Screenshots written to ${imagesDir}`);
