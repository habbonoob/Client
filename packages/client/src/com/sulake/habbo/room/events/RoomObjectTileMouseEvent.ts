import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { RoomObjectMouseEvent } from '@/com/sulake/room/events/RoomObjectMouseEvent';

export class RoomObjectTileMouseEvent extends RoomObjectMouseEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectTileMouseEvent'); }

    constructor(param1: string, param2: IRoomObject, param3: string, param4: number, param5: number, param6: number, param7: boolean = false, param8: boolean = false, param9: boolean = false, param10: boolean = false, param11: boolean = false, param12: boolean = false) {
        super(param1, param2, param3, param7, param8, param9, param10, param11, param12);
        this._tileX = param4;
        this._tileY = param5;
        this._tileZ = param6;
    }

    declare private _tileX: number;
    static { (this.prototype as any)._tileX = NaN; }

    declare private _tileY: number;
    static { (this.prototype as any)._tileY = NaN; }

    declare private _tileZ: number;
    static { (this.prototype as any)._tileZ = NaN; }

    public get tileX(): number {
        return this._tileX;
    }

    public get tileY(): number {
        return this._tileY;
    }

    public get tileZ(): number {
        return this._tileZ;
    }

    public get tileXAsInt(): number {
        return this._tileX + 0.499 | 0;
    }

    public get tileYAsInt(): number {
        return this._tileY + 0.499 | 0;
    }

    public get tileZAsInt(): number {
        return this._tileZ + 0.499 | 0;
    }
}
