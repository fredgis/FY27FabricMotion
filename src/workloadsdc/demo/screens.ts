import { onelakeSites } from '../src/seed/onelake-sample.js';
import { scoreSites } from '../src/services/green-score.js';
import { buildPortfolio } from '../src/services/scorecard.js';
import type { GreenTier, ScoredSite } from '../src/domain/types.js';

const BRAND = {
  blue: '#0078d4',
  teal: '#00b4a6',
  green: '#2faa6a',
  amber: '#d9a300',
  red: '#d1453b',
  ink: '#1b2a3a',
  navy: '#0b2447',
  line: '#dbe6f1',
  panel: '#f3f7fb',
};

function escapeHtml(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function tierColor(tier: GreenTier): string {
  return tier === 'A' ? BRAND.green : tier === 'B' ? BRAND.amber : BRAND.red;
}

function tierBadge(tier: GreenTier): string {
  const c = tierColor(tier);
  const bg = tier === 'A' ? '#e7f6ee' : tier === 'B' ? '#fbf3da' : '#fbe7e5';
  return `<span class="tier" style="background:${bg};color:${c}">Tier ${tier}</span>`;
}

function leaf(color: string, size = 18): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 4C9 4 4 11 4 20c8 0 16-4 16-16Z" fill="${color}" opacity="0.18"/>
    <path d="M20 4C9 4 4 11 4 20c8 0 16-4 16-16Z" stroke="${color}" stroke-width="1.6"/>
    <path d="M7 17C10 12 14 9 18 7" stroke="${color}" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`;
}

function gauge(score: number, color: string, size = 168): string {
  const r = 70;
  const c = 2 * Math.PI * r;
  const filled = (score / 100) * c;
  const cx = size / 2;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
    <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="#eef2f6" stroke-width="16"/>
    <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="${color}" stroke-width="16"
      stroke-linecap="round" stroke-dasharray="${filled} ${c - filled}"
      transform="rotate(-90 ${cx} ${cx})"/>
    <text x="${cx}" y="${cx - 4}" text-anchor="middle" font-family="Segoe UI" font-size="44" font-weight="700" fill="${BRAND.navy}">${score}</text>
    <text x="${cx}" y="${cx + 22}" text-anchor="middle" font-family="Segoe UI" font-size="13" fill="#6b7b8b">/ 100 green score</text>
  </svg>`;
}

function bar(pct: number, color: string): string {
  return `<span class="bar"><span style="width:${Math.max(0, Math.min(100, pct))}%;background:${color}"></span></span>`;
}

function layout(title: string, body: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=1280, initial-scale=1"/>
<title>${escapeHtml(title)}</title>
<style>
  * { box-sizing:border-box; }
  body { margin:0; font-family:'Segoe UI', Inter, Arial, sans-serif; color:${BRAND.ink}; background:#eef3f8; }
  .fabricbar { height:48px; background:#117865; background:linear-gradient(90deg,#0b6b5f,#00b4a6);
    display:flex; align-items:center; gap:12px; padding:0 18px; color:#fff; }
  .fabricbar .dots { font-size:18px; opacity:.9; }
  .fabricbar .crumbs { font-size:13px; opacity:.95; }
  .fabricbar .crumbs b { font-weight:700; }
  .fabricbar .spacer { margin-left:auto; }
  .fabricbar .ava { width:30px; height:30px; border-radius:50%; background:rgba(255,255,255,.25);
    display:grid; place-items:center; font-size:12px; font-weight:700; }
  .itembar { background:#fff; border-bottom:1px solid ${BRAND.line}; padding:14px 26px;
    display:flex; align-items:center; gap:12px; }
  .itembar .ic { width:34px; height:34px; border-radius:9px; background:#e7f6ee; display:grid; place-items:center; }
  .itembar h1 { font-size:18px; margin:0; }
  .itembar .sub { font-size:12px; color:#6b7b8b; }
  .main { padding:22px 26px; }
  .prov { display:flex; align-items:center; gap:10px; margin-bottom:18px; flex-wrap:wrap; }
  .chip { display:flex; align-items:center; gap:7px; font-size:12.5px; padding:7px 12px; border-radius:20px;
    background:#fff; border:1px solid ${BRAND.line}; color:#3a4a5a; }
  .chip.blue { border-color:#bcd9f5; background:#eaf3fb; color:#0a5bb0; }
  .chip.green { border-color:#bfe6cf; background:#e7f6ee; color:#1d7a4d; }
  .arrow { color:#9aa9b8; font-size:16px; }
  .grid { display:grid; grid-template-columns: 360px 1fr; gap:18px; }
  .card { background:#fff; border:1px solid ${BRAND.line}; border-radius:14px; box-shadow:0 1px 2px rgba(11,36,71,.05); }
  .card-h { padding:14px 18px; border-bottom:1px solid ${BRAND.line}; display:flex; align-items:center; justify-content:space-between; }
  .card-h h2 { font-size:15px; margin:0; }
  .gaugewrap { padding:18px; display:flex; flex-direction:column; align-items:center; gap:6px; }
  .tierdist { display:flex; gap:8px; margin-top:6px; }
  .tpill { font-size:12px; font-weight:600; padding:5px 11px; border-radius:14px; }
  .muted { color:#7a8a9a; font-size:12px; }
  .sites { display:grid; grid-template-columns: repeat(2, 1fr); gap:14px; padding:18px; }
  .site { border:1px solid ${BRAND.line}; border-radius:12px; padding:14px; }
  .site .top { display:flex; align-items:center; justify-content:space-between; }
  .site .name { font-weight:700; font-size:14px; }
  .site .city { font-size:12px; color:#7a8a9a; }
  .site .score { font-size:26px; font-weight:700; color:${BRAND.navy}; }
  .tier { font-size:11px; font-weight:700; padding:3px 9px; border-radius:8px; }
  .row { display:flex; align-items:center; gap:8px; margin-top:10px; font-size:12px; color:#3a4a5a; }
  .row .lbl { width:78px; color:#6b7b8b; }
  .bar { flex:1; height:8px; border-radius:6px; background:#eef2f6; overflow:hidden; display:inline-block; }
  .bar > span { display:block; height:100%; }
  .tip { margin-top:10px; font-size:12.5px; color:#1d7a4d; display:flex; align-items:center; gap:6px; }
  .tip.warn { color:#b3261e; }
  .tpill { display:inline-block; }
  .kbig { font-size:30px; font-weight:700; color:${BRAND.navy}; }
  .break { display:grid; gap:14px; padding:18px; }
  .blabel { display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px; }
  .reco { margin:0 18px 18px; padding:14px 16px; border-radius:12px; background:#e7f6ee; color:#1d7a4d; font-size:13.5px; }
</style></head>
<body>
  <div class="fabricbar">
    <span class="dots">▦</span>
    <span class="crumbs">Microsoft Fabric &nbsp;›&nbsp; <b>Contoso Energy</b> &nbsp;›&nbsp; GreenGrid Scorecard</span>
    <span class="spacer"></span>
    <span class="ava">AN</span>
  </div>
  <div class="itembar">
    <span class="ic">${leaf(BRAND.green, 20)}</span>
    <div>
      <h1>GreenGrid Scorecard</h1>
      <div class="sub">Workload item · powered by GreenGrid Analytics</div>
    </div>
  </div>
  <div class="main">${body}</div>
</body></html>`;
}

export function renderScorecard(): string {
  const sites = scoreSites(onelakeSites);
  const p = buildPortfolio(sites);
  const portfolioColor = p.avgScore >= 75 ? BRAND.green : p.avgScore >= 50 ? BRAND.amber : BRAND.red;

  const tierDist = (['A', 'B', 'C'] as GreenTier[])
    .map((t) => {
      const c = tierColor(t);
      const bg = t === 'A' ? '#e7f6ee' : t === 'B' ? '#fbf3da' : '#fbe7e5';
      return `<span class="tpill" style="background:${bg};color:${c}">Tier ${t}: ${p.tierCounts[t]}</span>`;
    })
    .join('');

  const siteCard = (s: ScoredSite): string => {
    const warn = s.tip !== 'On track — maintain';
    return `<div class="site">
      <div class="top">
        <div><div class="name">${escapeHtml(s.name)}</div><div class="city">${escapeHtml(s.city)}</div></div>
        <div style="text-align:right"><div class="score">${s.greenScore}</div>${tierBadge(s.tier)}</div>
      </div>
      <div class="row"><span class="lbl">Renewable</span>${bar(s.renewablePct, BRAND.green)}<span class="muted">${s.renewablePct}%</span></div>
      <div class="row"><span class="lbl">Efficiency</span>${bar(s.efficiency, BRAND.teal)}<span class="muted">${s.efficiency}</span></div>
      <div class="tip ${warn ? 'warn' : ''}">${warn ? '⚠' : '✓'} ${escapeHtml(s.tip)}</div>
    </div>`;
  };

  const body = `
    <div class="prov">
      <span class="chip blue">🟦 OneLake · <b>sites</b> (${onelakeSites.length} rows)</span>
      <span class="arrow">→</span>
      <span class="chip green">${leaf(BRAND.green, 15)} GreenGrid SaaS · <b>/score</b></span>
      <span class="arrow">→</span>
      <span class="chip">📊 Fabric item · scorecard</span>
    </div>
    <div class="grid">
      <div class="card">
        <div class="card-h"><h2>Portfolio score</h2></div>
        <div class="gaugewrap">
          ${gauge(p.avgScore, portfolioColor)}
          <div class="tierdist">${tierDist}</div>
          <div class="muted">${p.totalSites} sites · avg renewable ${p.avgRenewablePct}%</div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><h2>Sites</h2><span class="muted">Best: ${escapeHtml(p.best.city)} · Watch: ${escapeHtml(p.worst.city)}</span></div>
        <div class="sites">${sites.map(siteCard).join('')}</div>
      </div>
    </div>`;
  return layout('GreenGrid Scorecard — Fabric workload', body);
}

export function renderSiteDetail(): string {
  const sites = scoreSites(onelakeSites);
  const s = sites[0]; // best site
  const renewableContribution = +(s.renewablePct * 0.6).toFixed(1);
  const efficiencyContribution = +(s.efficiency * 0.4).toFixed(1);
  const warn = s.tip !== 'On track — maintain';

  const body = `
    <div class="prov">
      <span class="chip blue">🟦 OneLake · <b>sites</b></span>
      <span class="arrow">→</span>
      <span class="chip green">${leaf(BRAND.green, 15)} GreenGrid SaaS</span>
      <span class="arrow">→</span>
      <span class="chip">🔎 Site detail</span>
    </div>
    <div class="grid">
      <div class="card">
        <div class="card-h"><h2>${escapeHtml(s.name)}</h2>${tierBadge(s.tier)}</div>
        <div class="gaugewrap">
          ${gauge(s.greenScore, tierColor(s.tier))}
          <div class="muted">${escapeHtml(s.city)} · ${s.energyKwh} kWh · ${s.renewablePct}% renewable</div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><h2>Score breakdown</h2></div>
        <div class="break">
          <div>
            <div class="blabel"><span>Renewable sourcing (×0.6)</span><b>${renewableContribution}</b></div>
            ${bar(s.renewablePct, BRAND.green)}
          </div>
          <div>
            <div class="blabel"><span>Energy efficiency (×0.4)</span><b>${efficiencyContribution}</b></div>
            ${bar(s.efficiency, BRAND.teal)}
          </div>
          <div>
            <div class="blabel"><span>Green score</span><b>${s.greenScore} / 100</b></div>
            ${bar(s.greenScore, tierColor(s.tier))}
          </div>
        </div>
        <div class="reco ${warn ? '' : ''}">${warn ? '⚠' : '✓'} Recommendation: ${escapeHtml(s.tip)}.</div>
      </div>
    </div>`;
  return layout('GreenGrid Scorecard — Site detail', body);
}
