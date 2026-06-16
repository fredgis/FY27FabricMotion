import { BatteryReading } from './BatteryReading.js';
import { MaintenanceTicket } from './MaintenanceTicket.js';
import { Scooter } from './Scooter.js';
import { TechnicianProfile } from './TechnicianProfile.js';

export type HeliosFleetSchema = {
  BatteryReading: BatteryReading;
  MaintenanceTicket: MaintenanceTicket;
  Scooter: Scooter;
  TechnicianProfile: TechnicianProfile;
};

export const schema = [BatteryReading, MaintenanceTicket, Scooter, TechnicianProfile];
