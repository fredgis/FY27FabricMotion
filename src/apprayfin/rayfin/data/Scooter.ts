import { entity, role, text, uuid, set, boolean } from '@microsoft/rayfin-core';

export type ScooterStatus =
  | 'available'
  | 'in-ride'
  | 'maintenance-pending'
  | 'blocked';

@entity()
@role('authenticated', '*')
export class Scooter {
  @uuid() id!: string;
  @text({ unique: true }) scooterCode!: string;
  @text() city!: string;
  @set('available', 'in-ride', 'maintenance-pending', 'blocked')
  status!: ScooterStatus;
  @boolean({ default: false }) needsAttention!: boolean;
}
