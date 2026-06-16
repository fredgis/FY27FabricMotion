import { entity, role, text, uuid, set, date, one } from '@microsoft/rayfin-core';
import { Scooter } from './Scooter.js';
import { TechnicianProfile } from './TechnicianProfile.js';

export type TicketStatus = 'new' | 'assigned' | 'in-progress' | 'done';
export type TicketPriority = 'critical' | 'high' | 'medium';

@entity()
@role('authenticated', '*')
export class MaintenanceTicket {
  @uuid() id!: string;
  @text({ unique: true }) ticketCode!: string;
  @one(() => Scooter) scooter!: Scooter;
  @text() city!: string;
  @set('critical', 'high', 'medium')
  priority!: TicketPriority;
  @set('new', 'assigned', 'in-progress', 'done')
  status!: TicketStatus;
  @text() reason!: string;
  @date() openedAt!: Date;
  @one(() => TechnicianProfile, { optional: true })
  assignedTechnician?: TechnicianProfile;
}
