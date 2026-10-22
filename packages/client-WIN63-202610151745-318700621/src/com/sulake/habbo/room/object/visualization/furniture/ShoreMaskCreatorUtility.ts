import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { BitmapDataUtil } from '@/com/sulake/room/utils/BitmapDataUtil';

export class ShoreMaskCreatorUtility {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::ShoreMaskCreatorUtility'); }

    public static readonly _SafeStr_8496: number = 0;
    public static readonly STRAIGHT_CUT: number = 1;
    public static readonly INNER_CUT: number = 2;
    private static readonly CUT_TYPE_COUNT: number = 3;
    private static readonly MASK_COLOR_TRANSPARENT: number = 0;
    private static readonly MASK_COLOR_SOLID: number = 4294967295;

    constructor() {
    }

    public static createEmptyMask(param1: number, param2: number): BitmapData {
        return new BitmapData(param1, param2, true, 0);
    }

    public static getInstanceMaskName(param1: number, param2: number): string {
        return "instance_mask_" + param1 + "_" + param2;
    }

    public static getBorderType(param1: number, param2: number): number {
        return param1 + param2 * 3;
    }

    public static getInstanceMask(param1: number, param2: number, param3: IGraphicAssetCollection, param4: IGraphicAsset): IGraphicAsset {
        let _loc8_: BitmapDataAsset = null;
        let _loc6_: BitmapData = null;
        let _loc7_: string = ShoreMaskCreatorUtility.getInstanceMaskName(param1, param2);
        let _loc5_: IGraphicAsset = param3.getAsset(_loc7_);
        if (_loc5_ == null) {
            if (param4 != null) {
                _loc8_ = asInstanceOf(param4.asset, BitmapDataAsset);
                if (_loc8_ != null) {
                    _loc6_ = asInstanceOf(_loc8_.content, BitmapData);
                    if (_loc6_ != null) {
                        param3.addAsset(_loc7_, new BitmapData(_loc6_.width, _loc6_.height, true, 0), false, param4.offsetX, param4.offsetY);
                        _loc5_ = param3.getAsset(_loc7_);
                    }
                }
            }
        }
        return _loc5_;
    }

    public static disposeInstanceMask(param1: number, param2: number, param3: IGraphicAssetCollection): void {
        let _loc4_: string = ShoreMaskCreatorUtility.getInstanceMaskName(param1, param2);
        param3.disposeAsset(_loc4_);
    }

    public static createShoreMask2x2(param1: BitmapData, param2: number, param3: any[], param4: any[], param5: IGraphicAssetCollection): BitmapData {
        let _loc6_: number = 0;
        let _loc7_: string = null;
        let _loc9_: IGraphicAsset = null;
        let _loc8_: BitmapData = null;
        param1.fillRect(param1.rect, 0);
        _loc6_ = 0;
        while (_loc6_ < param3.length) {
            if (param3[_loc6_] == true) {
                _loc7_ = "mask_" + param2 + "_" + _loc6_ + "_" + param4[_loc6_];
                _loc9_ = param5.getAsset(_loc7_);
                if (_loc9_ != null && _loc9_.asset != null) {
                    _loc8_ = asInstanceOf(_loc9_.asset.content, BitmapData);
                    if (_loc8_ != null) {
                        param1.copyPixels(_loc8_, _loc8_.rect, new Point(0, 0), _loc8_, new Point(0, 0), true);
                    }
                }
            }
            _loc6_++;
        }
        return param1;
    }

    public static initializeShoreMasks(param1: number, param2: IGraphicAssetCollection, param3: IGraphicAsset): boolean {
        let _loc4_: string = null;
        let _loc7_: BitmapDataAsset = null;
        let _loc5_: BitmapData = null;
        let _loc9_: any[] = null;
        let _loc8_: any[] = null;
        let _loc10_: BitmapData = null;
        let _loc6_: number = 0;
        if (param2 != null) {
            _loc4_ = "masks_done_" + param1;
            if (param2.getAsset(_loc4_) == null) {
                if (param3 != null) {
                    _loc7_ = asInstanceOf(param3.asset, BitmapDataAsset);
                    if (_loc7_ != null) {
                        _loc5_ = asInstanceOf(_loc7_.content, BitmapData);
                        _loc9_ = [0, 1, 2, 0, 1, 2];
                        _loc8_ = [1, 1, 1, 2, 2, 2];
                        _loc10_ = null;
                        _loc6_ = 0;
                        if (_loc5_ != null) {
                            _loc6_ = 0;
                            while (_loc6_ < _loc9_.length && _loc6_ < _loc8_.length) {
                                _loc10_ = ShoreMaskCreatorUtility.createMaskLeft(_loc5_.width, _loc5_.height);
                                ShoreMaskCreatorUtility.cutLeftMask(_loc10_, param1, _loc9_[_loc6_] | 0, _loc8_[_loc6_] | 0);
                                ShoreMaskCreatorUtility.storeLeftMask(param2, _loc10_, param1, _loc9_[_loc6_] | 0, _loc8_[_loc6_] | 0);
                                _loc10_ = ShoreMaskCreatorUtility.createMaskRight(_loc5_.width, _loc5_.height);
                                ShoreMaskCreatorUtility.cutRightMask(_loc10_, param1, _loc8_[_loc6_] | 0, _loc9_[_loc6_] | 0);
                                ShoreMaskCreatorUtility.storeRightMask(param2, _loc10_, param1, _loc8_[_loc6_] | 0, _loc9_[_loc6_] | 0);
                                _loc6_++;
                            }
                        }
                    }
                    param2.addAsset(_loc4_, new BitmapData(1, 1), false);
                    return true;
                }
                return false;
            }
            return true;
        }
        return false;
    }

    private static createMaskLeft(param1: number, param2: number): BitmapData {
        let _loc3_: BitmapData = new BitmapData(param1, param2, true, 0);
        ShoreMaskCreatorUtility.fillTopLeftCorner(_loc3_, _loc3_.width / 2 | 0, _loc3_.height / 2 - 1 | 0, 1, 4294967295);
        return _loc3_;
    }

    private static cutLeftMask(param1: BitmapData, param2: number, param3: number, param4: number): void {
        if (param3 == 1) {
            ShoreMaskCreatorUtility.cutLeftMaskOuterCorner(param1, param2, false);
        } else if (param3 == 2) {
            ShoreMaskCreatorUtility.cutLeftMaskOuterCorner(param1, param2, true);
        }
        if (param4 == 2) {
            ShoreMaskCreatorUtility.cutLeftMaskInnerCorner(param1, param2);
        }
    }

    private static cutLeftMaskOuterCorner(param1: BitmapData, param2: number, param3: boolean): void {
        let _loc4_: number = param1.height / 2 - param2 / 2 | 0;
        let _loc5_: number = param1.width / 2 | 0;
        if (param3) {
            param1.fillRect(new Rectangle(_loc5_, 0, param1.width, _loc4_), 0);
        } else {
            ShoreMaskCreatorUtility.fillTopLeftCorner(param1, _loc5_, _loc4_ - 1, 1, 0);
        }
    }

    private static cutLeftMaskInnerCorner(param1: BitmapData, param2: number): void {
        let _loc3_: number = param1.width / 2 + param2 / 2 | 0;
        param1.fillRect(new Rectangle(_loc3_, 0, param1.width, param1.height / 2), 0);
    }

    private static createMaskRight(param1: number, param2: number): BitmapData {
        let _loc3_: BitmapData = new BitmapData(param1, param2, true, 0);
        ShoreMaskCreatorUtility.fillBottomRightCorner(_loc3_, _loc3_.width / 2 + 1 | 0, _loc3_.height / 2 - 1 | 0, 4294967295);
        return _loc3_;
    }

    private static cutRightMask(param1: BitmapData, param2: number, param3: number, param4: number): void {
        if (param4 == 1) {
            ShoreMaskCreatorUtility.cutRightMaskOuterCorner(param1, param2, false);
        } else if (param4 == 2) {
            ShoreMaskCreatorUtility.cutRightMaskOuterCorner(param1, param2, true);
        }
        if (param3 == 2) {
            ShoreMaskCreatorUtility.cutRightMaskInnerCorner(param1, param2);
        }
    }

    private static cutRightMaskInnerCorner(param1: BitmapData, param2: number): void {
        let _loc3_: number = param1.width / 2 + param2 / 2 | 0;
        param1.fillRect(new Rectangle(_loc3_, 0, param1.width, param1.height / 2 - param2 / 4), 0);
    }

    private static cutRightMaskOuterCorner(param1: BitmapData, param2: number, param3: boolean): void {
        let _loc4_: number = param1.height / 2 | 0;
        let _loc5_: number = param1.width / 2 + param2 | 0;
        if (param3) {
            param1.fillRect(new Rectangle(_loc5_, 0, param1.width, _loc4_), 0);
        } else {
            ShoreMaskCreatorUtility.fillBottomRightCorner(param1, _loc5_ + 1, _loc4_ - 1, 0);
        }
    }

    private static storeLeftMask(param1: IGraphicAssetCollection, param2: BitmapData, param3: number, param4: number, param5: number): void {
        let _loc6_: string = null;
        if (param1 != null) {
            _loc6_ = "";
            _loc6_ = "mask_" + param3 + "_0_" + ShoreMaskCreatorUtility.getBorderType(param4, param5);
            param1.addAsset(_loc6_, param2, false);
            _loc6_ = "mask_" + param3 + "_3_" + ShoreMaskCreatorUtility.getBorderType(param5, param4);
            param1.addAsset(_loc6_, BitmapDataUtil.getFlipVBitmapData(param2), false);
            _loc6_ = "mask_" + param3 + "_4_" + ShoreMaskCreatorUtility.getBorderType(param4, param5);
            param1.addAsset(_loc6_, BitmapDataUtil.getFlipHVBitmapData(param2), false);
            _loc6_ = "mask_" + param3 + "_7_" + ShoreMaskCreatorUtility.getBorderType(param5, param4);
            param1.addAsset(_loc6_, BitmapDataUtil.getFlipHBitmapData(param2), false);
        }
    }

    private static storeRightMask(param1: IGraphicAssetCollection, param2: BitmapData, param3: number, param4: number, param5: number): void {
        let _loc6_: string = null;
        if (param1 != null) {
            _loc6_ = "";
            _loc6_ = "mask_" + param3 + "_1_" + ShoreMaskCreatorUtility.getBorderType(param4, param5);
            param1.addAsset(_loc6_, param2, false);
            _loc6_ = "mask_" + param3 + "_2_" + ShoreMaskCreatorUtility.getBorderType(param5, param4);
            param1.addAsset(_loc6_, BitmapDataUtil.getFlipVBitmapData(param2), false);
            _loc6_ = "mask_" + param3 + "_5_" + ShoreMaskCreatorUtility.getBorderType(param4, param5);
            param1.addAsset(_loc6_, BitmapDataUtil.getFlipHVBitmapData(param2), false);
            _loc6_ = "mask_" + param3 + "_6_" + ShoreMaskCreatorUtility.getBorderType(param5, param4);
            param1.addAsset(_loc6_, BitmapDataUtil.getFlipHBitmapData(param2), false);
        }
    }

    private static fillTopLeftCorner(param1: BitmapData, param2: number, param3: number, param4: number, param5: number): void {
        let _loc9_: number = 0;
        let _loc6_: number = param2;
        let _loc7_: number = param3;
        let _loc8_: number = param4;
        while (_loc7_ >= 0) {
            _loc9_ = _loc7_;
            while (_loc9_ >= 0) {
                param1.setPixel32(_loc6_, _loc9_, param5);
                _loc9_--;
            }
            if (++_loc8_ >= 2) {
                _loc7_--;
                _loc8_ = 0;
            }
            _loc6_++;
        }
    }

    private static fillBottomRightCorner(param1: BitmapData, param2: number, param3: number, param4: number): void {
        let _loc7_: number = 0;
        let _loc5_: number = param2;
        let _loc6_: number = param3;
        while (_loc5_ < param1.width) {
            _loc7_ = _loc5_;
            while (_loc7_ < param1.width) {
                param1.setPixel32(_loc7_, _loc6_, param4);
                _loc7_++;
            }
            _loc6_--;
            _loc5_ += 2;
        }
    }
}
