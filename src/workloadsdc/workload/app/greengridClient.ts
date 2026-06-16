/**
 * Calls the GreenGrid Score SaaS (the SDC prerequisite service).
 * Keep the contract tiny: one POST that returns scored sites + a portfolio summary.
 */
import type { ScoreResponse, SiteRecord } from './contracts';

const SAAS_BASE_URL = process.env.GREENGRID_SAAS_URL ?? 'https://greengrid.example.com';
const SAAS_API_KEY = process.env.GREENGRID_API_KEY ?? 'greengrid-demo-key';

export async function scorePortfolio(sites: SiteRecord[]): Promise<ScoreResponse> {
  const response = await fetch(`${SAAS_BASE_URL}/score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': SAAS_API_KEY,
    },
    body: JSON.stringify({ sites }),
  });

  if (!response.ok) {
    throw new Error(`GreenGrid SaaS error ${response.status}`);
  }

  return (await response.json()) as ScoreResponse;
}
