import { Bicycle } from './Bicycle.js';
import { MechanicProfile } from './MechanicProfile.js';
import { PitStopTicket } from './PitStopTicket.js';
import { RideSession } from './RideSession.js';

export type HeliosBicycleSchema = {
  Bicycle: Bicycle;
  MechanicProfile: MechanicProfile;
  PitStopTicket: PitStopTicket;
  RideSession: RideSession;
};

export const schema = [Bicycle, MechanicProfile, PitStopTicket, RideSession];
