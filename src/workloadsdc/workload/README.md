# GreenGrid Scorecard — Fabric workload

A minimal **Fabric Extensibility Toolkit** workload that adds a `GreenGridScorecard`
item. The item reads the customer's sites from **OneLake** (`Files/sites.csv`), sends it to the
**GreenGrid SaaS** (`/score`), and renders a single graphical sustainability scorecard.

This folder is the **reference shape** of the workload. To build a real, runnable
workload, scaffold from the official Starter-Kit and drop these files in.

## Files

| File | Role |
|---|---|
| `Manifest/product.json` | Declares the workload and its items |
| `Manifest/GreenGridScorecard.json` | Item manifest (editor tab, icon, create dialog) |
| `app/GreenGridScorecardEditor.tsx` | The item editor (React + Fluent) |
| `app/onelake.ts` | Reads `Files/sites.csv` from OneLake with an Entra OBO token, parses the CSV |
| `app/greengridClient.ts` | Calls the GreenGrid SaaS `/score` endpoint |
| `app/contracts.ts` | Shared request/response types |
| `.env.template` | Dev configuration (Entra app, frontend URL, SaaS URL/key) |

## Build it fast with the AI agent path

The Extensibility Toolkit ships **AI assistance** that scaffolds items and workloads from
a prompt:

- `.github/copilot-instructions.md` — entry point for GitHub Copilot
- `.ai/commands/item` and `.ai/commands/workload` — agent commands

Use the [Starter-Kit](https://aka.ms/fabric-extensibility-starter-kit), open it with
GitHub Copilot, and ask it to create a `GreenGridScorecard` item that reads OneLake and
calls the GreenGrid SaaS (see the master prompt in
[`../src/specs/greengrid-workload-spec.md`](../src/specs/greengrid-workload-spec.md)).

## Run in dev mode (Dev Gateway)

The toolkit runs your workload locally and connects it to Fabric through the **Dev
Gateway**, so it renders inside the Fabric portal while served from `localhost`:

```bash
# 1) start the frontend dev server (serves the item UI)
npm run start            # → start:devServer (webpack serve)

# 2) in a second terminal, start the Dev Gateway (registers the dev workload in Fabric)
npm run start:devGateway
```

Then in Fabric, enable **Developer mode** (Settings → Developer settings) and open your
workspace — the `GreenGridScorecard` item appears in the **+ New** menu.

> Prerequisites: a Fabric tenant + workspace + capacity, an Entra app registration, and
> the **GreenGrid SaaS up and running** (see [`../saas/README.md`](../saas/README.md)).
