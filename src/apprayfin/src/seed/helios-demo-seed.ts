import {
  BicycleSnapshot,
  MechanicSnapshot,
  PitStopTicketSnapshot,
} from '../domain/types.js';

export const heliosBicycles: BicycleSnapshot[] = [
  {
    bicycleId: 'bike-001',
    bikeCode: 'HB-AMS-001',
    station: 'Amsterdam Central',
    status: 'pit-stop-needed',
    moodScore: 2.8,
  },
  {
    bicycleId: 'bike-002',
    bikeCode: 'HB-AMS-014',
    station: 'Amsterdam Central',
    status: 'ready',
    moodScore: 4.7,
  },
  {
    bicycleId: 'bike-003',
    bikeCode: 'HB-BRU-007',
    station: 'Brussels Midi',
    status: 'pit-stop-needed',
    moodScore: 3.1,
  },
  {
    bicycleId: 'bike-004',
    bikeCode: 'HB-MAD-011',
    station: 'Madrid Atocha',
    status: 'in-ride',
    moodScore: 4.2,
  },
];

export const heliosPitStopTickets: PitStopTicketSnapshot[] = [
  {
    ticketId: 'ticket-1001',
    bicycleId: 'bike-001',
    station: 'Amsterdam Central',
    issue: 'Front brake check after rider feedback',
    priority: 'high',
    status: 'new',
  },
  {
    ticketId: 'ticket-1002',
    bicycleId: 'bike-003',
    station: 'Brussels Midi',
    issue: 'Chain noise reported by station operator',
    priority: 'high',
    status: 'new',
  },
  {
    ticketId: 'ticket-1003',
    bicycleId: 'bike-004',
    station: 'Madrid Atocha',
    issue: 'Saddle adjustment requested',
    priority: 'normal',
    status: 'new',
  },
];

export const heliosMechanics: MechanicSnapshot[] = [
  {
    mechanicId: 'mech-ams-01',
    displayName: 'Marta de Vries',
    station: 'Amsterdam Central',
    activeTicketCount: 1,
    active: true,
  },
  {
    mechanicId: 'mech-bru-02',
    displayName: 'Ibrahim Nasser',
    station: 'Brussels Midi',
    activeTicketCount: 0,
    active: true,
  },
  {
    mechanicId: 'mech-mad-03',
    displayName: 'Lucia Ortega',
    station: 'Madrid Atocha',
    activeTicketCount: 2,
    active: true,
  },
];
