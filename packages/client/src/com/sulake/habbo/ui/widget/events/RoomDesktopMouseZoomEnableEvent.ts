import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class RoomDesktopMouseZoomEnableEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomDesktopMouseZoomEnableEvent'); }

    public static readonly _SafeStr_7571: string = "RDMZEE_ENABLED";

    constructor(param1: boolean) {
        super("RDMZEE_ENABLED");
        this._enabled = param1;
    }

    declare private _enabled: boolean;
    static { (this.prototype as any)._enabled = false; }
}
