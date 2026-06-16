import { GreenTier, PortfolioSummary, ScoredSite } from '../domain/types.js';

/** Workload-side aggregation: turn scored sites into a portfolio summary. */
export function buildPortfolio(scored: ScoredSite[]): PortfolioSummary {
  if (scored.length === 0) {
    throw new Error('Cannot build a portfolio from an empty site list');
  }

  const tierCounts: Record<GreenTier, number> = { A: 0, B: 0, C: 0 };
  let scoreSum = 0;
  let renewableSum = 0;
  let best = scored[0];
  let worst = scored[0];

  for (const site of scored) {
    tierCounts[site.tier] += 1;
    scoreSum += site.greenScore;
    renewableSum += site.renewablePct;
    if (site.greenScore > best.greenScore) best = site;
    if (site.greenScore < worst.greenScore) worst = site;
  }

  return {
    totalSites: scored.length,
    avgScore: Math.round(scoreSum / scored.length),
    avgRenewablePct: Math.round(renewableSum / scored.length),
    tierCounts,
    best,
    worst,
  };
}
