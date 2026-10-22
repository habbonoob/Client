import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { SizeData } from '@/com/sulake/habbo/room/object/visualization/data/SizeData';
import { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class FurnitureVisualizationData implements IRoomObjectVisualizationData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureVisualizationData'); }

    public static readonly LAYER_LIMIT: number = 1000;
    public static readonly LAYER_NAMES: any[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    declare private _SafeStr_2646: UtilsMap;

    private _sizes: any[] = [];
    private _SafeStr_3279: SizeData = null;
    private _SafeStr_5344: number = -1;
    private _SafeStr_5873: number = -1;
    private _SafeStr_6480: number = -1;
    private _type: string = "";

    constructor() {
        this._SafeStr_2646 = new UtilsMap();
    }

    public dispose(): void {
        let _loc1_: SizeData = null;
        let _loc2_: number = 0;
        if (this._SafeStr_2646 != null) {
            _loc1_ = null;
            _loc2_ = 0;
            while (_loc2_ < this._SafeStr_2646.length) {
                _loc1_ = asInstanceOf(this._SafeStr_2646.getWithIndex(_loc2_), SizeData);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._SafeStr_2646.dispose();
            this._SafeStr_2646 = null;
        }
        this._SafeStr_3279 = null;
        this._sizes = null;
    }

    public initialize(param1: XML): boolean {
        this.reset();
        if (param1 == null) {
            return false;
        }
        let _loc2_: string = param1.attribute("type").toString();
        if (_loc2_.length == 0) {
            return false;
        }
        this._type = _loc2_;
        if (!this.defineVisualizations(param1)) {
            this.reset();
            return false;
        }
        return true;
    }

    protected reset(): void {
        let _loc2_: number = 0;
        this._type = "";
        let _loc1_: SizeData = null;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_2646.length) {
            _loc1_ = asInstanceOf(this._SafeStr_2646.getWithIndex(_loc2_), SizeData);
            if (_loc1_ != null) {
                _loc1_.dispose();
            }
            _loc2_++;
        }
        this._SafeStr_2646.reset();
        this._sizes = [];
        this._SafeStr_3279 = null;
        this._SafeStr_5344 = -1;
    }

    protected defineVisualizations(param1: XML): boolean {
        let _loc7_: number = 0;
        let _loc2_: XML = null;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc8_: number = 0;
        let _loc11_: SizeData = null;
        let _loc5_: XMLList = null;
        let _loc9_: number = 0;
        let _loc12_: XML = null;
        let _loc10_: XMLList = param1.child("graphics").child("visualization");
        if (_loc10_.length() == 0) {
            return false;
        }
        let _loc6_: number = 0;
        _loc7_ = 0;
        while (_loc7_ < _loc10_.length()) {
            _loc2_ = _loc10_.item(_loc7_);
            if (!XMLValidator.checkRequiredAttributes(_loc2_, ["size", "layerCount", "angle"])) {
                return false;
            }
            _loc3_ = Number(_loc2_.attribute("size")) | 0;
            _loc4_ = Number(_loc2_.attribute("layerCount")) | 0;
            _loc8_ = Number(_loc2_.attribute("angle")) | 0;
            if (_loc3_ < 1) {
                _loc3_ = 1;
            }
            if (this._SafeStr_2646.getValue(String(_loc3_)) != null) {
                return false;
            }
            _loc11_ = this.createSizeData(_loc3_, _loc4_, _loc8_);
            if (_loc11_ == null) {
                return false;
            }
            _loc5_ = _loc2_.children();
            _loc9_ = 0;
            while (_loc9_ < _loc5_.length()) {
                _loc12_ = _loc5_.item(_loc9_);
                if (!this.processVisualizationElement(_loc11_, _loc12_)) {
                    _loc11_.dispose();
                    return false;
                }
                _loc9_++;
            }
            this._SafeStr_2646.add(String(_loc3_), _loc11_);
            this._sizes.push(_loc3_);
            this._sizes.sort((a, b) => a - b);
            _loc7_++;
        }
        return true;
    }

    protected createSizeData(param1: number, param2: number, param3: number): SizeData {
        let _loc4_: SizeData = null;
        return new SizeData(param2, param3);
    }

    protected processVisualizationElement(param1: SizeData, param2: XML): boolean {
        if (param1 == null || param2 == null) {
            return false;
        }
        switch (String(param2.name())) {
            case "layers":
                if (!param1.defineLayers(param2)) {
                    return false;
                }
                break;
            case "directions":
                if (!param1.defineDirections(param2)) {
                    return false;
                }
                break;
            case "colors":
                if (!param1.defineColors(param2)) {
                    return false;
                }
        }
        return true;
    }

    public getType(): string {
        return this._type;
    }

    private getSizeIndex(param1: number): number {
        let _loc3_: number = 0;
        let _loc2_: any = 0;
        if (param1 > 0) {
            _loc3_ = 1;
            while (_loc3_ < this._sizes.length) {
                if (this._sizes[_loc3_] > param1) {
                    if (this._sizes[_loc3_] / param1 < param1 / this._sizes[_loc3_ - 1]) {
                        _loc2_ = _loc3_;
                    }
                    break;
                }
                _loc2_ = _loc3_;
                _loc3_++;
            }
        }
        return _loc2_ | 0;
    }

    public getSize(param1: number): number {
        if (param1 == this._SafeStr_6480) {
            return this._SafeStr_5873;
        }
        let _loc2_: number = this.getSizeIndex(param1);
        let _loc3_: number = -1;
        if (_loc2_ < this._sizes.length) {
            _loc3_ = this._sizes[_loc2_] | 0;
        }
        this._SafeStr_6480 = param1;
        this._SafeStr_5873 = _loc3_;
        return _loc3_;
    }

    public getLayerCount(param1: number): number {
        let _loc2_: SizeData = this.getSizeData(param1);
        if (_loc2_ != null) {
            return _loc2_.layerCount;
        }
        return 0;
    }

    public getDirectionValue(param1: number, param2: number): number {
        let _loc3_: SizeData = this.getSizeData(param1);
        if (_loc3_ != null) {
            return _loc3_.getDirectionValue(param2);
        }
        return 0;
    }

    public getTag(param1: number, param2: number, param3: number): string {
        let _loc4_: SizeData = this.getSizeData(param1);
        if (_loc4_ != null) {
            return _loc4_.getTag(param2, param3);
        }
        return "";
    }

    public getInk(param1: number, param2: number, param3: number): number {
        let _loc4_: SizeData = this.getSizeData(param1);
        if (_loc4_ != null) {
            return _loc4_.getInk(param2, param3);
        }
        return 0;
    }

    public getAlpha(param1: number, param2: number, param3: number): number {
        let _loc4_: SizeData = this.getSizeData(param1);
        if (_loc4_ != null) {
            return _loc4_.getAlpha(param2, param3);
        }
        return 255;
    }

    public getColor(param1: number, param2: number, param3: number): number {
        let _loc4_: SizeData = this.getSizeData(param1);
        if (_loc4_ != null) {
            return _loc4_.getColor(param2, param3) | 0;
        }
        return 16777215;
    }

    public getIgnoreMouse(param1: number, param2: number, param3: number): boolean {
        let _loc4_: SizeData = this.getSizeData(param1);
        if (_loc4_ != null) {
            return _loc4_.getIgnoreMouse(param2, param3);
        }
        return false;
    }

    public getXOffset(param1: number, param2: number, param3: number): number {
        let _loc4_: SizeData = this.getSizeData(param1);
        if (_loc4_ != null) {
            return _loc4_.getXOffset(param2, param3);
        }
        return 0;
    }

    public getYOffset(param1: number, param2: number, param3: number): number {
        let _loc4_: SizeData = this.getSizeData(param1);
        if (_loc4_ != null) {
            return _loc4_.getYOffset(param2, param3);
        }
        return 0;
    }

    public getZOffset(param1: number, param2: number, param3: number): number {
        let _loc4_: SizeData = this.getSizeData(param1);
        if (_loc4_ != null) {
            return _loc4_.getZOffset(param2, param3);
        }
        return 0;
    }

    protected getSizeData(param1: number): SizeData {
        if (param1 == this._SafeStr_5344) {
            return this._SafeStr_3279;
        }
        let _loc2_: number = this.getSizeIndex(param1);
        if (_loc2_ < this._sizes.length) {
            this._SafeStr_3279 = asInstanceOf(this._SafeStr_2646.getValue(String(this._sizes[_loc2_])), SizeData);
        } else {
            this._SafeStr_3279 = null;
        }
        this._SafeStr_5344 = param1;
        return this._SafeStr_3279;
    }

    get [IRoomObjectVisualizationData](): true {
        return true;
    }
}
