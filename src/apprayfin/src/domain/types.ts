export type BicycleStatus = 'ready' | 'in-ride' | 'pit-stop-needed';
export type PitStopPriority = 'high' | 'normal';
export type PitStopStatus = 'new' | 'assigned' | 'done';

export type BicycleSnapshot = {
  bicycleId: string;
  bikeCode: string;
  station: string;
  status: BicycleStatus;
  moodScore: number;
};

export type PitStopTicketSnapshot = {
  ticketId: string;
  bicycleId: string;
  station: string;
  issue: string;
  priority: PitStopPriority;
  status: PitStopStatus;
  assignedMechanicId?: string;
};

export type MechanicSnapshot = {
  mechanicId: string;
  displayName: string;
  station: string;
  activeTicketCount: number;
  active: boolean;
};

export type FleetReadinessKpiInput = {
  ridesCompleted: number;
  pitStopsRaised: number;
  pitStopsResolved: number;
};
