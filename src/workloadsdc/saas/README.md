# GreenGrid Score API — SaaS prerequisite

This is the **SDC SaaS service** that must be **up and running before the micro-hack**.
The Fabric workload calls it at runtime with the customer's site data (read from OneLake)
and receives a sustainability scorecard.

It is intentionally tiny and easy to run.

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/` | none | **Marketing website** — the GreenGrid corporate front-end + a live API demo |
| `GET` | `/health` | none | Liveness check |
| `POST` | `/score` | `x-api-key` header | Score a list of sites, return per-site scores + a portfolio summary |

> **Front-end + API in one service.** Opening `http://localhost:8787/` shows a polished
> GreenGrid landing page (company, product, how it works, a Developers section and a **live
> demo** that actually calls `POST /score` on this server). This makes the prerequisite feel
> like a real SaaS: a website in front of the **same scoring algorithm** the Fabric workload
> consumes at runtime. The page is a static file in [`public/index.html`](public/index.html).

### `POST /score` request

```json
{
  "sites": [
    { "siteId": "site-hel", "name": "Helsinki DC", "city": "Helsinki", "energyKwh": 320, "renewablePct": 88 }
  ]
}
```

### Response (shape)

```json
{
  "sites": [
    { "siteId": "site-hel", "name": "Helsinki DC", "city": "Helsinki",
      "energyKwh": 320, "renewablePct": 88, "efficiency": 68,
      "greenScore": 80, "tier": "A", "tip": "On track — maintain" }
  ],
  "summary": {
    "totalSites": 5, "avgScore": 60, "avgRenewablePct": 65,
    "tierCounts": { "A": 1, "B": 3, "C": 1 },
    "best": { "...": "Helsinki" }, "worst": { "...": "Warsaw" }
  }
}
```

## Run locally

```bash
cd src/workloadsdc
npm install
npm run saas:start          # http://localhost:8787
```

Then open **http://localhost:8787/** in a browser to see the GreenGrid website and run the
live `/score` demo. Environment variables:

- `PORT` (default `8787`)
- `GREENGRID_API_KEY` (default `greengrid-demo-key`)

## Smoke test

```bash
curl -s http://localhost:8787/health

curl -s -X POST http://localhost:8787/score \
  -H "Content-Type: application/json" \
  -H "x-api-key: greengrid-demo-key" \
  -d '{"sites":[{"siteId":"s1","name":"Helsinki DC","city":"Helsinki","energyKwh":320,"renewablePct":88}]}'
```

## Deploy (before the workshop)

Any Node host works (Azure Container Apps, Azure App Service, a VM). Minimal Docker:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8787
CMD ["npm", "run", "saas:start"]
```

The scoring logic is shared with the workload demo (`src/services/green-score.ts`), so the
SaaS and the in-Fabric scorecard always agree.
