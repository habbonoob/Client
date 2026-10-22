import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class SessionDataPreferencesEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.session.events::SessionDataPreferencesEvent'); }

    public static readonly _SafeStr_7470: string = "APUE_UPDATED";

    declare private _uiFlags: number;
    static { (this.prototype as any)._uiFlags = 0; }

    constructor(param1: number, param2: boolean = false, param3: boolean = false) {
        super("APUE_UPDATED", param2, param3);
        this._uiFlags = param1;
    }

    public get uiFlags(): number {
        return this._uiFlags;
    }
}
