import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class InterstitialEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.advertisement.events::InterstitialEvent'); }

    public static readonly INTERSTITIAL_SHOW: string = "AE_INTERSTITIAL_SHOW";
    public static readonly INTERSTITIAL_NOT_SHOWN: string = "AE_INTERSTITIAL_NOT_SHOWN";
    public static readonly INTERSTITIAL_COMPLETE: string = "AE_INTERSTITIAL_COMPLETE";

    declare private _status: string;

    constructor(param1: string, param2: string = null, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._status = param2;
    }

    public get status(): string {
        return this._status;
    }
}
