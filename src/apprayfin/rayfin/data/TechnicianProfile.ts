import { entity, role, text, uuid, set, boolean } from '@microsoft/rayfin-core';

export type TechnicianRole = 'technician' | 'manager';

@entity()
@role('authenticated', '*')
export class TechnicianProfile {
  @uuid() id!: string;
  @uuid({ unique: true }) userId!: string;
  @text() displayName!: string;
  @text() city!: string;
  @set('technician', 'manager')
  role!: TechnicianRole;
  @boolean({ default: true }) active!: boolean;
}
