import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboHotelViewEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.enum::HabboHotelViewEvent'); }

    public static readonly START_LOAD: string = "HHVE_START_LOAD";
    public static readonly _SafeStr_7831: string = "HHVE_LOADED";
    public static readonly ERROR: string = "HHVE_ERROR";

    constructor() {
    }
}
