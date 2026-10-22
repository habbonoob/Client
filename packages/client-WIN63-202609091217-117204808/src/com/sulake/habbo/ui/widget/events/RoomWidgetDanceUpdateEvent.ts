import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetDanceUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetDanceUpdateEvent'); }

    public static readonly _SafeStr_8311: string = "RWUE_DANCE";

    declare private _style: number;
    static { (this.prototype as any)._style = 0; }

    constructor(param1: number, param2: boolean = false, param3: boolean = false) {
        super("RWUE_DANCE", param2, param3);
        this._style = param1;
    }

    public get style(): number {
        return this._style;
    }
}
