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

const FIXED = { width: 1280, height: 940 };

const shots = [
  { html: 'scorecard.html', png: 'scenario2-scorecard.png', fullPage: false },
  { html: 'sites-map.html', png: 'scenario2-sites-map.png', fullPage: false },
  { html: 'site-detail.html', png: 'scenario2-site-detail.png', fullPage: false },
];

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: FIXED, deviceScaleFactor: 2 });

for (const shot of shots) {
  const url = pathToFileURL(join(outDir, shot.html)).href;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: join(imagesDir, shot.png), fullPage: shot.fullPage });
  console.log(`Captured ${shot.png}`);
}

await browser.close();
console.log(`Screenshots written to ${imagesDir}`);
