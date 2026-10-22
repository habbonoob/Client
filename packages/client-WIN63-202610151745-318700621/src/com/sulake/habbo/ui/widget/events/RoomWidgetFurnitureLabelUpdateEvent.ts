import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetFurnitureLabelUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetFurnitureLabelUpdateEvent'); }

    public static readonly _SafeStr_14619: string = "RWFLE_FURNITURE_LABEL_UPDATED";
    public static readonly _SafeStr_14620: string = "RWFLE_FURNITURE_LABEL_SETTINGS_OPEN";

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _SafeStr_14615: number;
    static { (this.prototype as any)._SafeStr_14615 = 0; }

    constructor(param1: string, param2: number, param3: number, param4: boolean = false, param5: boolean = false) {
        super(param1, param4, param5);
        this._roomId = param2;
        this._SafeStr_14615 = param3;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get furnitureId(): number {
        return this._SafeStr_14615;
    }
}
