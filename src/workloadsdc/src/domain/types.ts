export type SiteRecord = {
  siteId: string;
  name: string;
  city: string;
  energyKwh: number;
  renewablePct: number;
};

export type GreenTier = 'A' | 'B' | 'C';

export type ScoredSite = {
  siteId: string;
  name: string;
  city: string;
  energyKwh: number;
  renewablePct: number;
  efficiency: number;
  greenScore: number;
  tier: GreenTier;
  tip: string;
};

export type PortfolioSummary = {
  totalSites: number;
  avgScore: number;
  avgRenewablePct: number;
  tierCounts: Record<GreenTier, number>;
  best: ScoredSite;
  worst: ScoredSite;
};

export type ScoreRequest = {
  sites: SiteRecord[];
};

export type ScoreResponse = {
  sites: ScoredSite[];
  summary: PortfolioSummary;
};
