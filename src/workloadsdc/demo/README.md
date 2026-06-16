# Demo & screenshot generator (scenario 2)

Renders the **GreenGrid Scorecard** workload screens from the **real scoring logic** and
the sample OneLake data, then captures PNG screenshots embedded in
[`docs/microhack-2-sdc-workloads-solution.md`](../../../docs/microhack-2-sdc-workloads-solution.md).

Every value (green scores, tiers, portfolio average, recommendations) is computed by the
same `src/services/*` functions the SaaS exposes — not mocked.

## Files

| File | Role |
|---|---|
| `audit.ts` | Runs the scoring + portfolio services and asserts expected results |
| `screens.ts` | Renders the scorecard + site-detail screens to HTML |
| `build-demo.ts` | Writes the HTML screens to `demo/out/` |
| `capture.mjs` | Screenshots the HTML to `docs/images/` (Playwright + Microsoft Edge) |

## Run

```bash
cd src/workloadsdc
npm install
npm run demo        # audit -> build HTML -> capture screenshots
```

## Output

- `demo/out/*.html` — local preview pages (git-ignored)
- `docs/images/scenario2-scorecard.png`
- `docs/images/scenario2-site-detail.png`
