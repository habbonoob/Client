import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';

export class RoomEngineFurnitureLabelEvent extends RoomEngineEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineFurnitureLabelEvent'); }

    public static readonly _SafeStr_14619: string = "REFLE_FURNITURE_LABEL_UPDATED";

    declare private _SafeStr_14615: number;
    static { (this.prototype as any)._SafeStr_14615 = 0; }

    constructor(param1: string, param2: number, param3: number, param4: boolean = false, param5: boolean = false) {
        super(param1, param2, param4, param5);
        this._SafeStr_14615 = param3;
    }

    public get furnitureId(): number {
        return this._SafeStr_14615;
    }
}
