import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetRoomViewUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetRoomViewUpdateEvent'); }

    public static readonly ROOM_VIEW_SIZE_CHANGED: string = "RWRVUE_ROOM_VIEW_SIZE_CHANGED";
    public static readonly ROOM_VIEW_SCALE_CHANGED: string = "RWRVUE_ROOM_VIEW_SCALE_CHANGED";
    public static readonly ROOM_VIEW_POSITION_CHANGED: string = "RWRVUE_ROOM_VIEW_POSITION_CHANGED";

    declare private _SafeStr_5817: Rectangle;

    declare private _SafeStr_5662: Point;

    private _scale: number = 0;

    constructor(param1: string, param2: Rectangle = null, param3: Point = null, param4: number = 0, param5: boolean = false, param6: boolean = false) {
        super(param1, param5, param6);
        this._SafeStr_5817 = param2;
        this._SafeStr_5662 = param3;
        this._scale = param4;
    }

    public get rect(): Rectangle {
        if (this._SafeStr_5817 != null) {
            return this._SafeStr_5817.clone();
        }
        return null;
    }

    public get positionDelta(): Point {
        if (this._SafeStr_5662 != null) {
            return this._SafeStr_5662.clone();
        }
        return null;
    }

    public get scale(): number {
        return this._scale;
    }
}
