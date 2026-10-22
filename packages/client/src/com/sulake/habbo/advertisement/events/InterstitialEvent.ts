import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class InterstitialEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.advertisement.events::InterstitialEvent'); }

    public static readonly INTERSTITIAL_SHOW: string = "AE_INTERSTITIAL_SHOW";
    public static readonly INTERSTITIAL_NOT_SHOWN: string = "AE_INTERSTITIAL_NOT_SHOWN";
    public static readonly INTERSTITIAL_COMPLETE: string = "AE_INTERSTITIAL_COMPLETE";

    declare private _status: string;

    constructor(type: string, status: string = null, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
        this._status = status;
    }

    public get status(): string {
        return this._status;
    }
}
