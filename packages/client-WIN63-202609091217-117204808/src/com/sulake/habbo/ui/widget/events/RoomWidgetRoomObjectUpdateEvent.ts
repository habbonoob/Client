import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetRoomObjectUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetRoomObjectUpdateEvent'); }

    public static readonly _SafeStr_8600: string = "RWROUE_OBJECT_SELECTED";
    public static readonly _SafeStr_8124: string = "RWROUE_OBJECT_DESELECTED";
    public static readonly USER_REMOVED: string = "RWROUE_USER_REMOVED";
    public static readonly _SafeStr_8300: string = "RWROUE_FURNI_REMOVED";
    public static readonly _SafeStr_8112: string = "RWROUE_FURNI_ADDED";
    public static readonly USER_ADDED: string = "RWROUE_USER_ADDED";
    public static readonly OBJECT_ROLL_OVER: string = "RWROUE_OBJECT_ROLL_OVER";
    public static readonly _SafeStr_7594: string = "RWROUE_OBJECT_ROLL_OUT";
    private _id: number = 0;
    private _category: number = 0;
    private _roomId: number = 0;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: boolean = false, param6: boolean = false) {
        super(param1, param5, param6);
        this._id = param2;
        this._category = param3;
        this._roomId = param4;
    }

    public get id(): number {
        return this._id;
    }

    public get category(): number {
        return this._category;
    }

    public get roomId(): number {
        return this._roomId;
    }
}
