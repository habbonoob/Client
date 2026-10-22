import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class MysteryBoxKeysUpdateEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.session.events::MysteryBoxKeysUpdateEvent'); }

    public static readonly MYSTERY_BOX_KEYS_UPDATE: string = "mbke_update";

    declare private _boxColor: string;

    declare private _keyColor: string;

    constructor(param1: string, param2: string, param3: boolean = false, param4: boolean = false) {
        super("mbke_update", param3, param4);
        this._boxColor = param1;
        this._keyColor = param2;
    }

    public get boxColor(): string {
        return this._boxColor;
    }

    public get keyColor(): string {
        return this._keyColor;
    }
}
