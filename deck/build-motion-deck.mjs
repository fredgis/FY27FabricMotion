// FY27 EMEA EPS — Fabric Apps Motion — editable PowerPoint generator (v2).
// Real, editable slides (text boxes, shapes, native tables) — NOT images.
// Look & feel deliberately mirrors the FY27 SQL Motion deck:
//   navy header band + teal rule, pill section headers, tinted path cards with
//   APPROACH/KPI sub-boxes + partner chips, bottom THE BUILD / vehicle / THE ASK band,
//   centered footer. Same palette (blue 0078D4 + teal 00B4A6 + navy 0B2447).
// Two big sections (one per path), each with its Micro Hack (1 = Apps, 2 = Workloads)
// and a horizontal flow "schema".
// Usage:  node deck-v2.mjs out.pptx
import pptxgenjs from 'pptxgenjs';

const C = {
  blue: '0078D4', teal: '00B4A6', navy: '0B2447', ink: '1B2A3A', slate: '33485C',
  grey: '5B6B7B', line: 'C9D7E6', line2: 'D7E3EE', panel: 'F3F7FB',
  soft: 'EAF3FB', softteal: 'E6F7F4', white: 'FFFFFF', amber: 'F7941D', mute: 'C9D7E6',
};
const FONT = 'Segoe UI';
const p = new pptxgenjs();
p.defineLayout({ name: 'W', width: 13.333, height: 7.5 });
p.layout = 'W';
const W = 13.333, H = 7.5, MX = 0.6;
const RR = (o) => ({ ...o }); // alias passthrough
const rect = () => p.ShapeType.rect;
const rrect = () => p.ShapeType.roundRect;
const FOOT = 'Microsoft Fabric  |  Apps via Rayfin (System Integrators)  \u2022  Workloads via the Extensibility Toolkit (SDC / ISV)  |  the \u201CMicro Hack\u201D';

function footer(s, text) {
  s.addText(text || FOOT, { x: MX, y: 7.12, w: W - 2 * MX, h: 0.3, align: 'center', fontFace: FONT, fontSize: 8.5, color: C.grey });
}

// Navy header band + teal rule. Returns y where content can start.
function band(s, tag, title, opts = {}) {
  s.background = { color: C.white };
  const bh = opts.tall ? 1.32 : 1.15;
  s.addShape(rect(), { x: 0, y: 0, w: W, h: bh, fill: { color: C.navy } });
  s.addShape(rect(), { x: 0, y: bh, w: W, h: 0.07, fill: { color: C.teal } });
  const tw = opts.badge ? W - 2 * MX - 2.3 : W - 2 * MX;
  s.addText([
    { text: tag.toUpperCase() + '   ', options: { color: C.teal, bold: true, fontSize: 16, charSpacing: 1 } },
    { text: title, options: { color: C.white, bold: true, fontSize: 23 } },
  ], { x: MX, y: 0.24, w: tw, h: 0.66, fontFace: FONT, valign: 'middle' });
  if (opts.sub) s.addText(opts.sub, { x: MX, y: 0.86, w: tw, h: 0.34, fontFace: FONT, fontSize: 12, italic: true, color: C.mute, valign: 'middle' });
  if (opts.badge) {
    const bw = 2.0, bx = W - MX - bw, by = 0.4;
    s.addShape(rrect(), { x: bx, y: by, w: bw, h: 0.5, rectRadius: 0.25, fill: { color: C.teal } });
    s.addText(opts.badge.toUpperCase(), { x: bx, y: by, w: bw, h: 0.5, align: 'center', valign: 'middle', fontFace: FONT, fontSize: 12, bold: true, color: C.white, charSpacing: 2 });
  }
  footer(s, opts.footer);
  return bh + 0.28;
}

function pill(s, x, y, w, h, text, fill) {
  s.addShape(rrect(), { x, y, w, h, rectRadius: h / 2, fill: { color: fill } });
  s.addText(text, { x, y, w, h, align: 'center', valign: 'middle', fontFace: FONT, fontSize: 12.5, bold: true, color: C.white, charSpacing: 1 });
}

// White rounded box: "LABEL   text"
function labelBox(s, x, y, w, h, label, text, accent) {
  s.addShape(rrect(), { x, y, w, h, rectRadius: 0.06, fill: { color: C.white }, line: { color: accent, width: 1 } });
  s.addText([
    { text: label.toUpperCase() + '   ', options: { color: accent, bold: true, fontSize: 11 } },
    { text: text, options: { color: C.ink, bold: true, fontSize: 12.5 } },
  ], { x: x + 0.18, y, w: w - 0.34, h, valign: 'middle', fontFace: FONT });
}

// Wrapping row of white "chips". Returns the y after the last row.
function chipRow(s, x, y, maxW, items, accent) {
  let cx = x, cy = y; const h = 0.34, gap = 0.12;
  for (const it of items) {
    const w = 0.32 + it.length * 0.082;
    if (cx + w > x + maxW) { cx = x; cy += h + 0.12; }
    s.addShape(rrect(), { x: cx, y: cy, w, h, rectRadius: 0.05, fill: { color: C.white }, line: { color: accent || C.line, width: 1 } });
    s.addText(it, { x: cx, y: cy, w, h, align: 'center', valign: 'middle', fontFace: FONT, fontSize: 10.5, bold: true, color: C.navy });
    cx += w + gap;
  }
  return cy + h;
}

// Horizontal flow "schema": boxes connected by teal chevrons.
function flow(s, y, h, steps, accent) {
  const n = steps.length, gap = 0.42, totalW = W - 2 * MX;
  const bw = (totalW - (n - 1) * gap) / n;
  steps.forEach((st, i) => {
    const x = MX + i * (bw + gap);
    s.addShape(rrect(), { x, y, w: bw, h, rectRadius: 0.08, fill: { color: i === n - 1 ? accent : (i === 0 ? C.navy : C.soft) }, line: { color: accent, width: 1.25 } });
    const col = (i === n - 1 || i === 0) ? C.white : C.navy;
    s.addText(st, { x: x + 0.08, y: y + 0.08, w: bw - 0.16, h: h - 0.16, align: 'center', valign: 'middle', fontFace: FONT, fontSize: 11, bold: true, color: col });
    if (i < n - 1) s.addText('\u25B6', { x: x + bw - 0.04, y, w: gap + 0.08, h, align: 'center', valign: 'middle', fontFace: FONT, fontSize: 15, color: accent });
  });
}

function navyBox(s, x, y, w, h, title, accent, lines, opts = {}) {
  s.addShape(rrect(), { x, y, w, h, rectRadius: 0.07, fill: { color: C.navy } });
  if (opts.icon) s.addText(opts.icon, { x, y: y + 0.16, w, h: 0.5, align: 'center', fontFace: FONT, fontSize: 22, color: C.amber });
  const ty = opts.icon ? y + 0.66 : y + 0.16;
  s.addText(title, { x: x + (opts.center ? 0 : 0.22), y: ty, w: w - (opts.center ? 0 : 0.4), h: 0.32, align: opts.center ? 'center' : 'left', fontFace: FONT, fontSize: opts.center ? 15 : 12.5, bold: true, color: opts.center ? C.white : accent, charSpacing: opts.center ? 0 : 1 });
  if (opts.subtitle) s.addText(opts.subtitle, { x, y: ty + 0.34, w, h: 0.28, align: 'center', italic: true, fontFace: FONT, fontSize: 11, color: C.teal });
  if (lines) s.addText(lines.map((l) => ({
    text: typeof l === 'string' ? l : l.text,
    options: { breakLine: true, bullet: opts.center ? false : (opts.arrow ? { code: '2192', indent: 14 } : { code: '2022', indent: 12 }), color: (typeof l === 'object' && l.hi) ? C.teal : 'D7E3EE', bold: (typeof l === 'object' && l.hi), fontSize: opts.center ? 10 : 11.5, paraSpaceAfter: 5, align: opts.center ? 'center' : 'left' },
  })), { x: x + (opts.center ? 0.16 : 0.24), y: opts.center ? ty + 0.62 : ty + 0.4, w: w - (opts.center ? 0.32 : 0.42), h: h - (ty - y) - 0.5, fontFace: FONT, valign: 'top' });
}

// ============================================================ Slide 1 — Title
{
  const s = p.addSlide();
  s.background = { color: C.navy };
  s.addShape(rect(), { x: 0, y: 0, w: W, h: 0.22, fill: { color: C.blue } });
  s.addShape(rect(), { x: 0, y: 0.22, w: W, h: 0.08, fill: { color: C.teal } });
  s.addText('FY27 EMEA EPS  \u00B7  FABRIC MOTION', { x: MX + 0.2, y: 1.9, w: 11, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: C.teal, charSpacing: 3 });
  s.addText('Two Paths to Microsoft Fabric', { x: MX + 0.2, y: 2.42, w: 12, h: 1.1, fontFace: FONT, fontSize: 46, bold: true, color: C.white });
  s.addText('Apps for System Integrators  \u00B7  Workloads for SDC / ISV  \u2014  enabled through the \u201CMicro Hack\u201D', { x: MX + 0.2, y: 3.6, w: 12, h: 0.5, fontFace: FONT, fontSize: 19, color: 'CFE0F0' });
  pill(s, MX + 0.2, 4.5, 3.0, 0.5, 'APPS / SI  \u00B7  MICRO HACK 1', C.blue);
  pill(s, MX + 3.4, 4.5, 4.6, 0.5, 'WORKLOADS / SDC  \u00B7  MICRO HACK 2', C.teal);
  s.addText('EMEA  \u00B7  EPS Tech / GTM  \u00B7  Draft for v-team review', { x: MX + 0.2, y: 6.7, w: 11, h: 0.3, fontFace: FONT, fontSize: 11, color: '9FB6CE' });
}

// ===================================================== Slide 2 — Motion on a page (dense)
{
  const s = p.addSlide();
  band(s, 'Fabric Motion', 'Two Paths to Microsoft Fabric', { badge: '2 motions', sub: 'Apps for System Integrators  \u2022  Workloads for SDC / ISV  \u2014  enabled through the \u201CMicro Hack\u201D' });
  const cy = 1.55, ch = 3.15, cw = 5.86;
  // ---- Left card : APPS / SI
  s.addShape(rrect(), { x: MX, y: cy, w: cw, h: ch, rectRadius: 0.08, fill: { color: C.soft }, line: { color: C.line, width: 1 } });
  pill(s, MX + 0.22, cy + 0.2, 2.3, 0.44, 'APPS / SI', C.blue);
  s.addText('System Integrators', { x: MX + cw - 2.4, y: cy + 0.24, w: 2.2, h: 0.36, align: 'right', valign: 'middle', fontFace: FONT, fontSize: 12, bold: true, color: C.grey });
  s.addText([
    { text: 'Build business apps ', options: { bold: true } },
    { text: 'on Microsoft Fabric with ', options: {} },
    { text: 'Rayfin', options: { bold: true, color: C.blue } },
    { text: ' (managed backend)', options: {} },
  ], { x: MX + 0.24, y: cy + 0.78, w: cw - 0.46, h: 0.6, fontFace: FONT, fontSize: 14.5, color: C.ink, valign: 'top' });
  labelBox(s, MX + 0.24, cy + 1.44, cw - 0.48, 0.4, 'Approach', 'Business apps via Rayfin', C.blue);
  s.addText([
    { text: 'KPI   ', options: { bold: true, color: C.blue } },
    { text: '# opportunities (MSX), Stage 1 & 2 \u2014 ACR vision', options: { bold: true, color: C.ink } },
  ], { x: MX + 0.24, y: cy + 1.92, w: cw - 0.46, h: 0.32, fontFace: FONT, fontSize: 12.5, valign: 'middle' });
  s.addText('Target SIs', { x: MX + 0.24, y: cy + 2.24, w: 3, h: 0.26, fontFace: FONT, fontSize: 10.5, bold: true, color: C.grey });
  chipRow(s, MX + 0.24, cy + 2.5, cw - 0.46, ['PwC', 'KPMG', 'EY', 'HVMC', 'Bain', 'BCG', 'McKinsey', 'Accenture'], C.line);
  // ---- Right card : WORKLOADS / SDC
  const rx = MX + cw + 0.2;
  s.addShape(rrect(), { x: rx, y: cy, w: cw, h: ch, rectRadius: 0.08, fill: { color: C.softteal }, line: { color: C.teal, width: 1 } });
  pill(s, rx + 0.22, cy + 0.2, 3.0, 0.44, 'WORKLOADS / SDC', C.teal);
  s.addText('ISV / SDC', { x: rx + cw - 2.4, y: cy + 0.24, w: 2.2, h: 0.36, align: 'right', valign: 'middle', fontFace: FONT, fontSize: 12, bold: true, color: C.grey });
  s.addText([
    { text: 'SDCs build ', options: {} },
    { text: 'a Fabric workload ', options: { bold: true, color: C.teal } },
    { text: 'and embed it in their offer', options: { bold: true } },
  ], { x: rx + 0.24, y: cy + 0.78, w: cw - 0.46, h: 0.6, fontFace: FONT, fontSize: 14.5, color: C.ink, valign: 'top' });
  labelBox(s, rx + 0.24, cy + 1.44, cw - 0.48, 0.4, 'Approach', 'Workload via Extensibility Toolkit', C.teal);
  s.addText([
    { text: 'KPI   ', options: { bold: true, color: C.teal } },
    { text: '# workloads per SDC \u2014 Adoption vision', options: { bold: true, color: C.ink } },
  ], { x: rx + 0.24, y: cy + 1.92, w: cw - 0.46, h: 0.32, fontFace: FONT, fontSize: 12.5, valign: 'middle' });
  labelBox(s, rx + 0.24, cy + 2.32, cw - 0.48, 0.62, 'Goal', 'Every SDC ships \u2265 1 Fabric workload, native on OneLake', C.teal);
  // ---- Bottom band : THE BUILD / vehicle / THE ASK
  const by = cy + ch + 0.18, bh = 1.85;
  const wW = 5.86, vW = 2.78, aW = 2.78;
  s.addShape(rrect(), { x: MX, y: by, w: wW, h: bh, rectRadius: 0.07, fill: { color: C.panel }, line: { color: C.line, width: 1 } });
  s.addShape(rect(), { x: MX, y: by, w: 0.09, h: bh, fill: { color: C.slate } });
  s.addText('THE BUILD', { x: MX + 0.24, y: by + 0.14, w: wW - 0.4, h: 0.3, fontFace: FONT, fontSize: 13, bold: true, color: C.navy, charSpacing: 1 });
  s.addText([
    { text: 'The Micro Hack kit \u2014 one reusable enablement asset', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 4 } },
    { text: 'Two reference scenarios \u2014 Helios (Apps) \u00B7 GreenGrid (Workload)', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 4 } },
    { text: 'Co-deliver run #1, then partners repeat on their own', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 4 } },
    { text: 'Build once \u2192 partner-led repeat', options: { bullet: { code: '2022', indent: 12 }, bold: true, color: C.blue } },
  ], { x: MX + 0.24, y: by + 0.46, w: wW - 0.46, h: bh - 0.56, fontFace: FONT, fontSize: 11, color: C.ink, valign: 'top' });
  navyBox(s, MX + wW + 0.16, by, vW, bh, 'Micro Hack', C.teal, ['1 day \u00B7 scenario in \u2192 working output'], { icon: '\u26A1', center: true, subtitle: 'Enablement vehicle' });
  navyBox(s, MX + wW + vW + 0.32, by, aW, bh, 'THE ASK', C.teal, ['Sponsorship + funding', 'Workloads PM (Toolkit / Hub)', { text: '1 sponsor per track', hi: true }], { arrow: true });
}

// ===================================================== Slide 3 — Why now
{
  const s = p.addSlide();
  const y0 = band(s, 'Strategic context', 'Why now');
  const items = [
    ['Every business ships software', 'Building enterprise apps still means months of backend plumbing. Fabric + Rayfin removes it \u2014 declare your data, ship in one command.'],
    ['AI-era apps need governed data', 'Apps & workloads on Fabric inherit OneLake governance, security and a single copy of data \u2014 no data movement.'],
    ['A large, growing audience', 'SIs build customer apps on Fabric; SDCs reach every Fabric customer by publishing a workload to the Workload Hub.'],
    ['Partners multiply impact', 'Sharing an opportunity with a partner: +95.6% win rate and +46% larger deal size. Scaling through SIs & SDCs covers the ecosystem.'],
  ];
  let y = y0 + 0.1;
  for (const [t, d] of items) {
    s.addShape(rect(), { x: MX, y: y + 0.04, w: 0.16, h: 0.16, fill: { color: C.teal } });
    s.addText(t, { x: MX + 0.32, y, w: 4.0, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: C.navy, valign: 'top' });
    s.addText(d, { x: MX + 4.5, y, w: W - MX - 4.5 - MX, h: 0.9, fontFace: FONT, fontSize: 12.5, color: C.ink, valign: 'top' });
    y += 1.18;
  }
}

// ===================================================== Slide 4 — Section divider A
{
  const s = p.addSlide();
  s.background = { color: C.navy };
  s.addShape(rect(), { x: 0, y: 0, w: 0.34, h: H, fill: { color: C.blue } });
  s.addText('PATH A  \u00B7  MICRO HACK 1', { x: 1.0, y: 2.5, w: 11, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: C.blue, charSpacing: 3 });
  s.addText('Advisory / Apps', { x: 0.95, y: 2.98, w: 11.5, h: 1.1, fontFace: FONT, fontSize: 42, bold: true, color: C.white });
  s.addText('System Integrators build business apps on Microsoft Fabric with Rayfin \u2014 KPI: # opportunities (MSX), ACR vision.', { x: 1.0, y: 4.2, w: 11, h: 0.7, fontFace: FONT, fontSize: 16, color: 'CFE0F0' });
  footer(s);
}

// ===================================================== Slide 5 — Path A mechanism + schema
{
  const s = p.addSlide();
  const y0 = band(s, 'Path A \u2014 Advisory / Apps', 'From a scenario to a real opportunity');
  s.addText('The Apps path turns one Micro Hack day into a working app on Fabric \u2014 the artifact the SI uses to open a customer opportunity.', { x: MX, y: y0 - 0.05, w: W - 2 * MX, h: 0.5, fontFace: FONT, fontSize: 13, color: C.grey });
  flow(s, y0 + 0.55, 1.15, ['Fixed scenario', 'Build with GitHub Copilot CLI', 'Rayfin \u2014 data model = the database', 'Deploy \u00B7 rayfin up', 'App live in Fabric', 'Open opportunity (MSX)'], C.blue);
  // two supporting cards
  const cy = y0 + 2.15, ch = 1.95, cw = 5.86;
  s.addShape(rrect(), { x: MX, y: cy, w: cw, h: ch, rectRadius: 0.08, fill: { color: C.soft }, line: { color: C.line, width: 1 } });
  s.addShape(rect(), { x: MX, y: cy, w: 0.09, h: ch, fill: { color: C.blue } });
  s.addText('What teams ship', { x: MX + 0.24, y: cy + 0.16, w: cw - 0.4, h: 0.32, fontFace: FONT, fontSize: 14, bold: true, color: C.navy });
  s.addText([
    { text: 'A Fabric-authenticated React app (Entra SSO)', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 4 } },
    { text: 'A typed data model that Rayfin provisions as a database', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 4 } },
    { text: 'CRUD screens + app-level roles, deployed to Fabric', options: { bullet: { code: '2022', indent: 12 } } },
  ], { x: MX + 0.24, y: cy + 0.5, w: cw - 0.46, h: ch - 0.6, fontFace: FONT, fontSize: 12, color: C.ink, valign: 'top' });
  const rx = MX + cw + 0.2;
  s.addShape(rrect(), { x: rx, y: cy, w: cw, h: ch, rectRadius: 0.08, fill: { color: C.softteal }, line: { color: C.teal, width: 1 } });
  s.addShape(rect(), { x: rx, y: cy, w: 0.09, h: ch, fill: { color: C.teal } });
  s.addText('Why it wins', { x: rx + 0.24, y: cy + 0.16, w: cw - 0.4, h: 0.32, fontFace: FONT, fontSize: 14, bold: true, color: C.navy });
  s.addText([
    { text: 'No backend plumbing \u2014 faster time-to-app', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 4 } },
    { text: 'Governed on OneLake, single copy of data', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 4 } },
    { text: 'Partner-led & repeatable \u2192 real pipeline', options: { bullet: { code: '2022', indent: 12 }, bold: true, color: C.blue } },
  ], { x: rx + 0.24, y: cy + 0.5, w: cw - 0.46, h: ch - 0.6, fontFace: FONT, fontSize: 12, color: C.ink, valign: 'top' });
}

// ===================================================== Slide 6 — Micro Hack 1 agenda
{
  const s = p.addSlide();
  const y0 = band(s, 'Path A \u2014 Micro Hack 1', 'The Apps Micro Hack \u2014 a fixed, repeatable day');
  const head = ['When', 'Block', 'Content'].map((t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 12 } }));
  const rows = [
    ['Morning', 'Why build on Fabric', 'Managed backend, governance on OneLake, time-to-app'],
    ['', 'Rayfin foundations', 'Data model = database; auth, APIs, hosting; deploy in one command'],
    ['', 'Demo', 'Helios Bicycle Studio built live with the GitHub Copilot CLI'],
    ['Afternoon', '\u2B50 Build sprint 1', 'Scaffold, declare the data model (Rayfin provisions the DB), core screens'],
    ['', '\u2B50 Build sprint 2', 'Extend, polish, deploy to Fabric (rayfin up), demo'],
    ['', 'Plan & next steps', 'Turn the app into a customer opportunity + 90-day plan'],
  ];
  const body = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontSize: 11.5, color: C.ink, fill: { color: i % 2 ? C.soft : C.white }, bold: j === 0 && c !== '' } })));
  s.addTable([head, ...body], { x: MX, y: y0, w: W - 2 * MX, colW: [1.5, 3.0, W - 2 * MX - 4.5], border: { type: 'solid', color: C.line, pt: 0.5 }, fontFace: FONT, valign: 'middle', rowH: 0.6 });
  s.addText('The afternoon is the differentiator: teams ship a real working app on Fabric \u2014 the artifact the SI uses to open a real opportunity.', { x: MX, y: y0 + 4.35, w: W - 2 * MX, h: 0.45, fontFace: FONT, fontSize: 12, italic: true, color: C.grey });
}

// ===================================================== Slide 7 — Path A build (Helios)
{
  const s = p.addSlide();
  const y0 = band(s, 'Path A \u2014 the build', 'Scenario 1 \u2014 Helios Bicycle Studio');
  const cy = y0, ch = 3.7, cw = 5.86;
  s.addShape(rrect(), { x: MX, y: cy, w: cw, h: ch, rectRadius: 0.08, fill: { color: C.soft }, line: { color: C.line, width: 1 } });
  pill(s, MX + 0.22, cy + 0.2, 2.6, 0.44, 'BUSINESS APP', C.blue);
  s.addText([
    { text: 'A bike-operations app on the Rayfin data path \u2014 entities, CRUD and app-level roles, embedded in Fabric.', options: {} },
  ], { x: MX + 0.24, y: cy + 0.78, w: cw - 0.46, h: 0.7, fontFace: FONT, fontSize: 12.5, color: C.ink, valign: 'top' });
  s.addText([
    { text: 'Data model = database (Rayfin provisions & migrates it)', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 5 } },
    { text: 'Bicycle Board, Pit-Stop Queue, Ride Mood & KPI screens', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 5 } },
    { text: 'Manager vs Mechanic roles enforced at the app layer', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 5 } },
    { text: 'Deploy to Fabric with rayfin up', options: { bullet: { code: '2022', indent: 12 } } },
  ], { x: MX + 0.24, y: cy + 1.5, w: cw - 0.46, h: ch - 1.6, fontFace: FONT, fontSize: 12, color: C.ink, valign: 'top' });
  const rx = MX + cw + 0.2;
  navyBox(s, rx, cy, cw, ch, 'In the kit', C.teal, [
    'Master prompt for the GitHub Copilot CLI',
    'Reference code: src/apprayfin/',
    'Participant workbook (Step 0 \u2192 9, build loop)',
    'Trainer setup + solution guide',
    { text: 'Outcome: a working app the SI reuses to open an opportunity', hi: true },
  ]);
}

// ===================================================== Slide 8 — Section divider B
{
  const s = p.addSlide();
  s.background = { color: C.navy };
  s.addShape(rect(), { x: 0, y: 0, w: 0.34, h: H, fill: { color: C.teal } });
  s.addText('PATH B  \u00B7  MICRO HACK 2', { x: 1.0, y: 2.5, w: 11, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: C.teal, charSpacing: 3 });
  s.addText('Adoption / Workloads', { x: 0.95, y: 2.98, w: 11.5, h: 1.1, fontFace: FONT, fontSize: 42, bold: true, color: C.white });
  s.addText('SDCs build a Fabric workload with the Extensibility Toolkit and embed it in their offer \u2014 KPI: # workloads per SDC, Adoption vision.', { x: 1.0, y: 4.2, w: 11.2, h: 0.7, fontFace: FONT, fontSize: 16, color: 'CFE0F0' });
  footer(s);
}

// ===================================================== Slide 9 — Path B mechanism + schema
{
  const s = p.addSlide();
  const y0 = band(s, 'Path B \u2014 Adoption / Workloads', 'Build once, adopt mechanically');
  s.addText('The SDC builds the workload one time; every one of their customers then runs it natively in Fabric \u2014 adoption scales with the SDC\u2019s business.', { x: MX, y: y0 - 0.05, w: W - 2 * MX, h: 0.5, fontFace: FONT, fontSize: 13, color: C.grey });
  flow(s, y0 + 0.55, 1.15, ['SDC builds workload (Toolkit)', 'Reads OneLake (OBO token)', 'Embed in the commercial offer', 'Customer 1 \u2026 N run it in Fabric', 'Publish to Workload Hub', 'Fabric adoption / ACR'], C.teal);
  const cy = y0 + 2.15, ch = 1.95, cw = 5.86;
  navyBox(s, MX, cy, cw, ch, 'Objective', C.teal, [
    'Every managed SDC ships a Fabric workload',
    'The product runs natively in Fabric on OneLake',
    { text: 'Every SDC customer consumes Fabric by design', hi: true },
  ]);
  const rx = MX + cw + 0.2;
  s.addShape(rrect(), { x: rx, y: cy, w: cw, h: ch, rectRadius: 0.08, fill: { color: C.softteal }, line: { color: C.teal, width: 1 } });
  s.addShape(rect(), { x: rx, y: cy, w: 0.09, h: ch, fill: { color: C.teal } });
  s.addText('Build once \u2192 adopt many', { x: rx + 0.24, y: cy + 0.16, w: cw - 0.4, h: 0.32, fontFace: FONT, fontSize: 14, bold: true, color: C.navy });
  s.addText([
    { text: 'No per-customer selling \u2014 adoption is built in', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 4 } },
    { text: 'Repeat across modules of the offer', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 4 } },
    { text: 'KPI: # workloads per SDC (\u2265 1 / SDC)', options: { bullet: { code: '2022', indent: 12 }, bold: true, color: C.teal } },
  ], { x: rx + 0.24, y: cy + 0.5, w: cw - 0.46, h: ch - 0.6, fontFace: FONT, fontSize: 12, color: C.ink, valign: 'top' });
}

// ===================================================== Slide 10 — Micro Hack 2 agenda (NEW)
{
  const s = p.addSlide();
  const y0 = band(s, 'Path B \u2014 Micro Hack 2', 'The Workloads Micro Hack \u2014 a fixed, repeatable day');
  const head = ['When', 'Block', 'Content'].map((t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 12 } }));
  const rows = [
    ['Morning', 'Why build a workload', 'Reach every Fabric customer via the Workload Hub; run on OneLake'],
    ['', 'Extensibility Toolkit foundations', 'Workload structure, Entra app, Dev Gateway, manifest, OBO token'],
    ['', 'Demo', 'GreenGrid Scorecard running live inside Fabric'],
    ['Afternoon', '\u2B50 Build sprint 1', 'Clone toolkit, Setup.ps1 (Entra app), Dev server + gateway, Hello World, CreateNewItem'],
    ['', '\u2B50 Build sprint 2', 'Read Files/sites.csv from OneLake, call the backend, render the scorecard, polish'],
    ['', 'Plan & next steps', 'Embed the workload in the SDC offer + path to publish on the Workload Hub'],
  ];
  const body = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontSize: 11, color: C.ink, fill: { color: i % 2 ? C.softteal : C.white }, bold: j === 0 && c !== '' } })));
  s.addTable([head, ...body], { x: MX, y: y0, w: W - 2 * MX, colW: [1.5, 3.2, W - 2 * MX - 4.7], border: { type: 'solid', color: C.line, pt: 0.5 }, fontFace: FONT, valign: 'middle', rowH: 0.6 });
  s.addText('Same shape as Micro Hack 1 \u2014 but the artifact is a Fabric workload the SDC embeds in its offer, so every customer adopts Fabric.', { x: MX, y: y0 + 4.35, w: W - 2 * MX, h: 0.45, fontFace: FONT, fontSize: 12, italic: true, color: C.grey });
}

// ===================================================== Slide 11 — Path B build (GreenGrid)
{
  const s = p.addSlide();
  const y0 = band(s, 'Path B \u2014 the build', 'Scenario 2 \u2014 GreenGrid Scorecard');
  const cy = y0, ch = 3.7, cw = 5.86;
  s.addShape(rrect(), { x: MX, y: cy, w: cw, h: ch, rectRadius: 0.08, fill: { color: C.softteal }, line: { color: C.teal, width: 1 } });
  pill(s, MX + 0.22, cy + 0.2, 2.7, 0.44, 'FABRIC WORKLOAD', C.teal);
  s.addText('A sustainability workload built with the Extensibility Toolkit that scores sites on their energy data \u2014 native in Fabric.', { x: MX + 0.24, y: cy + 0.78, w: cw - 0.46, h: 0.7, fontFace: FONT, fontSize: 12.5, color: C.ink, valign: 'top' });
  s.addText([
    { text: 'Reads Files/sites.csv from OneLake via an OBO token', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 5 } },
    { text: 'Calls the pre-deployed GreenGrid SaaS (the algorithm)', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 5 } },
    { text: 'Renders a scorecard item inside the Fabric portal', options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 5 } },
    { text: 'Setup.ps1 creates the Entra app (needed even with Dev Gateway)', options: { bullet: { code: '2022', indent: 12 } } },
  ], { x: MX + 0.24, y: cy + 1.5, w: cw - 0.46, h: ch - 1.6, fontFace: FONT, fontSize: 11.5, color: C.ink, valign: 'top' });
  const rx = MX + cw + 0.2;
  navyBox(s, rx, cy, cw, ch, 'In the kit', C.teal, [
    'Cloned Extensibility Toolkit + setup scripts',
    'Reference code: src/workloadsdc/',
    'Participant workbook (prerequisites \u2192 build)',
    'Trainer setup + solution guide',
    { text: 'Outcome: a workload the SDC embeds in its offer', hi: true },
  ]);
}

// ===================================================== Slide 12 — KPIs
{
  const s = p.addSlide();
  const y0 = band(s, 'KPIs & success metrics', 'How we measure the motion');
  const head = ['Path', 'Leading indicator', 'Outcome KPI'].map((t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 12 } }));
  const rows = [
    ['A \u2014 Advisory / Apps', '# Micro Hacks repeated by partner; # apps deployed to Fabric', '# opportunities (MSX), Stage 1 & 2; Fabric / Azure ACR pipeline'],
    ['B \u2014 SDC Adoption', '# managed SDCs engaged; # offers with a workload built', '# workloads per SDC; Fabric usage / ACR from end-customers'],
    ['Motion health', 'Ratio of partner-led vs MS-led sessions', 'Partner-sourced opportunities & adoptions share'],
  ];
  const body = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontSize: 12, color: C.ink, bold: j === 0, fill: { color: i % 2 ? C.soft : C.white } } })));
  s.addTable([head, ...body], { x: MX, y: y0, w: W - 2 * MX, colW: [2.9, 4.9, W - 2 * MX - 7.8], border: { type: 'solid', color: C.line, pt: 0.5 }, fontFace: FONT, valign: 'middle', rowH: 1.05 });
  s.addText('North-star: the share of Micro Hacks, apps and workloads that are partner-led, not Microsoft-led.', { x: MX, y: y0 + 4.45, w: W - 2 * MX, h: 0.5, fontFace: FONT, fontSize: 13, bold: true, color: C.blue });
}

// ===================================================== Slide 13 — Roadmap
{
  const s = p.addSlide();
  const y0 = band(s, 'Execution roadmap', 'FY27 \u2014 we build, then partners repeat');
  const q = ['Workstream', 'Q1 Jul\u2013Sep', 'Q2 Oct\u2013Dec', 'Q3 Jan\u2013Mar', 'Q4 Apr\u2013Jun'];
  const head = q.map((t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 11 } }));
  const bar = (on, col) => ({ text: on ? '\u2588\u2588\u2588\u2588\u2588' : '', options: { color: on ? col : C.white, align: 'center', fontSize: 11 } });
  const lbl = (t) => ({ text: t, options: { fontSize: 11, color: C.ink, bold: true } });
  const rows = [
    ['Build \u2014 Micro Hack kit', [1, 0, 0, 0], C.blue],
    ['Build \u2014 reference scenarios', [1, 0, 0, 0], C.blue],
    ['Path A \u2014 Co-deliver Run #1 \u25C6', [1, 0, 0, 0], C.blue],
    ['Path A \u2014 SIs repeat (own customers)', [0, 1, 1, 0], C.blue],
    ['Path A \u2014 Scale advisory ecosystem', [0, 1, 1, 1], C.blue],
    ['Path B \u2014 SDC first workloads', [1, 1, 0, 0], C.teal],
    ['Path B \u2014 Repeat + Workload Hub', [0, 1, 1, 1], C.teal],
  ];
  const body = rows.map((r, i) => [lbl(r[0]), ...r[1].map((v) => bar(v, r[2]))].map((c) => ({ ...c, options: { ...c.options, fill: { color: i % 2 ? C.soft : C.white } } })));
  const colQ = (W - 2 * MX - 4.3) / 4;
  s.addTable([head, ...body], { x: MX, y: y0, w: W - 2 * MX, colW: [4.3, colQ, colQ, colQ, colQ], border: { type: 'solid', color: C.line, pt: 0.5 }, fontFace: FONT, valign: 'middle', rowH: 0.5 });
  s.addText('\u25C6 Run #1 co-delivered end of Q1 (Sep \u201926): kit in partners\u2019 hands \u2014 the motion shifts from Microsoft build to partner-led repeat.', { x: MX, y: y0 + 4.15, w: W - 2 * MX, h: 0.5, fontFace: FONT, fontSize: 12, italic: true, color: C.grey });
}

// ===================================================== Slide 14 — The ask
{
  const s = p.addSlide();
  const y0 = band(s, 'The ask', 'What we need to land the motion');
  const asks = [
    ['Sponsorship', 'Ahmed + EPS leadership behind one ONE-Microsoft motion.'],
    ['Funding', 'Build the Micro Hack kit + reference scenarios and run the first co-delivered sessions.'],
    ['PM lead on workloads', 'Align with the Extensibility Toolkit roadmap and the Workload Hub.'],
    ['ONE Microsoft program', 'SDC + Advisory \u2192 one execution layer, not parallel tracks.'],
  ];
  let y = y0 + 0.05;
  for (const [t, d] of asks) {
    s.addShape(rrect(), { x: MX, y, w: W - 2 * MX, h: 0.92, rectRadius: 0.06, fill: { color: C.panel }, line: { color: C.line, width: 1 } });
    s.addShape(rect(), { x: MX, y, w: 0.09, h: 0.92, fill: { color: C.blue } });
    s.addText(t, { x: MX + 0.32, y: y + 0.12, w: 3.4, h: 0.66, fontFace: FONT, fontSize: 15, bold: true, color: C.blue, valign: 'middle' });
    s.addText(d, { x: MX + 3.9, y: y + 0.12, w: W - 2 * MX - 4.2, h: 0.66, fontFace: FONT, fontSize: 13, color: C.ink, valign: 'middle' });
    y += 1.06;
  }
}

// ===================================================== Slide 15 — Closing
{
  const s = p.addSlide();
  s.background = { color: C.navy };
  s.addShape(rect(), { x: 0, y: 0, w: W, h: 0.22, fill: { color: C.blue } });
  s.addShape(rect(), { x: 0, y: 0.22, w: W, h: 0.08, fill: { color: C.teal } });
  s.addText('Build the next page of your business with Microsoft Fabric', { x: MX + 0.2, y: 2.5, w: W - 2 * MX - 0.2, h: 1.6, fontFace: FONT, fontSize: 33, bold: true, color: C.white });
  s.addText('One Micro Hack day  \u00B7  two paths (Apps + Workloads)  \u00B7  partner-led repeat.', { x: MX + 0.2, y: 4.2, w: W - 2 * MX, h: 0.6, fontFace: FONT, fontSize: 18, color: 'CFE0F0' });
  pill(s, MX + 0.2, 5.2, 3.0, 0.5, 'APPS / SI  \u00B7  MICRO HACK 1', C.blue);
  pill(s, MX + 3.4, 5.2, 4.6, 0.5, 'WORKLOADS / SDC  \u00B7  MICRO HACK 2', C.teal);
}

const out = process.argv[2] || 'motion.pptx';
await p.writeFile({ fileName: out });
console.log('Wrote ' + out + ' (' + p.slides.length + ' slides)');
