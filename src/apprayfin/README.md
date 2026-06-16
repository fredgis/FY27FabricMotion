# Helios Business Apps Rayfin Solution Kit

This folder contains the reference implementation assets for the **Helios Mobility**
Business Apps micro-hack (end-customer scenario, Rayfin track).

## Scope

- Rayfin data model for fleet operations.
- Business logic services used by the trainer solution path.
- Seed payloads for workshop demos.
- A ready-to-use Rayfin app specification prompt.

## Folder layout

```text
src/apprayfin/
├── rayfin/
│   ├── rayfin.yml
│   └── data/
│       ├── BatteryReading.ts
│       ├── MaintenanceTicket.ts
│       ├── Scooter.ts
│       ├── TechnicianProfile.ts
│       └── schema.ts
└── src/
    ├── domain/types.ts
    ├── seed/helios-demo-seed.ts
    ├── services/
    │   ├── fleet-priority.ts
    │   ├── kpi-model.ts
    │   └── maintenance-assignment.ts
    └── specs/helios-fleet-spec.md
```

## How trainers use this kit

1. Use `src/specs/helios-fleet-spec.md` as the baseline prompt for Rayfin generation.
2. Keep the data model in `rayfin/data/` as the canonical schema.
3. Use service functions in `src/services/` as the answer key logic during coaching.
4. Use `src/seed/helios-demo-seed.ts` to ensure the workshop dataset matches the scenario.

## Relation with workshop docs

- Setup guide: `docs/microhack-1-business-apps-setup.md`
- Participant workbook: `docs/microhack-1-business-apps-workbook.md`
- End-to-end visual solution: `docs/apprayfin-solution.md`
