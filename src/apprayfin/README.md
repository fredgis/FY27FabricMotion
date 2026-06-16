# Helios Bicycle Business App - Rayfin Solution Kit

This folder contains the reference implementation assets for the **Helios Bicycle**
Business Apps micro-hack (end-customer scenario, Rayfin track).

## Scope

- Rayfin data model for bicycle operations.
- Business logic services used by the trainer solution path.
- Seed payloads for workshop demos.
- A ready-to-use Rayfin app specification prompt.
- A runnable demo that produces the solution screenshots from the real code.

## Folder layout

```text
src/apprayfin/
├── package.json                # demo & audit scripts (tsx + playwright)
├── rayfin/
│   ├── rayfin.yml
│   └── data/
│       ├── Bicycle.ts
│       ├── MechanicProfile.ts
│       ├── PitStopTicket.ts
│       ├── RideSession.ts
│       └── schema.ts
├── src/
│   ├── domain/types.ts
│   ├── seed/helios-demo-seed.ts
│   ├── services/
│   │   ├── bike-health.ts
│   │   ├── business-kpi.ts
│   │   └── pit-stop-assignment.ts
│   └── specs/helios-bicycle-app-spec.md
└── demo/                       # renders screens & captures screenshots
    ├── audit.ts
    ├── screens.ts
    ├── build-demo.ts
    └── capture.mjs
```

## How trainers use this kit

1. Use `src/specs/helios-bicycle-app-spec.md` as the baseline prompt for Rayfin generation.
2. Keep the data model in `rayfin/data/` as the canonical schema.
3. Use service functions in `src/services/` as the answer key logic during coaching.
4. Use `src/seed/helios-demo-seed.ts` to ensure the workshop dataset matches the scenario.

## Run the audit & regenerate screenshots

```bash
npm install
npm run demo     # audit business logic -> build HTML screens -> capture PNGs
```

See [`demo/README.md`](demo/README.md). Screenshots are written to `docs/images/`.

## Relation with workshop docs

- Setup guide: `docs/microhack-1-business-apps-setup.md`
- Participant workbook: `docs/microhack-1-business-apps-workbook.md`
- End-to-end visual solution: `docs/microhack-1-business-apps-solution.md`
