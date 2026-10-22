import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class GuildSettingsChangedInManageEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.groups.events::GuildSettingsChangedInManageEvent'); }

    public static readonly GUILD_VISUAL_SETTINGS_CHANGED: string = "GSCIME_GUILD_VISUAL_SETTINGS_CHANGED";

    declare private _guildId: number;
    static { (this.prototype as any)._guildId = 0; }

    constructor(param1: string, param2: number, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._guildId = param2;
    }

    public get guildId(): number {
        return this._guildId;
    }
}
