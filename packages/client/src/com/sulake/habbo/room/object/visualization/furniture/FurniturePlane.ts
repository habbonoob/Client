import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class FurniturePlane {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurniturePlane'); }

    constructor(param1: IVector3d, param2: IVector3d, param3: IVector3d) {
        this._origin = new Vector3d();
        this._SafeStr_2291 = new Vector3d();
        this._SafeStr_2291.assign(param1);
        this._leftSide = new Vector3d();
        this._leftSide.assign(param2);
        this._rightSide = new Vector3d();
        this._rightSide.assign(param3);
        this._SafeStr_3460 = new Vector3d();
        this._SafeStr_3460.assign(param2);
        this._SafeStr_3482 = new Vector3d();
        this._SafeStr_3482.assign(param3);
        this._normal = Vector3d.crossProduct(this._leftSide, this._rightSide);
        if (this._normal.length > 0) {
            this._normal.mul(1 / this._normal.length);
        }
        this._offset = new Point();
        this._SafeStr_2386 = new Vector3d();
        this._SafeStr_2339 = new Vector3d();
        this._SafeStr_2269 = new Vector3d();
        this._SafeStr_2332 = new Vector3d();
        this._textures = new UtilsMap();
    }

    private _geometryUpdateId: number = -1;
    private _SafeStr_4436: number = 0;
    private _SafeStr_6470: number = 0;
    private _SafeStr_6940: number = 0;
    private _SafeStr_5486: number = 0;
    private _origin: Vector3d = null;
    private _SafeStr_2291: Vector3d = null;
    private _SafeStr_3460: Vector3d = null;
    private _SafeStr_3482: Vector3d = null;
    private _SafeStr_3209: boolean = true;
    private _textures: UtilsMap = null;
    private _SafeStr_7043: boolean = false;
    private _id: string = null;
    private _SafeStr_2386: Vector3d = null;
    private _SafeStr_2339: Vector3d = null;
    private _SafeStr_2269: Vector3d = null;
    private _SafeStr_2332: Vector3d = null;
    private _width: number = 0;
    private _height: number = 0;
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

    private _bitmapData: BitmapData = null;

    public get bitmapData(): BitmapData {
        if (this._SafeStr_3209) {
            if (this._bitmapData != null) {
                return this._bitmapData.clone();
            }
        }
        return null;
    }

    private _offset: Point = null;

    public get offset(): Point {
        return this._offset;
    }

    private _relativeDepth: number = 0;

    public get relativeDepth(): number {
        return this._relativeDepth;
    }

    private _color: number = 0;

    public get color(): number {
        return this._color;
    }

    public set color(param1: number) {
        this._color = param1;
    }

    public get visible(): boolean {
        return this._SafeStr_3209;
    }

    public get location(): IVector3d {
        return this._SafeStr_2291;
    }

    public dispose(): void {
        let _loc2_: number = 0;
        let _loc1_: BitmapData = null;
        if (this._bitmapData != null) {
            this._bitmapData.dispose();
            this._bitmapData = null;
        }
        if (this._textures != null) {
            _loc2_ = 0;
            while (_loc2_ < this._textures.length) {
                _loc1_ = asInstanceOf(this._textures.getWithIndex(_loc2_), BitmapData);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._textures.dispose();
            this._textures = null;
        }
        this._origin = null;
        this._SafeStr_2291 = null;
        this._leftSide = null;
        this._rightSide = null;
        this._SafeStr_3460 = null;
        this._SafeStr_3482 = null;
        this._normal = null;
        this._SafeStr_2386 = null;
        this._SafeStr_2339 = null;
        this._SafeStr_2269 = null;
        this._SafeStr_2332 = null;
    }

    public setRotation(param1: boolean): void {
        if (param1 != this._SafeStr_7043) {
            if (!param1) {
                this._leftSide.assign(this._SafeStr_3460);
                this._rightSide.assign(this._SafeStr_3482);
            } else {
                this._leftSide.assign(this._SafeStr_3460);
                this._leftSide.mul(this._SafeStr_3482.length / this._SafeStr_3460.length);
                this._rightSide.assign(this._SafeStr_3482);
                this._rightSide.mul(this._SafeStr_3460.length / this._SafeStr_3482.length);
            }
            this._geometryUpdateId = -1;
            this._SafeStr_4436 -= 1;
            this._SafeStr_7043 = param1;
            this.resetTextureCache();
        }
    }

    public update(param1: IRoomGeometry, param2: number): boolean {
        let _loc6_: IVector3d = null;
        let _loc3_: number = NaN;
        let _loc4_: IVector3d = null;
        let _loc5_: number = NaN;
        let _loc7_: number = NaN;
        let _loc8_: BitmapData = null;
        if (param1 == null || this._SafeStr_2291 == null && this._origin != null || this._leftSide == null || this._rightSide == null || this._normal == null) {
            return false;
        }
        let _loc9_: boolean = false;
        if (param1.updateId != this._geometryUpdateId) {
            this._geometryUpdateId = param1.updateId;
            _loc6_ = param1.direction;
            if (_loc6_ != null && (_loc6_.x != this._SafeStr_4436 || _loc6_.y != this._SafeStr_6470 || _loc6_.z != this._SafeStr_6940 || param1.scale != this._SafeStr_5486)) {
                this._SafeStr_4436 = _loc6_.x;
                this._SafeStr_6470 = _loc6_.y;
                this._SafeStr_6940 = _loc6_.z;
                this._SafeStr_5486 = param1.scale;
                _loc9_ = true;
                _loc3_ = 0;
                _loc3_ = Vector3d.cosAngle(param1.directionAxis, this.normal);
                if (_loc3_ > -0.001) {
                    if (this._SafeStr_3209) {
                        this._SafeStr_3209 = false;
                        return true;
                    }
                    return false;
                }
                this.updateCorners(param1);
                _loc4_ = param1.getScreenPosition(this._origin);
                _loc5_ = _loc4_.z;
                this._relativeDepth = _loc7_ = Math.max(this._SafeStr_2386.z - _loc5_, this._SafeStr_2339.z - _loc5_, this._SafeStr_2269.z - _loc5_, this._SafeStr_2332.z - _loc5_);
                this._SafeStr_3209 = true;
            }
        }
        if (this.needsNewTexture(param1) || _loc9_) {
            if (this._bitmapData == null || this._width != this._bitmapData.width || this._height != this._bitmapData.height) {
                if (this._bitmapData != null) {
                    this._bitmapData.dispose();
                    this._bitmapData = null;
                    if (this._width < 1 || this._height < 1) {
                        return true;
                    }
                } else if (this._width < 1 || this._height < 1) {
                    return false;
                }
                this._bitmapData = new BitmapData(this._width | 0, this._height | 0, true, 16777215);
                this._bitmapData.lock();
            } else {
                this._bitmapData.lock();
                this._bitmapData.fillRect(this._bitmapData.rect, 16777215);
            }
            _loc8_ = this.getTexture(param1, param2);
            if (_loc8_ != null) {
                this.renderTexture(param1, _loc8_);
            }
            this._bitmapData.unlock();
            return true;
        }
        return false;
    }

    private cacheTexture(param1: string, param2: BitmapData): boolean {
        let _loc3_: BitmapData = asInstanceOf(this._textures.remove(param1), BitmapData);
        if (_loc3_ != null && param2 != _loc3_) {
            _loc3_.dispose();
        }
        this._textures.add(param1, param2);
        return true;
    }

    private resetTextureCache(): void {
        let _loc2_: number = 0;
        let _loc1_: BitmapData = null;
        if (this._textures != null) {
            _loc2_ = 0;
            while (_loc2_ < this._textures.length) {
                _loc1_ = asInstanceOf(this._textures.getWithIndex(_loc2_), BitmapData);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._textures.reset();
        }
    }

    private getTextureIdentifier(param1: IRoomGeometry): string {
        if (param1 == null) {
            return null;
        }
        return String(param1.scale);
    }

    private needsNewTexture(param1: IRoomGeometry): boolean {
        if (param1 == null) {
            return false;
        }
        let _loc2_: string = this.getTextureIdentifier(param1);
        let _loc3_: BitmapData = asInstanceOf(this._textures.getValue(_loc2_), BitmapData);
        if (this._width > 0 && this._height > 0) {
            if (_loc3_ == null) {
                return true;
            }
        }
        return false;
    }

    private getTexture(param1: IRoomGeometry, param2: number): BitmapData {
        let _loc6_: number = NaN;
        let _loc7_: number = NaN;
        let _loc4_: IVector3d = null;
        if (param1 == null) {
            return null;
        }
        let _loc3_: string = this.getTextureIdentifier(param1);
        let _loc5_: BitmapData = null;
        if (this.needsNewTexture(param1)) {
            _loc6_ = this._leftSide.length * param1.scale;
            _loc7_ = this._rightSide.length * param1.scale;
            if (_loc6_ < 1) {
                _loc6_ = 1;
            }
            if (_loc7_ < 1) {
                _loc7_ = 1;
            }
            _loc4_ = param1.getCoordinatePosition(this._normal);
            _loc5_ = asInstanceOf(this._textures.getValue(_loc3_), BitmapData);
            if (_loc5_ == null) {
                _loc5_ = new BitmapData(_loc6_ | 0, _loc7_ | 0, true, (0xFF000000 | this._color) >>> 0);
                if (_loc5_ != null) {
                    this.cacheTexture(_loc3_, _loc5_);
                }
            }
        } else {
            _loc5_ = asInstanceOf(this._textures.getValue(_loc3_), BitmapData);
        }
        if (_loc5_ != null) {
            return _loc5_;
        }
        return null;
    }

    private updateCorners(param1: IRoomGeometry): void {
        this._SafeStr_2386.assign(param1.getScreenPosition(this._SafeStr_2291));
        this._SafeStr_2339.assign(param1.getScreenPosition(Vector3d.sum(this._SafeStr_2291, this._rightSide)));
        this._SafeStr_2269.assign(param1.getScreenPosition(Vector3d.sum(Vector3d.sum(this._SafeStr_2291, this._leftSide), this._rightSide)));
        this._SafeStr_2332.assign(param1.getScreenPosition(Vector3d.sum(this._SafeStr_2291, this._leftSide)));
        this._offset = param1.getScreenPoint(this._origin);
        this._SafeStr_2386.x = Math.round(this._SafeStr_2386.x);
        this._SafeStr_2386.y = Math.round(this._SafeStr_2386.y);
        this._SafeStr_2339.x = Math.round(this._SafeStr_2339.x);
        this._SafeStr_2339.y = Math.round(this._SafeStr_2339.y);
        this._SafeStr_2269.x = Math.round(this._SafeStr_2269.x);
        this._SafeStr_2269.y = Math.round(this._SafeStr_2269.y);
        this._SafeStr_2332.x = Math.round(this._SafeStr_2332.x);
        this._SafeStr_2332.y = Math.round(this._SafeStr_2332.y);
        this._offset.x = Math.round(this._offset.x);
        this._offset.y = Math.round(this._offset.y);
        let _loc3_: number = Math.min(this._SafeStr_2386.x, this._SafeStr_2339.x, this._SafeStr_2269.x, this._SafeStr_2332.x);
        let _loc5_: number = Math.max(this._SafeStr_2386.x, this._SafeStr_2339.x, this._SafeStr_2269.x, this._SafeStr_2332.x);
        let _loc2_: number = Math.min(this._SafeStr_2386.y, this._SafeStr_2339.y, this._SafeStr_2269.y, this._SafeStr_2332.y);
        let _loc4_: number = Math.max(this._SafeStr_2386.y, this._SafeStr_2339.y, this._SafeStr_2269.y, this._SafeStr_2332.y);
        _loc5_ -= _loc3_;
        this._offset.x -= _loc3_;
        this._SafeStr_2386.x -= _loc3_;
        this._SafeStr_2339.x -= _loc3_;
        this._SafeStr_2269.x -= _loc3_;
        this._SafeStr_2332.x -= _loc3_;
        _loc4_ -= _loc2_;
        this._offset.y -= _loc2_;
        this._SafeStr_2386.y -= _loc2_;
        this._SafeStr_2339.y -= _loc2_;
        this._SafeStr_2269.y -= _loc2_;
        this._SafeStr_2332.y -= _loc2_;
        this._width = _loc5_;
        this._height = _loc4_;
    }

    private renderTexture(param1: IRoomGeometry, param2: BitmapData): void {
        if (this._SafeStr_2386 == null || this._SafeStr_2339 == null || this._SafeStr_2269 == null || this._SafeStr_2332 == null || param2 == null || this._bitmapData == null) {
            return;
        }
        let _loc8_: number = this._SafeStr_2332.x - this._SafeStr_2269.x;
        let _loc10_: number = this._SafeStr_2332.y - this._SafeStr_2269.y;
        let _loc4_: number = this._SafeStr_2339.x - this._SafeStr_2269.x;
        let _loc3_: number = this._SafeStr_2339.y - this._SafeStr_2269.y;
        if (Math.abs(_loc4_ - param2.width) <= 1) {
            _loc4_ = param2.width;
        }
        if (Math.abs(_loc3_ - param2.width) <= 1) {
            _loc3_ = param2.width;
        }
        if (Math.abs(_loc8_ - param2.height) <= 1) {
            _loc8_ = param2.height;
        }
        if (Math.abs(_loc10_ - param2.height) <= 1) {
            _loc10_ = param2.height;
        }
        let _loc5_: number = _loc4_ / param2.width;
        let _loc6_: number = _loc3_ / param2.width;
        let _loc7_: number = _loc8_ / param2.height;
        let _loc9_: number = _loc10_ / param2.height;
        let _loc11_: Matrix = new Matrix();
        _loc11_.a = _loc5_;
        _loc11_.b = _loc6_;
        _loc11_.c = _loc7_;
        _loc11_.d = _loc9_;
        _loc11_.translate(this._SafeStr_2269.x, this._SafeStr_2269.y);
        this.draw(param2, _loc11_);
    }

    private draw(param1: BitmapData, param2: Matrix): void {
        let _loc4_: number = 0;
        let _loc7_: any = 0;
        let _loc3_: number = NaN;
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        if (this._bitmapData != null) {
            if (param2.a == 1 && param2.d == 1 && param2.c == 0 && param2.b != 0 && Math.abs(param2.b) <= 1) {
                _loc4_ = 0;
                _loc7_ = 0;
                _loc3_ = 0;
                _loc6_ = 0;
                if (param2.b > 0) {
                    param2.ty++;
                }
                _loc5_ = 0;
                while (_loc4_ < param1.width) {
                    _loc4_++;
                    _loc3_ += Math.abs(param2.b);
                    if (_loc3_ >= 1) {
                        this._bitmapData.copyPixels(param1, new Rectangle(Number(_loc7_ + _loc6_), 0, _loc4_ - _loc7_, param1.height), new Point(Number(param2.tx + _loc7_), param2.ty + _loc5_), null, null, true);
                        _loc7_ = _loc4_;
                        if (param2.b > 0) {
                            _loc5_++;
                        } else {
                            _loc5_--;
                        }
                        _loc3_ = 0;
                    }
                }
                if (_loc3_ > 0) {
                    this._bitmapData.copyPixels(param1, new Rectangle(Number(_loc7_), 0, _loc4_ - _loc7_, param1.height), new Point(Number(param2.tx + _loc7_), param2.ty + _loc5_), null, null, true);
                }
                return;
            }
            this._bitmapData.draw(param1, param2, null, null, null, false);
        }
    }
}
