import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetRoomEngineUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetRoomEngineUpdateEvent'); }

    public static readonly GAME_MODE: string = "RWREUE_GAME_MODE";
    public static readonly NORMAL_MODE: string = "RWREUE_NORMAL_MODE";
    private _roomId: number = 0;

    constructor(param1: string, param2: number, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._roomId = param2;
    }

    public get roomId(): number {
        return this._roomId;
    }
}
