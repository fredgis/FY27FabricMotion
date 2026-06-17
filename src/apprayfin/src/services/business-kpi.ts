import { FleetReadinessKpiInput } from '../domain/types.js';

export type FleetReadinessKpiSnapshot = {
  ridesCompleted: number;
  pitStopsRaised: number;
  pitStopsResolved: number;
  flagRate: number;
  resolveRate: number;
  bikesBackToReady: number;
};

function toRate(numerator: number, denominator: number): number {
  if (denominator === 0) {
    return 0;
  }

  return numerator / denominator;
}

export function buildBusinessKpiSnapshot(input: FleetReadinessKpiInput): FleetReadinessKpiSnapshot {
  const flagRate = toRate(input.pitStopsRaised, input.ridesCompleted);
  const resolveRate = toRate(input.pitStopsResolved, input.pitStopsRaised);

  return {
    ridesCompleted: input.ridesCompleted,
    pitStopsRaised: input.pitStopsRaised,
    pitStopsResolved: input.pitStopsResolved,
    flagRate,
    resolveRate,
    bikesBackToReady: Math.round(
      input.ridesCompleted * flagRate * resolveRate
    ),
  };
}
