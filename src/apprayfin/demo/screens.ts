import {
  heliosBicycles,
  heliosMechanics,
  heliosPitStopTickets,
} from '../src/seed/helios-demo-seed.js';
import { computeBikeHealth } from '../src/services/bike-health.js';
import { assignPitStopTickets } from '../src/services/pit-stop-assignment.js';
import { buildBusinessKpiSnapshot } from '../src/services/business-kpi.js';
import type { BicycleSnapshot, PitStopStatus } from '../src/domain/types.js';

const BRAND = {
  blue: '#0078d4',
  teal: '#00b4a6',
  ink: '#1b2a3a',
  navy: '#0b2447',
  panel: '#f3f7fb',
  line: '#dbe6f1',
};

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function ticketLabel(ticketId: string): string {
  return ticketId.replace(/^ticket-/, 'T-');
}

function statusPill(status: BicycleSnapshot['status']): string {
  const map: Record<BicycleSnapshot['status'], { label: string; bg: string; fg: string }> = {
    ready: { label: 'Ready', bg: '#e6f7f4', fg: '#0a7a6e' },
    'in-ride': { label: 'In ride', bg: '#eaf3fb', fg: '#0a5bb0' },
    'pit-stop-needed': { label: 'Pit-stop needed', bg: '#fdecea', fg: '#b3261e' },
  };
  const s = map[status];
  return `<span class="pill" style="background:${s.bg};color:${s.fg}">${s.label}</span>`;
}

function healthTag(tag: 'star' | 'good' | 'watch'): string {
  const map = {
    star: { label: '★ Star bike', bg: '#fff4d6', fg: '#8a6100' },
    good: { label: 'Good', bg: '#e6f7f4', fg: '#0a7a6e' },
    watch: { label: '⚠ Watch', bg: '#fdecea', fg: '#b3261e' },
  };
  const t = map[tag];
  return `<span class="pill" style="background:${t.bg};color:${t.fg}">${t.label}</span>`;
}

function moodCell(mood: number): string {
  const full = Math.round(mood);
  const stars = '★'.repeat(full) + '☆'.repeat(5 - full);
  const color = mood < 3 ? '#b3261e' : mood >= 4.5 ? '#0a7a6e' : '#8a6100';
  return `<span style="color:${color};font-weight:600">${stars}</span> <span class="muted">${mood.toFixed(1)}</span>`;
}

function layout(title: string, activeNav: string, body: string): string {
  const navItems = [
    { id: 'board', label: 'Bicycle Board', icon: '🚲' },
    { id: 'queue', label: 'Pit-Stop Queue', icon: '🔧' },
    { id: 'mood', label: 'Ride Mood & KPI', icon: '📈' },
  ];
  const nav = navItems
    .map(
      (item) => `
      <a class="nav-item ${item.id === activeNav ? 'active' : ''}">
        <span class="nav-icon">${item.icon}</span>${item.label}
      </a>`
    )
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=1280, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Segoe UI', Inter, Roboto, Arial, sans-serif; color: ${BRAND.ink}; background: #eef3f8; }
  .app { display: grid; grid-template-columns: 248px 1fr; min-height: 760px; }
  .side { background: ${BRAND.navy}; color: #fff; padding: 22px 16px; }
  .brand { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 18px; margin-bottom: 28px; }
  .brand .logo { width: 32px; height: 32px; border-radius: 9px; background: linear-gradient(135deg, ${BRAND.blue}, ${BRAND.teal}); display: grid; place-items: center; font-size: 18px; }
  .brand small { display:block; font-weight:500; font-size:11px; opacity:.7; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 11px 12px; border-radius: 9px; margin-bottom: 4px; color: #cfe0f0; font-size: 14px; cursor: default; }
  .nav-item.active { background: rgba(255,255,255,.12); color: #fff; font-weight: 600; }
  .nav-icon { width: 20px; text-align: center; }
  .side-foot { margin-top: 28px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,.12); font-size: 12px; opacity:.75; }
  .main { padding: 26px 32px; }
  .topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
  .topbar h1 { font-size: 22px; margin: 0; }
  .topbar .sub { color: #5b6b7b; font-size: 13px; margin-top: 4px; }
  .user { display:flex; align-items:center; gap:10px; font-size:13px; color:#3a4a5a; }
  .avatar { width:34px;height:34px;border-radius:50%; background:linear-gradient(135deg,#0078d4,#00b4a6); color:#fff; display:grid; place-items:center; font-weight:600; }
  .card { background: #fff; border: 1px solid ${BRAND.line}; border-radius: 14px; box-shadow: 0 1px 2px rgba(11,36,71,.05); }
  .card-h { padding: 16px 18px; border-bottom: 1px solid ${BRAND.line}; display:flex; align-items:center; justify-content:space-between; }
  .card-h h2 { font-size: 15px; margin: 0; }
  .filters { display:flex; gap:10px; }
  .chip { font-size:12px; padding:6px 11px; border-radius:20px; border:1px solid ${BRAND.line}; background:${BRAND.panel}; color:#3a4a5a; }
  .chip.on { background:#eaf3fb; border-color:#bcd9f5; color:#0a5bb0; font-weight:600; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing:.04em; color: #6b7b8b; padding: 12px 18px; border-bottom: 1px solid ${BRAND.line}; }
  td { padding: 14px 18px; border-bottom: 1px solid #eef2f6; font-size: 14px; }
  tr:last-child td { border-bottom: none; }
  .pill { font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 20px; display:inline-block; }
  .muted { color:#7a8a9a; font-size:12px; }
  .mono { font-variant-numeric: tabular-nums; font-weight:600; }
  .grid3 { display:grid; grid-template-columns: repeat(3,1fr); gap:16px; }
  .kanban { display:grid; grid-template-columns: repeat(3,1fr); gap:16px; padding:18px; }
  .col-h { font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:#6b7b8b; margin-bottom:10px; display:flex; justify-content:space-between; }
  .count { background:#eaf3fb; color:#0a5bb0; border-radius:12px; padding:1px 9px; font-size:12px; }
  .ticket { background:#fff; border:1px solid ${BRAND.line}; border-left:4px solid ${BRAND.blue}; border-radius:10px; padding:12px 13px; margin-bottom:10px; }
  .ticket.high { border-left-color:#e8584c; }
  .ticket.normal { border-left-color:${BRAND.teal}; }
  .ticket .code { font-weight:700; font-size:13px; }
  .ticket .issue { font-size:13px; color:#3a4a5a; margin:6px 0; }
  .ticket .meta { font-size:12px; color:#7a8a9a; display:flex; align-items:center; gap:8px; }
  .prio { font-size:11px; font-weight:700; padding:2px 8px; border-radius:6px; }
  .prio.high { background:#fdecea; color:#b3261e; }
  .prio.normal { background:#e6f7f4; color:#0a7a6e; }
  .kpi { padding:18px; }
  .kpi .label { font-size:12px; color:#6b7b8b; text-transform:uppercase; letter-spacing:.04em; }
  .kpi .value { font-size:30px; font-weight:700; margin-top:8px; color:${BRAND.navy}; }
  .kpi .delta { font-size:12px; margin-top:6px; color:#0a7a6e; }
  .kpi.accent { background:linear-gradient(135deg,#0078d4,#00b4a6); color:#fff; }
  .kpi.accent .label, .kpi.accent .value, .kpi.accent .delta { color:#fff; }
  .bar { height:8px; border-radius:6px; background:#eef2f6; overflow:hidden; margin-top:12px; }
  .bar > span { display:block; height:100%; background:linear-gradient(90deg,#0078d4,#00b4a6); }
  .section-title { font-size:14px; font-weight:700; margin:24px 0 12px; }
</style>
</head>
<body>
  <div class="app">
    <aside class="side">
      <div class="brand">
        <span class="logo">🚲</span>
        <span>Helios Bicycle<small>Bicycle Studio</small></span>
      </div>
      ${nav}
      <div class="side-foot">Built on Microsoft Fabric · Rayfin<br/>EMEA Operations</div>
    </aside>
    <main class="main">
      ${body}
    </main>
  </div>
</body>
</html>`;
}

export function renderBoard(): string {
  const rows = heliosBicycles
    .map((bike) => {
      const health = computeBikeHealth(bike);
      return `<tr>
        <td><span class="mono">${escapeHtml(bike.bikeCode)}</span></td>
        <td>${escapeHtml(bike.station)}</td>
        <td>${statusPill(bike.status)}</td>
        <td>${moodCell(bike.moodScore)}</td>
        <td><span class="mono">${health.healthScore}</span></td>
        <td>${healthTag(health.celebrationTag)}</td>
      </tr>`;
    })
    .join('');

  const body = `
    <div class="topbar">
      <div>
        <h1>Bicycle Board</h1>
        <div class="sub">Fleet readiness across Helios stations — live operations view</div>
      </div>
      <div class="user"><span>Operations Manager</span><span class="avatar">OM</span></div>
    </div>
    <div class="card">
      <div class="card-h">
        <h2>Bicycles (${heliosBicycles.length})</h2>
        <div class="filters">
          <span class="chip">All stations</span>
          <span class="chip on">Amsterdam Central</span>
          <span class="chip">Status: any</span>
        </div>
      </div>
      <table>
        <thead><tr>
          <th>Bike code</th><th>Station</th><th>Status</th><th>Rider mood</th><th>Health</th><th>Tag</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  return layout('Bicycle Board — Helios Bicycle Studio', 'board', body);
}

export function renderQueue(): string {
  const assignments = assignPitStopTickets(heliosPitStopTickets, heliosMechanics);
  const mechanicById = new Map(heliosMechanics.map((m) => [m.mechanicId, m.displayName]));

  const enriched = heliosPitStopTickets.map((ticket) => {
    const result = assignments.find((a) => a.ticketId === ticket.ticketId);
    const mechanicName = result?.assignedMechanicId
      ? mechanicById.get(result.assignedMechanicId) ?? 'Unassigned'
      : 'Unassigned';
    const status: PitStopStatus = result?.assignedMechanicId ? 'assigned' : 'new';
    return { ticket, mechanicName, status, note: result?.note ?? '' };
  });

  const columns: { key: PitStopStatus; label: string }[] = [
    { key: 'new', label: 'New' },
    { key: 'assigned', label: 'Assigned' },
    { key: 'done', label: 'Done' },
  ];

  const renderTicket = (e: (typeof enriched)[number]): string => {
    const t = e.ticket;
    return `<div class="ticket ${t.priority}">
      <div class="code">${escapeHtml(ticketLabel(t.ticketId))}</div>
      <div class="issue">${escapeHtml(t.issue)}</div>
      <div class="meta">
        <span class="prio ${t.priority}">${t.priority.toUpperCase()}</span>
        <span>${escapeHtml(t.station)}</span>
      </div>
      ${
        e.status === 'assigned'
          ? `<div class="meta" style="margin-top:8px">👤 ${escapeHtml(e.mechanicName)} · <span class="muted">${escapeHtml(e.note)}</span></div>`
          : ''
      }
    </div>`;
  };

  const colHtml = columns
    .map((col) => {
      const items = col.key === 'done' ? [] : enriched.filter((e) => e.status === col.key);
      const cards = items.length
        ? items.map(renderTicket).join('')
        : `<div class="muted" style="padding:8px 2px">No tickets</div>`;
      return `<div>
        <div class="col-h"><span>${col.label}</span><span class="count">${items.length}</span></div>
        ${cards}
      </div>`;
    })
    .join('');

  const body = `
    <div class="topbar">
      <div>
        <h1>Pit-Stop Queue</h1>
        <div class="sub">Auto-assignment by priority, station match and mechanic load</div>
      </div>
      <div class="user"><span>Operations Manager</span><span class="avatar">OM</span></div>
    </div>
    <div class="card">
      <div class="card-h"><h2>Maintenance flow</h2><span class="chip on">Auto-assign ON</span></div>
      <div class="kanban">${colHtml}</div>
    </div>`;
  return layout('Pit-Stop Queue — Helios Bicycle Studio', 'queue', body);
}

export function renderMood(): string {
  const avgMood =
    heliosBicycles.reduce((sum, b) => sum + b.moodScore, 0) / heliosBicycles.length;
  const pitStopCount = heliosBicycles.filter((b) => b.status === 'pit-stop-needed').length;

  const kpi = buildBusinessKpiSnapshot({
    workshopsDelivered: 8,
    workshopsConvertedToPoC: 4,
    poCsConvertedToOpportunity: 3,
  });

  const moodRows = heliosBicycles
    .map(
      (b) => `<tr>
        <td><span class="mono">${escapeHtml(b.bikeCode)}</span></td>
        <td>${escapeHtml(b.station)}</td>
        <td>${moodCell(b.moodScore)}</td>
        <td>${
          b.moodScore < 3
            ? '<span class="pill" style="background:#fdecea;color:#b3261e">Low mood</span>'
            : '<span class="muted">OK</span>'
        }</td>
      </tr>`
    )
    .join('');

  const body = `
    <div class="topbar">
      <div>
        <h1>Ride Mood &amp; Business KPI</h1>
        <div class="sub">Operational quality signal + advisory pipeline outlook</div>
      </div>
      <div class="user"><span>Operations Manager</span><span class="avatar">OM</span></div>
    </div>

    <div class="grid3">
      <div class="card kpi">
        <div class="label">Average rider mood</div>
        <div class="value">${avgMood.toFixed(1)} <span style="font-size:16px;color:#7a8a9a">/ 5</span></div>
        <div class="bar"><span style="width:${(avgMood / 5) * 100}%"></span></div>
      </div>
      <div class="card kpi">
        <div class="label">Bikes needing pit-stop</div>
        <div class="value">${pitStopCount}</div>
        <div class="delta" style="color:#b3261e">Action needed today</div>
      </div>
      <div class="card kpi accent">
        <div class="label">Projected opportunities (next quarter)</div>
        <div class="value">${kpi.projectedOpportunitiesNextQuarter}</div>
        <div class="delta">From ${kpi.workshopsDelivered} workshops delivered</div>
      </div>
    </div>

    <div class="section-title">Advisory KPI funnel (MSX view)</div>
    <div class="grid3">
      <div class="card kpi">
        <div class="label">Workshops delivered</div>
        <div class="value">${kpi.workshopsDelivered}</div>
      </div>
      <div class="card kpi">
        <div class="label">PoC conversion</div>
        <div class="value">${Math.round(kpi.poCRate * 100)}%</div>
        <div class="delta">${kpi.workshopsConvertedToPoC} PoCs</div>
      </div>
      <div class="card kpi">
        <div class="label">Opportunity conversion</div>
        <div class="value">${Math.round(kpi.opportunityRate * 100)}%</div>
        <div class="delta">${kpi.poCsConvertedToOpportunity} opportunities</div>
      </div>
    </div>

    <div class="section-title">Recent ride mood by bike</div>
    <div class="card">
      <table>
        <thead><tr><th>Bike code</th><th>Station</th><th>Rider mood</th><th>Flag</th></tr></thead>
        <tbody>${moodRows}</tbody>
      </table>
    </div>`;
  return layout('Ride Mood & KPI — Helios Bicycle Studio', 'mood', body);
}
