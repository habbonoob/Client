import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Vector3D } from '@/com/sulake/habbo/avatar/geometry/Vector3D';

export class Matrix4x4 {
    static { registerClassName(this, 'com.sulake.habbo.avatar.geometry::Matrix4x4'); }

    static #staticsReady = false;

    private static readonly TOLERANS: number = 1e-18;

    public static get _SafeStr_7377(): Matrix4x4 {
        Matrix4x4.#initStatics();
        return Matrix4x4._SafeStr_7377;
    }

    declare private _data: any[];

    constructor(param1: number = 0, param2: number = 0, param3: number = 0, param4: number = 0, param5: number = 0, param6: number = 0, param7: number = 0, param8: number = 0, param9: number = 0) {
        this._data = [param1, param2, param3, param4, param5, param6, param7, param8, param9];
    }

    public static getXRotationMatrix(param1: number): Matrix4x4 {
        let _loc5_: number = param1 * 3.141592653589793 / 180;
        let _loc3_: number = Number(Math.cos(_loc5_));
        let _loc4_: number = Number(Math.sin(_loc5_));
        return new Matrix4x4(1, 0, 0, 0, _loc3_, -_loc4_, 0, _loc4_, _loc3_);
    }

    public static getYRotationMatrix(param1: number): Matrix4x4 {
        let _loc5_: number = param1 * 3.141592653589793 / 180;
        let _loc3_: number = Number(Math.cos(_loc5_));
        let _loc4_: number = Number(Math.sin(_loc5_));
        return new Matrix4x4(_loc3_, 0, _loc4_, 0, 1, 0, -_loc4_, 0, _loc3_);
    }

    public static getZRotationMatrix(param1: number): Matrix4x4 {
        let _loc5_: number = param1 * 3.141592653589793 / 180;
        let _loc3_: number = Number(Math.cos(_loc5_));
        let _loc4_: number = Number(Math.sin(_loc5_));
        return new Matrix4x4(_loc3_, -_loc4_, 0, _loc4_, _loc3_, 0, 0, 0, 1);
    }

    public identity(): Matrix4x4 {
        this._data = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        return this;
    }

    public vectorMultiplication(param1: Vector3D): Vector3D {
        let _loc2_: number = param1.x * this._data[0] + param1.y * this._data[3] + param1.z * this._data[6];
        let _loc3_: number = param1.x * this._data[1] + param1.y * this._data[4] + param1.z * this._data[7];
        let _loc4_: number = param1.x * this._data[2] + param1.y * this._data[5] + param1.z * this._data[8];
        return new Vector3D(_loc2_, _loc3_, _loc4_);
    }

    public multiply(param1: Matrix4x4): Matrix4x4 {
        let _loc2_: number = this._data[0] * param1.data[0] + this._data[1] * param1.data[3] + this._data[2] * param1.data[6];
        let _loc3_: number = this._data[0] * param1.data[1] + this._data[1] * param1.data[4] + this._data[2] * param1.data[7];
        let _loc4_: number = this._data[0] * param1.data[2] + this._data[1] * param1.data[5] + this._data[2] * param1.data[8];
        let _loc5_: number = this._data[3] * param1.data[0] + this._data[4] * param1.data[3] + this._data[5] * param1.data[6];
        let _loc6_: number = this._data[3] * param1.data[1] + this._data[4] * param1.data[4] + this._data[5] * param1.data[7];
        let _loc7_: number = this._data[3] * param1.data[2] + this._data[4] * param1.data[5] + this._data[5] * param1.data[8];
        let _loc8_: number = this._data[6] * param1.data[0] + this._data[7] * param1.data[3] + this._data[8] * param1.data[6];
        let _loc9_: number = this._data[6] * param1.data[1] + this._data[7] * param1.data[4] + this._data[8] * param1.data[7];
        let _loc10_: number = this._data[6] * param1.data[2] + this._data[7] * param1.data[5] + this._data[8] * param1.data[8];
        return new Matrix4x4(_loc2_, _loc3_, _loc4_, _loc5_, _loc6_, _loc7_, _loc8_, _loc9_, _loc10_);
    }

    public scalarMultiply(param1: number): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._data.length) {
            this._data[_loc2_] *= param1;
            _loc2_++;
        }
    }

    public rotateX(param1: number): Matrix4x4 {
        let _loc5_: number = param1 * 3.141592653589793 / 180;
        let _loc2_: number = Number(Math.cos(_loc5_));
        let _loc4_: number = Number(Math.sin(_loc5_));
        let _loc3_: Matrix4x4 = new Matrix4x4(1, 0, 0, 0, _loc2_, -_loc4_, 0, _loc4_, _loc2_);
        return _loc3_.multiply(this);
    }

    public rotateY(param1: number): Matrix4x4 {
        let _loc5_: number = param1 * 3.141592653589793 / 180;
        let _loc2_: number = Number(Math.cos(_loc5_));
        let _loc4_: number = Number(Math.sin(_loc5_));
        let _loc3_: Matrix4x4 = new Matrix4x4(_loc2_, 0, _loc4_, 0, 1, 0, -_loc4_, 0, _loc2_);
        return _loc3_.multiply(this);
    }

    public rotateZ(param1: number): Matrix4x4 {
        let _loc5_: number = param1 * 3.141592653589793 / 180;
        let _loc2_: number = Number(Math.cos(_loc5_));
        let _loc4_: number = Number(Math.sin(_loc5_));
        let _loc3_: Matrix4x4 = new Matrix4x4(_loc2_, -_loc4_, 0, _loc4_, _loc2_, 0, 0, 0, 1);
        return _loc3_.multiply(this);
    }

    public skew(): void {
    }

    public transpose(): Matrix4x4 {
        return new Matrix4x4(Number(this._data[0]), Number(this._data[3]), Number(this._data[6]), Number(this._data[1]), Number(this._data[4]), Number(this._data[7]), Number(this._data[2]), Number(this._data[5]), Number(this._data[8]));
    }

    public equals(param1: Matrix4x4): boolean {
        return false;
    }

    public get data(): any[] {
        return this._data;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (Matrix4x4.#staticsReady) return;
        Matrix4x4.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(Matrix4x4, name, { value, writable: true, configurable: true, enumerable: true });
        set("_SafeStr_7377", null);
        set("_SafeStr_7377", new Matrix4x4(1, 0, 0, 0, 1, 0, 0, 0, 1));
    }
}
