import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { AssetLibrary, AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { BadgeInfo } from '@/com/sulake/habbo/session/BadgeInfo';
import { BadgeImageReadyEvent } from '@/com/sulake/habbo/session/events/BadgeImageReadyEvent';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class BadgeImageManager {
    static { registerClassName(this, 'com.sulake.habbo.session::BadgeImageManager'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        BadgeImageManager.#initStatics();
        return BadgeImageManager._log;
    }

    public static readonly _SafeStr_7936: string = "group_badge";
    public static readonly TYPE_NORMAL: string = "normal_badge";
    private readonly ASSET_PREFIX: string = "badge_";
    private readonly ASSET_SMALL_POSTFIX: string = "_32";

    constructor(param1: IAssetLibrary, param2: IEventDispatcher, param3: ICoreConfiguration) {
        if (param1 == null) {
            param1 = new AssetLibrary("badge_images");
        }
        this._assets = param1;
        this._events = param2;
        this._configuration = param3;
    }

    declare private _assets: IAssetLibrary;

    declare private _events: IEventDispatcher;

    declare private _configuration: ICoreConfiguration;

    private _requestedGroupBadges: Map<any, any> = new Dictionary();

    public dispose(): void {
        this._assets = null;
    }

    public getBadgeImage(param1: string, param2: string = "normal_badge", param3: boolean = true, param4: boolean = false): BitmapData {
        let _loc5_: BitmapData = this.getBadgeImageInternal(param1, param2, param4);
        if (!_loc5_ && param3) {
            _loc5_ = this.getPlaceholder();
        }
        return _loc5_;
    }

    public getSmallBadgeImage(param1: string, param2: string = "normal_badge"): BitmapData {
        if (this.getBadgeImageInternal(param1, param2, true) == null && this.getBadgeImageInternal(param1) != null) {
            this.createSmallBadgeBitmap("badge_" + param1, param1);
        }
        return this.getBadgeImage(param1, param2, false, true);
    }

    public getBadgeImageWithInfo(param1: string): BadgeInfo {
        let _loc2_: BitmapData = this.getBadgeImageInternal(param1);
        return _loc2_ != null ? new BadgeInfo(_loc2_, false) : new BadgeInfo(this.getPlaceholder(), true);
    }

    public getBadgeImageAssetName(param1: string, param2: string = "normal_badge", param3: boolean = false): string {
        let _loc4_: string = "badge_" + param1 + (param3 ? "_32" : "");
        if (this._assets.hasAsset(_loc4_)) {
            return _loc4_;
        }
        this.getBadgeImageInternal(param1, param2, param3);
        return null;
    }

    public getSmallScaleBadgeAssetName(param1: string, param2: string = "normal_badge"): string {
        let _loc3_: string = this.getBadgeImageAssetName(param1, param2, true);
        if (_loc3_ == null) {
            this.createSmallBadgeBitmap("badge_" + param1, param1);
            return this.getBadgeImageAssetName(param1, param2, true);
        }
        return _loc3_;
    }

    private getBadgeImageInternal(param1: string, param2: string = "normal_badge", param3: boolean = false): BitmapData {
        let _loc7_: BitmapDataAsset = null;
        let _loc8_: URLRequest = null;
        let _loc5_: string = null;
        let _loc4_: AssetLoaderStruct = null;
        let _loc6_: string = "badge_" + param1 + (param3 ? "_32" : "");
        if (this._assets.hasAsset(_loc6_)) {
            _loc7_ = asInstanceOf(this._assets.getAssetByName(_loc6_), BitmapDataAsset);
            return (asInstanceOf(_loc7_.content, BitmapData)).clone();
        }
        if (param3) {
            return null;
        }
        BadgeImageManager._log.info("Request badge: " + param1);
        switch (param2) {
            case "normal_badge":
                if (this._configuration != null) {
                    _loc5_ = this._configuration.getProperty("image.library.url");
                    _loc5_ = _loc5_ + ("album1584/" + param1 + ".png");
                    _loc8_ = new URLRequest(_loc5_);
                }
                break;
            case "group_badge":
                if (this._configuration != null && !this._requestedGroupBadges.get(_loc6_)) {
                    _loc5_ = this._configuration.getProperty("group.badge.url");
                    _loc5_ = _loc5_.replace("%imagerdata%", param1);
                    if (_loc5_.substr(-4) == ".gif") {
                        _loc5_ = _loc5_.slice(0, -3) + "png";
                    }
                    _loc8_ = new URLRequest(_loc5_);
                    this._requestedGroupBadges.set(_loc6_, true);
                }
        }
        if (_loc8_ != null) {
            _loc4_ = this._assets.loadAssetFromFile(_loc6_, _loc8_, "image/png");
            _loc4_.addEventListener("AssetLoaderEventComplete", this.onBadgeImageReady);
        }
        return null;
    }

    private getPlaceholder(): BitmapData {
        return castTo(this._assets.getAssetByName("loading_icon").content, BitmapData).clone();
    }

    private createSmallBadgeBitmap(param1: string, param2: string): void {
        let _loc4_: BitmapDataAsset = null;
        let _loc3_: BitmapData = this.renderSmallScaleBadgeBitmap(param1);
        if (_loc3_) {
            _loc4_ = new BitmapDataAsset(this._assets.getAssetTypeDeclarationByClass(BitmapDataAsset));
            if (_loc4_ != null) {
                this._assets.setAsset("badge_" + param2 + "_32", _loc4_);
                _loc4_.setUnknownContent(_loc3_);
            }
        }
    }

    private renderSmallScaleBadgeBitmap(param1: string): BitmapData {
        let _loc3_: BitmapData = null;
        let _loc5_: BitmapData = null;
        let _loc2_: Matrix = null;
        let _loc4_: IAsset = this._assets.getAssetByName(param1);
        if (_loc4_ != null) {
            _loc3_ = asInstanceOf(_loc4_.content, BitmapData);
            _loc5_ = new BitmapData(_loc3_.width / 2 | 0, _loc3_.height / 2 | 0, true, 0);
            _loc2_ = new Matrix(0.5, 0, 0, 0.5);
            _loc5_.draw(_loc3_, _loc2_, null, null, null, true);
            return _loc5_;
        }
        return null;
    }

    private onBadgeImageReady = (param1: AssetLoaderEvent): void => {
        let _loc4_: string = null;
        let _loc3_: string = null;
        let _loc2_: Bitmap = null;
        let _loc5_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc5_ != null) {
            if (_loc5_.assetLoader != null && _loc5_.assetLoader.content != null) {
                _loc4_ = _loc5_.assetName;
                _loc3_ = _loc4_.replace("badge_", "");
                _loc2_ = asInstanceOf(_loc5_.assetLoader.content, Bitmap);
                if (_loc2_ == null) {
                    return;
                }
                this._events.dispatchEvent(new BadgeImageReadyEvent(_loc3_, _loc2_.bitmapData.clone()));
            }
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (BadgeImageManager.#staticsReady) return;
        BadgeImageManager.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(BadgeImageManager, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.session.BadgeImageManager"));
    }
}
