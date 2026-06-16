export type ScooterStatus =
  | 'available'
  | 'in-ride'
  | 'maintenance-pending'
  | 'blocked';

export type TicketPriority = 'critical' | 'high' | 'medium';
export type TicketStatus = 'new' | 'assigned' | 'in-progress' | 'done';

export type ScooterSnapshot = {
  scooterId: string;
  scooterCode: string;
  city: string;
  status: ScooterStatus;
  chargePercent: number;
};

export type MaintenanceTicketSnapshot = {
  ticketId: string;
  scooterId: string;
  city: string;
  reason: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTechnicianId?: string;
};

export type TechnicianSnapshot = {
  technicianId: string;
  displayName: string;
  city: string;
  activeTicketCount: number;
  active: boolean;
};

export type OpportunityKpiInput = {
  workshopsDelivered: number;
  workshopsConvertedToPilot: number;
  pilotsConvertedToOpportunity: number;
};
