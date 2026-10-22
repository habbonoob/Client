import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ISkinLayout } from '@/com/sulake/core/window/graphics/renderer/ISkinLayout';
import type { ISkinRenderer } from '@/com/sulake/core/window/graphics/renderer/ISkinRenderer';
import type { ISkinTemplate } from '@/com/sulake/core/window/graphics/renderer/ISkinTemplate';
import type { ISkinTemplateEntity } from '@/com/sulake/core/window/graphics/renderer/ISkinTemplateEntity';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { TrackedBitmapData } from '@/com/sulake/core/utils/profiler/tracking/TrackedBitmapData';
import { BitmapSkinParser } from '@/com/sulake/core/window/graphics/BitmapSkinParser';
import { HsvLayerColor } from '@/com/sulake/core/window/graphics/renderer/HsvLayerColor';
import { isISkinTemplateEntity } from '@/com/sulake/core/window/graphics/renderer/ISkinTemplateEntity';
import { SkinLayoutEntity } from '@/com/sulake/core/window/graphics/renderer/SkinLayoutEntity';
import { SkinRenderer } from '@/com/sulake/core/window/graphics/renderer/SkinRenderer';

export class BitmapSkinRenderer extends SkinRenderer implements ISkinRenderer {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::BitmapSkinRenderer'); }

    protected static readonly _SafeStr_2162: Rectangle = new Rectangle();
    protected static readonly _SafeStr_6878: Point = new Point();

    declare protected _bitmapCache: Map<any, any>;

    declare protected _SafeStr_2656: Matrix;

    declare protected _colorTransform: ColorTransform;

    constructor(param1: string) {
        super(param1);
        this._bitmapCache = new Dictionary();
        this._SafeStr_2656 = new Matrix();
        this._colorTransform = new ColorTransform();
    }

    public override parse(param1: IAsset, param2: XMLList, param3: IAssetLibrary): void {
        BitmapSkinParser.parseSkinDescription(asInstanceOf(param1.content, XML), param2, this, this.name, param3);
    }

    public override dispose(): void {
        let _loc2_: string = null;
        let _loc1_: BitmapData = null;
        if (!this.disposed) {
            super.dispose();
            this._SafeStr_2656 = null;
            this._colorTransform = null;
            for (_loc2_ of this._bitmapCache?.keys() ?? []) {
                _loc1_ = asInstanceOf(this._bitmapCache.get(_loc2_), BitmapData);
                _loc1_.dispose();
                this._bitmapCache.delete(_loc2_);
            }
            this._bitmapCache = null;
        }
    }

    public override isStateDrawable(param1: number): boolean {
        return this._SafeStr_2726.get(param1) != null;
    }

    protected configureWindowColorTransform(param1: number): void {
        this._colorTransform.redMultiplier = ((param1 & 0xFF0000) >> 16) / 255;
        this._colorTransform.greenMultiplier = ((param1 & 0xFF00) >> 8) / 255;
        this._colorTransform.blueMultiplier = (param1 & 0xFF) / 255;
        this._colorTransform.alphaMultiplier = 1;
        this._colorTransform.redOffset = 0;
        this._colorTransform.greenOffset = 0;
        this._colorTransform.blueOffset = 0;
        this._colorTransform.alphaOffset = 0;
    }

    public override draw(param1: IWindow, param2: BitmapData, param3: Rectangle, param4: number, param5: boolean): void {
        let _loc13_: any = 0;
        let _loc8_: ISkinTemplateEntity = null;
        let _loc16_: boolean = false;
        let _loc9_: boolean = false;
        let _loc22_: any = 0;
        let _loc24_: SkinLayoutEntity = null;
        let _loc14_: BitmapData = null;
        let _loc20_: boolean = false;
        let _loc26_: number = 0;
        let _loc29_: any = 0;
        let _loc28_: number = 0;
        let _loc18_: BitmapData = null;
        let _loc25_: ISkinLayout = this._SafeStr_2960.get(param4);
        let _loc6_: ISkinTemplate = this._SafeStr_2726.get(param4);
        if (_loc25_ == null) {
            _loc25_ = this._SafeStr_2960.get(0);
            _loc6_ = this._SafeStr_2726.get(0);
        }
        _loc13_ = _loc25_.numChildren >>> 0;
        if (_loc25_ != null && _loc13_ > 0) {
            let _loc10_: number = param3.width - _loc25_.width | 0;
            let _loc30_: number = param3.height - _loc25_.height | 0;
            let _loc12_: boolean = !param1.background && (param1.color & 0xFFFFFF) < 16777215;
            let _loc15_: boolean = false;
            if (_loc12_) {
                this.configureWindowColorTransform(param1.color);
            }
            for (_loc22_ = 0; _loc22_ < _loc13_; _loc22_++) {
                _loc24_ = asInstanceOf(_loc25_.getChildAt(_loc22_ | 0), SkinLayoutEntity);
                _loc8_ = asGuarded(_loc6_.getChildByName(_loc24_.name), isISkinTemplateEntity);
                if (_loc8_ != null) {
                    _loc14_ = this.getBitmapFromCache(_loc6_, _loc24_.name);
                    _loc20_ = false;
                    try {
                        if (!param1.background && _loc24_.colorize && _loc24_.colorizeMethod == "hsv_layer") {
                            _loc14_ = _loc14_.clone();
                            _loc20_ = true;
                            HsvLayerColor.configureTransform(this._colorTransform, param1.color, _loc24_.shade);
                            _loc14_.colorTransform(_loc14_.rect, this._colorTransform);
                            _loc15_ = _loc12_;
                        } else if (_loc12_ && _loc24_.colorize) {
                            if (_loc15_) {
                                this.configureWindowColorTransform(param1.color);
                                _loc15_ = false;
                            }
                            _loc14_ = _loc14_.clone();
                            _loc20_ = true;
                            _loc14_.colorTransform(_loc14_.rect, this._colorTransform);
                        }
                        _loc16_ = false;
                        _loc9_ = false;
                        BitmapSkinRenderer._SafeStr_2162.x = _loc24_.region.x + param3.x;
                        BitmapSkinRenderer._SafeStr_2162.y = _loc24_.region.y + param3.y;
                        BitmapSkinRenderer._SafeStr_2162.width = _loc24_.region.width;
                        BitmapSkinRenderer._SafeStr_2162.height = _loc24_.region.height;
                        if (_loc24_.scaleH == 1) {
                            BitmapSkinRenderer._SafeStr_2162.x += _loc10_;
                        } else if (_loc24_.scaleH == 2) {
                            _loc16_ = true;
                            BitmapSkinRenderer._SafeStr_2162.right += _loc10_;
                            if (BitmapSkinRenderer._SafeStr_2162.width < 1) {
                                continue;
                            }
                        } else if (_loc24_.scaleH == 4) {
                            _loc16_ = true;
                            BitmapSkinRenderer._SafeStr_2162.right += _loc10_;
                            if (BitmapSkinRenderer._SafeStr_2162.width < 1) {
                                continue;
                            }
                        } else if (_loc24_.scaleH == 8) {
                            BitmapSkinRenderer._SafeStr_2162.x = param3.width / 2 - BitmapSkinRenderer._SafeStr_2162.width / 2;
                        }
                        if (_loc24_.scaleV == 1) {
                            BitmapSkinRenderer._SafeStr_2162.y += _loc30_;
                        } else if (_loc24_.scaleV == 2) {
                            _loc9_ = true;
                            BitmapSkinRenderer._SafeStr_2162.bottom += _loc30_;
                            if (BitmapSkinRenderer._SafeStr_2162.height < 1) {
                                continue;
                            }
                        } else if (_loc24_.scaleV == 4) {
                            _loc9_ = true;
                            BitmapSkinRenderer._SafeStr_2162.bottom += _loc30_;
                            if (BitmapSkinRenderer._SafeStr_2162.height < 1) {
                                continue;
                            }
                        } else if (_loc24_.scaleV == 8) {
                            BitmapSkinRenderer._SafeStr_2162.y = param3.height / 2 - BitmapSkinRenderer._SafeStr_2162.height / 2;
                        }
                        if (!_loc16_ && !_loc9_) {
                            param2.copyPixels(_loc14_, _loc14_.rect, BitmapSkinRenderer._SafeStr_2162.topLeft, null, null, true);
                        } else if (_loc24_.scaleV == 4 || _loc24_.scaleH == 4) {
                            _loc26_ = _loc14_.width;
                            let _loc21_: number = _loc14_.height;
                            let _loc11_: number = BitmapSkinRenderer._SafeStr_2162.width / _loc26_ | 0;
                            let _loc31_: number = BitmapSkinRenderer._SafeStr_2162.height / _loc21_ | 0;
                            let _loc17_: number = BitmapSkinRenderer._SafeStr_2162.width % _loc26_ | 0;
                            let _loc7_: number = BitmapSkinRenderer._SafeStr_2162.height % _loc21_ | 0;
                            let _loc27_: Point = new Point(BitmapSkinRenderer._SafeStr_2162.x, BitmapSkinRenderer._SafeStr_2162.y);
                            let _loc19_: Rectangle = new Rectangle(0, 0, _loc17_, _loc14_.height);
                            let _loc23_: Rectangle = new Rectangle(0, 0, _loc14_.width, _loc7_);
                            _loc29_ = 0;
                            while (_loc29_ < _loc31_) {
                                _loc27_.x = BitmapSkinRenderer._SafeStr_2162.x;
                                _loc28_ = 0;
                                while (_loc28_ < _loc11_) {
                                    param2.copyPixels(_loc14_, _loc14_.rect, _loc27_, null, null, true);
                                    _loc27_.x += _loc26_;
                                    _loc28_++;
                                }
                                if (_loc17_ > 0) {
                                    param2.copyPixels(_loc14_, _loc19_, _loc27_, null, null, true);
                                }
                                _loc27_.y += _loc21_;
                                _loc29_++;
                            }
                            if (_loc7_ > 0) {
                                _loc27_.x = BitmapSkinRenderer._SafeStr_2162.x;
                                _loc29_ = 0;
                                while (_loc29_ < _loc11_) {
                                    param2.copyPixels(_loc14_, _loc23_, _loc27_, null, null, true);
                                    _loc27_.x += _loc26_;
                                    _loc29_++;
                                }
                            }
                        } else if (_loc14_.width == 1 && _loc14_.height == 1) {
                            this._SafeStr_2656.a = BitmapSkinRenderer._SafeStr_2162.width;
                            this._SafeStr_2656.d = BitmapSkinRenderer._SafeStr_2162.height;
                            this._SafeStr_2656.tx = BitmapSkinRenderer._SafeStr_2162.x;
                            this._SafeStr_2656.ty = BitmapSkinRenderer._SafeStr_2162.y;
                            param2.draw(_loc14_, this._SafeStr_2656);
                        } else {
                            if (BitmapSkinRenderer._SafeStr_2162.width < 1) {
                                continue;
                            }
                            if (BitmapSkinRenderer._SafeStr_2162.height < 1) {
                                continue;
                            }
                            this._SafeStr_2656.a = BitmapSkinRenderer._SafeStr_2162.width / _loc14_.width;
                            this._SafeStr_2656.d = BitmapSkinRenderer._SafeStr_2162.height / _loc14_.height;
                            this._SafeStr_2656.tx = 0;
                            this._SafeStr_2656.ty = 0;
                            _loc18_ = new BitmapData(BitmapSkinRenderer._SafeStr_2162.width | 0, BitmapSkinRenderer._SafeStr_2162.height | 0, true, 0);
                            _loc18_.draw(_loc14_, this._SafeStr_2656);
                            param2.copyPixels(_loc18_, _loc18_.rect, BitmapSkinRenderer._SafeStr_2162.topLeft, null, null, true);
                            _loc18_.dispose();
                        }
                    } finally {
                        if (_loc20_) {
                            _loc14_.dispose();
                        }
                    }
                }
            }
        }
    }

    protected drawStaticLayoutEntity(param1: BitmapData, param2: Rectangle, param3: ISkinLayout, param4: SkinLayoutEntity, param5: ISkinTemplate, param6: ISkinTemplateEntity): void {
        let _loc7_: BitmapData = null;
        let _loc8_: Rectangle = param4.region.clone();
        _loc8_.x = _loc8_.x + param2.x;
        _loc8_.y += param2.y;
        switch (param6.type) {
            case "bitmap":
                _loc7_ = this.getBitmapFromCache(param5, param4.name);
                if (param4.scaleH == 1) {
                    _loc8_.x += param2.width - param3.width;
                }
                if (param4.scaleV == 1) {
                    _loc8_.y += param2.height - param3.height;
                }
                param1.copyPixels(_loc7_, _loc7_.rect, _loc8_.topLeft, null, null, true);
                break;
            case "fill":
                param1.fillRect(_loc8_, param4.color);
        }
    }

    protected getBitmapFromCache(param1: ISkinTemplate, param2: string): BitmapData {
        let _loc5_: string = null;
        let _loc6_: ISkinTemplateEntity = null;
        let _loc4_: BitmapData = null;
        _loc5_ = param2 + "@" + param1.name;
        let _loc3_: BitmapData = this._bitmapCache.get(_loc5_);
        if (_loc3_ == null) {
            _loc6_ = asGuarded(param1.getChildByName(param2), isISkinTemplateEntity);
            if (_loc6_ == null) {
                throw new Error("Template entity" + param2 + "not found!");
            }
            _loc4_ = asInstanceOf(param1.asset.content, BitmapData);
            if (_loc4_ == null) {
                throw new Error("Asset " + param1.asset + " not found!");
            }
            _loc3_ = new TrackedBitmapData(this, _loc6_.region.width | 0, _loc6_.region.height | 0, true);
            _loc3_.copyPixels(_loc4_, _loc6_.region, BitmapSkinRenderer._SafeStr_6878);
            this._bitmapCache.set(_loc5_, _loc3_);
        }
        return _loc3_;
    }

    private drawBorders(param1: BitmapData, param2: Rectangle, param3: number): void {
        let _loc4_: number = 0;
        let _loc5_: number = param2.bottom - 1 | 0;
        _loc4_ = param2.left | 0;
        while (_loc4_ < param2.right - 1) {
            param1.setPixel32(_loc4_, 0, param3);
            param1.setPixel32(_loc4_, _loc5_, param3);
            _loc4_++;
        }
        _loc5_ = param2.top | 0;
        while (_loc5_ < param2.bottom - 1) {
            param1.setPixel32(0, _loc5_, param3);
            param1.setPixel32(_loc4_, _loc5_, param3);
            _loc5_++;
        }
    }
}
