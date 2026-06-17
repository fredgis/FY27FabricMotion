// FY27 EMEA EPS — Fabric Apps Motion — editable PowerPoint generator.
// Produces REAL, editable slides (text boxes, shapes, native tables) — not images.
// Mirrors the condensed Marp deck (FY27-Fabric-Apps-Motion-Slides.md).
// Usage:  npm install && npm run build:pptx
//   or:   node build-motion-deck.mjs "../docs/FY27 EMEA EPS - Fabric Apps Motion - Micro Hack.pptx"
import pptxgenjs from 'pptxgenjs';

const C = {
  blue: '0078D4', teal: '00B4A6', navy: '0B2447', ink: '1B2A3A',
  grey: '5B6B7B', panel: 'F3F7FB', line: 'DBE6F1', white: 'FFFFFF',
  amber: 'D9A300', green: '2FAA6A', soft: 'EAF3FB', softteal: 'E6F7F4',
};
const FONT = 'Segoe UI';

const p = new pptxgenjs();
p.defineLayout({ name: 'W', width: 13.333, height: 7.5 });
p.layout = 'W';
const W = 13.333, H = 7.5, MX = 0.7;

function footer(s) {
  s.addShape(p.ShapeType.line, { x: MX, y: 7.0, w: W - 2 * MX, h: 0, line: { color: C.line, width: 1 } });
  s.addText('FY27 EMEA EPS — Fabric Apps Motion', { x: MX, y: 7.02, w: 8, h: 0.3, fontFace: FONT, fontSize: 9, color: C.grey });
  s.addText('Micro Hack — two paths to Microsoft Fabric', { x: W - MX - 5, y: 7.02, w: 5, h: 0.3, align: 'right', fontFace: FONT, fontSize: 9, color: C.grey });
}

function header(s, kicker, title) {
  s.background = { color: C.white };
  s.addText(kicker.toUpperCase(), { x: MX, y: 0.5, w: W - 2 * MX, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: C.teal, charSpacing: 2 });
  s.addText(title, { x: MX, y: 0.82, w: W - 2 * MX, h: 0.8, fontFace: FONT, fontSize: 28, bold: true, color: C.navy });
  s.addShape(p.ShapeType.rect, { x: MX, y: 1.62, w: 1.5, h: 0.06, fill: { color: C.blue } });
  footer(s);
}

function card(s, x, y, w, h, accent, title, bullets) {
  s.addShape(p.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 1 }, shadow: { type: 'outer', color: '0B2447', opacity: 0.08, blur: 6, offset: 2, angle: 90 } });
  s.addShape(p.ShapeType.rect, { x, y, w: 0.09, h, fill: { color: accent } });
  s.addText(title, { x: x + 0.25, y: y + 0.18, w: w - 0.45, h: 0.5, fontFace: FONT, fontSize: 16, bold: true, color: C.navy });
  s.addText(bullets.map((t) => ({ text: t, options: { bullet: { code: '2022', indent: 12 }, color: C.ink, fontSize: 12.5, paraSpaceAfter: 6 } })), { x: x + 0.25, y: y + 0.72, w: w - 0.5, h: h - 0.9, fontFace: FONT, valign: 'top' });
}

// ---------- Slide 1 — Title ----------
{
  const s = p.addSlide();
  s.background = { color: C.navy };
  s.addShape(p.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.25, fill: { color: C.blue } });
  s.addShape(p.ShapeType.rect, { x: 0, y: 0.25, w: W, h: 0.08, fill: { color: C.teal } });
  s.addText('FY27 EMEA EPS', { x: MX, y: 2.0, w: W - 2 * MX, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: C.teal, charSpacing: 3 });
  s.addText('Fabric Apps Motion', { x: MX, y: 2.5, w: W - 2 * MX, h: 1.1, fontFace: FONT, fontSize: 48, bold: true, color: C.white });
  s.addText('Two paths to Microsoft Fabric, enabled through the “Micro Hack”', { x: MX, y: 3.7, w: W - 2 * MX, h: 0.6, fontFace: FONT, fontSize: 22, color: 'CFE0F0' });
  s.addText([
    { text: 'Advisory / Apps with Rayfin', options: { color: C.white, fontSize: 14, bullet: { code: '2022' } } },
    { text: 'SDC / Workloads with the Fabric Extensibility Toolkit', options: { color: C.white, fontSize: 14, bullet: { code: '2022' } } },
  ], { x: MX, y: 4.6, w: 9, h: 1, fontFace: FONT, valign: 'top' });
  s.addText('EMEA · EPS Tech / GTM · Draft for v-team review', { x: MX, y: 6.7, w: W - 2 * MX, h: 0.3, fontFace: FONT, fontSize: 11, color: '9FB6CE' });
}

// ---------- Slide 2 — Executive summary / two paths ----------
{
  const s = p.addSlide();
  header(s, 'The motion on a page', 'One motion, two execution paths');
  s.addText('Both paths are powered by a single, repeatable enablement vehicle — the Micro Hack (1 day). Microsoft builds and co-delivers the first run; the partner owns and repeats it.', { x: MX, y: 1.78, w: W - 2 * MX, h: 0.5, fontFace: FONT, fontSize: 12.5, color: C.grey });
  card(s, MX, 2.45, 5.85, 3.05, C.blue, 'Path A — Advisory / Apps', [
    'Audience: System Integrators & advisories (PwC, KPMG, EY, HVMC, Bain, BCG, McKinsey).',
    'Build business apps on Microsoft Fabric with Rayfin (managed backend) — fast, governed.',
    'Primary KPI: # opportunities (MSX), Stage 1 & 2 — ACR vision.',
  ]);
  card(s, MX + 6.1, 2.45, 5.85, 3.05, C.teal, 'Path B — Adoption / Workloads', [
    'Audience: Software Development Companies (SDC / ISV).',
    'Build a Fabric workload with the Extensibility Toolkit, embedded in the offer — runs on OneLake.',
    'Primary KPI: # workloads per SDC — Adoption vision (≥ 1 / SDC).',
  ]);
  // bottom band — Activation / Vehicle / Ask (mirrors the one-slider)
  const band = [
    [C.navy, 'Activation — EMEA', 'EPS-led, ONE Microsoft. SIs + SDCs on a single execution layer.'],
    [C.blue, 'Vehicle — the Micro Hack', '1 day, repeatable. Fixed scenario in → working app / workload out.'],
    [C.teal, 'The ask', 'Sponsorship, funding & a workloads PM to build the kit and co-run #1.'],
  ];
  const bw = (W - 2 * MX - 0.6) / 3;
  band.forEach(([accent, t, d], i) => {
    const bx = MX + i * (bw + 0.3);
    s.addShape(p.ShapeType.roundRect, { x: bx, y: 5.75, w: bw, h: 1.05, rectRadius: 0.06, fill: { color: C.panel }, line: { color: C.line, width: 1 } });
    s.addShape(p.ShapeType.rect, { x: bx, y: 5.75, w: bw, h: 0.07, fill: { color: accent } });
    s.addText(t, { x: bx + 0.18, y: 5.86, w: bw - 0.36, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: C.navy });
    s.addText(d, { x: bx + 0.18, y: 6.18, w: bw - 0.36, h: 0.58, fontFace: FONT, fontSize: 10.5, color: C.ink, valign: 'top' });
  });
}

// ---------- Slide 3 — Motion at a glance ----------
{
  const s = p.addSlide();
  header(s, 'The motion at a glance', 'We build it, the partner repeats it');
  // vehicle box
  s.addShape(p.ShapeType.roundRect, { x: MX, y: 2.0, w: W - 2 * MX, h: 1.5, rectRadius: 0.1, fill: { color: C.soft }, line: { color: C.blue, width: 1.5 } });
  s.addText('⚡ Micro Hack — 1 day, repeatable', { x: MX + 0.3, y: 2.15, w: 6, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: C.navy });
  s.addText('Morning — content + demos (why Fabric · Rayfin apps · Extensibility workloads · governance)', { x: MX + 0.3, y: 2.6, w: W - 2 * MX - 0.6, h: 0.35, fontFace: FONT, fontSize: 12, color: C.ink });
  s.addText('Afternoon — hands-on build: fixed scenario in → working app / workload out', { x: MX + 0.3, y: 2.95, w: W - 2 * MX - 0.6, h: 0.35, fontFace: FONT, fontSize: 12, color: C.ink });
  // two outcomes
  card(s, MX, 3.9, 5.85, 2.5, C.blue, 'Path A → SI / Advisory', [
    'Repeat the Micro Hack with their customers.',
    'Build business apps with Rayfin.',
    'KPI: # opportunities (MSX) · ACR vision.',
  ]);
  card(s, MX + 6.1, 3.9, 5.85, 2.5, C.teal, 'Path B → SDC / ISV', [
    'Build a Fabric workload and embed it in the offer.',
    'Every customer runs it natively in Fabric.',
    'KPI: # workloads per SDC · Adoption vision.',
  ]);
}

// ---------- Slide 4 — Strategic context ----------
{
  const s = p.addSlide();
  header(s, 'Strategic context', 'Why now');
  const items = [
    ['Every business ships software', 'Building enterprise apps still means months of backend plumbing. Fabric + Rayfin removes it — declare your data, ship in one command.'],
    ['AI-era apps need governed data', 'Apps & workloads on Fabric inherit OneLake governance, security and a single copy of data — no data movement.'],
    ['A large, growing audience', 'SIs build customer apps on Fabric; SDCs reach every Fabric customer by publishing a workload to the Workload Hub.'],
    ['Partners multiply impact', 'Sharing an opportunity with a partner: +95.6% win rate and +46% larger deal size. Scaling through SIs & SDCs covers the ecosystem.'],
  ];
  let y = 2.0;
  for (const [t, d] of items) {
    s.addShape(p.ShapeType.rect, { x: MX, y: y + 0.05, w: 0.18, h: 0.18, fill: { color: C.teal } });
    s.addText(t, { x: MX + 0.35, y, w: 4.2, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: C.navy, valign: 'top' });
    s.addText(d, { x: MX + 4.7, y, w: W - MX - 4.7 - MX, h: 0.9, fontFace: FONT, fontSize: 12.5, color: C.ink, valign: 'top' });
    y += 1.15;
  }
}

// ---------- Slide 5 — Path A agenda ----------
{
  const s = p.addSlide();
  header(s, 'Path A — Advisory / Apps', 'The Apps Micro Hack — a fixed, repeatable day');
  const head = [
    { text: 'When', options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 12 } },
    { text: 'Block', options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 12 } },
    { text: 'Content', options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 12 } },
  ];
  const rows = [
    ['Morning', 'Why build on Fabric', 'Managed backend, governance on OneLake, time-to-app'],
    ['', 'Rayfin foundations', 'Data model = database; auth, APIs, hosting; deploy in one command'],
    ['', 'Demo', 'Helios Bicycle Studio built live with the GitHub Copilot CLI'],
    ['Afternoon', '⭐ Build sprint 1', 'Scaffold, declare data model (Rayfin provisions the DB), core screens'],
    ['', '⭐ Build sprint 2', 'Extend, polish, deploy to Fabric (rayfin up), demo'],
    ['', 'Plan & next steps', 'Turn the app into a customer opportunity + 90-day plan'],
  ];
  const body = rows.map((r, i) => r.map((c, j) => ({
    text: c,
    options: { fontSize: 11.5, color: C.ink, fill: { color: i % 2 ? 'EAF1F8' : 'FFFFFF' }, bold: j === 0 && c !== '' },
  })));
  s.addTable([head, ...body], { x: MX, y: 2.0, w: W - 2 * MX, colW: [1.6, 3.0, W - 2 * MX - 4.6], border: { type: 'solid', color: C.line, pt: 0.5 }, fontFace: FONT, valign: 'middle', rowH: 0.62 });
  s.addText('The afternoon is the differentiator: teams ship a real working app on Fabric — the artifact the SI uses to open a real opportunity.', { x: MX, y: 6.4, w: W - 2 * MX, h: 0.5, fontFace: FONT, fontSize: 12, italic: true, color: C.grey });
}

// ---------- Slide 6 — Path B mechanism ----------
{
  const s = p.addSlide();
  header(s, 'Path B — Adoption / Workloads', 'Build once, adopt mechanically');
  card(s, MX, 2.0, 5.85, 4.4, C.teal, 'Objective', [
    'Every managed SDC builds a Fabric workload with the Extensibility Toolkit.',
    'Embed it in the commercial offer — the product runs natively in Fabric.',
    'Every customer of the SDC consumes a Fabric workload by design.',
    'Grow Fabric adoption mechanically, not through one-off projects.',
  ]);
  card(s, MX + 6.1, 2.0, 5.85, 4.4, C.blue, 'Build once → adopt many', [
    'SDC builds the workload once (reads OneLake, runs their logic).',
    'Customer 1 … N each run it natively in Fabric.',
    'Adoption scales with the SDC’s business — no per-customer selling.',
    'Repeat across modules → publish to the Workload Hub.',
  ]);
  s.addText('Primary KPI: # workloads per SDC · Secondary: Fabric usage / ACR through SDC end-customers.', { x: MX, y: 6.5, w: W - 2 * MX, h: 0.4, fontFace: FONT, fontSize: 12, italic: true, color: C.grey });
}

// ---------- Slide 7 — The Micro Hack Kit (the build) ----------
{
  const s = p.addSlide();
  header(s, 'The build', 'The Micro Hack kit — the one asset we create');
  s.addText('A reusable enablement kit (not a product) that lets a partner build a real app or workload on Fabric in one day, then repeat the day on their own.', { x: MX, y: 1.85, w: W - 2 * MX, h: 0.5, fontFace: FONT, fontSize: 13, color: C.grey });
  card(s, MX, 2.6, 5.85, 3.9, C.blue, 'Scenario 1 — Helios Bicycle Studio', [
    'Track A — business app on Rayfin.',
    'Data model = database, screens, app-level roles.',
    'Deploy to Fabric with rayfin up.',
    'Reference code: src/apprayfin/ · full workbook + solution.',
  ]);
  card(s, MX + 6.1, 2.6, 5.85, 3.9, C.teal, 'Scenario 2 — GreenGrid Scorecard', [
    'Track B — sustainability workload (Extensibility Toolkit).',
    'Reads Files/sites.csv from OneLake (OBO token).',
    'Calls the pre-deployed GreenGrid SaaS (the algorithm).',
    'Renders a scorecard in Fabric · code: src/workloadsdc/.',
  ]);
}

// ---------- Slide 8 — KPIs ----------
{
  const s = p.addSlide();
  header(s, 'KPIs & success metrics', 'How we measure the motion');
  const head = ['Path', 'Leading indicator', 'Outcome KPI'].map((t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 12 } }));
  const rows = [
    ['A — Advisory / Apps', '# Micro Hacks repeated by partner; # apps deployed to Fabric', '# opportunities (MSX), Stage 1 & 2; Fabric/Azure ACR pipeline'],
    ['B — SDC Adoption', '# managed SDCs engaged; # offers with a workload built', '# workloads per SDC; Fabric usage / ACR from end-customers'],
    ['Motion health', 'Ratio of partner-led vs MS-led sessions', 'Partner-sourced opportunities & adoptions share'],
  ];
  const body = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontSize: 12, color: C.ink, bold: j === 0, fill: { color: i % 2 ? 'EAF1F8' : 'FFFFFF' } } })));
  s.addTable([head, ...body], { x: MX, y: 2.1, w: W - 2 * MX, colW: [2.8, 4.8, W - 2 * MX - 7.6], border: { type: 'solid', color: C.line, pt: 0.5 }, fontFace: FONT, valign: 'middle', rowH: 1.0 });
  s.addText('North-star: the share of Micro Hacks, apps and workloads that are partner-led, not Microsoft-led.', { x: MX, y: 6.3, w: W - 2 * MX, h: 0.5, fontFace: FONT, fontSize: 13, bold: true, color: C.blue });
}

// ---------- Slide 9 — The Ask ----------
{
  const s = p.addSlide();
  header(s, 'The ask', 'What we need to land the motion');
  const asks = [
    ['Sponsorship', 'Ahmed + EPS leadership.'],
    ['Funding', 'Build the Micro Hack kit + reference scenarios and run the first co-delivered sessions.'],
    ['PM lead on workloads', 'Align with the Extensibility Toolkit roadmap and the Workload Hub.'],
    ['ONE Microsoft program', 'ISV + Advisory → one execution layer, not parallel tracks.'],
  ];
  let y = 2.1;
  for (const [t, d] of asks) {
    s.addShape(p.ShapeType.roundRect, { x: MX, y, w: W - 2 * MX, h: 0.95, rectRadius: 0.06, fill: { color: C.panel }, line: { color: C.line, width: 1 } });
    s.addText(t, { x: MX + 0.3, y: y + 0.15, w: 3.4, h: 0.6, fontFace: FONT, fontSize: 15, bold: true, color: C.blue, valign: 'middle' });
    s.addText(d, { x: MX + 3.9, y: y + 0.15, w: W - 2 * MX - 4.2, h: 0.6, fontFace: FONT, fontSize: 13, color: C.ink, valign: 'middle' });
    y += 1.1;
  }
}

// ---------- Slide 10 — Roadmap ----------
{
  const s = p.addSlide();
  header(s, 'Execution roadmap', 'FY27 — we build, then partners repeat');
  const q = ['Workstream', 'Q1 Jul–Sep', 'Q2 Oct–Dec', 'Q3 Jan–Mar', 'Q4 Apr–Jun'];
  const head = q.map((t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 11 } }));
  const fill = (on) => ({ text: on ? '█████' : '', options: { color: on ? C.teal : 'FFFFFF', align: 'center', fontSize: 11 } });
  const lbl = (t) => ({ text: t, options: { fontSize: 11, color: C.ink, bold: true } });
  const rows = [
    ['Build — Micro Hack kit', 1, 0, 0, 0],
    ['Build — reference scenarios', 1, 0, 0, 0],
    ['Path A — Co-deliver Run #1 ◆', 1, 0, 0, 0],
    ['Path A — SIs repeat (own customers)', 0, 1, 1, 0],
    ['Path A — Scale advisory ecosystem', 0, 1, 1, 1],
    ['Path B — SDC first workloads', 1, 1, 0, 0],
    ['Path B — Repeat + Workload Hub', 0, 1, 1, 1],
  ];
  const body = rows.map((r, i) => [lbl(r[0]), ...r.slice(1).map((v) => fill(v))].map((c) => ({ ...c, options: { ...c.options, fill: { color: i % 2 ? 'EAF1F8' : 'FFFFFF' } } })));
  s.addTable([head, ...body], { x: MX, y: 2.0, w: W - 2 * MX, colW: [4.3, (W - 2 * MX - 4.3) / 4, (W - 2 * MX - 4.3) / 4, (W - 2 * MX - 4.3) / 4, (W - 2 * MX - 4.3) / 4], border: { type: 'solid', color: C.line, pt: 0.5 }, fontFace: FONT, valign: 'middle', rowH: 0.5 });
  s.addText('◆ Run #1 co-delivered end of Q1 (Sep ’26): kit in partners’ hands — the motion shifts from Microsoft build to partner-led repeat.', { x: MX, y: 6.4, w: W - 2 * MX, h: 0.5, fontFace: FONT, fontSize: 12, italic: true, color: C.grey });
}

// ---------- Slide 11 — Closing ----------
{
  const s = p.addSlide();
  s.background = { color: C.navy };
  s.addShape(p.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.25, fill: { color: C.blue } });
  s.addShape(p.ShapeType.rect, { x: 0, y: 0.25, w: W, h: 0.08, fill: { color: C.teal } });
  s.addText('Build the next page of your business with Microsoft Fabric', { x: MX, y: 2.6, w: W - 2 * MX, h: 1.6, fontFace: FONT, fontSize: 34, bold: true, color: C.white });
  s.addText('One Micro Hack day · two paths (Apps + Workloads) · partner-led repeat.', { x: MX, y: 4.3, w: W - 2 * MX, h: 0.6, fontFace: FONT, fontSize: 18, color: 'CFE0F0' });
}

const out = process.argv[2] || 'motion.pptx';
await p.writeFile({ fileName: out });
console.log('Wrote ' + out);
