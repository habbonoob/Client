import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IVector3d } from '@/com/sulake/room/utils/IVector3d';

export class Vector3d implements IVector3d {
    static { registerClassName(this, 'com.sulake.room.utils::Vector3d'); }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = NaN; }

    declare private _y: number;
    static { (this.prototype as any)._y = NaN; }

    declare private _z: number;
    static { (this.prototype as any)._z = NaN; }

    private _length: number = NaN;

    constructor(param1: number = 0, param2: number = 0, param3: number = 0) {
        this._SafeStr_2126 = param1;
        this._y = param2;
        this._z = param3;
    }

    public static sum(param1: IVector3d, param2: IVector3d): Vector3d {
        if (param1 == null || param2 == null) {
            return null;
        }
        return new Vector3d(param1.x + param2.x, param1.y + param2.y, param1.z + param2.z);
    }

    public static dif(param1: IVector3d, param2: IVector3d): Vector3d {
        if (param1 == null || param2 == null) {
            return null;
        }
        return new Vector3d(param1.x - param2.x, param1.y - param2.y, param1.z - param2.z);
    }

    public static product(param1: IVector3d, param2: number): Vector3d {
        if (param1 == null) {
            return null;
        }
        return new Vector3d(param1.x * param2, param1.y * param2, param1.z * param2);
    }

    public static dotProduct(param1: IVector3d, param2: IVector3d): number {
        if (param1 == null || param2 == null) {
            return 0;
        }
        return param1.x * param2.x + param1.y * param2.y + param1.z * param2.z;
    }

    public static crossProduct(param1: IVector3d, param2: IVector3d): Vector3d {
        if (param1 == null || param2 == null) {
            return null;
        }
        return new Vector3d(param1.y * param2.z - param1.z * param2.y, param1.z * param2.x - param1.x * param2.z, param1.x * param2.y - param1.y * param2.x);
    }

    public static scalarProjection(param1: IVector3d, param2: IVector3d): number {
        if (param1 == null || param2 == null) {
            return -1;
        }
        let _loc3_: number = param2.length;
        if (_loc3_ > 0) {
            return (param1.x * param2.x + param1.y * param2.y + param1.z * param2.z) / _loc3_;
        }
        return -1;
    }

    public static cosAngle(param1: IVector3d, param2: IVector3d): number {
        if (param1 == null || param2 == null) {
            return 0;
        }
        let _loc3_: number = param1.length * param2.length;
        if (_loc3_ == 0) {
            return 0;
        }
        return Vector3d.dotProduct(param1, param2) / _loc3_;
    }

    public static isEqual(param1: IVector3d, param2: IVector3d): boolean {
        if (param1 == null || param2 == null) {
            return false;
        }
        if (param1.x == param2.x && param1.y == param2.y && param1.z == param2.z) {
            return true;
        }
        return false;
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

    public get length(): number {
        if (isNaN(this._length)) {
            this._length = Math.sqrt(this._SafeStr_2126 * this._SafeStr_2126 + this._y * this._y + this._z * this._z);
        }
        return this._length;
    }

    public set x(param1: number) {
        this._SafeStr_2126 = param1;
        this._length = NaN;
    }

    public set y(param1: number) {
        this._y = param1;
        this._length = NaN;
    }

    public set z(param1: number) {
        this._z = param1;
        this._length = NaN;
    }

    public negate(): void {
        this._SafeStr_2126 = -this._SafeStr_2126;
        this._y = -this._y;
        this._z = -this._z;
    }

    public add(param1: IVector3d): void {
        if (param1 == null) {
            return;
        }
        this._SafeStr_2126 += param1.x;
        this._y += param1.y;
        this._z += param1.z;
        this._length = NaN;
    }

    public sub(param1: IVector3d): void {
        if (param1 == null) {
            return;
        }
        this._SafeStr_2126 -= param1.x;
        this._y -= param1.y;
        this._z -= param1.z;
        this._length = NaN;
    }

    public mul(param1: number): void {
        this._SafeStr_2126 *= param1;
        this._y *= param1;
        this._z *= param1;
        this._length = NaN;
    }

    public div(param1: number): void {
        if (param1 != 0) {
            this._SafeStr_2126 /= param1;
            this._y /= param1;
            this._z /= param1;
            this._length = NaN;
        }
    }

    public assign(param1: IVector3d): void {
        if (param1 == null) {
            return;
        }
        this._SafeStr_2126 = param1.x;
        this._y = param1.y;
        this._z = param1.z;
        this._length = NaN;
    }

    public toString(): string {
        return "(" + [this._SafeStr_2126, this._y, this._z].join(",") + ")";
    }

    get [IVector3d](): true {
        return true;
    }
}
