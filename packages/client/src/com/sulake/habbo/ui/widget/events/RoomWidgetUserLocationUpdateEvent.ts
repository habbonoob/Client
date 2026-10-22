import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetUserLocationUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetUserLocationUpdateEvent'); }

    public static readonly USER_LOCATION_UPDATE: string = "RWULUE_USER_LOCATION_UPDATE";

    constructor(param1: number, param2: Rectangle, param3: Point, param4: boolean = false, param5: boolean = false) {
        super("RWULUE_USER_LOCATION_UPDATE", param4, param5);
        this._userId = param1;
        this._SafeStr_4345 = param2;
        this._screenLocation = param3;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _SafeStr_4345: Rectangle;

    declare private _screenLocation: Point;

    public get userId(): number {
        return this._userId;
    }

    public get rectangle(): Rectangle {
        return this._SafeStr_4345;
    }

    public get screenLocation(): Point {
        return this._screenLocation;
    }
}
