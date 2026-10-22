import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomGeometry implements IRoomGeometry {
    static { registerClassName(this, 'com.sulake.room.utils::RoomGeometry'); }

    public static readonly SCALE_ZOOMED_IN: number = 64;
    public static readonly SCALE_ZOOMED_OUT: number = 32;

    public static getIntersectionVector(param1: IVector3d, param2: IVector3d, param3: IVector3d, param4: IVector3d): IVector3d {
        let _loc6_: number = Vector3d.dotProduct(param2, param4);
        if (Math.abs(_loc6_) < 0.00001) {
            return null;
        }
        let _loc8_: Vector3d = Vector3d.dif(param1, param3);
        let _loc5_: number = -Vector3d.dotProduct(param4, _loc8_) / _loc6_;
        return Vector3d.sum(param1, Vector3d.product(param2, _loc5_));
    }

    constructor(param1: number, param2: IVector3d, param3: IVector3d, param4: IVector3d = null) {
        this.scale = param1;
        this._SafeStr_2126 = new Vector3d();
        this._y = new Vector3d();
        this._z = new Vector3d();
        this._directionAxis = new Vector3d();
        this._location = new Vector3d();
        this._direction = new Vector3d();
        this._depth = new Vector3d();
        this._x_scale_internal = 1;
        this._y_scale_internal = 1;
        this.x_scale = 1;
        this.y_scale = 1;
        this._z_scale_internal = Math.sqrt(0.5) / Math.sqrt(0.75);
        this.z_scale = 1;
        this.location = new Vector3d(param3.x, param3.y, param3.z);
        this.direction = new Vector3d(param2.x, param2.y, param2.z);
        if (param4 != null) {
            this.setDepthVector(param4);
        } else {
            this.setDepthVector(param2);
        }
        this._SafeStr_3056 = new UtilsMap();
    }

    private _SafeStr_2273: number = 0;

    declare private _SafeStr_2126: Vector3d;

    declare private _y: Vector3d;

    declare private _z: Vector3d;

    declare private _location: Vector3d;

    declare private _direction: Vector3d;

    declare private _depth: Vector3d;

    private _scale: number = 1;
    private _SafeStr_2975: number = 1;
    private _SafeStr_2984: number = 1;
    private _SafeStr_3027: number = 1;
    private _x_scale_internal: number = 1;
    private _y_scale_internal: number = 1;
    private _z_scale_internal: number = 1;

    declare private _SafeStr_2291: Vector3d;

    declare private _dir: Vector3d;

    private _SafeStr_7577: number = -500;
    private _SafeStr_7548: number = 500;
    private _SafeStr_3056: UtilsMap = null;

    declare private _directionAxis: Vector3d;

    public get directionAxis(): IVector3d {
        return this._directionAxis;
    }

    public get updateId(): number {
        return this._SafeStr_2273;
    }

    public get scale(): number {
        return this._scale / Math.sqrt(0.5);
    }

    public set scale(param1: number) {
        if (param1 <= 1) {
            param1 = 1;
        }
        param1 *= Math.sqrt(0.5);
        if (param1 != this._scale) {
            this._scale = param1;
            this._SafeStr_2273 = this._SafeStr_2273 + 1;
        }
    }

    public get location(): IVector3d {
        this._location.assign(this._SafeStr_2291);
        this._location.x *= this._SafeStr_2975;
        this._location.y *= this._SafeStr_2984;
        this._location.z *= this._SafeStr_3027;
        return this._location;
    }

    public set location(param1: IVector3d) {
        if (param1 == null) {
            return;
        }
        if (this._SafeStr_2291 == null) {
            this._SafeStr_2291 = new Vector3d();
        }
        let _loc2_: number = this._SafeStr_2291.x;
        let _loc3_: number = this._SafeStr_2291.y;
        let _loc4_: number = this._SafeStr_2291.z;
        this._SafeStr_2291.assign(param1);
        this._SafeStr_2291.x /= this._SafeStr_2975;
        this._SafeStr_2291.y /= this._SafeStr_2984;
        this._SafeStr_2291.z /= this._SafeStr_3027;
        if (this._SafeStr_2291.x != _loc2_ || this._SafeStr_2291.y != _loc3_ || this._SafeStr_2291.z != _loc4_) {
            this._SafeStr_2273 = this._SafeStr_2273 + 1;
        }
    }

    public get direction(): IVector3d {
        return this._direction;
    }

    public set direction(param1: IVector3d) {
        let _loc4_: number = NaN;
        let _loc21_: number = NaN;
        let _loc19_: Vector3d = null;
        let _loc14_: Vector3d = null;
        let _loc2_: Vector3d = null;
        if (param1 == null) {
            return;
        }
        if (this._dir == null) {
            this._dir = new Vector3d();
        }
        let _loc7_: number = this._dir.x;
        let _loc8_: number = this._dir.y;
        let _loc9_: number = this._dir.z;
        this._dir.assign(param1);
        this._direction.assign(param1);
        if (this._dir.x != _loc7_ || this._dir.y != _loc8_ || this._dir.z != _loc9_) {
            this._SafeStr_2273 = this._SafeStr_2273 + 1;
        }
        let _loc18_: Vector3d = new Vector3d(0, 1, 0);
        let _loc20_: Vector3d = new Vector3d(0, 0, 1);
        let _loc22_: Vector3d = new Vector3d(1, 0, 0);
        let _loc10_: number = param1.x / 180 * 3.141592653589793;
        let _loc11_: number = param1.y / 180 * 3.141592653589793;
        let _loc12_: number = param1.z / 180 * 3.141592653589793;
        let _loc6_: number = Math.cos(_loc10_);
        let _loc25_: number = Math.sin(_loc10_);
        let _loc16_: Vector3d = Vector3d.sum(Vector3d.product(_loc18_, _loc6_), Vector3d.product(_loc22_, -_loc25_));
        let _loc15_: Vector3d = new Vector3d(_loc20_.x, _loc20_.y, _loc20_.z);
        let _loc17_: Vector3d = Vector3d.sum(Vector3d.product(_loc18_, _loc25_), Vector3d.product(_loc22_, _loc6_));
        let _loc5_: number = Math.cos(_loc11_);
        let _loc24_: number = Math.sin(_loc11_);
        let _loc13_: Vector3d = new Vector3d(_loc16_.x, _loc16_.y, _loc16_.z);
        let _loc23_: Vector3d = Vector3d.sum(Vector3d.product(_loc15_, _loc5_), Vector3d.product(_loc17_, _loc24_));
        let _loc3_: Vector3d = Vector3d.sum(Vector3d.product(_loc15_, -_loc24_), Vector3d.product(_loc17_, _loc5_));
        if (_loc12_ != 0) {
            _loc4_ = Math.cos(_loc12_);
            _loc21_ = Math.sin(_loc12_);
            _loc19_ = Vector3d.sum(Vector3d.product(_loc13_, _loc4_), Vector3d.product(_loc23_, _loc21_));
            _loc14_ = Vector3d.sum(Vector3d.product(_loc13_, -_loc21_), Vector3d.product(_loc23_, _loc4_));
            _loc2_ = new Vector3d(_loc3_.x, _loc3_.y, _loc3_.z);
            this._SafeStr_2126.assign(_loc19_);
            this._y.assign(_loc14_);
            this._z.assign(_loc2_);
            this._directionAxis.assign(this._z);
        } else {
            this._SafeStr_2126.assign(_loc13_);
            this._y.assign(_loc23_);
            this._z.assign(_loc3_);
            this._directionAxis.assign(this._z);
        }
    }

    public set x_scale(param1: number) {
        if (this._SafeStr_2975 != param1 * this._x_scale_internal) {
            this._SafeStr_2975 = param1 * this._x_scale_internal;
            this._SafeStr_2273 = this._SafeStr_2273 + 1;
        }
    }

    public set y_scale(param1: number) {
        if (this._SafeStr_2984 != param1 * this._y_scale_internal) {
            this._SafeStr_2984 = param1 * this._y_scale_internal;
            this._SafeStr_2273 = this._SafeStr_2273 + 1;
        }
    }

    public set z_scale(param1: number) {
        if (this._SafeStr_3027 != param1 * this._z_scale_internal) {
            this._SafeStr_3027 = param1 * this._z_scale_internal;
            this._SafeStr_2273 = this._SafeStr_2273 + 1;
        }
    }

    public dispose(): void {
        this._SafeStr_2126 = null;
        this._y = null;
        this._z = null;
        this._SafeStr_2291 = null;
        this._dir = null;
        this._directionAxis = null;
        this._location = null;
        if (this._SafeStr_3056 != null) {
            this._SafeStr_3056.dispose();
            this._SafeStr_3056 = null;
        }
    }

    public setDisplacement(param1: IVector3d, param2: IVector3d): void {
        let _loc4_: string = null;
        let _loc3_: Vector3d = null;
        if (param1 == null || param2 == null) {
            return;
        }
        if (this._SafeStr_3056 != null) {
            _loc4_ = (Math.round(param1.x) | 0) + "_" + (Math.round(param1.y) | 0) + "_" + (Math.round(param1.z) | 0);
            this._SafeStr_3056.remove(_loc4_);
            _loc3_ = new Vector3d();
            _loc3_.assign(param2);
            this._SafeStr_3056.add(_loc4_, _loc3_);
            this._SafeStr_2273 = this._SafeStr_2273 + 1;
        }
    }

    public setDepthVector(param1: IVector3d): void {
        let _loc9_: number = NaN;
        let _loc18_: number = NaN;
        let _loc16_: Vector3d = null;
        let _loc7_: Vector3d = null;
        let _loc4_: Vector3d = null;
        let _loc15_: Vector3d = new Vector3d(0, 1, 0);
        let _loc17_: Vector3d = new Vector3d(0, 0, 1);
        let _loc19_: Vector3d = new Vector3d(1, 0, 0);
        let _loc2_: number = param1.x / 180 * 3.141592653589793;
        let _loc3_: number = param1.y / 180 * 3.141592653589793;
        let _loc5_: number = param1.z / 180 * 3.141592653589793;
        let _loc11_: number = Math.cos(_loc2_);
        let _loc22_: number = Math.sin(_loc2_);
        let _loc13_: Vector3d = Vector3d.sum(Vector3d.product(_loc15_, _loc11_), Vector3d.product(_loc19_, -_loc22_));
        let _loc12_: Vector3d = new Vector3d(_loc17_.x, _loc17_.y, _loc17_.z);
        let _loc14_: Vector3d = Vector3d.sum(Vector3d.product(_loc15_, _loc22_), Vector3d.product(_loc19_, _loc11_));
        let _loc10_: number = Math.cos(_loc3_);
        let _loc21_: number = Math.sin(_loc3_);
        let _loc6_: Vector3d = new Vector3d(_loc13_.x, _loc13_.y, _loc13_.z);
        let _loc20_: Vector3d = Vector3d.sum(Vector3d.product(_loc12_, _loc10_), Vector3d.product(_loc14_, _loc21_));
        let _loc8_: Vector3d = Vector3d.sum(Vector3d.product(_loc12_, -_loc21_), Vector3d.product(_loc14_, _loc10_));
        if (_loc5_ != 0) {
            _loc9_ = Math.cos(_loc5_);
            _loc18_ = Math.sin(_loc5_);
            _loc16_ = Vector3d.sum(Vector3d.product(_loc6_, _loc9_), Vector3d.product(_loc20_, _loc18_));
            _loc7_ = Vector3d.sum(Vector3d.product(_loc6_, -_loc18_), Vector3d.product(_loc20_, _loc9_));
            _loc4_ = new Vector3d(_loc8_.x, _loc8_.y, _loc8_.z);
            this._depth.assign(_loc4_);
        } else {
            this._depth.assign(_loc8_);
        }
        this._SafeStr_2273 = this._SafeStr_2273 + 1;
    }

    public adjustLocation(param1: IVector3d, param2: number): void {
        if (param1 == null || this._z == null) {
            return;
        }
        let _loc4_: Vector3d = Vector3d.product(this._z, -param2);
        let _loc3_: Vector3d = new Vector3d(param1.x + _loc4_.x, param1.y + _loc4_.y, param1.z + _loc4_.z);
        this.location = _loc3_;
    }

    public getCoordinatePosition(param1: IVector3d): IVector3d {
        if (param1 == null) {
            return null;
        }
        let _loc3_: number = Vector3d.scalarProjection(param1, this._SafeStr_2126);
        let _loc4_: number = Vector3d.scalarProjection(param1, this._y);
        let _loc5_: number = Vector3d.scalarProjection(param1, this._z);
        return new Vector3d(_loc3_, _loc4_, _loc5_);
    }

    public getScreenPosition(param1: IVector3d): IVector3d {
        let _loc2_: Vector3d = Vector3d.dif(param1, this._SafeStr_2291);
        _loc2_.x *= this._SafeStr_2975;
        _loc2_.y *= this._SafeStr_2984;
        _loc2_.z *= this._SafeStr_3027;
        let _loc5_: number = Vector3d.scalarProjection(_loc2_, this._depth);
        if (_loc5_ < this._SafeStr_7577 || _loc5_ > this._SafeStr_7548) {
            return null;
        }
        let _loc3_: number = Vector3d.scalarProjection(_loc2_, this._SafeStr_2126);
        let _loc4_: number = -Vector3d.scalarProjection(_loc2_, this._y);
        _loc3_ *= this._scale;
        _loc4_ *= this._scale;
        let _loc6_: IVector3d = this.getDisplacenent(param1);
        if (_loc6_ != null) {
            _loc2_ = Vector3d.dif(param1, this._SafeStr_2291);
            _loc2_.add(_loc6_);
            _loc2_.x *= this._SafeStr_2975;
            _loc2_.y *= this._SafeStr_2984;
            _loc2_.z *= this._SafeStr_3027;
            _loc5_ = Vector3d.scalarProjection(_loc2_, this._depth);
        }
        _loc2_.x = _loc3_;
        _loc2_.y = _loc4_;
        _loc2_.z = _loc5_;
        return _loc2_;
    }

    public getScreenPoint(param1: IVector3d): Point {
        let _loc2_: IVector3d = this.getScreenPosition(param1);
        if (_loc2_ == null) {
            return null;
        }
        return new Point(_loc2_.x, _loc2_.y);
    }

    public getPlanePosition(param1: Point, param2: IVector3d, param3: IVector3d, param4: IVector3d): Point {
        let _loc10_: number = NaN;
        let _loc12_: number = NaN;
        let _loc14_: number = param1.x / this._scale;
        let _loc16_: number = -param1.y / this._scale;
        let _loc6_: Vector3d = Vector3d.product(this._SafeStr_2126, _loc14_);
        _loc6_.add(Vector3d.product(this._y, _loc16_));
        let _loc8_: Vector3d = new Vector3d(this._SafeStr_2291.x * this._SafeStr_2975, this._SafeStr_2291.y * this._SafeStr_2984, this._SafeStr_2291.z * this._SafeStr_3027);
        _loc8_.add(_loc6_);
        let _loc15_: IVector3d = this._z;
        let _loc5_: Vector3d = new Vector3d(param2.x * this._SafeStr_2975, param2.y * this._SafeStr_2984, param2.z * this._SafeStr_3027);
        let _loc13_: Vector3d = new Vector3d(param3.x * this._SafeStr_2975, param3.y * this._SafeStr_2984, param3.z * this._SafeStr_3027);
        let _loc7_: Vector3d = new Vector3d(param4.x * this._SafeStr_2975, param4.y * this._SafeStr_2984, param4.z * this._SafeStr_3027);
        let _loc11_: IVector3d = Vector3d.crossProduct(_loc13_, _loc7_);
        let _loc9_: Vector3d = new Vector3d();
        _loc9_.assign(RoomGeometry.getIntersectionVector(_loc8_, _loc15_, _loc5_, _loc11_));
        if (_loc9_ != null) {
            _loc9_.sub(_loc5_);
            _loc10_ = Vector3d.scalarProjection(_loc9_, param3) / _loc13_.length * param3.length;
            _loc12_ = Vector3d.scalarProjection(_loc9_, param4) / _loc7_.length * param4.length;
            return new Point(_loc10_, _loc12_);
        }
        return null;
    }

    public performZoom(): void {
        if (this.isZoomedIn()) {
            this.scale = 32;
        } else {
            this.scale = 64;
        }
    }

    public isZoomedIn(): boolean {
        return this.scale == 64;
    }

    public performZoomOut(): void {
        this.scale = 32;
    }

    public performZoomIn(): void {
        this.scale = 64;
    }

    private getDisplacenent(param1: IVector3d): IVector3d {
        let _loc2_: string = null;
        if (this._SafeStr_3056 != null) {
            _loc2_ = (Math.round(param1.x) | 0) + "_" + (Math.round(param1.y) | 0) + "_" + (Math.round(param1.z) | 0);
            return this._SafeStr_3056.getValue(_loc2_);
        }
        return null;
    }
}
