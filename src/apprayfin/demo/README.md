# Demo & screenshot generator

This folder turns the **real business services** and **seed data** of the Helios
Bicycle solution into a small set of polished HTML screens, then captures PNG
screenshots that are embedded in
[`docs/microhack-1-business-apps-solution.md`](../../../docs/microhack-1-business-apps-solution.md).

The screens are **not mockups**: every value (health score, tag, mechanic
assignment, KPI percentages, average mood) is computed by the same functions used
by the solution kit (`src/services/*.ts`).

## Files

| File | Role |
|---|---|
| `audit.ts` | Runs the services against the seed data and asserts expected results |
| `screens.ts` | Renders the three app screens to HTML using the real services |
| `build-demo.ts` | Writes the HTML screens to `demo/out/` |
| `capture.mjs` | Screenshots the HTML to `docs/images/` (Playwright + Microsoft Edge) |

## Prerequisites

- Node.js 20+
- Microsoft Edge installed (used via Playwright `channel: 'msedge'`, no browser download)

## Run everything

```bash
cd src/apprayfin
npm install
npm run demo        # audit -> build HTML -> capture screenshots
```

## Run steps individually

```bash
npm run audit       # verify business logic (exits non-zero on failure)
npm run demo:build  # generate demo/out/*.html
npm run demo:shots  # capture docs/images/scenario1-*.png
```

## Output

- `demo/out/*.html` — local preview pages (git-ignored)
- `docs/images/scenario1-bicycle-board.png`
- `docs/images/scenario1-live-map.png`
- `docs/images/scenario1-pit-stop-queue.png`
- `docs/images/scenario1-ride-mood-kpi.png`
