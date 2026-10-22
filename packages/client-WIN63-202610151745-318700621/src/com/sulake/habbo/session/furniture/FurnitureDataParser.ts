import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { ICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { AssetLibrary, AssetLoaderStruct, Core, EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { FurnitureData } from '@/com/sulake/habbo/session/furniture/FurnitureData';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class FurnitureDataParser extends EventDispatcherWrapper {
    static { registerClassName(this, 'com.sulake.habbo.session.furniture::FurnitureDataParser'); }

    public static readonly READY: string = "FDP_furniture_data_ready";
    private static readonly MAX_DOWNLOAD_RETRIES: number = 2;

    declare private _floorItems: UtilsMap;

    declare private _wallItems: UtilsMap;

    declare private _SafeStr_4929: UtilsMap;

    declare private _SafeStr_2986: UtilsMap;

    declare private _localization: ICoreLocalizationManager;

    declare private _SafeStr_3326: AssetLibrary;

    declare private _critical: boolean;
    static { (this.prototype as any)._critical = false; }

    declare private _SafeStr_5582: string;

    declare private _downloadRetriesLeft: number;
    static { (this.prototype as any)._downloadRetriesLeft = 0; }

    constructor(param1: UtilsMap, param2: UtilsMap, param3: UtilsMap, param4: UtilsMap, param5: ICoreLocalizationManager, param6: boolean = true) {
        super();
        this._floorItems = param1;
        this._wallItems = param2;
        this._SafeStr_4929 = param3;
        this._SafeStr_2986 = param4;
        this._localization = param5;
        this._SafeStr_3326 = new AssetLibrary("FurniDataParserAssetLib");
        this._critical = param6;
    }

    private static appendRetryParam(param1: string, param2: number): string {
        if (param1.indexOf("?") > 0) {
            return param1 + "&retry=" + param2;
        }
        return param1 + "?retry=" + param2;
    }

    private static removePatternFrom(param1: any[], param2: any): void {
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            if (param1[_loc3_] == param2) {
                param1.splice(_loc3_, 1);
                _loc3_--;
            }
            _loc3_++;
        }
    }

    public override dispose(): void {
        super.dispose();
        if (this._SafeStr_3326) {
            this._SafeStr_3326.dispose();
            this._SafeStr_3326 = null;
        }
        this._localization = null;
        this._floorItems = null;
        this._wallItems = null;
        this._SafeStr_4929 = null;
        this._SafeStr_2986 = null;
    }

    public loadData(param1: string): void {
        this._SafeStr_5582 = param1;
        this._downloadRetriesLeft = 2;
        this.requestData(param1);
    }

    private requestData(param1: string): void {
        let _loc2_: IAsset = null;
        let _loc4_: IAsset = this._SafeStr_3326.getAssetByName("furnidata");
        if (_loc4_ != null) {
            _loc2_ = this._SafeStr_3326.removeAsset(_loc4_);
            if (_loc2_ != null) {
                _loc2_.dispose();
            }
        }
        let _loc3_: AssetLoaderStruct = this._SafeStr_3326.loadAssetFromFile("furnidata", new URLRequest(param1), "text/plain");
        _loc3_.addEventListener("AssetLoaderEventComplete", this.parseFurnitureData);
        _loc3_.addEventListener("AssetLoaderEventError", this.furnitureDataError);
    }

    private removeLoaderListeners(param1: AssetLoaderStruct): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("AssetLoaderEventComplete", this.parseFurnitureData);
        param1.removeEventListener("AssetLoaderEventError", this.furnitureDataError);
    }

    private retryLoadIfPossible(): boolean {
        if (this._SafeStr_5582 == null || this._downloadRetriesLeft <= 0) {
            return false;
        }
        let _loc1_: string = FurnitureDataParser.appendRetryParam(this._SafeStr_5582, this._downloadRetriesLeft);
        this._downloadRetriesLeft = this._downloadRetriesLeft - 1;
        this.requestData(_loc1_);
        return true;
    }

    private onMalformedData(param1: number): void {
        if (this.retryLoadIfPossible()) {
            return;
        }
        HabboWebTools.logEventLog("furnituredata malformed data " + param1);
        Core.error("XML furni data was malformed", this._critical, 12);
    }

    private parseFurnitureData = (param1: AssetLoaderEvent): void => {
        let _loc2_: string = null;
        let _loc3_: ByteArray = null;
        let _loc4_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        this.removeLoaderListeners(_loc4_);
        if (_loc4_ == null) {
            this.onMalformedData(param1.status);
            return;
        }
        if (_loc4_.assetLoader == null || _loc4_.assetLoader.content == null) {
            this.onMalformedData(param1.status);
            return;
        }
        if (_loc4_.assetLoader.content instanceof ByteArray) {
            _loc3_ = asInstanceOf(_loc4_.assetLoader.content, ByteArray);
            _loc3_.position = 0;
            _loc2_ = _loc3_.readUTFBytes(_loc3_.length);
        } else {
            _loc2_ = asGuarded(_loc4_.assetLoader.content, isString);
        }
        if (_loc2_ == null || _loc2_.length == 0) {
            this.onMalformedData(param1.status);
            return;
        }
        let _loc5_: string = _loc2_.replace(/^\s+/, "");
        if (_loc5_.charAt(0) == "<") {
            if (!this.parseXmlFormat(_loc5_)) {
                this.onMalformedData(param1.status);
            }
        } else if (_loc5_.charAt(0) == "{") {
            if (!this.parseJsonFormat(_loc5_)) {
                this.onMalformedData(param1.status);
            }
        } else {
            this.parseLingoFormat(_loc2_);
        }
    };

    private parseXmlFormat(param1: string): boolean {
        let _loc5_: XML = null;
        let _loc2_: XMLList = null;
        let _loc3_: any = null;
        let _loc4_: FurnitureData = null;
        try {
            _loc5_ = new XML(param1);
        } catch (e) {
            return false;
        }
        if (_loc5_ == null) {
            return false;
        }
        _loc2_ = _loc5_.child("roomitemtypes");
        for (_loc3_ of _loc2_.child("furnitype") ?? []) {
            _loc4_ = this.parseFloorItem(_loc3_);
            this.storeItem(_loc4_);
            this.registerFurnitureLocalization(_loc4_);
        }
        _loc2_ = _loc5_.child("wallitemtypes");
        for (_loc3_ of _loc2_.child("furnitype") ?? []) {
            _loc4_ = this.parseWallItem(_loc3_);
            this.storeItem(_loc4_);
            this.registerFurnitureLocalization(_loc4_);
        }
        this.dispatchEvent(new Event("FDP_furniture_data_ready"));
        return true;
    }

    /**
     * furnidata in Habbo's JSON form ({ roomitemtypes: { furnitype: [...] }, wallitemtypes: ... }), as Habbo's web
     * client reads it. Each field reads as the XML form's does, a missing one included, so either form gives the
     * same furniture.
     */
    private parseJsonFormat(param1: string): boolean {
        let _loc2_: any = null;
        try {
            _loc2_ = JSON.parse(param1);
        } catch (e) {
            return false;
        }
        if (_loc2_ == null || typeof _loc2_ !== "object") {
            return false;
        }
        for (const _loc3_ of FurnitureDataParser.jsonList(_loc2_.roomitemtypes?.furnitype)) {
            const _loc4_: FurnitureData = this.parseJsonFloorItem(_loc3_);
            this.storeItem(_loc4_);
            this.registerFurnitureLocalization(_loc4_);
        }
        for (const _loc3_ of FurnitureDataParser.jsonList(_loc2_.wallitemtypes?.furnitype)) {
            const _loc4_: FurnitureData = this.parseJsonWallItem(_loc3_);
            this.storeItem(_loc4_);
            this.registerFurnitureLocalization(_loc4_);
        }
        this.dispatchEvent(new Event("FDP_furniture_data_ready"));
        return true;
    }

    /** A field as the XML form's text: absent is "", a flag 1 or 0. */
    private static jsonText(param1: any): string {
        if (param1 == null) {
            return "";
        }
        if (typeof param1 === "boolean") {
            return param1 ? "1" : "0";
        }
        return String(param1);
    }

    private static jsonList(param1: any): any[] {
        return param1 == null ? [] : Array.isArray(param1) ? param1 : [param1];
    }

    private parseJsonFloorItem(param1: any): FurnitureData {
        const text = FurnitureDataParser.jsonText;
        let _loc15_: any[] = [];
        for (const _loc9_ of FurnitureDataParser.jsonList(param1.partcolors?.color)) {
            let _loc6_: string = text(_loc9_);
            if (_loc6_.charAt(0) == "#") {
                _loc15_.push(parseInt(_loc6_.replace("#", ""), 16));
            } else {
                _loc15_.push(-parseInt(_loc6_));
            }
        }
        let _loc3_: string = text(param1.classname);
        let _loc12_: any[] = _loc3_.split("*");
        let _loc7_: string = stringOrNull(_loc12_[0]);
        let _loc2_: number = (_loc12_.length > 1 ? parseInt(stringOrNull(_loc12_[1])) : 0) | 0;
        let _loc13_: boolean = _loc12_.length > 1;
        let _loc5_: boolean = param1.recyclable == null || text(param1.recyclable) == "1";
        return new FurnitureData("s", parseInt(text(param1.id)) | 0, _loc3_, _loc7_, text(param1.name), "", Number(text(param1.revision)) | 0, Number(text(param1.xdim)) | 0, Number(text(param1.ydim)) | 0, 0, _loc15_, _loc13_, _loc2_, text(param1.adurl), Number(text(param1.offerid)) | 0, text(param1.buyout) == "1", Number(text(param1.rentofferid)) | 0, text(param1.rentbuyout) == "1", text(param1.bc) == "1", text(param1.customparams), Number(text(param1.specialtype)) | 0, text(param1.category), text(param1.canstandon) == "1", text(param1.cansiton) == "1", text(param1.canlayon) == "1", text(param1.canputstuffon) == "1", Number(text(param1.height)), text(param1.excludeddynamic) == "1", text(param1.furniline), Number(text(param1.bcofferid)) | 0, text(param1.tradeable) == "1", _loc5_);
    }

    private parseJsonWallItem(param1: any): FurnitureData {
        const text = FurnitureDataParser.jsonText;
        let _loc2_: boolean = param1.recyclable == null || text(param1.recyclable) == "1";
        return new FurnitureData("i", parseInt(text(param1.id)) | 0, text(param1.classname), text(param1.classname), text(param1.name), "", Number(text(param1.revision)) | 0, 0, 0, 0, null, false, 0, text(param1.adurl), Number(text(param1.offerid)) | 0, text(param1.buyout) == "1", Number(text(param1.rentofferid)) | 0, text(param1.rentbuyout) == "1", text(param1.bc) == "1", null, Number(text(param1.specialtype)) | 0, text(param1.category), false, false, false, false, 0, text(param1.excludeddynamic) == "1", text(param1.furniline), Number(text(param1.bcofferid)) | 0, text(param1.tradeable) == "1", _loc2_);
    }

    private parseFloorItem(param1: XML): FurnitureData {
        let _loc6_: string = null;
        let _loc11_: number = parseInt(param1.attribute("id").toString()) | 0;
        let _loc15_: any[] = [];
        for (const _loc9_ of param1.child("partcolors").child("color") ?? []) {
            _loc6_ = _loc9_?.toString() ?? null;
            if (_loc6_.charAt(0) == "#") {
                _loc6_ = _loc6_.replace("#", "");
                _loc15_.push(parseInt(_loc6_, 16));
            } else {
                _loc15_.push(-parseInt(_loc6_));
            }
        }
        let _loc3_: string = param1.attribute("classname").toString();
        let _loc12_: any[] = _loc3_.split("*");
        let _loc7_: string = stringOrNull(_loc12_[0]);
        let _loc2_: number = (_loc12_.length > 1 ? parseInt(stringOrNull(_loc12_[1])) : 0) | 0;
        let _loc13_: boolean = _loc12_.length > 1;
        let _loc14_: number = Number(param1.child("specialtype")) | 0;
        let _loc4_: string = param1.child("category").length() > 0 ? String(param1.child("category")) : String(param1.attribute("category"));
        let _loc8_: boolean = param1.child("canputstuffon")?.toString() == "1";
        let _loc16_: number = Number(param1.child("height"));
        let _loc5_: boolean = param1.child("recyclable").length() == 0 || param1.child("recyclable")?.toString() == "1";
        return new FurnitureData("s", _loc11_, _loc3_, _loc7_, param1.child("name").toString(), "", Number(param1.child("revision")) | 0, Number(param1.child("xdim")) | 0, Number(param1.child("ydim")) | 0, 0, _loc15_, _loc13_, _loc2_, param1.child("adurl").toString(), Number(param1.child("offerid")) | 0, param1.child("buyout")?.toString() == "1", Number(param1.child("rentofferid")) | 0, param1.child("rentbuyout")?.toString() == "1", param1.child("bc")?.toString() == "1", param1.child("customparams").toString(), _loc14_, _loc4_, param1.child("canstandon")?.toString() == "1", param1.child("cansiton")?.toString() == "1", param1.child("canlayon")?.toString() == "1", _loc8_, _loc16_, param1.child("excludeddynamic")?.toString() == "1", param1.child("furniline").toString(), Number(param1.child("bcofferid")) | 0, param1.child("tradeable")?.toString() == "1", _loc5_);
    }

    private parseWallItem(param1: XML): FurnitureData {
        let _loc4_: number = parseInt(param1.attribute("id").toString()) | 0;
        let _loc2_: boolean = param1.child("recyclable").length() == 0 || param1.child("recyclable")?.toString() == "1";
        return new FurnitureData("i", _loc4_, param1.attribute("classname").toString(), param1.attribute("classname").toString(), param1.child("name").toString(), "", Number(param1.child("revision")) | 0, 0, 0, 0, null, false, 0, param1.child("adurl").toString(), Number(param1.child("offerid")) | 0, param1.child("buyout")?.toString() == "1", Number(param1.child("rentofferid")) | 0, param1.child("rentbuyout")?.toString() == "1", param1.child("bc")?.toString() == "1", null, Number(param1.child("specialtype")) | 0, param1.child("category").length() > 0 ? String(param1.child("category")) : String(param1.attribute("category")), false, false, false, false, 0, param1.child("excludeddynamic")?.toString() == "1", param1.child("furniline").toString(), Number(param1.child("bcofferid")) | 0, param1.child("tradeable")?.toString() == "1", _loc2_);
    }

    private parseLingoFormat(param1: string): void {
        let _loc27_: any;
        let _loc5_: any[] = null;
        let _loc29_: any[] = null;
        let _loc9_: string = null;
        let _loc19_: number = 0;
        let _loc3_: string = null;
        let _loc37_: any[] = null;
        let _loc8_: string = null;
        let _loc23_: number = 0;
        let _loc38_: boolean = false;
        let _loc30_: number = 0;
        let _loc22_: number = 0;
        let _loc16_: number = 0;
        let _loc17_: number = 0;
        let _loc41_: any[] = null;
        let _loc32_: any[] = null;
        let _loc39_: number = 0;
        let _loc26_: string = null;
        let _loc10_: string = null;
        let _loc6_: string = null;
        let _loc7_: string = null;
        let _loc33_: number = 0;
        let _loc20_: boolean = false;
        let _loc34_: number = 0;
        let _loc2_: boolean = false;
        let _loc24_: string = null;
        let _loc40_: number = 0;
        let _loc31_: boolean = false;
        let _loc13_: boolean = false;
        let _loc25_: boolean = false;
        let _loc11_: boolean = false;
        let _loc36_: boolean = false;
        let _loc4_: boolean = false;
        let _loc14_: FurnitureData = null;
        let _loc15_: RegExp = /\n\r{1,}|\n{1,}|\r{1,}/gm;
        let _loc12_: RegExp = /^\s+|\s+$/g;
        let _loc35_: RegExp = /\[+?((.)*?)\]/g;
        let _loc28_: any[] = param1.split(_loc15_);
        let _loc21_: number = 0;
        for (const _loc18_ of _loc28_ ?? []) {
            _loc5_ = _loc18_.match(_loc35_);
            for (_loc27_ of _loc5_ ?? []) {
                _loc27_ = _loc27_.replace(/\[{1,}/gm, "");
                _loc27_ = _loc27_.replace(/\]{1,}/gm, "");
                _loc29_ = _loc27_.split("\"");
                FurnitureDataParser.removePatternFrom(_loc29_, ", ");
                FurnitureDataParser.removePatternFrom(_loc29_, ",");
                _loc29_.splice(0, 1);
                _loc29_.splice(_loc29_.length - 1, 1);
                if (_loc29_.length < 18) {
                    Core.error("Lingo furni data was malformed: " + param1, true, 12);
                    return;
                }
                _loc9_ = stringOrNull(_loc29_[0]);
                _loc19_ = parseInt(stringOrNull(_loc29_[1])) | 0;
                _loc3_ = String(_loc29_[2]);
                _loc37_ = _loc3_.split("*");
                _loc8_ = stringOrNull(_loc37_[0]);
                _loc23_ = (_loc37_.length > 1 ? parseInt(stringOrNull(_loc37_[1])) : 0) | 0;
                _loc38_ = _loc37_.length > 1;
                _loc30_ = parseInt(stringOrNull(_loc29_[3])) | 0;
                _loc22_ = parseInt(stringOrNull(_loc29_[4])) | 0;
                _loc16_ = parseInt(stringOrNull(_loc29_[5])) | 0;
                _loc17_ = parseInt(stringOrNull(_loc29_[6])) | 0;
                _loc41_ = [];
                _loc32_ = _loc29_[7].split(",");
                _loc39_ = 0;
                while (_loc39_ < _loc32_.length) {
                    _loc26_ = stringOrNull(_loc32_[_loc39_]);
                    if (_loc26_.charAt(0) == "#") {
                        _loc26_ = _loc26_.replace("#", "");
                        _loc41_.push(parseInt(_loc26_, 16));
                    } else {
                        _loc41_.push(-parseInt(_loc26_));
                    }
                    _loc39_++;
                }
                _loc10_ = stringOrNull(_loc29_[8]);
                _loc6_ = stringOrNull(_loc29_[9]);
                _loc7_ = stringOrNull(_loc29_[10]);
                _loc33_ = parseInt(stringOrNull(_loc29_[11])) | 0;
                _loc20_ = _loc29_[12] == "true";
                _loc34_ = parseInt(stringOrNull(_loc29_[13])) | 0;
                _loc2_ = _loc29_[14] == "true";
                _loc24_ = stringOrNull(_loc29_[15]);
                _loc40_ = parseInt(stringOrNull(_loc29_[16])) | 0;
                _loc31_ = _loc29_[17] == "true";
                _loc36_ = false;
                _loc4_ = _loc9_ == "i";
                if (_loc4_) {
                    _loc13_ = false;
                    _loc25_ = false;
                    _loc11_ = false;
                    if (_loc29_.length >= 19) {
                        _loc36_ = _loc29_[18] == "1";
                    }
                } else {
                    _loc13_ = _loc29_[18] == "1";
                    _loc25_ = _loc29_[19] == "1";
                    _loc11_ = _loc29_[20] == "1";
                    if (_loc29_.length >= 22) {
                        _loc36_ = _loc29_[21] == "1";
                    }
                }
                _loc14_ = new FurnitureData(_loc9_, _loc19_, _loc3_, _loc8_, _loc10_, "", _loc30_, _loc22_, _loc16_, _loc17_, _loc41_, _loc38_, _loc23_, _loc7_, _loc33_, _loc20_, _loc34_, _loc2_, _loc31_, _loc24_, _loc40_, "", _loc13_, _loc25_, _loc11_, false, _loc17_, _loc36_, "", -1, true, true);
                this.storeItem(_loc14_);
                this.registerFurnitureLocalization(_loc14_);
            }
            _loc21_++;
        }
        this.dispatchEvent(new Event("FDP_furniture_data_ready"));
    }

    private storeItem(param1: FurnitureData): void {
        let _loc3_: UtilsMap = null;
        if (param1.type == "s") {
            this._floorItems.add(param1.id, param1);
            _loc3_ = this._SafeStr_4929;
        } else if (param1.type == "i") {
            this._wallItems.add(param1.id, param1);
            _loc3_ = this._SafeStr_2986;
        }
        let _loc2_: any[] = _loc3_[param1.className];
        if (_loc2_ == null) {
            _loc2_ = [];
            _loc3_.add(param1.className, _loc2_);
        }
        _loc2_[param1.colourIndex] = param1.id;
    }

    private furnitureDataError = (param1: AssetLoaderEvent): void => {
        let _loc2_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        this.removeLoaderListeners(_loc2_);
        if (this.retryLoadIfPossible()) {
            return;
        }
        HabboWebTools.logEventLog("furnituredata download error " + param1.status);
        Core.error("Could not download furnidata definition", this._critical, 12);
    };

    private registerFurnitureLocalization(param1: FurnitureData): void {
        if (this._localization != null) {
            if (param1.type == "s") {
                this._localization.updateLocalization("roomItem.name." + param1.id, param1.localizedName);
                this._localization.updateLocalization("roomItem.desc." + param1.id, param1.description);
            } else if (param1.type == "i") {
                this._localization.updateLocalization("wallItem.name." + param1.id, param1.localizedName);
                this._localization.updateLocalization("wallItem.desc." + param1.id, param1.description);
            }
        }
    }
}
