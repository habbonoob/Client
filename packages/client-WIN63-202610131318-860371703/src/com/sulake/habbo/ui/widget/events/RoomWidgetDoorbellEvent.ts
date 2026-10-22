import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetDoorbellEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetDoorbellEvent'); }

    public static readonly RINGING: string = "RWDE_RINGING";
    public static readonly REJECTED: string = "RWDE_REJECTED";
    public static readonly ACCEPTED: string = "RWDE_ACCEPTED";
    private _userName: string = "";

    constructor(param1: string, param2: string, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._userName = param2;
    }

    public get userName(): string {
        return this._userName;
    }
}
