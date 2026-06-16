import { BicycleSnapshot } from '../domain/types.js';

export type BicycleHealth = {
  bicycleId: string;
  bikeCode: string;
  station: string;
  healthScore: number;
  celebrationTag: 'star' | 'good' | 'watch';
  notes: string[];
};

const STATUS_SCORE: Record<BicycleSnapshot['status'], number> = {
  ready: 90,
  'in-ride': 75,
  'pit-stop-needed': 40,
};

export function computeBikeHealth(bicycle: BicycleSnapshot): BicycleHealth {
  const notes: string[] = [];
  let healthScore = STATUS_SCORE[bicycle.status];

  if (bicycle.moodScore >= 4.5) {
    healthScore += 8;
    notes.push('Riders love this bike');
  } else if (bicycle.moodScore < 3.0) {
    healthScore -= 15;
    notes.push('Low rider mood score');
  }

  if (bicycle.status === 'pit-stop-needed') {
    notes.push('Needs pit-stop before next ride');
  }

  if (notes.length === 0) {
    notes.push('Stable ride quality');
  }

  let celebrationTag: 'star' | 'good' | 'watch' = 'good';
  if (healthScore >= 92) {
    celebrationTag = 'star';
  } else if (healthScore < 65) {
    celebrationTag = 'watch';
  }

  return {
    bicycleId: bicycle.bicycleId,
    bikeCode: bicycle.bikeCode,
    station: bicycle.station,
    healthScore,
    celebrationTag,
    notes,
  };
}

export function rankBikeHealth(bicycles: BicycleSnapshot[]): BicycleHealth[] {
  return bicycles
    .map((bicycle) => computeBikeHealth(bicycle))
    .sort((left, right) => left.healthScore - right.healthScore);
}
