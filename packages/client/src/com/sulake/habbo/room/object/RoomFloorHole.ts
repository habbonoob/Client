import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomFloorHole {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomFloorHole'); }

    constructor(x: number, y: number, width: number, height: number) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }

    declare private _x: number;
    static { (this.prototype as any)._x = 0; }

    public get x(): number {
        return this._x;
    }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    public get y(): number {
        return this._y;
    }

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    public get width(): number {
        return this._width;
    }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    public get height(): number {
        return this._height;
    }
}
