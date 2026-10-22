import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PlaneTexture } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneTexture';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { Randomizer } from '@/com/sulake/habbo/room/object/visualization/room/utils/Randomizer';
import { isIGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';

export class PlaneMaterialCell {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::PlaneMaterialCell'); }

    private _SafeStr_2156: BitmapData = null;

    declare private _SafeStr_2898: PlaneTexture;

    declare private _SafeStr_3640: any[];

    declare private _SafeStr_3736: any[];

    private _SafeStr_4335: number = 0;

    constructor(param1: PlaneTexture, param2: any[] = null, param3: any[] = null, param4: number = 0) {
        let _loc6_: number = 0;
        let _loc7_: IGraphicAsset = null;
        let _loc5_: Point = null;
        this._SafeStr_3640 = [];
        this._SafeStr_3736 = [];
        this._SafeStr_2898 = param1;
        if (param2 != null && param2.length > 0 && param4 > 0) {
            _loc6_ = 0;
            _loc6_ = 0;
            while (_loc6_ < param2.length) {
                _loc7_ = asGuarded(param2[_loc6_], isIGraphicAsset);
                if (_loc7_ != null) {
                    this._SafeStr_3736.push(_loc7_);
                }
                _loc6_++;
            }
            if (this._SafeStr_3736.length > 0) {
                if (param3 != null) {
                    _loc6_ = 0;
                    while (_loc6_ < param3.length) {
                        _loc5_ = asInstanceOf(param3[_loc6_], Point);
                        if (_loc5_ != null) {
                            this._SafeStr_3640.push(new Point(_loc5_.x, _loc5_.y));
                        }
                        _loc6_++;
                    }
                }
                this._SafeStr_4335 = param4;
            }
        }
    }

    public get isStatic(): boolean {
        return this._SafeStr_4335 == 0;
    }

    public dispose(): void {
        if (this._SafeStr_2898 != null) {
            this._SafeStr_2898.dispose();
            this._SafeStr_2898 = null;
        }
        if (this._SafeStr_2156 != null) {
            this._SafeStr_2156.dispose();
            this._SafeStr_2156 = null;
        }
        this._SafeStr_3736 = null;
        this._SafeStr_3640 = null;
    }

    public clearCache(): void {
        if (this._SafeStr_2156 != null) {
            this._SafeStr_2156.dispose();
            this._SafeStr_2156 = null;
        }
    }

    public getHeight(param1: IVector3d): number {
        let _loc2_: BitmapData = null;
        if (this._SafeStr_2898 != null) {
            _loc2_ = this._SafeStr_2898.getBitmap(param1);
            if (_loc2_ != null) {
                return _loc2_.height;
            }
        }
        return 0;
    }

    public render(param1: IVector3d, param2: number, param3: number): BitmapData {
        let _loc16_: BitmapData = null;
        let _loc4_: BitmapData = null;
        let _loc20_: number = 0;
        let _loc5_: number = 0;
        let _loc7_: any[] = null;
        let _loc11_: number = 0;
        let _loc8_: Point = null;
        let _loc6_: IGraphicAsset = null;
        let _loc13_: BitmapDataAsset = null;
        let _loc14_: BitmapData = null;
        let _loc10_: Point = null;
        let _loc9_: Matrix = null;
        let _loc18_: number = NaN;
        let _loc19_: number = NaN;
        let _loc17_: number = NaN;
        let _loc15_: number = NaN;
        let _loc12_: number = 0;
        if (this._SafeStr_2898 != null) {
            _loc16_ = this._SafeStr_2898.getBitmap(param1);
            try {
                if (_loc16_ != null && (param2 != 0 || param3 != 0)) {
                    _loc4_ = new BitmapData(_loc16_.width * 2, _loc16_.height * 2, _loc16_.transparent);
                    _loc4_.copyPixels(_loc16_, _loc16_.rect, new Point());
                    _loc4_.copyPixels(_loc16_, _loc16_.rect, new Point(_loc16_.width, 0));
                    _loc4_.copyPixels(_loc16_, _loc16_.rect, new Point(0, _loc16_.height));
                    _loc4_.copyPixels(_loc16_, _loc16_.rect, new Point(_loc16_.width, _loc16_.height));
                    _loc16_ = new BitmapData(_loc16_.width, _loc16_.height, _loc16_.transparent);
                    while (param2 < 0) {
                        param2 += _loc16_.width;
                    }
                    while (param3 < 0) {
                        param3 += _loc16_.height;
                    }
                    _loc16_.copyPixels(_loc4_, new Rectangle(param2 % _loc16_.width, param3 % _loc16_.height, _loc16_.width, _loc16_.height), new Point());
                }
            } catch (e) {
                return null;
            }
            if (_loc16_ != null) {
                if (!this.isStatic) {
                    if (this._SafeStr_2156 != null) {
                        if (this._SafeStr_2156.width != _loc16_.width || this._SafeStr_2156.height != _loc16_.height) {
                            this._SafeStr_2156.dispose();
                            this._SafeStr_2156 = null;
                        } else {
                            this._SafeStr_2156.copyPixels(_loc16_, _loc16_.rect, new Point(0, 0));
                        }
                    }
                    if (this._SafeStr_2156 == null) {
                        this._SafeStr_2156 = _loc16_.clone();
                    }
                    _loc20_ = Math.min(this._SafeStr_4335, this._SafeStr_3640.length) | 0;
                    _loc5_ = Math.max(this._SafeStr_4335, this._SafeStr_3640.length) | 0;
                    _loc7_ = Randomizer.getArray(this._SafeStr_4335, _loc5_);
                    _loc11_ = 0;
                    while (_loc11_ < _loc20_) {
                        _loc8_ = asInstanceOf(this._SafeStr_3640[_loc7_[_loc11_]], Point);
                        _loc6_ = asGuarded(this._SafeStr_3736[_loc11_ % this._SafeStr_3736.length], isIGraphicAsset);
                        if (_loc8_ != null && _loc6_ != null) {
                            _loc13_ = asInstanceOf(_loc6_.asset, BitmapDataAsset);
                            if (_loc13_ != null) {
                                _loc14_ = asInstanceOf(_loc13_.content, BitmapData);
                                if (_loc14_ != null) {
                                    _loc10_ = new Point(_loc8_.x + _loc6_.offsetX, _loc8_.y + _loc6_.offsetY);
                                    _loc9_ = new Matrix();
                                    _loc18_ = 1;
                                    _loc19_ = 1;
                                    _loc17_ = 0;
                                    _loc15_ = 0;
                                    if (_loc6_.flipH) {
                                        _loc18_ = -1;
                                        _loc17_ = Number(_loc14_.width);
                                    }
                                    if (_loc6_.flipV) {
                                        _loc19_ = -1;
                                        _loc15_ = Number(_loc14_.height);
                                    }
                                    _loc12_ = _loc10_.x + _loc17_ | 0;
                                    _loc12_ = _loc12_ >> 1 << 1;
                                    _loc9_.scale(_loc18_, _loc19_);
                                    _loc9_.translate(_loc12_, _loc10_.y + _loc15_);
                                    this._SafeStr_2156.draw(_loc14_, _loc9_);
                                }
                            }
                        }
                        _loc11_++;
                    }
                    return this._SafeStr_2156;
                }
                return _loc16_;
            }
        }
        return null;
    }

    public getAssetName(param1: IVector3d): string {
        return this._SafeStr_2898 == null ? null : this._SafeStr_2898.getAssetName(param1);
    }
}
