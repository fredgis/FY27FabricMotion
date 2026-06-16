# GreenGrid Workload — SDC Solution Kit

Reference implementation for the **SDC Workloads (Fabric Extensibility Toolkit)** micro-hack
(scenario 2). Scenario: **GreenGrid Analytics** (fictional SDC).

It has two parts:

1. **The SaaS prerequisite** (`saas/`) — a tiny GreenGrid Score API the SDC deploys **before**
   the workshop. The workload calls it at runtime.
2. **The Fabric workload** (`workload/`) — a `GreenGridScorecard` item that reads the
   customer's `sites` table from **OneLake** and renders a graphical sustainability scorecard.

## Folder layout

```text
src/workloadsdc/
├── package.json                 # audit / saas / demo scripts (tsx + express + playwright)
├── saas/
│   ├── server.ts                # GreenGrid Score API (/health, /score)
│   └── README.md
├── workload/
│   ├── Manifest/                # product.json + item manifest
│   ├── app/                     # React item editor (Extensibility Toolkit + Fluent)
│   ├── .env.template
│   └── README.md                # dev-gateway run instructions
├── src/
│   ├── domain/types.ts
│   ├── seed/onelake-sample.ts   # sample OneLake `sites` data
│   ├── services/
│   │   ├── green-score.ts       # SaaS scoring engine (shared with the demo)
│   │   └── scorecard.ts         # workload-side portfolio aggregation
│   └── specs/greengrid-workload-spec.md
└── demo/                        # renders the scorecard screens & captures screenshots
```

## How trainers use this kit

1. Deploy the SaaS (`saas/`) **before** the day — this is the non-negotiable prerequisite.
2. Use `src/specs/greengrid-workload-spec.md` as the prompt baseline for the workload.
3. The scoring logic in `src/services/` is the answer key (shared by SaaS and demo).
4. Build the workload in dev mode with the **Dev Gateway** (see `workload/README.md`).

## Run the SaaS + audit + screenshots

```bash
npm install
npm run saas:start    # start the GreenGrid Score API on http://localhost:8787
npm run demo          # audit logic -> build HTML -> capture screenshots
```

See [`demo/README.md`](demo/README.md). Screenshots are written to `docs/images/`.
