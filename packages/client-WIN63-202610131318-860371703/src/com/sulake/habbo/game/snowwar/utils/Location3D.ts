import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Direction8 } from '@/com/sulake/habbo/game/snowwar/utils/Direction8';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Direction360 } from '@/com/sulake/habbo/game/snowwar/utils/Direction360';

export class Location3D implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.utils::Location3D'); }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    declare private _z: number;
    static { (this.prototype as any)._z = 0; }

    private _disposed: boolean = false;

    constructor(param1: number, param2: number, param3: number) {
        this._SafeStr_2126 = param1;
        this._y = param2;
        this._z = param3;
    }

    public static isInDistanceStatic(param1: number, param2: number, param3: number, param4: number, param5: number): boolean {
        let _loc7_: number = param3 - param1;
        if (_loc7_ < 0) {
            _loc7_ = -_loc7_;
        }
        let _loc6_: number = param4 - param2;
        if (_loc6_ < 0) {
            _loc6_ = -_loc6_;
        }
        if (_loc6_ > param5 || _loc7_ > param5) {
            return false;
        }
        if (_loc7_ * _loc7_ + _loc6_ * _loc6_ < param5 * param5) {
            return true;
        }
        return false;
    }

    public dispose(): void {
        this._SafeStr_2126 = 0;
        this._y = 0;
        this._z = 0;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public get z(): number {
        return this._z;
    }

    public changeLocation(param1: number, param2: number, param3: number): void {
        this._SafeStr_2126 = param1;
        this._y = param2;
        this._z = param3;
    }

    public change2DLocation(param1: number, param2: number): void {
        this._SafeStr_2126 = param1;
        this._y = param2;
    }

    public changeLocationToLocation(param1: Location3D): void {
        this._SafeStr_2126 = param1._SafeStr_2126;
        this._y = param1._y;
        this._z = param1._z;
    }

    public distanceTo(param1: Location3D): number {
        let _loc2_: number = param1._SafeStr_2126 - this._SafeStr_2126;
        let _loc3_: number = param1._y - this._y;
        let _loc4_: number = param1._z - this._z;
        return Math.abs(_loc2_) + Math.abs(_loc3_) + Math.abs(_loc4_) | 0;
    }

    public directionTo(param1: Location3D): Direction8 {
        if (param1._SafeStr_2126 == this._SafeStr_2126 && param1._y == this._y) {
            return null;
        }
        let _loc3_: number = param1._SafeStr_2126 - this._SafeStr_2126;
        let _loc2_: number = param1._y - this._y;
        let _loc4_: number = Direction360.getAngleFromComponents(_loc3_, _loc2_);
        return Direction360.direction360ValueToDirection8(_loc4_);
    }

    public equals(param1: any): boolean {
        if (this == param1) {
            return true;
        }
        if (!(param1 instanceof Location3D)) {
            return false;
        }
        let _loc2_: Location3D = castTo(param1, Location3D);
        if (this._SafeStr_2126 != _loc2_._SafeStr_2126) {
            return false;
        }
        if (this._y != _loc2_._y) {
            return false;
        }
        if (this._z != _loc2_._z) {
            return false;
        }
        return true;
    }

    public hashCode(): number {
        let _loc1_: number = 0;
        _loc1_ = this._SafeStr_2126;
        _loc1_ = 29 * _loc1_ + this._y;
        return 29 * _loc1_ + this._z;
    }

    public toString(): string {
        return "_x:" + this._SafeStr_2126 + "yy:" + this._y + "_zz:" + this._z;
    }

    public isInDistance(param1: Location3D, param2: number): boolean {
        return Location3D.isInDistanceStatic(this._SafeStr_2126, this._y, param1._SafeStr_2126, param1._y, param2);
    }

    get [IDisposable](): true {
        return true;
    }
}
