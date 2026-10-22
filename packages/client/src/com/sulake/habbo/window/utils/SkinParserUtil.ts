import { asGuarded, asInstanceOf, isUint } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ISkinRenderer } from '@/com/sulake/core/window/graphics/renderer/ISkinRenderer';
import type { SkinContainer } from '@/com/sulake/core/window/graphics/SkinContainer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { BitmapDataRenderer } from '@/com/sulake/core/window/graphics/renderer/BitmapDataRenderer';
import { BitmapSkinRenderer } from '@/com/sulake/core/window/graphics/renderer/BitmapSkinRenderer';
import { FillSkinRenderer } from '@/com/sulake/core/window/graphics/renderer/FillSkinRenderer';
import { LabelRenderer } from '@/com/sulake/core/window/graphics/renderer/LabelRenderer';
import { NullSkinRenderer } from '@/com/sulake/core/window/graphics/renderer/NullSkinRenderer';
import { ShapeSkinRenderer } from '@/com/sulake/core/window/graphics/renderer/ShapeSkinRenderer';
import { SkinRenderer } from '@/com/sulake/core/window/graphics/renderer/SkinRenderer';
import { TextSkinRenderer } from '@/com/sulake/core/window/graphics/renderer/TextSkinRenderer';
import { DefaultAttStruct } from '@/com/sulake/core/window/utils/DefaultAttStruct';
import { WindowStateTable } from '@/com/sulake/core/window/utils/WindowStateTable';
import { WindowTypeTable } from '@/com/sulake/core/window/utils/WindowTypeTable';

export class SkinParserUtil {
    static { registerClassName(this, 'com.sulake.habbo.window.utils::SkinParserUtil'); }

    private static readonly RENDERER_TYPE_SKIN: string = "skin";
    private static readonly RENDERER_TYPE_BITMAP: string = "bitmap";
    private static readonly RENDERER_TYPE_FILL: string = "fill";
    private static readonly RENDERER_TYPE_TEXT: string = "text";
    private static readonly RENDERER_TYPE_LABEL: string = "label";
    private static readonly RENDERER_TYPE_SHAPE: string = "shape";
    private static readonly RENDERER_TYPE_UNKNOWN: string = "unknown";
    private static readonly RENDERER_TYPE_NULL: string = "null";

    public static parse(param1: XML, param2: IAssetLibrary, param3: SkinContainer): void {
        let _loc9_: XML = null;
        let _loc19_: XMLList = null;
        let _loc8_: string = null;
        let _loc15_: string = null;
        let _loc5_: any = 0;
        let _loc6_: any = 0;
        let _loc27_: string = null;
        let _loc10_: string = null;
        let _loc28_: IAsset = null;
        let _loc4_: ISkinRenderer = null;
        let _loc14_: string = null;
        let _loc16_: any = null;
        let _loc26_: DefaultAttStruct = null;
        let _loc30_: XMLList = null;
        let _loc25_: string = null;
        let _loc13_: IAsset = null;
        let _loc23_: XML = null;
        let _loc21_: string = null;
        let _loc24_: any = 0;
        let _loc18_: Map<any, any> = new Dictionary();
        let _loc20_: Map<any, any> = new Dictionary();
        WindowTypeTable.fillTables(_loc18_, _loc20_);
        let _loc17_: Map<any, any> = new Dictionary();
        let _loc11_: Map<any, any> = new Dictionary();
        WindowStateTable.fillTables(_loc17_, _loc11_);
        let _loc12_: Map<any, any> = new Dictionary();
        _loc12_.set("skin", BitmapSkinRenderer);
        _loc12_.set("bitmap", BitmapDataRenderer);
        _loc12_.set("fill", FillSkinRenderer);
        _loc12_.set("text", TextSkinRenderer);
        _loc12_.set("label", LabelRenderer);
        _loc12_.set("shape", ShapeSkinRenderer);
        _loc12_.set("unknown", SkinRenderer);
        _loc12_.set("null", NullSkinRenderer);
        if (param1 != null) {
            _loc30_ = param1.child("window");
            let _loc7_: number = _loc30_.length() >>> 0;
            let _loc22_: any[] = [];
            if (_loc7_ > 0) {
                _loc24_ = 0;
                while (_loc24_ < _loc7_) {
                    _loc9_ = _loc30_.getProperty(_loc24_);
                    _loc8_ = _loc9_.attribute("type").toString();
                    _loc21_ = _loc9_.attribute("intent").toString();
                    _loc15_ = _loc9_.attribute("style").toString();
                    _loc5_ = asGuarded(_loc9_.attribute("blend"), isUint);
                    _loc6_ = asGuarded(_loc9_.attribute("color"), isUint);
                    _loc27_ = _loc9_.attribute("asset").toString();
                    _loc10_ = _loc9_.attribute("layout").toString();
                    _loc25_ = _loc9_.attribute("window_layout").toString();
                    _loc14_ = _loc9_.attribute("renderer").toString();
                    _loc19_ = _loc9_.child("states");
                    _loc16_ = _loc12_.get(_loc14_);
                    if (_loc16_) {
                        _loc4_ = new _loc16_(_loc10_);
                        if (_loc4_) {
                            _loc28_ = param2.getAssetByName(_loc27_);
                            _loc4_.parse(_loc28_, _loc19_, param2);
                            if (_loc28_ && _loc22_.indexOf(_loc28_) == -1) {
                                _loc22_.push(_loc28_);
                            }
                        }
                    }
                    _loc26_ = new DefaultAttStruct();
                    _loc26_.threshold = (_loc9_.attribute("treshold").item(0) ? Number(_loc9_.attribute("treshold").item(0)) >>> 0 : 10) >>> 0;
                    _loc26_.background = _loc9_.attribute("background").item(0) ? _loc9_.attribute("background").item(0)?.toString() == "true" : false;
                    _loc26_.blend = _loc9_.attribute("blend").item(0) ? Number(_loc9_.attribute("blend").item(0)) : 1;
                    _loc26_.color = (_loc9_.attribute("color").item(0) ? Number(_loc9_.attribute("color").item(0)) >>> 0 : 16777215) >>> 0;
                    _loc26_.width_min = _loc9_.attribute("width_min").item(0) ? Number(_loc9_.attribute("width_min").item(0)) | 0 : -2147483648;
                    _loc26_.width_max = _loc9_.attribute("width_max").item(0) ? Number(_loc9_.attribute("width_max").item(0)) | 0 : 2147483647;
                    _loc26_.height_min = _loc9_.attribute("height_min").item(0) ? Number(_loc9_.attribute("height_min").item(0)) | 0 : -2147483648;
                    _loc26_.height_max = _loc9_.attribute("height_max").item(0) ? Number(_loc9_.attribute("height_max").item(0)) | 0 : 2147483647;
                    _loc23_ = null;
                    if (_loc25_ != null) {
                        _loc13_ = param2.getAssetByName(_loc25_);
                        if (_loc13_ != null) {
                            _loc23_ = asInstanceOf(_loc13_.content, XML);
                        }
                    }
                    param3.addSkinRenderer(_loc18_.get(_loc8_) >>> 0, Number(_loc15_) >>> 0, _loc21_, _loc4_, _loc23_, _loc26_);
                    _loc24_++;
                }
                for (const _loc29_ of _loc22_ ?? []) {
                    _loc29_.dispose();
                }
            }
        }
    }

    constructor() {
    }
}
