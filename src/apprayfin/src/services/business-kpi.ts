import { OpportunityKpiInput } from '../domain/types.js';

export type BusinessKpiSnapshot = {
  workshopsDelivered: number;
  workshopsConvertedToPoC: number;
  poCsConvertedToOpportunity: number;
  poCRate: number;
  opportunityRate: number;
  projectedOpportunitiesNextQuarter: number;
};

function toRate(numerator: number, denominator: number): number {
  if (denominator === 0) {
    return 0;
  }

  return numerator / denominator;
}

export function buildBusinessKpiSnapshot(input: OpportunityKpiInput): BusinessKpiSnapshot {
  const poCRate = toRate(input.workshopsConvertedToPoC, input.workshopsDelivered);
  const opportunityRate = toRate(
    input.poCsConvertedToOpportunity,
    input.workshopsConvertedToPoC
  );

  return {
    workshopsDelivered: input.workshopsDelivered,
    workshopsConvertedToPoC: input.workshopsConvertedToPoC,
    poCsConvertedToOpportunity: input.poCsConvertedToOpportunity,
    poCRate,
    opportunityRate,
    projectedOpportunitiesNextQuarter: Math.round(
      input.workshopsDelivered * poCRate * opportunityRate
    ),
  };
}
