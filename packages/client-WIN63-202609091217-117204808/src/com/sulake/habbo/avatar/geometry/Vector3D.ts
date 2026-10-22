import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class Vector3D {
    static { registerClassName(this, 'com.sulake.habbo.avatar.geometry::Vector3D'); }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = NaN; }

    declare private _y: number;
    static { (this.prototype as any)._y = NaN; }

    declare private _z: number;
    static { (this.prototype as any)._z = NaN; }

    constructor(param1: number = 0, param2: number = 0, param3: number = 0) {
        this._SafeStr_2126 = param1;
        this._y = param2;
        this._z = param3;
    }

    public static dot(param1: Vector3D, param2: Vector3D): number {
        return param1.x * param2.x + param1.y * param2.y + param1.z * param2.z;
    }

    public static cross(param1: Vector3D, param2: Vector3D): Vector3D {
        let _loc3_: Vector3D = new Vector3D();
        _loc3_.x = param1.y * param2.z - param1.z * param2.y;
        _loc3_.y = param1.z * param2.x - param1.x * param2.z;
        _loc3_.z = param1.x * param2.y - param1.y * param2.x;
        return _loc3_;
    }

    public static subtract(param1: Vector3D, param2: Vector3D): Vector3D {
        return new Vector3D(param1.x - param2.x, param1.y - param2.y, param1.z - param2.z);
    }

    public dot(param1: Vector3D): number {
        return this._SafeStr_2126 * param1.x + this._y * param1.y + this._z * param1.z;
    }

    public cross(param1: Vector3D): Vector3D {
        let _loc2_: Vector3D = new Vector3D();
        _loc2_.x = this._y * param1.z - this._z * param1.y;
        _loc2_.y = this._z * param1.x - this._SafeStr_2126 * param1.z;
        _loc2_.z = this._SafeStr_2126 * param1.y - this._y * param1.x;
        return _loc2_;
    }

    public subtract(param1: Vector3D): void {
        this._SafeStr_2126 -= param1.x;
        this._y -= param1.y;
        this._z -= param1.z;
    }

    public add(param1: Vector3D): void {
        this._SafeStr_2126 += param1.x;
        this._y += param1.y;
        this._z += param1.z;
    }

    public normalize(): void {
        let _loc1_: number = 1 / this.length();
        this._SafeStr_2126 *= _loc1_;
        this._y *= _loc1_;
        this._z *= _loc1_;
    }

    public length(): number {
        return Math.sqrt(this._SafeStr_2126 * this._SafeStr_2126 + this._y * this._y + this._z * this._z);
    }

    public toString(): string {
        return "Vector3D: (" + this._SafeStr_2126 + "," + this._y + "," + this._z + ")";
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

    public set x(param1: number) {
        this._SafeStr_2126 = param1;
    }

    public set y(param1: number) {
        this._y = param1;
    }

    public set z(param1: number) {
        this._z = param1;
    }
}
