import {
  MaintenanceTicketSnapshot,
  ScooterSnapshot,
  TechnicianSnapshot,
} from '../domain/types.js';

export const heliosScooters: ScooterSnapshot[] = [
  {
    scooterId: 'scooter-001',
    scooterCode: 'HEL-AMS-001',
    city: 'Amsterdam',
    status: 'maintenance-pending',
    chargePercent: 12,
  },
  {
    scooterId: 'scooter-002',
    scooterCode: 'HEL-AMS-014',
    city: 'Amsterdam',
    status: 'available',
    chargePercent: 48,
  },
  {
    scooterId: 'scooter-003',
    scooterCode: 'HEL-BRU-007',
    city: 'Brussels',
    status: 'blocked',
    chargePercent: 8,
  },
  {
    scooterId: 'scooter-004',
    scooterCode: 'HEL-MAD-011',
    city: 'Madrid',
    status: 'in-ride',
    chargePercent: 27,
  },
];

export const heliosTickets: MaintenanceTicketSnapshot[] = [
  {
    ticketId: 'ticket-1001',
    scooterId: 'scooter-001',
    city: 'Amsterdam',
    reason: 'Battery below policy threshold',
    priority: 'critical',
    status: 'new',
  },
  {
    ticketId: 'ticket-1002',
    scooterId: 'scooter-003',
    city: 'Brussels',
    reason: 'Emergency brake sensor validation required',
    priority: 'high',
    status: 'new',
  },
  {
    ticketId: 'ticket-1003',
    scooterId: 'scooter-004',
    city: 'Madrid',
    reason: 'Post-ride diagnostics for low battery trend',
    priority: 'medium',
    status: 'new',
  },
];

export const heliosTechnicians: TechnicianSnapshot[] = [
  {
    technicianId: 'tech-ams-01',
    displayName: 'Marta de Vries',
    city: 'Amsterdam',
    activeTicketCount: 1,
    active: true,
  },
  {
    technicianId: 'tech-bru-02',
    displayName: 'Ibrahim Nasser',
    city: 'Brussels',
    activeTicketCount: 0,
    active: true,
  },
  {
    technicianId: 'tech-mad-03',
    displayName: 'Lucia Ortega',
    city: 'Madrid',
    activeTicketCount: 2,
    active: true,
  },
];
