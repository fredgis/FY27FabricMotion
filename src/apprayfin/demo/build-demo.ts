import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderBoard, renderMap, renderQueue, renderMood } from './screens.js';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, 'out');
mkdirSync(outDir, { recursive: true });

const pages: { file: string; html: string }[] = [
  { file: 'bicycle-board.html', html: renderBoard() },
  { file: 'live-map.html', html: renderMap() },
  { file: 'pit-stop-queue.html', html: renderQueue() },
  { file: 'ride-mood-kpi.html', html: renderMood() },
];

for (const page of pages) {
  writeFileSync(join(outDir, page.file), page.html, 'utf8');
  console.log(`Wrote ${page.file}`);
}

console.log(`Demo HTML generated in ${outDir}`);
