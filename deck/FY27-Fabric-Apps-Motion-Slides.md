---
marp: true
paginate: true
size: 16:9
title: FY27 EMEA EPS — Fabric Apps Motion — Micro Hack
author: EPS Tech / GTM (EMEA)
---

<style>
:root {
  --blue:#0078d4; --teal:#00b4a6; --navy:#0b2447; --ink:#1b2a3a;
  --grey:#5b6b7b; --panel:#f3f7fb; --line:#dbe6f1; --soft:#eaf3fb; --softteal:#e6f7f4;
}
section {
  font-family:'Segoe UI', Inter, Arial, sans-serif; color:var(--ink);
  background:#fff; padding:44px 60px 64px; font-size:21px;
}
h1{ color:var(--navy); font-size:46px; margin:0 0 6px; }
h2{ color:var(--navy); font-size:33px; margin:0 0 4px; }
h3{ color:var(--navy); font-size:20px; margin:0 0 6px; }
h4{ color:var(--blue); font-size:15px; letter-spacing:.04em; text-transform:uppercase; margin:0 0 6px; }
a{ color:var(--blue); }
strong{ color:var(--navy); }
em{ color:var(--grey); }
.kicker{ color:var(--teal); font-weight:700; letter-spacing:.14em; font-size:14px; }
.rule{ height:5px; width:120px; background:var(--blue); border-radius:3px; margin:6px 0 14px; }
ul{ margin:6px 0; } li{ margin:3px 0; font-size:18px; }
table{ width:100%; border-collapse:collapse; font-size:15.5px; }
th{ background:var(--navy); color:#fff; text-align:left; padding:7px 10px; font-weight:600; }
td{ padding:7px 10px; border-bottom:1px solid var(--line); vertical-align:top; }
tr:nth-child(even) td{ background:#eaf1f8; }
section::after{ color:var(--grey); font-size:12px; }
/* footer note */
.foot{ position:absolute; left:60px; bottom:22px; color:var(--grey); font-size:12px; }

/* title slide */
section.title{ background:var(--navy); color:#fff; }
section.title h1{ color:#fff; }
section.title .band{ position:absolute; top:0; left:0; right:0; height:14px; background:var(--blue); }
section.title .band2{ position:absolute; top:14px; left:0; right:0; height:5px; background:var(--teal); }
section.title .k{ color:var(--teal); font-weight:700; letter-spacing:.2em; font-size:20px; }
section.title strong{ color:#fff; }
section.title .sub{ color:#cfe0f0; font-size:24px; margin-top:8px; }
section.title small{ color:#9fb6ce; }

/* cards */
.cols2{ display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.card{ background:#fff; border:1px solid var(--line); border-radius:12px; padding:16px 18px 14px;
  box-shadow:0 1px 3px rgba(11,36,71,.07); position:relative; overflow:hidden; }
.card::before{ content:''; position:absolute; left:0; top:0; bottom:0; width:8px; }
.card.blue::before{ background:var(--blue); } .card.teal::before{ background:var(--teal); }
.ctag{ display:inline-block; font-size:12px; font-weight:700; letter-spacing:.06em; padding:3px 10px;
  border-radius:20px; margin-bottom:8px; }
.card.blue .ctag{ background:var(--soft); color:var(--blue); }
.card.teal .ctag{ background:var(--softteal); color:#0a7a6e; }
.approach{ color:var(--grey); font-size:15px; margin:4px 0; }
.kpi{ font-weight:700; color:var(--navy); background:#f6faff; border:1px solid var(--line);
  border-radius:8px; padding:6px 10px; font-size:15px; margin:8px 0; }

/* dense motion-on-a-page */
.mp .sub{ color:var(--grey); font-size:18px; margin:0 0 14px; }
.bottom{ display:grid; grid-template-columns:1.3fr .8fr 1.3fr; gap:16px; margin-top:18px; }
.bbox{ background:var(--panel); border:1px solid var(--line); border-radius:10px; padding:12px 14px; font-size:15px; }
.vehicle{ background:linear-gradient(135deg,var(--blue),var(--teal)); color:#fff; border:none; text-align:center; }
.vehicle b{ display:block; font-size:22px; color:#fff; } .vehicle small{ opacity:.9; }
.hl{ color:var(--blue); font-weight:700; }

/* split helpers */
.two{ display:grid; grid-template-columns:1fr 1fr; gap:22px; }
.point{ display:grid; grid-template-columns:230px 1fr; gap:14px; margin:10px 0; }
.point b{ color:var(--navy); }
</style>

<!-- _class: title -->
<!-- _paginate: false -->

<div class="band"></div><div class="band2"></div>

<span class="k">FY27 EMEA EPS</span>

# Fabric Apps Motion

<p class="sub">Two paths to Microsoft Fabric, enabled through the <strong style="color:#fff">Micro Hack</strong></p>

- **Advisory / Apps** — build business apps on Fabric with **Rayfin**
- **ISV / Workloads** — build Fabric workloads with the **Extensibility Toolkit**

<br>

<small>EMEA · EPS Tech / GTM · Draft for v-team review</small>

---

<!-- The dense "motion on a page" (mirrors the one-slider) -->

<div class="mp">
<span class="kicker">FABRIC MOTION · EMEA</span>

## Envision your business with Microsoft Fabric

<p class="sub">One motion, two paths — enabled through the <strong>Micro Hack</strong> (1 day, repeatable)</p>

<div class="cols2">
<div class="card blue">
<span class="ctag">ADVISORY / SI</span>
<h3>Use Microsoft Fabric — SIs build Business Apps</h3>
<p class="approach">Spec-driven · <strong>Rayfin</strong> managed backend (DB · auth · APIs · hosting)</p>
<div class="kpi">KPI — # opportunities (MSX), Stage 1 &amp; 2 · <em>ACR vision</em></div>
<ul><li>Ship enterprise apps fast, on governed data</li><li>Partner-led, repeatable</li></ul>
</div>
<div class="card teal">
<span class="ctag">ISV</span>
<h3>Extend Microsoft Fabric — ISVs build Workloads</h3>
<p class="approach">Code-driven · <strong>Extensibility Toolkit</strong> · runs on OneLake data</p>
<div class="kpi">KPI — # workloads per ISV · <em>Adoption vision (≥1 / ISV)</em></div>
<ul><li>Build once, adopt mechanically across customers</li><li>Path to the Workload Hub</li></ul>
</div>
</div>

<div class="bottom">
<div class="bbox"><h4>Activation — EMEA ecosystem</h4>PwC · KPMG · EY · HVMC · Bain · BCG · McKinsey<br><em>"Build the next page of your business with Microsoft Fabric"</em></div>
<div class="bbox vehicle"><span style="font-size:26px">⚡</span><b>Micro Hack</b><small>1 day — hands-on</small></div>
<div class="bbox"><h4>The ask</h4>Sponsorship (Ahmed + EPS) · Funding · PM lead on workloads<br><span class="hl">ISV + Advisory → ONE Microsoft program</span></div>
</div>
</div>

---

<span class="kicker">STRATEGIC CONTEXT</span>

## Why now

<div class="rule"></div>

<div class="point"><b>Every business ships software</b><div>Building enterprise apps still means months of backend plumbing. <strong>Fabric + Rayfin removes it</strong> — declare your data, ship in one command.</div></div>
<div class="point"><b>AI-era apps need governed data</b><div>Apps &amp; workloads on Fabric inherit <strong>OneLake</strong> governance, security and a single copy of data — no data movement.</div></div>
<div class="point"><b>A large, growing audience</b><div>SIs build customer apps on Fabric; ISVs reach <strong>every Fabric customer</strong> by publishing a workload to the Workload Hub.</div></div>
<div class="point"><b>Partners multiply impact</b><div><strong>+95.6% win rate</strong> and <strong>+46% larger deals</strong> when an opportunity is shared with a partner. Scaling through SIs &amp; ISVs covers the ecosystem.</div></div>

---

<span class="kicker">PATH A — ADVISORY / APPS</span>

## The Apps Micro Hack — a fixed, repeatable day

<div class="rule"></div>

| When | Block | Content |
|------|-------|---------|
| **Morning** | Why build on Fabric | Managed backend, governance on OneLake, time-to-app |
| | Rayfin foundations | Data model = database; auth/APIs/hosting; deploy in one command |
| | Demo | Helios Bicycle Studio built live with the GitHub Copilot CLI |
| **Afternoon** | ⭐ Build sprint 1 | Scaffold, declare data model (Rayfin provisions the DB), core screens |
| | ⭐ Build sprint 2 | Extend, polish, **deploy to Fabric** (`rayfin up`), demo |
| | Plan & next steps | Turn the app into an MSX opportunity + a 90-day plan |

*The afternoon is the differentiator — teams ship a real working app on Fabric.* · Primary KPI: **# opportunities (MSX)**.

---

<span class="kicker">PATH B — ADOPTION / WORKLOADS</span>

## Build once, adopt mechanically

<div class="rule"></div>

<div class="cols2">
<div class="card teal">
<h3>Objective</h3>
<ul>
<li>Every managed ISV builds a Fabric workload (Extensibility Toolkit).</li>
<li>Embed it in the offer — the product runs <strong>natively in Fabric</strong>.</li>
<li>Every customer consumes a Fabric workload by design.</li>
<li>Grow adoption mechanically, not via one-off projects.</li>
</ul>
</div>
<div class="card blue">
<h3>Build once → adopt many</h3>
<ul>
<li>ISV builds the workload once (reads OneLake, runs their logic).</li>
<li>Customers 1…N each run it natively in Fabric.</li>
<li>Adoption scales with the ISV's business — no per-customer selling.</li>
<li>Repeat across modules → publish to the Workload Hub.</li>
</ul>
</div>
</div>

<p style="margin-top:14px"><em>Primary KPI: <strong>#workloads per ISV</strong> · Secondary: Fabric usage / ACR through ISV end-customers.</em></p>

---

<span class="kicker">PATH B — MICRO HACK 2</span>

## The Workloads Micro Hack — a fixed, repeatable day

<div class="rule"></div>

| When | Block | Content |
|------|-------|---------|
| **Morning** | Why build a workload | Reach every Fabric customer via the Workload Hub; run on OneLake |
| | Extensibility Toolkit foundations | Workload structure, Entra app, Dev Gateway, manifest, OBO token |
| | Demo | GreenGrid Scorecard running live inside Fabric |
| **Afternoon** | ⭐ Build sprint 1 | Clone toolkit, `Setup.ps1` (Entra app), Dev server + gateway, Hello World, `CreateNewItem` |
| | ⭐ Build sprint 2 | Read `Files/sites.csv` from OneLake, call the backend, render the scorecard, polish |
| | Plan & next steps | Embed the workload in the ISV offer + path to **publish on the Workload Hub** |

*Same shape as Micro Hack 1 — but the artifact is a Fabric workload the ISV embeds in its offer, so every customer adopts Fabric.* · Primary KPI: **# workloads per ISV**.

---

<span class="kicker">THE BUILD</span>

## The Micro Hack kit — the one asset we create

<div class="rule"></div>

<p style="color:var(--grey);font-size:18px;margin:0 0 12px">A reusable enablement kit (not a product): two ready-to-run reference scenarios, full solutions, the pre-deployed SaaS, and facilitator materials — used live in the day, then repeated by the partner.</p>

<div class="cols2">
<div class="card blue">
<span class="ctag">SCENARIO 1 · APPS</span>
<h3>Helios Bicycle Studio</h3>
<ul><li>Business app on <strong>Rayfin</strong></li><li>Data model = database · screens · app-level roles</li><li>Deploy with <code>rayfin up</code></li><li>Code: <code>src/apprayfin/</code> · workbook + solution</li></ul>
</div>
<div class="card teal">
<span class="ctag">SCENARIO 2 · WORKLOADS</span>
<h3>GreenGrid Scorecard</h3>
<ul><li>Sustainability workload (Extensibility Toolkit)</li><li>Reads <code>Files/sites.csv</code> from OneLake (OBO)</li><li>Calls the pre-deployed GreenGrid SaaS (the algorithm)</li><li>Code: <code>src/workloadISV/</code></li></ul>
</div>
</div>

---

<span class="kicker">KPIS & SUCCESS METRICS</span>

## How we measure the motion

<div class="rule"></div>

| Path | Leading indicator | Outcome KPI |
|------|-------------------|-------------|
| **A — Advisory / Apps** | # Micro Hacks repeated by partner; # apps deployed to Fabric | **# opportunities (MSX)**, Stage 1 & 2; Fabric/Azure ACR pipeline |
| **B — ISV Adoption** | # managed ISVs engaged; # offers with a workload built | **# workloads per ISV**; Fabric usage / ACR from end-customers |
| **Motion health** | Ratio of partner-led vs MS-led sessions | Partner-sourced opportunities & adoptions share |

<p style="margin-top:12px"><strong style="color:var(--blue)">North-star:</strong> the share of Micro Hacks, apps and workloads that are <strong>partner-led, not Microsoft-led</strong>.</p>

---

<span class="kicker">EXECUTION ROADMAP</span>

## FY27 — we build, then partners repeat

<div class="rule"></div>

| Workstream | Q1 Jul–Sep | Q2 Oct–Dec | Q3 Jan–Mar | Q4 Apr–Jun |
|------------|:---:|:---:|:---:|:---:|
| Build — Micro Hack kit + scenarios | █████ | | | |
| Path A — Co-deliver Run #1 ◆ | █████ | | | |
| Path A — SIs repeat (own customers) | | █████ | █████ | |
| Path A — Scale advisory ecosystem | | █████ | █████ | █████ |
| Path B — ISV first workloads | █████ | █████ | | |
| Path B — Repeat + Workload Hub | | █████ | █████ | █████ |

*◆ Run #1 co-delivered end of Q1 (Sep '26): the kit is in partners' hands — the motion shifts from Microsoft build to partner-led repeat.*

---

<span class="kicker">THE ASK</span>

## What we need to land the motion

<div class="rule"></div>

<div class="two">
<div>
<div class="card blue"><h3>Sponsorship</h3>Ahmed + EPS leadership.</div>
<br>
<div class="card blue"><h3>Funding</h3>Build the Micro Hack kit + reference scenarios; run the first co-delivered sessions.</div>
</div>
<div>
<div class="card teal"><h3>PM lead on workloads</h3>Align with the Extensibility Toolkit roadmap and the Workload Hub.</div>
<br>
<div class="card teal"><h3>ONE Microsoft program</h3>ISV + Advisory → one execution layer, not parallel tracks.</div>
</div>
</div>

---

<!-- _class: title -->
<!-- _paginate: false -->

<div class="band"></div><div class="band2"></div>

# Build the next page of your business with Microsoft Fabric

<p class="sub">One Micro Hack day · two paths (Apps + Workloads) · partner-led repeat</p>
