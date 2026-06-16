import { entity, role, text, uuid, boolean } from '@microsoft/rayfin-core';

@entity()
@role('authenticated', '*')
export class MechanicProfile {
  @uuid() id!: string;
  @uuid({ unique: true }) userId!: string;
  @text() displayName!: string;
  @text() station!: string;
  @boolean({ default: true }) active!: boolean;
}
