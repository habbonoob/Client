import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PlaneMaskVisualization } from '@/com/sulake/habbo/room/object/visualization/room/mask/PlaneMaskVisualization';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { PlaneMask } from '@/com/sulake/habbo/room/object/visualization/room/mask/PlaneMask';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class PlaneMaskManager {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.mask::PlaneMaskManager'); }

    private _assetCollection: IGraphicAssetCollection = null;
    private _masks: UtilsMap = null;
    private _data: XML = null;

    constructor() {
        this._masks = new UtilsMap();
    }

    public get data(): XML {
        return this._data;
    }

    public dispose(): void {
        let _loc1_: number = 0;
        let _loc2_: PlaneMask = null;
        this._assetCollection = null;
        this._data = null;
        if (this._masks != null) {
            _loc1_ = 0;
            while (_loc1_ < this._masks.length) {
                _loc2_ = asInstanceOf(this._masks.getWithIndex(_loc1_), PlaneMask);
                if (_loc2_ != null) {
                    _loc2_.dispose();
                }
                _loc1_++;
            }
            this._masks.dispose();
        }
    }

    public initialize(param1: XML): void {
        this._data = param1;
    }

    public initializeAssetCollection(param1: IGraphicAssetCollection): void {
        if (this.data == null) {
            return;
        }
        this._assetCollection = param1;
        this.parseMasks(this.data, param1);
    }

    private parseMasks(param1: XML, param2: IGraphicAssetCollection): void {
        let _loc5_: number = 0;
        let _loc16_: XML = null;
        let _loc14_: string = null;
        let _loc15_: PlaneMask = null;
        let _loc9_: XMLList = null;
        let _loc7_: number = 0;
        let _loc13_: XML = null;
        let _loc11_: number = 0;
        let _loc4_: PlaneMaskVisualization = null;
        let _loc3_: XMLList = null;
        let _loc12_: string = null;
        if (param1 == null || param2 == null) {
            return;
        }
        let _loc10_: any[] = ["id"];
        let _loc8_: any[] = ["size"];
        let _loc6_: XMLList = param1.child("mask");
        _loc5_ = 0;
        while (_loc5_ < _loc6_.length()) {
            _loc16_ = _loc6_.item(_loc5_);
            if (XMLValidator.checkRequiredAttributes(_loc16_, _loc10_)) {
                _loc14_ = _loc16_.attribute("id").toString();
                if (this._masks.getValue(_loc14_) == null) {
                    _loc15_ = new PlaneMask();
                    _loc9_ = _loc16_.child("maskVisualization");
                    _loc7_ = 0;
                    while (_loc7_ < _loc9_.length()) {
                        _loc13_ = _loc9_.item(_loc7_);
                        if (XMLValidator.checkRequiredAttributes(_loc13_, _loc8_)) {
                            _loc11_ = parseInt(_loc13_.attribute("size").toString()) | 0;
                            _loc4_ = _loc15_.createMaskVisualization(_loc11_);
                            if (_loc4_ != null) {
                                _loc3_ = _loc13_.child("bitmap");
                                _loc12_ = this.parseMaskBitmaps(_loc3_, _loc4_, param2);
                                _loc15_.setAssetName(_loc11_, _loc12_);
                            }
                        }
                        _loc7_++;
                    }
                    this._masks.add(_loc14_, _loc15_);
                }
            }
            _loc5_++;
        }
    }

    private parseMaskBitmaps(param1: XMLList, param2: PlaneMaskVisualization, param3: IGraphicAssetCollection): string {
        let _loc8_: number = 0;
        let _loc4_: XML = null;
        let _loc6_: number = NaN;
        let _loc12_: number = NaN;
        let _loc9_: number = NaN;
        let _loc5_: number = NaN;
        let _loc7_: string = null;
        let _loc11_: IGraphicAsset = null;
        if (param1 == null) {
            return null;
        }
        let _loc10_: string = null;
        _loc8_ = 0;
        while (_loc8_ < param1.length()) {
            _loc4_ = param1.item(_loc8_);
            if (XMLValidator.checkRequiredAttributes(_loc4_, ["assetName"])) {
                _loc6_ = -1;
                _loc12_ = 1;
                _loc9_ = -1;
                _loc5_ = 1;
                if (String(_loc4_.attribute("normalMinX")) != "") {
                    _loc6_ = parseFloat(_loc4_.attribute("normalMinX").toString());
                }
                if (String(_loc4_.attribute("normalMaxX")) != "") {
                    _loc12_ = parseFloat(_loc4_.attribute("normalMaxX").toString());
                }
                if (String(_loc4_.attribute("normalMinY")) != "") {
                    _loc9_ = parseFloat(_loc4_.attribute("normalMinY").toString());
                }
                if (String(_loc4_.attribute("normalMaxY")) != "") {
                    _loc5_ = parseFloat(_loc4_.attribute("normalMaxY").toString());
                }
                _loc7_ = _loc4_.attribute("assetName").toString();
                _loc11_ = param3.getAsset(_loc7_);
                if (_loc11_ != null) {
                    if (!_loc11_.flipH) {
                        _loc10_ = _loc7_;
                    }
                    param2.addBitmap(_loc11_, _loc6_, _loc12_, _loc9_, _loc5_);
                }
            }
            _loc8_++;
        }
        return _loc10_;
    }

    public updateMask(param1: BitmapData, param2: string, param3: number, param4: IVector3d, param5: number, param6: number): boolean {
        let _loc15_: IGraphicAsset = null;
        let _loc9_: BitmapDataAsset = null;
        let _loc10_: BitmapData = null;
        let _loc8_: Point = null;
        let _loc7_: Matrix = null;
        let _loc13_: number = NaN;
        let _loc14_: number = NaN;
        let _loc12_: number = NaN;
        let _loc11_: number = NaN;
        let _loc16_: PlaneMask = asInstanceOf(this._masks.getValue(param2), PlaneMask);
        if (_loc16_ != null) {
            _loc15_ = _loc16_.getGraphicAsset(param3, param4);
            if (_loc15_ != null) {
                _loc9_ = asInstanceOf(_loc15_.asset, BitmapDataAsset);
                if (_loc9_ != null) {
                    _loc10_ = asInstanceOf(_loc9_.content, BitmapData);
                    if (_loc10_ != null) {
                        _loc8_ = new Point(param5 + _loc15_.offsetX, param6 + _loc15_.offsetY);
                        _loc7_ = new Matrix();
                        _loc13_ = 1;
                        _loc14_ = 1;
                        _loc12_ = 0;
                        _loc11_ = 0;
                        if (_loc15_.flipH) {
                            _loc13_ = -1;
                            _loc12_ = _loc10_.width;
                        }
                        if (_loc15_.flipV) {
                            _loc14_ = -1;
                            _loc11_ = _loc10_.height;
                        }
                        _loc7_.scale(_loc13_, _loc14_);
                        _loc7_.translate(_loc8_.x + _loc12_, _loc8_.y + _loc11_);
                        param1.draw(_loc10_, _loc7_);
                    }
                }
            }
        }
        return true;
    }

    public getMask(param1: string): PlaneMask {
        return asInstanceOf(this._masks.getValue(param1), PlaneMask);
    }
}
