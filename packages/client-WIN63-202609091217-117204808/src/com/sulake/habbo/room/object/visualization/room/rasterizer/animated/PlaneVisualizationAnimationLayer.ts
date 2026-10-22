import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { AnimationItem } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/animated/AnimationItem';

export class PlaneVisualizationAnimationLayer implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.animated::PlaneVisualizationAnimationLayer'); }

    private _color: number = 0;
    private _bitmapData: BitmapData = null;
    private _disposed: boolean = false;

    declare private _items: any[];

    constructor(param1: XML, param2: IGraphicAssetCollection) {
        let _loc10_: XMLList = null;
        let _loc6_: number = 0;
        let _loc3_: XML = null;
        let _loc7_: string = null;
        let _loc9_: IGraphicAsset = null;
        let _loc4_: BitmapDataAsset = null;
        let _loc5_: BitmapData = null;
        let _loc8_: AnimationItem = null;
        this._items = [];
        if (param1 != null && param2 != null) {
            _loc10_ = param1.child("item");
            _loc6_ = 0;
            while (_loc6_ < _loc10_.length()) {
                _loc3_ = asInstanceOf(_loc10_.item(_loc6_), XML);
                if (_loc3_ != null) {
                    _loc7_ = _loc3_.attribute("asset").toString();
                    _loc9_ = param2.getAsset(_loc7_);
                    if (_loc9_ != null) {
                        _loc4_ = asInstanceOf(_loc9_.asset, BitmapDataAsset);
                        if (_loc4_ != null) {
                            _loc5_ = asInstanceOf(_loc4_.content, BitmapData);
                            if (_loc5_ != null) {
                                _loc8_ = new AnimationItem(parseFloat(_loc3_.attribute("x").toString()), parseFloat(_loc3_.attribute("y").toString()), parseFloat(_loc3_.attribute("speedX").toString()), parseFloat(_loc3_.attribute("speedY").toString()), _loc5_);
                                this._items.push(_loc8_);
                            }
                        }
                    }
                }
                _loc6_++;
            }
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        let _loc2_: number = 0;
        let _loc1_: AnimationItem = null;
        this._disposed = true;
        if (this._bitmapData != null) {
            this._bitmapData.dispose();
            this._bitmapData = null;
        }
        if (this._items != null) {
            _loc2_ = 0;
            while (_loc2_ < this._items.length) {
                _loc1_ = asInstanceOf(this._items[_loc2_], AnimationItem);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._items = [];
        }
    }

    public clearCache(): void {
        if (this._bitmapData != null) {
            this._bitmapData.dispose();
            this._bitmapData = null;
        }
    }

    public render(param1: BitmapData, param2: number, param3: number, param4: IVector3d, param5: number, param6: number, param7: number, param8: number, param9: number, param10: number, param11: number): BitmapData {
        let _loc14_: number = 0;
        let _loc13_: AnimationItem = null;
        let _loc12_: Point = null;
        if (param1 == null || param1.width != param2 || param1.height != param3) {
            if (this._bitmapData == null || this._bitmapData.width != param2 || this._bitmapData.height != param3) {
                if (this._bitmapData != null) {
                    this._bitmapData.dispose();
                }
                this._bitmapData = new BitmapData(param2, param3, true, 16777215);
            } else {
                this._bitmapData.fillRect(this._bitmapData.rect, 16777215);
            }
            param1 = this._bitmapData;
        }
        if (param7 > 0 && param8 > 0) {
            _loc14_ = 0;
            while (_loc14_ < this._items.length) {
                _loc13_ = asInstanceOf(this._items[_loc14_], AnimationItem);
                if (_loc13_ != null) {
                    _loc12_ = _loc13_.getPosition(param7, param8, param9, param10, param11);
                    _loc12_.x = _loc12_.x - param5;
                    _loc12_.y -= param6;
                    if (_loc13_.bitmapData != null) {
                        if (_loc12_.x > -_loc13_.bitmapData.width && _loc12_.x < param1.width && _loc12_.y > -_loc13_.bitmapData.height && _loc12_.y < param1.height) {
                            param1.copyPixels(_loc13_.bitmapData, _loc13_.bitmapData.rect, _loc12_, null, null, true);
                        }
                        if (_loc12_.x - param7 > -_loc13_.bitmapData.width && _loc12_.x - param7 < param1.width && _loc12_.y > -_loc13_.bitmapData.height && _loc12_.y < param1.height) {
                            param1.copyPixels(_loc13_.bitmapData, _loc13_.bitmapData.rect, new Point(_loc12_.x - param7, _loc12_.y), null, null, true);
                        }
                        if (_loc12_.x > -_loc13_.bitmapData.width && _loc12_.x < param1.width && _loc12_.y - param8 > -_loc13_.bitmapData.height && _loc12_.y - param8 < param1.height) {
                            param1.copyPixels(_loc13_.bitmapData, _loc13_.bitmapData.rect, new Point(_loc12_.x, _loc12_.y - param8), null, null, true);
                        }
                        if (_loc12_.x - param7 > -_loc13_.bitmapData.width && _loc12_.x - param7 < param1.width && _loc12_.y - param8 > -_loc13_.bitmapData.height && _loc12_.y - param8 < param1.height) {
                            param1.copyPixels(_loc13_.bitmapData, _loc13_.bitmapData.rect, new Point(_loc12_.x - param7, _loc12_.y - param8), null, null, true);
                        }
                    }
                }
                _loc14_++;
            }
        }
        return param1;
    }

    get [IDisposable](): true {
        return true;
    }
}
