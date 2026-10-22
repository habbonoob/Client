import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { ISortableSprite } from '@/com/sulake/room/object/visualization/ISortableSprite';

export class SortableSprite implements ISortableSprite {
    static { registerClassName(this, 'com.sulake.room.renderer.utils::SortableSprite'); }

    public static readonly _SafeStr_8587: number = 100000000;

    constructor() {
    }

    public name: string = "";
    private _SafeStr_2126: number = 0;
    private _y: number = 0;
    private _z: number = 0;
    private _sprite: IRoomObjectSprite = null;

    public get x(): number {
        return this._SafeStr_2126;
    }

    public set x(param1: number) {
        this._SafeStr_2126 = param1;
    }

    public get y(): number {
        return this._y;
    }

    public set y(param1: number) {
        this._y = param1;
    }

    public get z(): number {
        return this._z;
    }

    public set z(param1: number) {
        this._z = param1;
    }

    public get sprite(): IRoomObjectSprite {
        return this._sprite;
    }

    public set sprite(param1: IRoomObjectSprite) {
        this._sprite = param1;
    }

    public dispose(): void {
        this._sprite = null;
        this._z = -100000000;
    }
}
