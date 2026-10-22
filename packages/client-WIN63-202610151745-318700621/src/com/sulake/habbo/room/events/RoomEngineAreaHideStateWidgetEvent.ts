import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';

export class RoomEngineAreaHideStateWidgetEvent extends RoomEngineToWidgetEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineAreaHideStateWidgetEvent'); }

    public static readonly UPDATE_STATE_AREA_HIDE: string = "RETWE_UPDATE_STATE_AREA_HIDE";

    declare private _isOn: boolean;
    static { (this.prototype as any)._isOn = false; }

    constructor(param1: number, param2: number, param3: number, param4: boolean) {
        super("RETWE_UPDATE_STATE_AREA_HIDE", param1, param2, param3, null, null, null);
        this._isOn = param4;
    }

    public get isOn(): boolean {
        return this._isOn;
    }
}
