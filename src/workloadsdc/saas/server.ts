/**
 * GreenGrid Score API — the SDC SaaS prerequisite.
 *
 * A deliberately small, easy-to-run service the partner deploys *before* the
 * micro-hack. The Fabric workload calls it at runtime with the customer's site
 * data (read from OneLake) and gets back a sustainability scorecard.
 *
 * Run:  npm run saas:start   (PORT defaults to 8787, API key to "greengrid-demo-key")
 */
import express from 'express';
import type { Request, Response } from 'express';
import { scoreSites } from '../src/services/green-score.js';
import { buildPortfolio } from '../src/services/scorecard.js';
import type { ScoreRequest } from '../src/domain/types.js';

const PORT = Number(process.env.PORT ?? 8787);
const API_KEY = process.env.GREENGRID_API_KEY ?? 'greengrid-demo-key';

const app = express();
app.use(express.json());

// Permissive CORS so the Fabric workload (iFrame) can call the API during the hack.
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});
app.options('*', (_req, res) => res.sendStatus(204));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'greengrid-score', version: '1.0.0' });
});

app.post('/score', (req: Request, res: Response) => {
  if (req.header('x-api-key') !== API_KEY) {
    return res.status(401).json({ error: 'invalid or missing x-api-key' });
  }

  const body = req.body as ScoreRequest;
  if (!body || !Array.isArray(body.sites) || body.sites.length === 0) {
    return res.status(400).json({ error: 'body.sites must be a non-empty array' });
  }

  const sites = scoreSites(body.sites);
  const summary = buildPortfolio(sites);
  return res.json({ sites, summary });
});

app.listen(PORT, () => {
  console.log(`GreenGrid Score API listening on http://localhost:${PORT}`);
  console.log(`  GET  /health`);
  console.log(`  POST /score   (header: x-api-key: ${API_KEY})`);
});
