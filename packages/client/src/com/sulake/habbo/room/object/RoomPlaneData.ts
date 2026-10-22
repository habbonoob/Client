import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomPlaneMaskData } from '@/com/sulake/habbo/room/object/RoomPlaneMaskData';
import { isIVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomPlaneData {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomPlaneData'); }

    public static readonly PLANE_UNDEFINED: number = 0;
    public static readonly PLANE_FLOOR: number = 1;
    public static readonly PLANE_WALL: number = 2;
    public static readonly PLANE_LANDSCAPE: number = 3;
    public static readonly PLANE_BILLBOARD: number = 4;

    constructor(param1: number, param2: IVector3d, param3: IVector3d, param4: IVector3d, param5: any[]) {
        let _loc6_: number = NaN;
        let _loc7_: number = NaN;
        let _loc9_: number = NaN;
        let _loc12_: number = NaN;
        let _loc13_: number = NaN;
        let _loc10_: number = 0;
        let _loc11_: IVector3d = null;
        let _loc8_: Vector3d = null;
        this._secondaryNormals = [];
        this._maskCount = [];
        this._loc = new Vector3d();
        this._loc.assign(param2);
        this._leftSide = new Vector3d();
        this._leftSide.assign(param3);
        this._rightSide = new Vector3d();
        this._rightSide.assign(param4);
        this._type = param1;
        if (param3 != null && param4 != null) {
            this._normal = Vector3d.crossProduct(param3, param4);
            _loc6_ = 0;
            _loc7_ = 0;
            _loc9_ = 0;
            _loc12_ = 0;
            _loc13_ = 0;
            if (this.normal.x != 0 || this.normal.y != 0) {
                _loc12_ = this.normal.x;
                _loc13_ = this.normal.y;
                _loc6_ = 360 + Math.atan2(_loc13_, _loc12_) / 3.141592653589793 * 180;
                if (_loc6_ >= 360) {
                    _loc6_ -= 360;
                }
                _loc12_ = Math.sqrt(this.normal.x * this.normal.x + this.normal.y * this.normal.y);
                _loc13_ = this.normal.z;
                _loc7_ = 360 + Math.atan2(_loc13_, _loc12_) / 3.141592653589793 * 180;
                if (_loc7_ >= 360) {
                    _loc7_ -= 360;
                }
            } else if (this.normal.z < 0) {
                _loc7_ = 90;
            } else {
                _loc7_ = 270;
            }
            this._normalDirection = new Vector3d(_loc6_, _loc7_, _loc9_);
        }
        if (param5 != null && param5.length > 0) {
            _loc10_ = 0;
            while (_loc10_ < param5.length) {
                _loc11_ = param5[_loc10_];
                if (_loc11_ != null && _loc11_.length > 0) {
                    _loc8_ = new Vector3d();
                    _loc8_.assign(_loc11_);
                    _loc8_.mul(1 / _loc8_.length);
                    this._secondaryNormals.push(_loc8_);
                }
                _loc10_++;
            }
        }
    }

    declare private _secondaryNormals: any[];

    private _type: number = 0;

    public get type(): number {
        return this._type;
    }

    private _loc: Vector3d = null;

    public get loc(): IVector3d {
        return this._loc;
    }

    private _leftSide: Vector3d = null;

    public get leftSide(): IVector3d {
        return this._leftSide;
    }

    private _rightSide: Vector3d = null;

    public get rightSide(): IVector3d {
        return this._rightSide;
    }

    private _normal: Vector3d = null;

    public get normal(): IVector3d {
        return this._normal;
    }

    private _normalDirection: Vector3d = null;

    public get normalDirection(): IVector3d {
        return this._normalDirection;
    }

    declare private _maskCount: any[];

    public get maskCount(): number {
        return this._maskCount.length | 0;
    }

    public get secondaryNormalCount(): number {
        return this._secondaryNormals.length | 0;
    }

    public getSecondaryNormal(param1: number): IVector3d {
        if (param1 < 0 || param1 >= this.secondaryNormalCount) {
            return null;
        }
        let _loc2_: Vector3d = new Vector3d();
        _loc2_.assign(asGuarded(this._secondaryNormals[param1], isIVector3d));
        return _loc2_;
    }

    public addMask(param1: number, param2: number, param3: number, param4: number): void {
        let _loc5_: RoomPlaneMaskData = new RoomPlaneMaskData(param1, param2, param3, param4);
        this._maskCount.push(_loc5_);
    }

    public getMaskLeftSideLoc(param1: number): number {
        let _loc2_: RoomPlaneMaskData = this.getMask(param1);
        if (_loc2_ != null) {
            return _loc2_.leftSideLoc;
        }
        return -1;
    }

    public getMaskRightSideLoc(param1: number): number {
        let _loc2_: RoomPlaneMaskData = this.getMask(param1);
        if (_loc2_ != null) {
            return _loc2_.rightSideLoc;
        }
        return -1;
    }

    public getMaskLeftSideLength(param1: number): number {
        let _loc2_: RoomPlaneMaskData = this.getMask(param1);
        if (_loc2_ != null) {
            return _loc2_.leftSideLength;
        }
        return -1;
    }

    public getMaskRightSideLength(param1: number): number {
        let _loc2_: RoomPlaneMaskData = this.getMask(param1);
        if (_loc2_ != null) {
            return _loc2_.rightSideLength;
        }
        return -1;
    }

    private getMask(param1: number): RoomPlaneMaskData {
        if (param1 < 0 || param1 >= this.maskCount) {
            return null;
        }
        return this._maskCount[param1];
    }
}
