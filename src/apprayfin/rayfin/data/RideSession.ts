import { entity, role, text, uuid, date, one } from '@microsoft/rayfin-core';
import { Bicycle } from './Bicycle.js';

@entity()
@role('authenticated', '*')
export class RideSession {
  @uuid() id!: string;
  @one(() => Bicycle) bicycle!: Bicycle;
  @text() riderAlias!: string;
  @text() moodScore!: string;
  @date() startedAt!: Date;
  @date({ optional: true }) endedAt?: Date;
}
