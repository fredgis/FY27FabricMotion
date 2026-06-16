import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderScorecard, renderSiteDetail } from './screens.js';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, 'out');
mkdirSync(outDir, { recursive: true });

const pages: { file: string; html: string }[] = [
  { file: 'scorecard.html', html: renderScorecard() },
  { file: 'site-detail.html', html: renderSiteDetail() },
];

for (const page of pages) {
  writeFileSync(join(outDir, page.file), page.html, 'utf8');
  console.log(`Wrote ${page.file}`);
}
console.log(`Demo HTML generated in ${outDir}`);
