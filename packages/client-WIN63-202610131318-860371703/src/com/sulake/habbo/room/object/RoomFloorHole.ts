import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomFloorHole {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomFloorHole'); }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    constructor(param1: number, param2: number, param3: number, param4: number) {
        this._SafeStr_2126 = param1;
        this._y = param2;
        this._width = param3;
        this._height = param4;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }
}
