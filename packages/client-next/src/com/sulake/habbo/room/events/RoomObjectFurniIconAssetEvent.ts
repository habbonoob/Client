import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';

export class RoomObjectFurniIconAssetEvent extends RoomObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectFurniIconAssetEvent'); }

    public static readonly _SafeStr_8737: string = "ROFIAE_LOAD_FURNI_ICON";

    declare private _wallItem: boolean;
    static { (this.prototype as any)._wallItem = false; }

    declare private _typeId: number;
    static { (this.prototype as any)._typeId = 0; }

    declare private _extra: string;

    constructor(param1: string, param2: IRoomObject, param3: boolean, param4: number, param5: string, param6: boolean = false, param7: boolean = false) {
        super(param1, param2, param6, param7);
        this._wallItem = param3;
        this._typeId = param4;
        this._extra = param5;
    }

    public get wallItem(): boolean {
        return this._wallItem;
    }

    public get typeId(): number {
        return this._typeId;
    }

    public get extra(): string {
        return this._extra;
    }
}
