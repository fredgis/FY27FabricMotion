import { ScooterSnapshot } from '../domain/types.js';

const BATTERY_CRITICAL_THRESHOLD = 15;
const BATTERY_HIGH_THRESHOLD = 30;

const STATUS_WEIGHT: Record<ScooterSnapshot['status'], number> = {
  available: 5,
  'in-ride': 2,
  'maintenance-pending': 45,
  blocked: 50,
};

export type ScooterPriority = {
  scooterId: string;
  scooterCode: string;
  city: string;
  score: number;
  suggestedPriority: 'critical' | 'high' | 'medium';
  reasons: string[];
};

export function scoreScooterPriority(scooter: ScooterSnapshot): ScooterPriority {
  const reasons: string[] = [];
  let score = STATUS_WEIGHT[scooter.status];

  if (scooter.chargePercent <= BATTERY_CRITICAL_THRESHOLD) {
    score += 45;
    reasons.push('Battery below 15%');
  } else if (scooter.chargePercent <= BATTERY_HIGH_THRESHOLD) {
    score += 25;
    reasons.push('Battery below 30%');
  }

  if (scooter.status === 'blocked') {
    reasons.push('Scooter blocked by operations');
  }

  if (scooter.status === 'maintenance-pending') {
    reasons.push('Maintenance pending state');
  }

  if (reasons.length === 0) {
    reasons.push('Healthy baseline');
  }

  let suggestedPriority: 'critical' | 'high' | 'medium' = 'medium';
  if (score >= 85) {
    suggestedPriority = 'critical';
  } else if (score >= 45) {
    suggestedPriority = 'high';
  }

  return {
    scooterId: scooter.scooterId,
    scooterCode: scooter.scooterCode,
    city: scooter.city,
    score,
    suggestedPriority,
    reasons,
  };
}

export function rankScootersForIntervention(scooters: ScooterSnapshot[]): ScooterPriority[] {
  return scooters
    .map((scooter) => scoreScooterPriority(scooter))
    .sort((left, right) => right.score - left.score);
}
