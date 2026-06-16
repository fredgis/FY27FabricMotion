import { entity, role, text, uuid, set, date, one } from '@microsoft/rayfin-core';
import { Bicycle } from './Bicycle.js';
import { MechanicProfile } from './MechanicProfile.js';

export type PitStopPriority = 'high' | 'normal';
export type PitStopStatus = 'new' | 'assigned' | 'done';

@entity()
@role('authenticated', '*')
export class PitStopTicket {
  @uuid() id!: string;
  @text({ unique: true }) ticketCode!: string;
  @one(() => Bicycle) bicycle!: Bicycle;
  @text() station!: string;
  @set('high', 'normal')
  priority!: PitStopPriority;
  @set('new', 'assigned', 'done')
  status!: PitStopStatus;
  @text() issue!: string;
  @date() openedAt!: Date;
  @one(() => MechanicProfile, { optional: true })
  assignedMechanic?: MechanicProfile;
}
