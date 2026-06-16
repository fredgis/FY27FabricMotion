import { entity, role, text, uuid, date, one } from '@microsoft/rayfin-core';
import { Scooter } from './Scooter.js';

@entity()
@role('authenticated', '*')
export class BatteryReading {
  @uuid() id!: string;
  @one(() => Scooter) scooter!: Scooter;
  @text() chargePercent!: string;
  @date() measuredAt!: Date;
}
