import { asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { SessionDataManager } from '@/com/sulake/habbo/session/SessionDataManager';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { AssetLibrary, AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { HabboProperty } from '@/com/sulake/habbo/configuration/enum/HabboProperty';
import { FurniIconImageReadyEvent } from '@/com/sulake/habbo/session/events/FurniIconImageReadyEvent';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class FurniIconImageManager {
    static { registerClassName(this, 'com.sulake.habbo.session::FurniIconImageManager'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        FurniIconImageManager.#initStatics();
        return FurniIconImageManager._log;
    }

    private readonly ASSET_PREFIX: string = "furni_icon_";

    constructor(param1: IAssetLibrary, param2: IEventDispatcher, param3: ICoreConfiguration, param4: SessionDataManager) {
        if (param1 == null) {
            param1 = new AssetLibrary("furni_icon_images");
        }
        this._loadingInfo = new UtilsMap();
        this._assets = param1;
        this._events = param2;
        this._configuration = param3;
        this._sessionDataManager = param4;
    }

    declare private _assets: IAssetLibrary;

    declare private _events: IEventDispatcher;

    declare private _configuration: ICoreConfiguration;

    declare private _sessionDataManager: SessionDataManager;

    declare private _loadingInfo: UtilsMap;

    public dispose(): void {
        this._assets = null;
    }

    public getFurniIconImage(param1: boolean, param2: number, param3: string, param4: boolean = true): BitmapData {
        let _loc5_: BitmapData = this.getFurniIconImageInternal(param1, param2, param3);
        if (!_loc5_ && param4) {
            _loc5_ = this.getPlaceholder();
        }
        return _loc5_;
    }

    public getFurniIconImageAssetName(param1: boolean, param2: number, param3: string): string {
        let _loc4_: string = this.getAssetName(param1, param2, param3);
        if (this._assets.hasAsset(_loc4_)) {
            return _loc4_;
        }
        this.getFurniIconImageInternal(param1, param2, param3);
        return null;
    }

    private getData(param1: boolean, param2: number, param3: string): IFurnitureData {
        if (param1) {
            return this._sessionDataManager.getWallItemData(param2);
        }
        return this._sessionDataManager.getFloorItemData(param2);
    }

    private getClassName(param1: boolean, param2: number, param3: string): string {
        let _loc4_: IFurnitureData = this.getData(param1, param2, param3);
        if (_loc4_ == null) {
            return String(param1) + "_" + param2 + "_" + param3;
        }
        return _loc4_.className + param3;
    }

    private getAssetName(param1: boolean, param2: number, param3: string): string {
        let _loc5_: string = "furni_icon_" + this.getClassName(param1, param2, param3);
        let _loc4_: IFurnitureData = this.getData(param1, param2, param3);
        if (_loc4_ == null) {
            return _loc5_;
        }
        if (_loc4_.hasIndexedColor) {
            _loc5_ += "_" + _loc4_.colourIndex;
        }
        return _loc5_;
    }

    private getFurniIconImageInternal(param1: boolean, param2: number, param3: string): BitmapData {
        let _loc13_: BitmapDataAsset = null;
        let _loc9_: URLRequest = null;
        let _loc6_: string = null;
        let _loc4_: IFurnitureData = null;
        let _loc11_: boolean = false;
        let _loc7_: number = 0;
        let _loc10_: number = 0;
        let _loc5_: AssetLoaderStruct = null;
        let _loc8_: string = this.getClassName(param1, param2, param3);
        let _loc12_: string = this.getAssetName(param1, param2, param3);
        if (this._assets.hasAsset(_loc12_)) {
            _loc13_ = asInstanceOf(this._assets.getAssetByName(_loc12_), BitmapDataAsset);
            return (asInstanceOf(_loc13_.content, BitmapData)).clone();
        }
        FurniIconImageManager._log.info("Request furni icon: " + _loc12_);
        if (this._configuration != null) {
            _loc4_ = this.getData(param1, param2, param3);
            if (_loc4_ == null) {
                return null;
            }
            _loc11_ = _loc4_.hasIndexedColor;
            _loc7_ = _loc4_.colourIndex;
            _loc10_ = _loc4_.revision;
            _loc6_ = this._configuration.getProperty(HabboProperty.DYNAMIC_DOWNLOAD_URL);
            _loc6_ = _loc6_ + this._configuration.getProperty(HabboProperty.DYNAMIC_ICON_DOWNLOAD_NAME_TEMPLATE);
            _loc6_ = _loc6_.replace("%revision%", String(_loc10_));
            _loc6_ = _loc6_.replace("%typeid%", _loc8_);
            _loc6_ = _loc6_.replace("%param%", _loc11_ ? "_" + _loc7_ : "");
            _loc9_ = new URLRequest(_loc6_);
        }
        if (_loc9_ != null && !this._loadingInfo.hasKey(_loc12_)) {
            _loc5_ = this._assets.loadAssetFromFile(_loc12_, _loc9_, "image/png");
            this._loadingInfo.add(_loc12_, [param1, param2, param3]);
            _loc5_.addEventListener("AssetLoaderEventComplete", this.onFurniIconImageReady);
            _loc5_.addEventListener("AssetLoaderEventError", this.onFurniIconImageError);
        }
        return null;
    }

    private getPlaceholder(): BitmapData {
        return castTo(this._assets.getAssetByName("loading_icon").content, BitmapData).clone();
    }

    private onFurniIconImageError = (param1: AssetLoaderEvent): void => {
        let _loc2_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc2_ != null && _loc2_.assetLoader != null) {
            this._loadingInfo.remove(_loc2_.assetLoader.id);
        }
    };

    private onFurniIconImageReady = (param1: AssetLoaderEvent): void => {
        let _loc5_: any[] = null;
        let _loc3_: string = null;
        let _loc2_: Bitmap = null;
        let _loc4_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc4_ != null && _loc4_.assetLoader != null) {
            _loc5_ = this._loadingInfo.remove(_loc4_.assetName);
            if (_loc5_ == null) {
                return;
            }
            if (_loc4_.assetLoader.content != null) {
                _loc3_ = _loc4_.assetName;
                _loc2_ = asInstanceOf(_loc4_.assetLoader.content, Bitmap);
                if (_loc2_ == null) {
                    return;
                }
                this._events.dispatchEvent(new FurniIconImageReadyEvent(_loc3_, _loc5_[0], _loc5_[1] | 0, stringOrNull(_loc5_[2]), _loc2_.bitmapData.clone()));
            }
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FurniIconImageManager.#staticsReady) return;
        FurniIconImageManager.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FurniIconImageManager, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.session.FurniIconImageManager"));
    }
}
