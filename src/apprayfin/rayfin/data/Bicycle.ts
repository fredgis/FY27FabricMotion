import { entity, role, text, uuid, set, boolean } from '@microsoft/rayfin-core';

export type BicycleStatus = 'ready' | 'in-ride' | 'pit-stop-needed';

@entity()
@role('authenticated', '*')
export class Bicycle {
  @uuid() id!: string;
  @text({ unique: true }) bikeCode!: string;
  @text() station!: string;
  @set('ready', 'in-ride', 'pit-stop-needed')
  status!: BicycleStatus;
  @boolean({ default: false }) featured!: boolean;
}
