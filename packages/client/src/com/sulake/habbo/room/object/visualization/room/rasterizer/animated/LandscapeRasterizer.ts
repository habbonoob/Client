import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PlaneMaterial } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneMaterial';
import type { PlaneVisualization } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneVisualization';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { LandscapePlane } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/animated/LandscapePlane';
import { PlaneRasterizer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneRasterizer';
import { PlaneBitmapData } from '@/com/sulake/habbo/room/object/visualization/room/utils/PlaneBitmapData';
import { Randomizer } from '@/com/sulake/habbo/room/object/visualization/room/utils/Randomizer';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class LandscapeRasterizer extends PlaneRasterizer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.animated::LandscapeRasterizer'); }

    private static readonly UPDATE_INTERVAL: number = 500;

    constructor() {
        super();
    }

    private _landscapeWidth: number = 0;
    private _SafeStr_7373: number = 0;

    public override initializeDimensions(param1: number, param2: number): boolean {
        if (param1 < 0) {
            param1 = 0;
        }
        if (param2 < 0) {
            param2 = 0;
        }
        this._landscapeWidth = param1;
        this._SafeStr_7373 = param2;
        return true;
    }

    protected override initializePlanes(): void {
        if (this.data == null) {
            return;
        }
        let _loc1_: XMLList = this.data.child("landscapes");
        if (_loc1_.length() > 0) {
            this.parseLandscapes(_loc1_.item(0));
        }
    }

    public override render(param1: BitmapData, param2: string, param3: number, param4: number, param5: number, param6: IVector3d, param7: boolean, param8: number = 0, param9: number = 0, param10: number = 0, param11: number = 0, param12: number = 0): PlaneBitmapData {
        let _loc15_: LandscapePlane = asInstanceOf(this.getPlane(param2), LandscapePlane);
        if (_loc15_ == null) {
            _loc15_ = asInstanceOf(this.getPlane("default"), LandscapePlane);
        }
        if (_loc15_ == null) {
            return null;
        }
        if (param1 != null) {
            param1.fillRect(param1.rect, 16777215);
        }
        let _loc14_: BitmapData = _loc15_.render(param1, param3, param4, param5, param6, param7, param8, param9, param10, param11, param12);
        if (_loc14_ != null && _loc14_ != param1) {
            try {
                _loc14_ = _loc14_.clone();
            } catch (e) {
                _loc14_.dispose();
                return null;
            }
        }
        let _loc13_: PlaneBitmapData = null;
        if (!_loc15_.isStatic(param5 | 0)) {
            _loc13_ = new PlaneBitmapData(_loc14_, Math.round(param12 / 500) * 500 + 500 | 0);
        } else {
            _loc13_ = new PlaneBitmapData(_loc14_, -1);
        }
        return _loc13_;
    }

    public override getTextureIdentifier(param1: number, param2: IVector3d): string {
        if (param2 != null) {
            if (param2.x < 0) {
                return param1 + "_0";
            }
            return param1 + "_1";
        }
        return super.getTextureIdentifier(param1, param2);
    }

    private parseLandscapes(param1: XML): void {
        let _loc23_: number = 0;
        let _loc29_: XML = null;
        let _loc14_: string = null;
        let _loc11_: XMLList = null;
        let _loc38_: LandscapePlane = null;
        let _loc24_: number = 0;
        let _loc26_: XML = null;
        let _loc32_: number = 0;
        let _loc19_: string = null;
        let _loc13_: string = null;
        let _loc12_: number = NaN;
        let _loc31_: number = NaN;
        let _loc17_: number = 0;
        let _loc22_: PlaneVisualization = null;
        let _loc25_: number = 0;
        let _loc39_: XML = null;
        let _loc8_: any = null;
        let _loc33_: PlaneMaterial = null;
        let _loc7_: number = 0;
        let _loc27_: string = null;
        let _loc36_: string = null;
        let _loc18_: number = 0;
        let _loc6_: string = null;
        let _loc3_: any = 0;
        let _loc9_: string = null;
        let _loc37_: XMLList = null;
        let _loc4_: XML = null;
        let _loc28_: number = 0;
        let _loc16_: XML = null;
        let _loc30_: number = 0;
        let _loc10_: string = null;
        let _loc34_: number = NaN;
        let _loc35_: number = NaN;
        let _loc21_: number = NaN;
        let _loc20_: number = NaN;
        if (param1 == null) {
            return;
        }
        let _loc5_: any[] = ["id", "assetId"];
        let _loc2_: number = Math.random() * 654321 | 0;
        let _loc15_: XMLList = param1.child("landscape");
        _loc23_ = 0;
        while (_loc23_ < _loc15_.length()) {
            _loc29_ = _loc15_.item(_loc23_);
            if (XMLValidator.checkRequiredAttributes(_loc29_, ["id"])) {
                _loc14_ = _loc29_.attribute("id").toString();
                _loc11_ = _loc29_.child("animatedVisualization");
                _loc38_ = new LandscapePlane();
                _loc24_ = 0;
                while (_loc24_ < _loc11_.length()) {
                    _loc26_ = _loc11_.item(_loc24_);
                    if (XMLValidator.checkRequiredAttributes(_loc26_, ["size"])) {
                        _loc32_ = parseInt(_loc26_.attribute("size").toString()) | 0;
                        _loc19_ = _loc26_.attribute("horizontalAngle").toString();
                        _loc13_ = _loc26_.attribute("verticalAngle").toString();
                        _loc12_ = 45;
                        if (_loc19_ != "") {
                            _loc12_ = parseFloat(_loc19_);
                        }
                        _loc31_ = 30;
                        if (_loc13_ != "") {
                            _loc31_ = parseFloat(_loc13_);
                        }
                        _loc17_ = _loc26_.child("visualizationLayer").length() + _loc26_.child("animationLayer").length();
                        _loc22_ = _loc38_.createPlaneVisualization(_loc32_, _loc17_, this.getGeometry(_loc32_, _loc12_, _loc31_));
                        if (_loc22_ != null) {
                            Randomizer.setSeed(_loc2_);
                            _loc25_ = 0;
                            while (_loc25_ < _loc26_.children().length()) {
                                _loc39_ = _loc26_.children().item(_loc25_);
                                if (_loc39_.name()?.toString() == "visualizationLayer") {
                                    _loc8_ = _loc39_;
                                    _loc33_ = null;
                                    _loc7_ = 1;
                                    if (XMLValidator.checkRequiredAttributes(_loc8_, ["materialId"])) {
                                        _loc27_ = _loc8_.attribute("materialId").toString();
                                        _loc33_ = this.getMaterial(_loc27_);
                                    }
                                    _loc36_ = _loc8_.attribute("offset").toString();
                                    _loc18_ = 0;
                                    if (_loc36_.length > 0) {
                                        _loc18_ = parseInt(_loc36_) | 0;
                                    }
                                    _loc6_ = _loc8_.attribute("color").toString();
                                    _loc3_ = 16777215;
                                    if (_loc6_.length > 0) {
                                        _loc3_ = parseInt(_loc6_);
                                    }
                                    _loc9_ = _loc8_.attribute("align").toString();
                                    if (_loc9_ == "bottom") {
                                        _loc7_ = 2;
                                    } else if (_loc9_ == "top") {
                                        _loc7_ = 1;
                                    }
                                    _loc22_.setLayer(_loc25_, _loc33_, _loc3_ >>> 0, _loc7_, _loc18_);
                                } else if (_loc39_.name()?.toString() == "animationLayer") {
                                    _loc37_ = _loc39_.child("animationItem");
                                    _loc4_ = new XML(`<animation/>`);
                                    _loc28_ = 0;
                                    while (_loc28_ < _loc37_.length()) {
                                        _loc16_ = asInstanceOf(_loc37_.item(_loc28_), XML);
                                        if (_loc16_ != null) {
                                            if (XMLValidator.checkRequiredAttributes(_loc16_, _loc5_)) {
                                                _loc30_ = parseInt(_loc16_.attribute("id").toString()) | 0;
                                                _loc10_ = _loc16_.attribute("assetId").toString();
                                                _loc34_ = 0;
                                                _loc35_ = 0;
                                                _loc34_ = this.getCoordinateValue(_loc16_.attribute("x").toString(), _loc16_.attribute("randomX").toString());
                                                _loc35_ = this.getCoordinateValue(_loc16_.attribute("y").toString(), _loc16_.attribute("randomY").toString());
                                                _loc21_ = 0;
                                                _loc20_ = 0;
                                                _loc21_ = parseFloat(_loc16_.attribute("speedX").toString());
                                                _loc20_ = parseFloat(_loc16_.attribute("speedY").toString());
                                                _loc4_.appendChild(new XML(`<item x="${XML.escapeAttribute(_loc34_)}" y="${XML.escapeAttribute(_loc35_)}" speedX="${XML.escapeAttribute(_loc21_)}"
                                                                             speedY="${XML.escapeAttribute(_loc20_)}" asset="${XML.escapeAttribute(_loc10_)}"/>`));
                                            }
                                        }
                                        _loc28_++;
                                    }
                                    _loc22_.setAnimationLayer(_loc25_, _loc4_, this.assetCollection);
                                }
                                _loc25_++;
                            }
                        }
                    }
                    _loc24_++;
                }
                if (!this.addPlane(_loc14_, _loc38_)) {
                    _loc38_.dispose();
                }
            }
            _loc23_++;
        }
    }

    private getCoordinateValue(param1: string, param2: string): number {
        let _loc4_: number = NaN;
        let _loc3_: any[] = null;
        let _loc5_: number = NaN;
        let _loc6_: number = 0;
        if (param1.length > 0) {
            if (param1.charAt(param1.length - 1) == "%") {
                param1 = param1.substr(0, param1.length - 1);
                _loc6_ = parseFloat(param1) / 100;
            }
        }
        if (param2.length > 0) {
            _loc4_ = 10000;
            _loc3_ = Randomizer.getValues(1, 0, _loc4_ | 0);
            _loc5_ = _loc3_[0] / _loc4_;
            if (param2.charAt(param2.length - 1) == "%") {
                param2 = param2.substr(0, param2.length - 1);
                _loc6_ += _loc5_ * parseFloat(param2) / 100;
            }
        }
        return _loc6_;
    }
}
