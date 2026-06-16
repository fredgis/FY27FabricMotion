import { GreenTier, ScoredSite, SiteRecord } from '../domain/types.js';

/** Reference energy (kWh) used to normalize efficiency. Lower usage = better. */
const ENERGY_REFERENCE_KWH = 1000;

const RENEWABLE_WEIGHT = 0.6;
const EFFICIENCY_WEIGHT = 0.4;

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

/** Efficiency: 100 when usage is 0, 0 when usage reaches the reference. */
export function energyEfficiency(energyKwh: number): number {
  return clamp(100 - (energyKwh / ENERGY_REFERENCE_KWH) * 100);
}

function tierFor(score: number): GreenTier {
  if (score >= 75) return 'A';
  if (score >= 50) return 'B';
  return 'C';
}

function tipFor(renewablePct: number, efficiency: number): string {
  if (renewablePct < 40) return 'Increase renewable sourcing';
  if (efficiency < 50) return 'Improve energy efficiency';
  return 'On track — maintain';
}

/** Core scoring logic exposed by the GreenGrid SaaS. */
export function scoreSite(site: SiteRecord): ScoredSite {
  const efficiency = energyEfficiency(site.energyKwh);
  const greenScore = clamp(
    Math.round(site.renewablePct * RENEWABLE_WEIGHT + efficiency * EFFICIENCY_WEIGHT)
  );

  return {
    siteId: site.siteId,
    name: site.name,
    city: site.city,
    energyKwh: site.energyKwh,
    renewablePct: site.renewablePct,
    efficiency: Math.round(efficiency),
    greenScore,
    tier: tierFor(greenScore),
    tip: tipFor(site.renewablePct, efficiency),
  };
}

export function scoreSites(sites: SiteRecord[]): ScoredSite[] {
  return sites.map(scoreSite).sort((a, b) => b.greenScore - a.greenScore);
}
