import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomObjectMouseEvent } from '@/com/sulake/room/events/RoomObjectMouseEvent';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomObjectWallMouseEvent extends RoomObjectMouseEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectWallMouseEvent'); }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = NaN; }

    declare private _y: number;
    static { (this.prototype as any)._y = NaN; }

    declare private _direction: number;
    static { (this.prototype as any)._direction = NaN; }

    private _wallLocation: Vector3d = null;
    private _wallWidth: Vector3d = null;
    private _wallHeight: Vector3d = null;

    constructor(param1: string, param2: IRoomObject, param3: string, param4: IVector3d, param5: IVector3d, param6: IVector3d, param7: number, param8: number, param9: number, param10: boolean = false, param11: boolean = false, param12: boolean = false, param13: boolean = false, param14: boolean = false, param15: boolean = false) {
        super(param1, param2, param3, param10, param11, param12, param13, param14, param15);
        this._wallLocation = new Vector3d();
        this._wallLocation.assign(param4);
        this._wallWidth = new Vector3d();
        this._wallWidth.assign(param5);
        this._wallHeight = new Vector3d();
        this._wallHeight.assign(param6);
        this._SafeStr_2126 = param7;
        this._y = param8;
        this._direction = param9;
    }

    public get wallLocation(): IVector3d {
        return this._wallLocation;
    }

    public get wallWidth(): IVector3d {
        return this._wallWidth;
    }

    public get wallHeight(): IVector3d {
        return this._wallHeight;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public get direction(): number {
        return this._direction;
    }
}
