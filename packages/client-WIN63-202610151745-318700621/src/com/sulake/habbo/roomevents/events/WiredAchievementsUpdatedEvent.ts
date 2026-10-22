import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class WiredAchievementsUpdatedEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.events::WiredAchievementsUpdatedEvent'); }

    public static readonly WIRED_ACHIEVEMENTS_UPDATED: string = "WIRED_ACHIEVEMENTS_UPDATED";

    declare private _achievements: string[];

    constructor(param1: string, param2: string[], param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._achievements = param2;
    }

    public get achievements(): string[] {
        return this._achievements;
    }
}
