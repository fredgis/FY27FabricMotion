import { OpportunityKpiInput } from '../domain/types.js';

export type AdvisoryKpiSnapshot = {
  workshopsDelivered: number;
  workshopsConvertedToPilot: number;
  pilotsConvertedToOpportunity: number;
  pilotConversionRate: number;
  opportunityConversionRate: number;
  projectedOpportunitiesNextQuarter: number;
};

function asRate(numerator: number, denominator: number): number {
  if (denominator === 0) {
    return 0;
  }

  return numerator / denominator;
}

export function buildAdvisoryKpiSnapshot(input: OpportunityKpiInput): AdvisoryKpiSnapshot {
  const pilotConversionRate = asRate(
    input.workshopsConvertedToPilot,
    input.workshopsDelivered
  );
  const opportunityConversionRate = asRate(
    input.pilotsConvertedToOpportunity,
    input.workshopsConvertedToPilot
  );
  const projectedOpportunitiesNextQuarter = Math.round(
    input.workshopsDelivered * pilotConversionRate * opportunityConversionRate
  );

  return {
    workshopsDelivered: input.workshopsDelivered,
    workshopsConvertedToPilot: input.workshopsConvertedToPilot,
    pilotsConvertedToOpportunity: input.pilotsConvertedToOpportunity,
    pilotConversionRate,
    opportunityConversionRate,
    projectedOpportunitiesNextQuarter,
  };
}
