import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetFloodControlEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetFloodControlEvent'); }

    public static readonly _SafeStr_7951: string = "RWFCE_FLOOD_CONTROL";

    constructor(param1: number) {
        super("RWFCE_FLOOD_CONTROL", false, false);
        this._seconds = param1;
    }

    private _seconds: number = 0;

    public get seconds(): number {
        return this._seconds;
    }
}
