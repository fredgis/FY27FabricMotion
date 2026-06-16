# GreenGrid Scorecard — workload generation spec

Use this spec to build the Fabric workload with the Extensibility Toolkit (ideally via the
toolkit's AI agent path).

## Intent

A `GreenGridScorecard` item that lets a customer score the sustainability of their sites,
**inside Fabric**, by combining:

- the customer's own data in **OneLake** (the `sites` table), and
- the **GreenGrid SaaS** scoring engine (the SDC's intellectual property).

This shows the complementarity: client data stays in OneLake; the SDC adds value through
its algorithm exposed as a SaaS.

## Data read from OneLake (`sites` table)

| Column | Type | Example |
|---|---|---|
| `siteId` | text | `site-hel` |
| `name` | text | `Helsinki Data Center` |
| `city` | text | `Helsinki` |
| `energyKwh` | number | `320` |
| `renewablePct` | number | `88` |

## SaaS contract

- `POST /score` with `{ sites: [...] }` → `{ sites: ScoredSite[], summary: PortfolioSummary }`
- Auth: `x-api-key` header.

## Screens (keep it to 1–2 beautiful screens)

1. **Sustainability Scorecard** (main)
   - Hero: portfolio green score gauge + tier distribution.
   - Provenance chips: "Data from OneLake" → "Scored by GreenGrid".
   - Site cards/table: green score, tier badge, renewable %, tip.
2. **Site Detail** (optional)
   - One site: score breakdown (renewable vs efficiency) + recommendation.

## Roles

- **Analyst**: opens the item, reads the scorecard.
- **Admin**: configures the SaaS URL/key.

## Acceptance criteria

- The item reads `sites` from OneLake (OBO token).
- The item calls the SaaS and renders the portfolio score and per-site tiers.
- The scorecard is graphical (gauge, badges, bars) and fits on one screen.

## Build it fast (AI agent path)

Scaffold from the [Starter-Kit](https://aka.ms/fabric-extensibility-starter-kit), open in
GitHub Copilot (the repo ships `.github/copilot-instructions.md` and `.ai/commands/*`),
then use this master prompt:

```text
Create a Fabric Extensibility Toolkit item "GreenGridScorecard".
On open: read the `sites` table (siteId, name, city, energyKwh, renewablePct) from the
selected lakehouse in OneLake using an Entra OBO token, POST it to the GreenGrid SaaS
/score endpoint (header x-api-key), and render ONE graphical sustainability scorecard:
a portfolio green-score gauge, a tier (A/B/C) distribution, provenance chips
"Data from OneLake" -> "Scored by GreenGrid", and a list of site cards with green score,
tier badge, renewable % bar and a one-line tip.
Style: Fluent UI, teal #00b4a6 + green accents, clean and friendly. Keep it to one screen.
```

Run it in dev mode with the **Dev Gateway** (`npm run start` + `npm run start:devGateway`).
