import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { AssetLibrary, AssetLoaderStruct, Core, EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { ProductData } from '@/com/sulake/habbo/session/product/ProductData';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class ProductDataParser extends EventDispatcherWrapper {
    static { registerClassName(this, 'com.sulake.habbo.session.product::ProductDataParser'); }

    public static readonly READY: string = "PDP_product_data_ready";
    private static readonly MAX_DOWNLOAD_RETRIES: number = 2;

    private static appendRetryParam(param1: string, param2: number): string {
        if (param1.indexOf("?") > 0) {
            return param1 + "&retry=" + param2;
        }
        return param1 + "?retry=" + param2;
    }

    constructor(param1: string, param2: Map<any, any>) {
        super();
        this._products = param2;
        this._SafeStr_3326 = new AssetLibrary("ProductDataParserAssetLib");
        this._SafeStr_5582 = param1;
        this._downloadRetriesLeft = 2;
        this.requestData(param1);
    }

    declare private _products: Map<any, any>;

    declare private _SafeStr_3326: AssetLibrary;

    declare private _SafeStr_5582: string;

    declare private _downloadRetriesLeft: number;
    static { (this.prototype as any)._downloadRetriesLeft = 0; }

    public override dispose(): void {
        super.dispose();
        if (this._SafeStr_3326) {
            this._SafeStr_3326.dispose();
            this._SafeStr_3326 = null;
        }
        this._products = null;
    }

    private requestData(param1: string): void {
        let _loc2_: IAsset = null;
        let _loc4_: IAsset = this._SafeStr_3326.getAssetByName("productdata");
        if (_loc4_ != null) {
            _loc2_ = this._SafeStr_3326.removeAsset(_loc4_);
            if (_loc2_ != null) {
                _loc2_.dispose();
            }
        }
        let _loc3_: AssetLoaderStruct = this._SafeStr_3326.loadAssetFromFile("productdata", new URLRequest(param1), "text/plain");
        _loc3_.addEventListener("AssetLoaderEventComplete", this.parseProductsData);
        _loc3_.addEventListener("AssetLoaderEventError", this.productsDataError);
    }

    private removeLoaderListeners(param1: AssetLoaderStruct): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("AssetLoaderEventComplete", this.parseProductsData);
        param1.removeEventListener("AssetLoaderEventError", this.productsDataError);
    }

    private retryLoadIfPossible(): boolean {
        if (this._SafeStr_5582 == null || this._downloadRetriesLeft <= 0) {
            return false;
        }
        let _loc1_: string = ProductDataParser.appendRetryParam(this._SafeStr_5582, this._downloadRetriesLeft);
        this._downloadRetriesLeft = this._downloadRetriesLeft - 1;
        this.requestData(_loc1_);
        return true;
    }

    private onMalformedData(param1: number): void {
        if (this.retryLoadIfPossible()) {
            return;
        }
        HabboWebTools.logEventLog("productdata malformed data " + param1);
        Core.error("XML Product data was malformed", true, 7);
    }

    private parseXmlFormat(param1: string): boolean {
        let _loc4_: XML = null;
        let _loc2_: string = null;
        try {
            _loc4_ = new XML(param1);
        } catch (e) {
            return false;
        }
        if (_loc4_ == null) {
            return false;
        }
        let _loc5_: XMLList = _loc4_.child("product");
        for (const _loc3_ of _loc5_ ?? []) {
            _loc2_ = _loc3_.attribute("code").toString();
            this._products.set(_loc2_, new ProductData(_loc2_, _loc3_.child("name").toString()));
        }
        this.dispatchEvent(new Event("PDP_product_data_ready"));
        return true;
    }

    private parseLingoFormat(param1: string): void {
        let _loc7_: any;
        let _loc5_: any[] = null;
        let _loc12_: any[] = null;
        let _loc10_: string = null;
        let _loc6_: string = null;
        let _loc2_: ProductData = null;
        let _loc3_: RegExp = /\n\r{1,}|\n{1,}|\r{1,}/gm;
        let _loc4_: RegExp = /\[+?((.)*?)\]/g;
        param1 = param1.replace(/"{1,}/gm, "");
        let _loc9_: any[] = param1.split(_loc3_);
        let _loc11_: number = 0;
        for (const _loc8_ of _loc9_ ?? []) {
            _loc5_ = _loc8_.match(_loc4_);
            for (_loc7_ of _loc5_ ?? []) {
                _loc7_ = _loc7_.replace(/\[{1,}/gm, "");
                _loc7_ = _loc7_.replace(/\]{1,}/gm, "");
                _loc12_ = _loc7_.split(",");
                _loc10_ = stringOrNull(_loc12_.shift());
                _loc6_ = stringOrNull(_loc12_.shift());
                _loc2_ = new ProductData(_loc10_, _loc6_);
                this._products.set(_loc10_, _loc2_);
            }
            _loc11_++;
        }
        this.dispatchEvent(new Event("PDP_product_data_ready"));
    }

    private parseProductsData = (param1: AssetLoaderEvent): void => {
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
        } else {
            this.parseLingoFormat(_loc2_);
        }
    };

    private productsDataError = (param1: AssetLoaderEvent): void => {
        let _loc2_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        this.removeLoaderListeners(_loc2_);
        if (this.retryLoadIfPossible()) {
            return;
        }
        HabboWebTools.logEventLog("productdata download error " + param1.status);
        Core.error("Could not download productdata", true, 7);
    };
}
