// FY27 EMEA EPS — Fabric Apps Motion — editable PowerPoint generator (v3).
// Faithfully reuses the FY27 SQL-in-a-Day deck TEMPLATE and chart types:
//   blue-gradient hero + closing, light page background, dark Calibri titles,
//   brand footer (EMEA | EPS), two-path cards with circular icons + top accent +
//   tinted PRIMARY KPI box + navy "core idea" band, fork flow, big-number stat tiles,
//   2x2 icon grid, vertical cascade, horizontal colour-progression flow, IS / IS-NOT,
//   Input/Build/Output pipeline, numbered list + navy sidebar, two-column agendas
//   (Micro Hack 1 & 2), Gantt with real rounded-rect bars, ask icon cards.
// Real editable slides (PptxGenJS). Palette + fonts extracted from the SQL deck.
// Usage:  node deck-v3.mjs out.pptx
import pptxgenjs from 'pptxgenjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const HERO = join(__dir, 'assets', 'hero-bg.png');
const PAGE = join(__dir, 'assets', 'page-bg.png');
const TEAM = ['p1.jpeg', 'p2.jpeg', 'p3.jpeg', 'p4.jpeg', 'p5.jpeg'].map((f) => join(__dir, 'assets', 'team', f));

const C = {
  blue: '0F6CBD', cyan: '2FB6E0', mag: 'B14FD8', teal: '2E9CA8', green: '2E9E63', red: 'E0455E',
  amber: 'D98A2B', amberTx: '9A5B12', amberBg: 'FFF6E6', amberBd: 'E8B65A',
  navy: '1F3A5F', navy2: '142943', ink: '1F2A3A', grey: '5E708A',
  line: 'D6E2F0', panel: 'F1F6FC', white: 'FFFFFF',
  tBlue: 'E7F1FB', tMag: 'F6EAFB', tTeal: 'E3F4F4', tGreen: 'E6F5EC', tRed: 'FBEAED',
};
const F = 'Calibri', FL = 'Calibri Light', FE = 'Segoe UI Emoji';
const W = 13.333, H = 7.5, MX = 0.62;
const p = new pptxgenjs();
p.defineLayout({ name: 'W', width: W, height: H });
p.layout = 'W';
let PAGENO = 1;
const RECT = () => p.ShapeType.rect, RR = () => p.ShapeType.roundRect, ELL = () => p.ShapeType.ellipse, LN = () => p.ShapeType.line;

function brand(s, x, y, dark) {
  s.addText([
    { text: 'EMEA ', options: { bold: true, color: dark ? C.navy : C.white } },
    { text: '| ', options: { color: dark ? C.grey : 'BcD6F0' } },
    { text: 'EPS', options: { bold: true, color: C.cyan } },
  ], { x, y, w: 2.2, h: 0.3, fontFace: F, fontSize: 12, valign: 'middle', align: x > 6 ? 'right' : 'left' });
}
function footer(s) {
  PAGENO++;
  s.addText('FY27 EMEA EPS \u00B7 Fabric Apps Motion \u2014 the \u201CMicro Hack\u201D', { x: MX, y: 7.13, w: 7, h: 0.3, fontFace: F, fontSize: 9, color: C.grey, valign: 'middle' });
  s.addText(String(PAGENO), { x: W / 2 - 0.5, y: 7.13, w: 1, h: 0.3, align: 'center', fontFace: F, fontSize: 9, color: C.grey, valign: 'middle' });
  brand(s, W - MX - 2.2, 7.11, true);
}
function head(s, title, sub) {
  s.background = { path: PAGE };
  s.addText(title, { x: MX, y: 0.34, w: W - 2 * MX, h: 0.66, fontFace: FL, fontSize: 32, bold: true, color: C.navy });
  if (sub) s.addText(sub, { x: MX, y: 1.0, w: W - 2 * MX, h: 0.4, fontFace: F, italic: true, fontSize: 14.5, color: C.grey });
  footer(s);
  return 1.55;
}
function icon(s, x, y, d, fill, emoji) {
  s.addShape(ELL(), { x, y, w: d, h: d, fill: { color: fill } });
  s.addText(emoji, { x, y: y - 0.01, w: d, h: d, align: 'center', valign: 'middle', fontFace: FE, fontSize: Math.round(d * 26), color: C.white });
}
function arrow(s, x, y, w, h, color) {
  // Always emit a non-negative bounding box; express direction via flipH/flipV.
  // PowerPoint rejects negative <a:ext> values (triggers a file repair).
  const flipH = w < 0, flipV = h < 0;
  const ax = w < 0 ? x + w : x, ay = h < 0 ? y + h : y;
  s.addShape(LN(), { x: ax, y: ay, w: Math.abs(w), h: Math.abs(h), flipH, flipV, line: { color: color || '93A6BE', width: 1.75, endArrowType: 'triangle' } });
}
function topCard(s, x, y, w, h, accent) {
  s.addShape(RR(), { x, y, w, h, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 1 }, shadow: { type: 'outer', color: '8AA0BC', opacity: 0.28, blur: 7, offset: 2, angle: 90 } });
  s.addShape(RR(), { x, y, w, h: 0.12, rectRadius: 0.06, fill: { color: accent } });
}
function kpiBox(s, x, y, w, h, accent, tint, label, text) {
  s.addShape(RR(), { x, y, w, h, rectRadius: 0.05, fill: { color: tint } });
  s.addText([
    { text: label.toUpperCase() + '   ', options: { color: accent, bold: true, fontSize: 10.5 } },
    { text: text, options: { color: C.navy, bold: true, fontSize: 12.5 } },
  ], { x: x + 0.16, y, w: w - 0.3, h, valign: 'middle', fontFace: F });
}
function navyBand(s, x, y, w, h, lead, leadColor, rest) {
  s.addShape(RR(), { x, y, w, h, rectRadius: 0.08, fill: { color: C.navy } });
  s.addText([
    { text: lead + '   ', options: { color: leadColor, bold: true, fontSize: 14 } },
    ...rest.map((r) => ({ text: r.t, options: { color: C.white, bold: !!r.b, fontSize: 13 } })),
  ], { x: x + 0.3, y: y + 0.1, w: w - 0.6, h: h - 0.2, valign: 'middle', fontFace: F });
}

// ====================================================== 1 · TITLE (hero)
{
  const s = p.addSlide();
  s.background = { path: HERO };
  brand(s, MX, 0.45, false);
  s.addText('FY27 EMEA EPS \u2014 Fabric Apps Motion', { x: MX, y: 2.35, w: 11.8, h: 1.0, fontFace: FL, fontSize: 44, bold: true, color: C.white });
  s.addText([
    { text: 'Two paths to Microsoft Fabric, enabled through ', options: { color: C.white } },
    { text: '\u201CMicro Hack\u201D', options: { color: C.cyan, bold: true } },
  ], { x: MX, y: 3.5, w: 11.8, h: 0.5, fontFace: F, italic: true, fontSize: 23 });
  s.addText('EMEA \u00B7 Owner: EPS Tech / GTM \u00B7 Two micro-hacks: Apps (Rayfin) + Workloads (Extensibility Toolkit)', { x: MX, y: 4.25, w: 11.5, h: 0.4, fontFace: F, fontSize: 13, color: 'BFD6F2' });
  // EMEA PSA Data team — five circular headshots
  TEAM.forEach((path, i) => {
    s.addImage({ path, x: 3.38 + i * 1.49, y: 5.09, w: 1.18, h: 1.18, rounding: true });
  });
  s.addText('EMEA PSA Data Team', { x: 3.38, y: 6.32, w: 7.13, h: 0.32, align: 'center', fontFace: F, fontSize: 13, color: 'EAF2FC' });
  s.addText('July 2026', { x: MX, y: 6.55, w: 4, h: 0.3, fontFace: F, fontSize: 13, bold: true, color: C.white });
  brand(s, W - MX - 2.2, 6.95, false);
}

// ====================================================== 2 · EXECUTIVE SUMMARY
{
  const s = p.addSlide();
  head(s, 'Executive Summary', 'One motion, two execution paths \u2014 both powered by a single, repeatable vehicle: the \u201CMicro Hack\u201D.');
  const cy = 1.62, ch = 3.3, cw = 5.9;
  const path = (x, accent, tint, emoji, title, audience, outcome, kpi) => {
    topCard(s, x, cy, cw, ch, accent);
    icon(s, x + 0.3, cy + 0.34, 0.95, accent, emoji);
    s.addText(title, { x: x + 1.45, y: cy + 0.34, w: cw - 1.6, h: 0.42, fontFace: F, fontSize: 20, bold: true, color: C.navy });
    s.addText(audience, { x: x + 1.45, y: cy + 0.76, w: cw - 1.6, h: 0.34, fontFace: F, fontSize: 13, bold: true, color: accent });
    s.addText('Outcome we drive', { x: x + 0.34, y: cy + 1.45, w: cw - 0.6, h: 0.3, fontFace: F, fontSize: 12, bold: true, color: C.grey });
    s.addText(outcome, { x: x + 0.34, y: cy + 1.74, w: cw - 0.62, h: 0.8, fontFace: F, fontSize: 13.5, color: C.ink, valign: 'top' });
    kpiBox(s, x + 0.34, cy + 2.55, cw - 0.68, 0.58, accent, tint, 'Primary KPI', kpi);
  };
  path(MX, C.blue, C.tBlue, '\uD83D\uDDC4\uFE0F', 'Path A \u2014 Apps', 'System Integrators (SI / advisory) \u00B7 start with the GSIs', 'Build & ship business apps on Microsoft Fabric with Rayfin \u2014 partner-led, on governed OneLake data.', '# of opportunities created (MSX)');
  path(MX + cw + 0.2, C.mag, C.tMag, '\uD83E\uDDE9', 'Path B \u2014 Adoption', 'Software Development Companies (SDC / ISV)', 'Every managed SDC embeds a Fabric workload in its offer \u2014 so every customer consumes a data workload.', '% of managed SDCs that built a workload');
  navyBand(s, MX, 5.08, W - 2 * MX, 1.42, 'The core idea', C.cyan, [
    { t: 'Microsoft does not build new tooling \u2014 Fabric, Rayfin, the Extensibility Toolkit and the GitHub Copilot CLI already exist. We package ' },
    { t: 'one turnkey, repeatable vehicle \u2014 the \u201CMicro Hack\u201D \u2014 that an SI or SDC can run themselves.', b: true },
  ]);
}

// ====================================================== 3 · THE MOTION AT A GLANCE (fork flow)
{
  const s = p.addSlide();
  head(s, 'The Motion at a Glance', '\u201CWe build it, the partner repeats it.\u201D \u2014 one operational vehicle, two partner paths.');
  // left: Microsoft EPS
  s.addShape(RR(), { x: MX, y: 2.35, w: 2.7, h: 2.05, rectRadius: 0.1, fill: { color: C.navy } });
  icon(s, MX + 0.95, 2.6, 0.8, C.blue, '\u2699\uFE0F');
  s.addText('Microsoft EPS', { x: MX, y: 3.5, w: 2.7, h: 0.3, align: 'center', fontFace: F, fontSize: 14, bold: true, color: C.white });
  s.addText('builds the kit + reference scenarios', { x: MX + 0.2, y: 3.8, w: 2.3, h: 0.5, align: 'center', fontFace: F, fontSize: 11, color: 'CFE0F0', valign: 'top' });
  arrow(s, MX + 2.75, 3.37, 0.6, 0, C.blue);
  // center: Micro Hack
  const cx = 3.55, cw = 4.1;
  s.addShape(RR(), { x: cx, y: 1.95, w: cw, h: 3.05, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.blue, width: 1.5 } });
  icon(s, cx + cw / 2 - 0.4, 2.12, 0.8, C.blue, '\u26A1');
  s.addText('Micro Hack', { x: cx, y: 2.95, w: cw, h: 0.4, align: 'center', fontFace: FL, fontSize: 22, bold: true, color: C.navy });
  s.addText('1 day \u00B7 repeatable', { x: cx, y: 3.35, w: cw, h: 0.3, align: 'center', fontFace: F, italic: true, fontSize: 13, color: C.grey });
  s.addShape(RR(), { x: cx + 0.25, y: 3.74, w: cw - 0.5, h: 0.55, rectRadius: 0.05, fill: { color: C.tBlue } });
  s.addText([{ text: 'Morning \u2014 Content  ', options: { bold: true, color: C.blue } }, { text: 'why Fabric \u00B7 Rayfin \u00B7 Toolkit', options: { color: C.ink } }], { x: cx + 0.4, y: 3.74, w: cw - 0.7, h: 0.55, valign: 'middle', fontFace: F, fontSize: 11 });
  s.addShape(RR(), { x: cx + 0.25, y: 4.36, w: cw - 0.5, h: 0.55, rectRadius: 0.05, fill: { color: C.tMag } });
  s.addText([{ text: 'Afternoon \u2014 Build  ', options: { bold: true, color: C.mag } }, { text: 'scenario in \u2192 app / workload out', options: { color: C.ink } }], { x: cx + 0.4, y: 4.36, w: cw - 0.7, h: 0.55, valign: 'middle', fontFace: F, fontSize: 11 });
  // arrows out
  arrow(s, cx + cw, 2.7, 0.55, -0.05, C.blue);
  arrow(s, cx + cw, 4.25, 0.55, 0.05, C.mag);
  // right cards
  const rx = cx + cw + 0.55, rw = W - MX - rx;
  s.addShape(RR(), { x: rx, y: 2.05, w: rw, h: 1.35, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 1 } });
  s.addShape(RECT(), { x: rx, y: 2.05, w: 0.1, h: 1.35, fill: { color: C.blue } });
  s.addText([{ text: 'Path A \u2014 SI / advisory', options: { bold: true, fontSize: 14, color: C.navy } }], { x: rx + 0.25, y: 2.16, w: rw - 0.4, h: 0.3, fontFace: F });
  s.addText('repeat the Micro Hack with their own customers', { x: rx + 0.25, y: 2.46, w: rw - 0.45, h: 0.35, fontFace: F, fontSize: 11.5, color: C.grey });
  kpiBox(s, rx + 0.25, 2.86, rw - 0.5, 0.44, C.blue, C.tBlue, 'KPI', '# opportunities (MSX)');
  s.addShape(RR(), { x: rx, y: 3.55, w: rw, h: 1.45, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 1 } });
  s.addShape(RECT(), { x: rx, y: 3.55, w: 0.1, h: 1.45, fill: { color: C.mag } });
  s.addText([{ text: 'Path B \u2014 SDC / ISV', options: { bold: true, fontSize: 14, color: C.navy } }], { x: rx + 0.25, y: 3.66, w: rw - 0.4, h: 0.3, fontFace: F });
  s.addText('embed a Fabric workload \u2192 every customer adopts', { x: rx + 0.25, y: 3.96, w: rw - 0.45, h: 0.45, fontFace: F, fontSize: 11.5, color: C.grey });
  kpiBox(s, rx + 0.25, 4.46, rw - 0.5, 0.44, C.mag, C.tMag, 'KPI', '# workloads per SDC');
  // operating principle
  s.addShape(RR(), { x: MX, y: 5.45, w: W - 2 * MX, h: 1.0, rectRadius: 0.08, fill: { color: C.panel }, line: { color: C.line, width: 1 } });
  s.addText([
    { text: 'Operating principle   ', options: { bold: true, color: C.blue, fontSize: 13.5 } },
    { text: 'For every FY27 EPS motion we ship a highly operational vehicle (here: the Micro Hack). Microsoft builds and co-delivers the first run; the partner then owns and repeats it.', options: { color: C.ink, fontSize: 13 } },
  ], { x: MX + 0.3, y: 5.45, w: W - 2 * MX - 0.6, h: 1.0, valign: 'middle', fontFace: F });
}

// ====================================================== 4 · STRATEGIC CONTEXT (stat tiles)
{
  const s = p.addSlide();
  head(s, 'Strategic Context \u2014 the simplified \u201Cwhy now\u201D', 'Enough to open a customer conversation, no more \u2014 the one-slide version of the narrative.');
  const stats = [
    [C.red, '60%', 'of AI projects without AI-ready data will be abandoned', 'Gartner'],
    [C.blue, '83%', 'of leaders say stronger data infrastructure would speed AI adoption', 'Accenture'],
    [C.teal, '+95.6%', 'higher win rate when an opportunity is shared with a partner', 'Partner effect'],
    [C.green, '+46%', 'larger deal size when a partner is attached', 'Partner effect'],
  ];
  const tw = (W - 2 * MX - 3 * 0.28) / 4;
  stats.forEach((st, i) => {
    const x = MX + i * (tw + 0.28);
    topCard(s, x, 1.55, tw, 2.0, st[0]);
    s.addText(st[1], { x, y: 1.78, w: tw, h: 0.7, align: 'center', fontFace: FL, fontSize: 38, bold: true, color: st[0] });
    s.addText(st[2], { x: x + 0.15, y: 2.5, w: tw - 0.3, h: 0.7, align: 'center', fontFace: F, fontSize: 12, color: C.ink, valign: 'top' });
    s.addText(st[3], { x, y: 3.24, w: tw, h: 0.26, align: 'center', fontFace: F, italic: true, fontSize: 10.5, color: C.grey });
  });
  // amber callout
  s.addShape(RR(), { x: MX, y: 3.78, w: W - 2 * MX, h: 0.92, rectRadius: 0.08, fill: { color: C.amberBg }, line: { color: C.amberBd, width: 1 } });
  icon(s, MX + 0.28, 3.98, 0.52, C.amber, '\u23F0');
  s.addText([
    { text: 'Apps are the new compelling event.   ', options: { bold: true, color: C.amberTx, fontSize: 14 } },
    { text: 'AI-era apps demand governed data. Fabric + Rayfin remove months of backend plumbing, so partners ship on OneLake \u2014 governed by default \u2014 instead of rebuilding infrastructure.', options: { color: C.ink, fontSize: 12.5 } },
  ], { x: MX + 1.0, y: 3.78, w: W - 2 * MX - 1.2, h: 0.92, valign: 'middle', fontFace: F });
  // 3 friction cards
  s.addText('Three customer frictions to anchor on:', { x: MX, y: 4.85, w: 8, h: 0.3, fontFace: F, fontSize: 13, bold: true, color: C.navy });
  const fr = [
    [C.blue, '\uD83D\uDEE1\uFE0F', '1. Stay ahead of AI-era security & governance'],
    [C.teal, '\uD83D\uDDC4\uFE0F', '2. Cut the cost & time of backend plumbing'],
    [C.mag, '\uD83E\uDDE0', '3. Unblock AI innovation on governed data'],
  ];
  const fw = (W - 2 * MX - 2 * 0.3) / 3;
  fr.forEach((f, i) => {
    const x = MX + i * (fw + 0.3);
    s.addShape(RR(), { x, y: 5.2, w: fw, h: 1.2, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 1 }, shadow: { type: 'outer', color: '8AA0BC', opacity: 0.25, blur: 6, offset: 2, angle: 90 } });
    icon(s, x + 0.25, 5.5, 0.6, f[0], f[1]);
    s.addText(f[2], { x: x + 1.0, y: 5.2, w: fw - 1.2, h: 1.2, valign: 'middle', fontFace: F, fontSize: 13, bold: true, color: C.navy });
  });
}

// ====================================================== 5 · PATH A — 2x2 icon grid
{
  const s = p.addSlide();
  head(s, 'Path A \u2014 SI / Advisory (Apps)', 'Focus: GSIs first. Enable partners to build & ship customer business apps on Fabric, partner-led.');
  const cells = [
    [C.blue, '\uD83C\uDFAF', 'Objective', 'Enable SIs to build and ship business apps on Microsoft Fabric with Rayfin, led by the partner \u2014 on governed OneLake data.'],
    [C.green, '\uD83D\uDCC8', 'Primary KPI', 'Number of opportunities created in MSX (partner-sourced or partner-shared) \u2014 ACR vision.'],
    [C.teal, '\uD83D\uDD04', 'Secondary KPIs', '# of \u201CMicro Hack\u201D days repeated by the partner \u00B7 # of apps deployed to Fabric \u00B7 Azure/Fabric pipeline.'],
    [C.mag, '\uD83D\uDC64', 'Lead role', 'STU per country + EPS (PDM / PSA), with one executive sponsor per SI / GSI.'],
  ];
  const cw = 5.9, ch = 2.0, gx = 0.2, gy = 0.22;
  cells.forEach((c, i) => {
    const x = MX + (i % 2) * (cw + gx), y = 1.6 + Math.floor(i / 2) * (ch + gy);
    s.addShape(RR(), { x, y, w: cw, h: ch, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 1 }, shadow: { type: 'outer', color: '8AA0BC', opacity: 0.25, blur: 6, offset: 2, angle: 90 } });
    icon(s, x + 0.3, y + 0.3, 0.9, c[0], c[1]);
    s.addText(c[2], { x: x + 1.4, y: y + 0.42, w: cw - 1.6, h: 0.45, fontFace: F, fontSize: 18, bold: true, color: C.navy });
    s.addText(c[3], { x: x + 0.34, y: y + 1.18, w: cw - 0.66, h: 0.74, fontFace: F, fontSize: 12.5, color: C.ink, valign: 'top' });
  });
}

// ====================================================== Agenda helper (two-column)
function agendaSlide(title, sub, morning, afternoon, footnote) {
  const s = p.addSlide();
  head(s, title, sub);
  const colW = 5.9, lx = MX, rx = MX + colW + 0.2, hy = 1.58;
  const colHeader = (x, color, emoji, label) => {
    s.addShape(RR(), { x, y: hy, w: colW, h: 0.56, rectRadius: 0.06, fill: { color } });
    icon(s, x + 0.12, hy + 0.06, 0.44, 'FFFFFF', emoji);
    s.addText(label, { x: x + 0.7, y: hy, w: colW - 0.8, h: 0.56, valign: 'middle', fontFace: F, fontSize: 13.5, bold: true, color: C.white });
    // recolor emoji circle face: overlay handled by icon() white fill; keep as is
  };
  // override icon for header (white circle, colored glyph) — redo manually
  const colHeader2 = (x, color, emoji, label) => {
    s.addShape(RR(), { x, y: hy, w: colW, h: 0.56, rectRadius: 0.06, fill: { color } });
    s.addText(emoji, { x: x + 0.14, y: hy, w: 0.5, h: 0.56, align: 'center', valign: 'middle', fontFace: FE, fontSize: 17, color: C.white });
    s.addText(label, { x: x + 0.66, y: hy, w: colW - 0.8, h: 0.56, valign: 'middle', fontFace: F, fontSize: 13.5, bold: true, color: C.white });
  };
  colHeader2(lx, C.blue, '\u2600\uFE0F', 'MORNING \u2014 Content  (MS \u2192 Partner)');
  colHeader2(rx, C.mag, '\uD83E\uDD16', 'AFTERNOON \u2014 Build + Demo  (MS \u2192 Partner)');
  const row = (x, color, n, title, desc, hl) => {
    const ry = hy + 0.7 + (n.idx) * 0.78;
    s.addShape(RR(), { x, y: ry, w: colW, h: 0.68, rectRadius: 0.06, fill: { color: hl ? C.amberBg : C.white }, line: { color: hl ? C.amberBd : C.line, width: 1 } });
    s.addShape(ELL(), { x: x + 0.16, y: ry + 0.13, w: 0.42, h: 0.42, fill: { color: hl ? C.amber : color } });
    s.addText(String(n.v), { x: x + 0.16, y: ry + 0.12, w: 0.42, h: 0.42, align: 'center', valign: 'middle', fontFace: F, fontSize: 13, bold: true, color: C.white });
    s.addText([
      { text: (hl ? '\u2605 ' : '') + title + '   ', options: { bold: true, color: C.navy } },
      { text: desc, options: { color: C.grey } },
    ], { x: x + 0.72, y: ry, w: colW - 0.85, h: 0.68, valign: 'middle', fontFace: F, fontSize: 11.5 });
  };
  morning.forEach((m, i) => row(lx, C.blue, { idx: i, v: i + 1 }, m[0], m[1], false));
  afternoon.forEach((a, i) => row(rx, C.mag, { idx: i, v: morning.length + i + 1 }, a[0], a[1], a[2]));
  s.addShape(RR(), { x: MX, y: 6.0, w: W - 2 * MX, h: 0.78, rectRadius: 0.08, fill: { color: C.navy } });
  s.addText('\u2605', { x: MX + 0.28, y: 6.0, w: 0.4, h: 0.78, align: 'center', valign: 'middle', fontFace: F, fontSize: 16, color: C.amber });
  s.addText([
    { text: footnote.lead + '   ', options: { bold: true, color: C.amber, fontSize: 13 } },
    { text: footnote.rest, options: { color: C.white, fontSize: 12.5 } },
  ], { x: MX + 0.75, y: 6.0, w: W - 2 * MX - 1.0, h: 0.78, valign: 'middle', fontFace: F });
}

// ====================================================== 6 · MICRO HACK 1 agenda
agendaSlide(
  'The Vehicle \u2014 Micro Hack 1 (Apps) agenda',
  'A fixed, repeatable one-day format. Microsoft co-delivers run #1; the SI repeats runs #2\u2026N independently.',
  [
    ['Why build on Fabric', 'managed backend \u00B7 governance on OneLake \u00B7 time-to-app'],
    ['Rayfin foundations', 'data model = database \u00B7 auth, APIs, hosting \u00B7 deploy in one command'],
    ['Demo', 'Helios Bicycle Studio built live with the GitHub Copilot CLI'],
    ['Plan the build', 'pick the scenario \u00B7 data model \u00B7 screens \u00B7 roles'],
  ],
  [
    ['Build sprint 1', 'scaffold, declare the data model (Rayfin provisions the DB), core screens'],
    ['Build sprint 2', 'extend, polish, deploy to Fabric (rayfin up), demo', true],
    ['Plan & next steps', 'turn the app into an MSX opportunity + a 90-day plan'],
  ],
  { lead: 'The afternoon is the differentiator.', rest: 'Teams ship a real working app on Fabric \u2014 the artifact the SI uses to open and qualify a real opportunity.' }
);

// ====================================================== 7 · REPEATABILITY (cards + progression flow)
{
  const s = p.addSlide();
  head(s, 'Repeatability \u2014 the partner runs its own Micro Hack', 'The motion only scales if the partner repeats it without us. We ship a \u201CMicro Hack in a Box\u201D.');
  const cards = [
    [C.blue, '\uD83D\uDCD6', 'Facilitator kit', 'Slide deck (morning), demo script, timing guide, FAQ'],
    [C.blue, '\uD83E\uDD16', 'Copilot CLI access', 'A guided way to build the app / workload with the GitHub Copilot CLI'],
    [C.blue, '\uD83D\uDC65', 'Train-the-trainer', 'Run #1 co-delivered; we certify a partner pursuit team'],
    [C.blue, '\uD83D\uDCC8', 'Repeatability KPI', '# of partner-led sessions and opportunities they generate (MSX)'],
  ];
  const cw = (W - 2 * MX - 3 * 0.26) / 4;
  cards.forEach((c, i) => {
    const x = MX + i * (cw + 0.26);
    s.addShape(RR(), { x, y: 1.6, w: cw, h: 2.1, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 1 }, shadow: { type: 'outer', color: '8AA0BC', opacity: 0.25, blur: 6, offset: 2, angle: 90 } });
    icon(s, x + cw / 2 - 0.42, 1.82, 0.84, c[0], c[1]);
    s.addText(c[2], { x, y: 2.74, w: cw, h: 0.34, align: 'center', fontFace: F, fontSize: 14, bold: true, color: C.navy });
    s.addText(c[3], { x: x + 0.18, y: 3.08, w: cw - 0.36, h: 0.58, align: 'center', fontFace: F, fontSize: 11, color: C.grey, valign: 'top' });
  });
  s.addText('How it scales', { x: MX, y: 4.0, w: 6, h: 0.3, fontFace: F, fontSize: 13, bold: true, color: C.navy });
  const flow = [
    [C.navy, '\u2699\uFE0F', 'Microsoft EPS', 'Build kit + scenarios + facilitator pack'],
    [C.blue, '\uD83E\uDD1D', 'Co-deliver Run #1', 'Train-the-trainer with the partner team'],
    [C.teal, '\uD83D\uDD04', 'Runs #2\u2026N', 'Partner delivers independently to its customers'],
    [C.green, '\uD83C\uDFAF', 'Opportunities', 'Apps & workloads \u2192 created / shared in MSX'],
  ];
  const bw = (W - 2 * MX - 3 * 0.5) / 4, by = 4.4, bh = 1.95;
  flow.forEach((f, i) => {
    const x = MX + i * (bw + 0.5);
    s.addShape(RR(), { x, y: by, w: bw, h: bh, rectRadius: 0.08, fill: { color: f[0] } });
    s.addShape(ELL(), { x: x + bw / 2 - 0.4, y: by + 0.22, w: 0.8, h: 0.8, fill: { color: C.white } });
    s.addText(f[1], { x: x + bw / 2 - 0.4, y: by + 0.22, w: 0.8, h: 0.8, align: 'center', valign: 'middle', fontFace: FE, fontSize: 22 });
    s.addText(f[2], { x: x + 0.1, y: by + 1.08, w: bw - 0.2, h: 0.34, align: 'center', fontFace: F, fontSize: 13.5, bold: true, color: C.white });
    s.addText(f[3], { x: x + 0.15, y: by + 1.42, w: bw - 0.3, h: 0.48, align: 'center', fontFace: F, fontSize: 10.5, color: 'DCE7F4', valign: 'top' });
    if (i < flow.length - 1) arrow(s, x + bw + 0.06, by + bh / 2, 0.38, 0, '93A6BE');
  });
}

// ====================================================== 8 · THE BUILD (IS / IS-NOT + pipeline)
{
  const s = p.addSlide();
  head(s, 'The Micro Hack kit \u2014 the one asset we build', 'A reusable enablement kit, not a product \u2014 used live in the day, then repeated by the partner.');
  const panel = (x, accent, tint, label, items, ok) => {
    s.addShape(RR(), { x, y: 1.55, w: 5.9, h: 1.95, rectRadius: 0.08, fill: { color: tint } });
    s.addShape(RR(), { x, y: 1.55, w: 5.9, h: 0.1, rectRadius: 0.05, fill: { color: accent } });
    s.addText(label, { x: x + 0.3, y: 1.7, w: 5, h: 0.36, fontFace: F, fontSize: 15, bold: true, color: accent });
    items.forEach((it, i) => {
      const yy = 2.16 + i * 0.42;
      s.addShape(ELL(), { x: x + 0.32, y: yy + 0.02, w: 0.26, h: 0.26, fill: { color: accent } });
      s.addText(ok ? '\u2713' : '\u2715', { x: x + 0.32, y: yy, w: 0.26, h: 0.28, align: 'center', valign: 'middle', fontFace: F, fontSize: 11, bold: true, color: C.white });
      s.addText(it, { x: x + 0.72, y: yy - 0.04, w: 5.0, h: 0.4, fontFace: F, fontSize: 12, color: C.ink, valign: 'middle' });
    });
  };
  panel(MX, C.green, C.tGreen, 'It IS', [
    'A ready-to-run kit: prompts, scripts, reference code',
    'Two scenarios \u2014 a Rayfin app and a Fabric workload',
    'Facilitator materials to repeat the day',
  ], true);
  panel(MX + 6.1, C.red, C.tRed, 'It is NOT', [
    'A new product or platform',
    'A replacement for Rayfin / the Extensibility Toolkit',
    'A one-off custom build for a single customer',
  ], false);
  // pipeline
  const pipe = [
    [C.blue, 'INPUT \u2014 Fixed scenario', ['Brief + sample data + target users', 'Apps: Helios \u00B7 Workloads: GreenGrid', 'Same start for every run']],
    [C.mag, 'BUILD \u2014 Copilot CLI + Rayfin / Toolkit', ['Scaffold, declare data model / workload', 'Screens, roles, OneLake read (OBO)', 'Validate: build + tests green']],
    [C.teal, 'OUTPUT \u2014 Working app / workload', ['Deployed to Fabric, governed', 'Demo-ready, partner-owned', 'Artifact \u2192 opportunity / adoption']],
  ];
  const pw = (W - 2 * MX - 2 * 0.6) / 3, py = 3.78, ph = 2.75;
  pipe.forEach((c, i) => {
    const x = MX + i * (pw + 0.6);
    s.addShape(RR(), { x, y: py, w: pw, h: ph, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 1 } });
    s.addShape(RR(), { x, y: py, w: pw, h: 0.56, rectRadius: 0.06, fill: { color: c[0] } });
    s.addText(c[1], { x: x + 0.16, y: py, w: pw - 0.32, h: 0.56, align: 'center', valign: 'middle', fontFace: F, fontSize: 12.5, bold: true, color: C.white });
    s.addText(c[2].map((t) => ({ text: t, options: { bullet: { code: '2022', indent: 12 }, paraSpaceAfter: 6, color: C.ink, fontSize: 11.5 } })), { x: x + 0.28, y: py + 0.72, w: pw - 0.5, h: ph - 0.85, fontFace: F, valign: 'top' });
    if (i < pipe.length - 1) arrow(s, x + pw + 0.08, py + ph / 2, 0.42, 0, '93A6BE');
  });
}

// ====================================================== 9 · PATH B (objective + cascade)
{
  const s = p.addSlide();
  head(s, 'Path B \u2014 SDC / ISV (Workloads)', 'Grow the Fabric footprint through ISV offers: embed once, consume mechanically across the ISV\u2019s customer base.');
  // left card
  const lx = MX, lw = 5.7, ly = 1.6, lh = 4.85;
  s.addShape(RR(), { x: lx, y: ly, w: lw, h: lh, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 1 }, shadow: { type: 'outer', color: '8AA0BC', opacity: 0.25, blur: 7, offset: 2, angle: 90 } });
  s.addShape(RR(), { x: lx, y: ly, w: lw, h: 0.12, rectRadius: 0.06, fill: { color: C.mag } });
  s.addText('Objective', { x: lx + 0.34, y: ly + 0.3, w: lw - 0.6, h: 0.4, fontFace: F, fontSize: 18, bold: true, color: C.navy });
  s.addText('Get every Microsoft-managed SDC to embed a Fabric workload (Extensibility Toolkit) inside its commercial offer \u2014 so every time a customer uses the product, a Fabric data workload is consumed by design.', { x: lx + 0.34, y: ly + 0.78, w: lw - 0.66, h: 1.0, fontFace: F, fontSize: 13, color: C.ink, valign: 'top' });
  s.addShape(RR(), { x: lx + 0.34, y: ly + 1.9, w: lw - 0.68, h: 0.95, rectRadius: 0.06, fill: { color: C.tMag } });
  s.addText([{ text: 'Embed once, adopt many.   ', options: { bold: true, color: C.mag } }, { text: 'When an SDC standardizes on a Fabric workload, its entire customer base becomes ongoing Fabric adoption.', options: { color: C.ink } }], { x: lx + 0.52, y: ly + 1.9, w: lw - 1.0, h: 0.95, valign: 'middle', fontFace: F, fontSize: 12 });
  s.addShape(RR(), { x: lx + 0.34, y: ly + 2.98, w: lw - 0.68, h: 0.7, rectRadius: 0.06, fill: { color: C.navy } });
  s.addText([{ text: 'PRIMARY KPI  ', options: { bold: true, color: C.cyan, fontSize: 11 } }, { text: '% of managed SDCs that built a Fabric workload', options: { bold: true, color: C.white, fontSize: 12.5 } }], { x: lx + 0.52, y: ly + 2.98, w: lw - 1.0, h: 0.7, valign: 'middle', fontFace: F });
  s.addText('Measured on adoption & mechanical consumption \u2014 not repeated workshops. The win is the embed and the footprint it generates.', { x: lx + 0.34, y: ly + 3.82, w: lw - 0.66, h: 0.8, fontFace: F, italic: true, fontSize: 11.5, color: C.grey, valign: 'top' });
  // right cascade
  const rx = MX + lw + 0.4, rw = W - MX - rx;
  s.addText([{ text: 'Embed once ', options: { color: C.grey } }, { text: '\u2192 adopt mechanically', options: { bold: true, color: C.navy } }], { x: rx, y: ly - 0.02, w: rw, h: 0.34, fontFace: F, fontSize: 13.5 });
  const casc = (y, h, fill, txt, accentText) => {
    s.addShape(RR(), { x: rx, y, w: rw, h, rectRadius: 0.07, fill: { color: fill } });
    s.addText(txt, { x: rx + 0.2, y, w: rw - 0.4, h, align: 'center', valign: 'middle', fontFace: F, fontSize: 13.5, bold: true, color: (fill === C.mag || fill === C.teal) ? C.white : C.navy });
  };
  let yy = ly + 0.4;
  casc(yy, 0.6, C.mag, 'Microsoft-managed SDC'); arrow(s, rx + rw / 2, yy + 0.6, 0, 0.18, C.mag); yy += 0.82;
  casc(yy, 0.55, C.tBlue, 'Embed a managed Fabric workload (Toolkit)'); arrow(s, rx + rw / 2, yy + 0.55, 0, 0.16, C.blue); yy += 0.74;
  casc(yy, 0.55, C.tBlue, 'SDC product / offer'); yy += 0.7;
  // three customers
  const ckw = (rw - 2 * 0.18) / 3;
  ['Customer 1', 'Customer 2', 'Customer N'].forEach((c, i) => {
    const cx = rx + i * (ckw + 0.18);
    arrow(s, cx + ckw / 2, yy - 0.16, 0, 0.16, C.teal);
    s.addShape(RR(), { x: cx, y: yy, w: ckw, h: 0.6, rectRadius: 0.05, fill: { color: C.white }, line: { color: C.line, width: 1 } });
    s.addText([{ text: c, options: { bold: true, color: C.navy, fontSize: 11, breakLine: true } }, { text: 'data workload', options: { color: C.teal, fontSize: 9, italic: true } }], { x: cx + 0.08, y: yy, w: ckw - 0.16, h: 0.6, valign: 'middle', align: 'center', fontFace: F });
    arrow(s, cx + ckw / 2, yy + 0.6, 0, 0.16, C.teal);
  });
  yy += 0.78;
  casc(yy, 0.7, C.teal, 'Growing Fabric footprint \u2014 adoption & ACR');
}

// ====================================================== 10 · MICRO HACK 2 agenda
agendaSlide(
  'The Vehicle \u2014 Micro Hack 2 (Workloads) agenda',
  'Same fixed, repeatable shape as Micro Hack 1 \u2014 but the artifact is a Fabric workload the SDC embeds in its offer.',
  [
    ['Why build a workload', 'reach every Fabric customer via the Workload Hub \u00B7 run on OneLake'],
    ['Extensibility Toolkit', 'workload structure \u00B7 Entra app \u00B7 Dev Gateway \u00B7 manifest \u00B7 OBO token'],
    ['Demo', 'GreenGrid Scorecard running live inside Fabric'],
    ['Plan the build', 'pick the workload \u00B7 OneLake data \u00B7 backend call \u00B7 UI'],
  ],
  [
    ['Build sprint 1', 'clone toolkit, Setup.ps1 (Entra app), dev server + gateway, Hello World, CreateNewItem'],
    ['Build sprint 2', 'read Files/sites.csv from OneLake, call the backend, render the scorecard', true],
    ['Plan & next steps', 'embed in the SDC offer + path to publish on the Workload Hub'],
  ],
  { lead: 'Same shape, different artifact.', rest: 'The output is a Fabric workload the SDC embeds in its offer \u2014 so every customer adopts Fabric by design.' }
);

// ====================================================== 11 · WHAT WE REUSE (numbered list + navy sidebar)
{
  const s = p.addSlide();
  head(s, 'What we reuse \u2014 we don\u2019t rebuild', 'Everything below already exists. The motion packages it; the Micro Hack runs it.');
  s.addText('Building blocks', { x: MX, y: 1.55, w: 6, h: 0.3, fontFace: F, fontSize: 13, bold: true, color: C.navy });
  const rows = [
    ['1', 'Microsoft Fabric', 'OneLake \u00B7 governance \u00B7 single copy of data'],
    ['2', 'Rayfin', 'managed backend for business apps (data model = DB)'],
    ['3', 'Fabric Extensibility Toolkit', 'build native workloads, distributed in Fabric'],
    ['4', 'GitHub Copilot CLI', 'build apps & workloads fast, with validation'],
    ['5', 'Workload Hub', 'distribute a workload to every Fabric customer'],
  ];
  const lw = 7.4;
  rows.forEach((r, i) => {
    const y = 1.95 + i * 0.86;
    s.addShape(RR(), { x: MX, y, w: lw, h: 0.74, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.line, width: 1 } });
    s.addShape(ELL(), { x: MX + 0.18, y: y + 0.17, w: 0.4, h: 0.4, fill: { color: C.blue } });
    s.addText(r[0], { x: MX + 0.18, y: y + 0.16, w: 0.4, h: 0.4, align: 'center', valign: 'middle', fontFace: F, fontSize: 13, bold: true, color: C.white });
    s.addText([{ text: r[1] + '   ', options: { bold: true, color: C.navy } }, { text: r[2], options: { color: C.grey } }], { x: MX + 0.74, y, w: lw - 0.9, h: 0.74, valign: 'middle', fontFace: F, fontSize: 12.5 });
  });
  // navy sidebar
  const sx = MX + lw + 0.35, sw = W - MX - sx;
  s.addShape(RR(), { x: sx, y: 1.55, w: sw, h: 5.0, rectRadius: 0.1, fill: { color: C.navy } });
  s.addText('\u2699\uFE0F', { x: sx + 0.3, y: 1.78, w: 0.6, h: 0.6, fontFace: FE, fontSize: 22, valign: 'middle' });
  s.addText('Build map', { x: sx + 0.95, y: 1.78, w: sw - 1.1, h: 0.6, valign: 'middle', fontFace: F, fontSize: 17, bold: true, color: C.white });
  s.addText('Reuse \u2014 don\u2019t rebuild', { x: sx + 0.32, y: 2.42, w: sw - 0.6, h: 0.3, fontFace: F, italic: true, fontSize: 11.5, color: C.cyan });
  const steps = [
    ['Scaffold', 'create-rayfin / Setup.ps1'],
    ['Data', 'rayfin data (model = DB) / sites.csv'],
    ['Run', 'npm run dev \u00B7 Dev Gateway'],
    ['Deploy', 'rayfin up \u00B7 Hello World item'],
    ['Publish', 'Workload Hub'],
  ];
  steps.forEach((st, i) => {
    const y = 2.92 + i * 0.72;
    s.addText(st[0], { x: sx + 0.32, y, w: sw - 0.6, h: 0.26, fontFace: F, fontSize: 11, color: 'AEC4DD' });
    s.addText(st[1], { x: sx + 0.32, y: y + 0.24, w: sw - 0.6, h: 0.3, fontFace: F, fontSize: 12.5, bold: true, color: C.white });
  });
}

// ====================================================== 12 · KPIs / how we measure
{
  const s = p.addSlide();
  head(s, 'KPIs \u2014 how we measure the motion', 'Two scoreboards, one north-star: the share of apps and workloads that are partner-led, not Microsoft-led.');
  const card = (x, accent, tint, emoji, title, primary, secondary) => {
    topCard(s, x, 1.62, 5.9, 3.25, accent);
    icon(s, x + 0.3, 1.92, 0.9, accent, emoji);
    s.addText(title, { x: x + 1.4, y: 2.04, w: 5.9 - 1.6, h: 0.5, fontFace: F, fontSize: 18, bold: true, color: C.navy });
    s.addText('Primary KPI', { x: x + 0.34, y: 3.0, w: 5, h: 0.3, fontFace: F, fontSize: 12, bold: true, color: C.grey });
    kpiBox(s, x + 0.34, 3.3, 5.9 - 0.68, 0.55, accent, tint, '', primary);
    s.addText('Secondary', { x: x + 0.34, y: 3.98, w: 5, h: 0.3, fontFace: F, fontSize: 12, bold: true, color: C.grey });
    s.addText(secondary, { x: x + 0.34, y: 4.26, w: 5.9 - 0.66, h: 0.5, fontFace: F, fontSize: 12, color: C.ink, valign: 'top' });
  };
  card(MX, C.blue, C.tBlue, '\uD83D\uDDC4\uFE0F', 'Path A \u2014 Apps', '# of opportunities created (MSX), Stage 1 & 2', '# Micro Hacks repeated by the partner \u00B7 # apps deployed \u00B7 Fabric / Azure ACR pipeline.');
  card(MX + 6.1, C.mag, C.tMag, '\uD83E\uDDE9', 'Path B \u2014 Workloads', '% of managed SDCs that built a Fabric workload', '# workloads per SDC \u00B7 Fabric usage / ACR from SDC end-customers.');
  navyBand(s, MX, 5.05, W - 2 * MX, 1.4, 'North-star', C.cyan, [
    { t: 'The share of Micro Hacks, apps and workloads that are ' },
    { t: 'partner-led, not Microsoft-led', b: true },
    { t: ' \u2014 the motion is healthy when partners repeat it without us.' },
  ]);
}

// ====================================================== 13 · ROADMAP (Gantt with real bars)
{
  const s = p.addSlide();
  head(s, 'Execution Roadmap \u2014 FY27', 'Microsoft FY starts in July. End of Q1: kit in the partner\u2019s hands \u2014 the motion shifts from MS-build to partner-led repeat.');
  const labelW = 4.3, gridX = MX + labelW, gridW = W - MX - gridX, qW = gridW / 4, top = 1.62;
  const quarters = ['Q1 \u00B7 Jul\u2013Sep \u201926', 'Q2 \u00B7 Oct\u2013Dec \u201926', 'Q3 \u00B7 Jan\u2013Mar \u201927', 'Q4 \u00B7 Apr\u2013Jun \u201927'];
  quarters.forEach((q, i) => {
    s.addShape(RR(), { x: gridX + i * qW + 0.04, y: top, w: qW - 0.08, h: 0.5, rectRadius: 0.04, fill: { color: C.tBlue } });
    s.addText(q, { x: gridX + i * qW, y: top, w: qW, h: 0.5, align: 'center', valign: 'middle', fontFace: F, fontSize: 11.5, bold: true, color: C.navy });
  });
  const rows = [
    ['Build \u2014 kit + facilitator pack', C.blue, [0, 0]],
    ['Build \u2014 reference scenarios', C.blue, [0, 0]],
    ['Path A \u2014 Sponsor + pursuit team', C.teal, [0, 0]],
    ['Path A \u2014 Co-deliver Run #1 \u25C6', C.mag, [0, 0]],
    ['Path A \u2014 SIs repeat (own customers)', C.teal, [1, 2]],
    ['Path A \u2014 Scale to other GSIs', C.teal, [1, 3]],
    ['Path B \u2014 SDC first workloads', C.green, [0, 1]],
    ['Path B \u2014 Repeat across portfolio', C.green, [1, 3]],
  ];
  const rh = 0.5, gy = top + 0.5;
  rows.forEach((r, i) => {
    const y = gy + i * rh;
    if (i % 2 === 0) s.addShape(RECT(), { x: MX, y, w: W - 2 * MX, h: rh, fill: { color: 'F1F6FC' } });
    s.addText(r[0], { x: MX + 0.05, y, w: labelW - 0.1, h: rh, valign: 'middle', fontFace: F, fontSize: 11.5, color: C.ink });
    const [a, b] = r[2];
    const bx = gridX + a * qW + 0.08, bw = (b - a + 1) * qW - 0.16;
    s.addShape(RR(), { x: bx, y: y + 0.1, w: bw, h: rh - 0.2, rectRadius: 0.05, fill: { color: r[1] } });
  });
  // grid separators
  for (let i = 1; i < 4; i++) s.addShape(LN(), { x: gridX + i * qW, y: top, w: 0, h: 0.5 + rows.length * rh, line: { color: 'E3EDF9', width: 1 } });
  s.addShape(RR(), { x: MX, y: gy + rows.length * rh + 0.18, w: W - 2 * MX, h: 0.82, rectRadius: 0.08, fill: { color: C.amberBg }, line: { color: C.amberBd, width: 1 } });
  s.addText([
    { text: '\u25C6 Key milestone \u2014 Run #1 co-delivered, end of Q1 (Sep \u201926):  ', options: { bold: true, color: C.amberTx, fontSize: 12.5 } },
    { text: 'first Micro Hack delivered live; partner pursuit team certified. Q2\u2013Q3: partners repeat independently while we scale to other GSIs and SDCs.', options: { color: C.ink, fontSize: 12 } },
  ], { x: MX + 0.3, y: gy + rows.length * rh + 0.18, w: W - 2 * MX - 0.6, h: 0.82, valign: 'middle', fontFace: F });
}

// ====================================================== 14 · THE ASK
{
  const s = p.addSlide();
  head(s, 'The Ask', 'Align this motion as the execution layer for building apps & workloads on Fabric \u2014 not a parallel track.');
  const asks = [
    [C.blue, '\uD83D\uDC64', 'Sponsorship', 'Ahmed + EPS leadership behind one ONE-Microsoft motion'],
    [C.teal, '\uD83D\uDCB5', 'Funding', 'Build the kit + scenarios and run the first co-delivered sessions'],
    [C.mag, '\uD83E\uDD16', 'Workloads PM', 'Align with the Extensibility Toolkit roadmap and the Workload Hub'],
    [C.green, '\uD83D\uDD17', 'ONE Microsoft', 'SDC + Advisory \u2192 one execution layer, not parallel tracks'],
  ];
  const cw = (W - 2 * MX - 3 * 0.28) / 4;
  asks.forEach((a, i) => {
    const x = MX + i * (cw + 0.28);
    topCard(s, x, 1.62, cw, 3.2, a[0]);
    icon(s, x + cw / 2 - 0.5, 2.0, 1.0, a[0], a[1]);
    s.addText(a[2], { x, y: 3.2, w: cw, h: 0.4, align: 'center', fontFace: F, fontSize: 16, bold: true, color: C.navy });
    s.addText(a[3], { x: x + 0.2, y: 3.66, w: cw - 0.4, h: 1.0, align: 'center', fontFace: F, fontSize: 12, color: C.ink, valign: 'top' });
  });
  navyBand(s, MX, 5.1, W - 2 * MX, 1.35, 'What \u201Cgood\u201D looks like', C.cyan, [
    { t: 'every Fabric / app conversation becomes a real opportunity or a built workload \u2014 ' },
    { t: 'generated in the Micro Hack, owned and repeated by the partner.', b: true },
  ]);
}

// ====================================================== 15 · CLOSING (hero)
{
  const s = p.addSlide();
  s.background = { path: HERO };
  brand(s, MX, 0.45, false);
  s.addText('We build it. The partner repeats it.', { x: MX, y: 2.7, w: 12, h: 1.0, fontFace: FL, fontSize: 40, bold: true, color: C.white });
  s.addText([
    { text: 'One motion \u00B7 two paths \u00B7 one repeatable vehicle \u2014 ', options: { color: C.white } },
    { text: 'the \u201CMicro Hack\u201D.', options: { color: C.cyan, bold: true } },
  ], { x: MX, y: 3.85, w: 12, h: 0.5, fontFace: F, italic: true, fontSize: 22 });
  s.addText('Draft for v-team review \u00B7 FY27 EMEA EPS \u2014 Fabric Apps Motion \u00B7 June 2026', { x: MX, y: 6.5, w: 11, h: 0.3, fontFace: F, fontSize: 12, color: 'BFD6F2' });
  brand(s, W - MX - 2.2, 6.95, false);
}

const out = process.argv[2] || 'motion.pptx';
await p.writeFile({ fileName: out });
console.log('Wrote ' + out + ' (' + p.slides.length + ' slides)');
