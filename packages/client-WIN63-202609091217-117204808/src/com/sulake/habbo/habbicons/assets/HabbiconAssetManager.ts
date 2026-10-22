import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Loader } from '@habbo-pixi/runtime/display/Loader';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import type { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import type { SecurityErrorEvent } from '@habbo-pixi/runtime/events/SecurityErrorEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { URLLoader } from '@habbo-pixi/runtime/net/URLLoader';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { HabbiconDefinition } from '@/com/sulake/habbo/habbicons/assets/HabbiconDefinition';
import { Logger } from '@/com/sulake/habbo/Logger';
import { BitmapHelper } from '@/com/sulake/habbo/utils/BitmapHelper';

export class HabbiconAssetManager {
    static { registerClassName(this, 'com.sulake.habbo.habbicons.assets::HabbiconAssetManager'); }

    private static readonly _SafeStr_14196: string = "habbicons.asset.root";
    private static readonly HABBICONS_ASSET_HASH: string = "habbicons.asset.hash";
    private static readonly _SafeStr_14266: string = "habbicons.json";
    private static readonly _SafeStr_14267: string = "habbicons_spritesheet.png";
    private static readonly COLLECTION_ICONS_SPRITESHEET_FILE: string = "collection_icons_spritesheet.png";
    private static readonly HABBICONS_ANIMATION_PATH: string = "animation/";
    private static readonly DEFAULT_FRAME_SIZE: number = 40;
    private static readonly DEFAULT_COLLECTION_ICON_SIZE: number = 18;
    private static readonly COLLECTION_ICON_OUTLINE_SIZE: number = 2;
    private static readonly COLLECTION_ICON_OUTLINE_COLOR: number = 4294967295;
    public static readonly ASSETS_LOADED: string = "habbicon_assets_loaded";
    private static _instance: HabbiconAssetManager;
    private static _configuration: ICoreConfiguration;
    private static _events: EventDispatcher = new EventDispatcher();
    private _isLoading: boolean = false;
    private _jsonLoaded: boolean = false;
    private _sheetLoaded: boolean = false;
    private _collectionSheetLoaded: boolean = false;
    private _SafeStr_14268: boolean = false;

    declare private _SafeStr_14269: Map<any, any>;

    declare private _SafeStr_14270: Map<any, any>;

    declare private _SafeStr_14271: Map<any, any>;

    declare private _previewBitmapsSmall: Map<any, any>;

    declare private _SafeStr_14272: Map<any, any>;

    declare private _SafeStr_14273: Map<any, any>;

    declare private _SafeStr_14274: Map<any, any>;

    declare private _SafeStr_14275: Map<any, any>;

    declare private _SafeStr_14276: Map<any, any>;

    declare private _SafeStr_14277: Map<any, any>;

    declare private _SafeStr_14278: Map<any, any>;

    declare private _SafeStr_14279: BitmapData;

    declare private _SafeStr_14280: BitmapData;

    declare private _SafeStr_14281: string;

    constructor() {
        this._SafeStr_14269 = new Dictionary();
        this._SafeStr_14270 = new Dictionary();
        this._SafeStr_14271 = new Dictionary();
        this._previewBitmapsSmall = new Dictionary();
        this._SafeStr_14272 = new Dictionary();
        this._SafeStr_14273 = new Dictionary();
        this._SafeStr_14274 = new Dictionary();
        this._SafeStr_14275 = new Dictionary();
        this._SafeStr_14276 = new Dictionary();
        this._SafeStr_14277 = new Dictionary();
        this._SafeStr_14278 = new Dictionary();
    }

    public static getPreviewBitmap(param1: number, param2: boolean): BitmapData {
        return HabbiconAssetManager.getInstance().resolvePreviewBitmap(param1, param2);
    }

    public static getHabbiconNameKey(param1: number): string {
        return HabbiconAssetManager.getInstance().resolveNameLocalizationKey(param1);
    }

    public static getCollectionIconBitmap(param1: number): BitmapData {
        return HabbiconAssetManager.getInstance().resolveCollectionIconBitmap(param1);
    }

    public static getOutlinedCollectionIconBitmap(param1: number): BitmapData {
        return HabbiconAssetManager.getInstance().resolveOutlinedCollectionIconBitmap(param1);
    }

    public static getRuntimeAsset(param1: number): any {
        return HabbiconAssetManager.getInstance().resolveRuntimeAsset(param1);
    }

    public static getDirection(param1: number): number {
        return HabbiconAssetManager.getInstance().resolveDirection(param1);
    }

    public static configure(param1: ICoreConfiguration): void {
        HabbiconAssetManager._configuration = param1;
        HabbiconAssetManager.getInstance().refreshAssetRoot();
    }

    public static preload(): void {
        HabbiconAssetManager.getInstance().ensureLoaded();
    }

    public static addEventListener(param1: string, param2: (...args: any[]) => any): void {
        HabbiconAssetManager._events.addEventListener(param1, param2);
    }

    public static removeEventListener(param1: string, param2: (...args: any[]) => any): void {
        HabbiconAssetManager._events.removeEventListener(param1, param2);
    }

    private static getInstance(): HabbiconAssetManager {
        if (HabbiconAssetManager._instance == null) {
            HabbiconAssetManager._instance = new HabbiconAssetManager();
        }
        return HabbiconAssetManager._instance;
    }

    private static createOutlinedBitmap(param1: BitmapData, param2: number, param3: number): BitmapData {
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc4_: BitmapData = new BitmapData(param1.width + param2 * 2, param1.height + param2 * 2, true, 0);
        let _loc5_: BitmapData = new BitmapData(param1.width, param1.height, true, param3);
        let _loc8_: Point = new Point();
        _loc5_.copyChannel(param1, param1.rect, _loc8_, 8, 8);
        _loc6_ = -param2;
        while (_loc6_ <= param2) {
            _loc7_ = -param2;
            while (_loc7_ <= param2) {
                if (!(_loc6_ == 0 && _loc7_ == 0)) {
                    _loc8_.x = param2 + _loc6_;
                    _loc8_.y = param2 + _loc7_;
                    _loc4_.copyPixels(_loc5_, _loc5_.rect, _loc8_, null, null, true);
                }
                _loc7_++;
            }
            _loc6_++;
        }
        _loc4_.copyPixels(param1, param1.rect, new Point(param2, param2), null, null, true);
        _loc5_.dispose();
        return _loc4_;
    }

    private refreshAssetRoot(): string {
        let _loc1_: string = null;
        let _loc2_: string = null;
        if (HabbiconAssetManager._configuration == null) {
            return this._SafeStr_14281;
        }
        _loc1_ = HabbiconAssetManager._configuration.getProperty("habbicons.asset.root");
        _loc2_ = HabbiconAssetManager._configuration.getProperty("habbicons.asset.hash");
        if (_loc1_ == null || _loc1_ == "") {
            return this._SafeStr_14281;
        }
        _loc1_ = this.stripTrailingSlash(_loc1_);
        if (_loc2_ != null && _loc2_ != "" && (_loc1_.indexOf("{hash}") > -1 || _loc1_.indexOf("%hash%") > -1)) {
            _loc1_ = _loc1_.split("{hash}").join(_loc2_);
            _loc1_ = _loc1_.split("%hash%").join(_loc2_);
        } else if (_loc2_ != null && _loc2_ != "" && !this.endsWithPathSegment(_loc1_, _loc2_)) {
            _loc1_ += "/" + _loc2_;
        }
        _loc1_ += "/";
        if (this._SafeStr_14281 != _loc1_) {
            this.resetLoadedAssets();
            this._SafeStr_14281 = _loc1_;
        }
        return this._SafeStr_14281;
    }

    private resetLoadedAssets(): void {
        this._isLoading = false;
        this._jsonLoaded = false;
        this._sheetLoaded = false;
        this._collectionSheetLoaded = false;
        this._SafeStr_14268 = false;
        this._SafeStr_14269 = new Dictionary();
        this._SafeStr_14270 = new Dictionary();
        this._SafeStr_14271 = new Dictionary();
        this._previewBitmapsSmall = new Dictionary();
        this._SafeStr_14272 = new Dictionary();
        this._SafeStr_14273 = new Dictionary();
        this._SafeStr_14274 = new Dictionary();
        this._SafeStr_14275 = new Dictionary();
        this._SafeStr_14276 = new Dictionary();
        this._SafeStr_14277 = new Dictionary();
        this._SafeStr_14278 = new Dictionary();
        this._SafeStr_14279 = null;
        this._SafeStr_14280 = null;
    }

    private stripTrailingSlash(param1: string): string {
        while (param1.length > 0 && param1.charAt(param1.length - 1) == "/") {
            param1 = param1.substr(0, param1.length - 1);
        }
        return param1;
    }

    private endsWithPathSegment(param1: string, param2: string): boolean {
        return param1 == param2 || param1.lastIndexOf("/" + param2) == param1.length - param2.length - 1;
    }

    private resolvePreviewBitmap(param1: number, param2: boolean): BitmapData {
        let _loc3_: BitmapData = null;
        let _loc5_: any = null;
        let _loc4_: BitmapData = null;
        this.ensureLoaded();
        _loc3_ = param2 ? asInstanceOf(this._previewBitmapsSmall.get(param1), BitmapData) : asInstanceOf(this._SafeStr_14271.get(param1), BitmapData);
        if (_loc3_ != null) {
            return _loc3_;
        }
        if (!this._jsonLoaded || !this._sheetLoaded || this._SafeStr_14279 == null) {
            return null;
        }
        _loc5_ = this._SafeStr_14269.get(param1);
        if (_loc5_ == null) {
            return null;
        }
        _loc4_ = this.extractFrameBitmap(_loc5_);
        if (_loc4_ == null) {
            return null;
        }
        this._SafeStr_14271.set(param1, _loc4_);
        if (param2) {
            _loc3_ = BitmapHelper.resampleBitmapData(_loc4_, 0.5);
            this._previewBitmapsSmall.set(param1, _loc3_);
            return _loc3_;
        }
        return _loc4_;
    }

    private resolveCollectionIconBitmap(param1: number): BitmapData {
        let _loc2_: BitmapData = null;
        let _loc4_: any = null;
        let _loc3_: BitmapData = null;
        this.ensureLoaded();
        _loc2_ = asInstanceOf(this._SafeStr_14272.get(param1), BitmapData);
        if (_loc2_ != null) {
            return _loc2_;
        }
        if (!this._jsonLoaded || !this._collectionSheetLoaded || this._SafeStr_14280 == null) {
            return null;
        }
        _loc4_ = this._SafeStr_14270.get(param1);
        if (_loc4_ == null) {
            return null;
        }
        _loc3_ = this.extractFrameBitmapFromSheet(this._SafeStr_14280, _loc4_);
        if (_loc3_ != null) {
            this._SafeStr_14272.set(param1, _loc3_);
        }
        return _loc3_;
    }

    private resolveOutlinedCollectionIconBitmap(param1: number): BitmapData {
        let _loc2_: BitmapData = null;
        let _loc3_: BitmapData = null;
        _loc2_ = asInstanceOf(this._SafeStr_14273.get(param1), BitmapData);
        if (_loc2_ != null) {
            return _loc2_;
        }
        _loc3_ = this.resolveCollectionIconBitmap(param1);
        if (_loc3_ == null) {
            return null;
        }
        _loc2_ = HabbiconAssetManager.createOutlinedBitmap(_loc3_, 2, 4294967295);
        this._SafeStr_14273.set(param1, _loc2_);
        return _loc2_;
    }

    private resolveNameLocalizationKey(param1: number): string {
        this.ensureLoaded();
        return stringOrNull(this._SafeStr_14274.get(param1));
    }

    private resolveDirection(param1: number): number {
        let _loc2_: HabbiconDefinition = null;
        this.ensureLoaded();
        _loc2_ = asInstanceOf(this._SafeStr_14275.get(param1), HabbiconDefinition);
        return _loc2_ != null ? _loc2_.direction : 0;
    }

    private resolveRuntimeAsset(param1: number): any {
        let _loc3_: HabbiconDefinition = null;
        let _loc2_: any = null;
        this.ensureLoaded();
        _loc2_ = this._SafeStr_14277.get(param1);
        if (_loc2_ != null) {
            return _loc2_;
        }
        _loc3_ = asInstanceOf(this._SafeStr_14275.get(param1), HabbiconDefinition);
        if (_loc3_ == null) {
            return null;
        }
        if (_loc3_.animated) {
            this.loadRuntimeAsset(param1, _loc3_);
        }
        _loc2_ = this._SafeStr_14276.get(param1);
        if (_loc2_ == null) {
            _loc2_ = this.buildFallbackRuntimeAsset(param1, _loc3_);
            if (_loc2_ != null) {
                this._SafeStr_14276.set(param1, _loc2_);
            }
        }
        return _loc2_;
    }

    private ensureLoaded(): void {
        let _loc1_: URLLoader = null;
        let _loc2_: Loader = null;
        let _loc4_: Loader = null;
        let _loc3_: string = null;
        if (this._isLoading || this._jsonLoaded && this._sheetLoaded && this._collectionSheetLoaded || this._SafeStr_14268) {
            return;
        }
        _loc3_ = this.refreshAssetRoot();
        if (_loc3_ == null || _loc3_ == "") {
            Logger.log("[HabbiconAssetManager] Habbicon asset root is not configured.");
            this.markLoadFailed();
            return;
        }
        this._isLoading = true;
        _loc1_ = new URLLoader();
        _loc1_.dataFormat = "text";
        _loc1_.addEventListener("complete", this.onMetadataLoaded);
        _loc1_.addEventListener("ioError", this.onLoadError);
        _loc1_.addEventListener("securityError", this.onSecurityError);
        _loc1_.load(new URLRequest(_loc3_ + "habbicons.json"));
        _loc2_ = new Loader();
        _loc2_.contentLoaderInfo.addEventListener("complete", this.onSpritesheetLoaded);
        _loc2_.contentLoaderInfo.addEventListener("ioError", this.onLoadError);
        _loc2_.contentLoaderInfo.addEventListener("securityError", this.onSecurityError);
        _loc2_.load(new URLRequest(_loc3_ + "habbicons_spritesheet.png"));
        _loc4_ = new Loader();
        _loc4_.contentLoaderInfo.addEventListener("complete", this.onCollectionSpritesheetLoaded);
        _loc4_.contentLoaderInfo.addEventListener("ioError", this.onCollectionLoadError);
        _loc4_.contentLoaderInfo.addEventListener("securityError", this.onCollectionSecurityError);
        _loc4_.load(new URLRequest(_loc3_ + "collection_icons_spritesheet.png"));
    }

    private onMetadataLoaded = (param1: Event): void => {
        let _loc4_: any = null;
        let _loc3_: any[] = null;
        let _loc5_: any[] = null;
        let _loc2_: any = null;
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc6_: URLLoader = asInstanceOf(param1.currentTarget, URLLoader);
        this.removeTextLoaderListeners(_loc6_);
        try {
            _loc4_ = JSON.parse(typeof _loc6_.data === "string" ? _loc6_.data : null);
            _loc3_ = _loc4_ && Array.isArray(_loc4_.habbicons) ? Array.isArray(_loc4_.habbicons) ? _loc4_.habbicons : null : [];
            for (_loc2_ of _loc3_ ?? []) {
                if (!(_loc2_ == null || _loc2_.id == null)) {
                    _loc7_ = this.normalizeDimension(_loc2_.width);
                    _loc8_ = this.normalizeDimension(_loc2_.height);
                    this._SafeStr_14269.set(_loc2_.id | 0, { "x": _loc2_.x | 0, "y": _loc2_.y | 0, "width": _loc7_, "height": _loc8_ });
                    if (_loc2_.name != null) {
                        this._SafeStr_14274.set(_loc2_.id | 0, String(_loc2_.name));
                    }
                    this._SafeStr_14275.set(_loc2_.id | 0, this.buildDefinition(_loc2_, _loc7_, _loc8_));
                }
            }
            _loc5_ = _loc4_ && Array.isArray(_loc4_.collectionIcons) ? Array.isArray(_loc4_.collectionIcons) ? _loc4_.collectionIcons : null : [];
            for (_loc2_ of _loc5_ ?? []) {
                if (!(_loc2_ == null || _loc2_.id == null)) {
                    this._SafeStr_14270.set(_loc2_.id | 0, { "x": _loc2_.x | 0, "y": _loc2_.y | 0, "width": this.normalizeDimension(_loc2_.width, 18), "height": this.normalizeDimension(_loc2_.height, 18) });
                }
            }
            this._jsonLoaded = true;
            this.checkLoadCompletion();
        } catch (error) {
            Logger.log("[HabbiconAssetManager] Failed to parse habbicon metadata: " + error.message);
            this.markLoadFailed();
        }
    };

    private onSpritesheetLoaded = (param1: Event): void => {
        let _loc3_: Bitmap = null;
        let _loc2_: Loader = asInstanceOf(param1.currentTarget.loader, Loader);
        this.removeImageLoaderListeners(_loc2_);
        _loc3_ = asInstanceOf(_loc2_.content, Bitmap);
        if (_loc3_ == null || _loc3_.bitmapData == null) {
            Logger.log("[HabbiconAssetManager] Loaded habbicon spritesheet without bitmap data.");
            this.markLoadFailed();
            return;
        }
        this._SafeStr_14279 = _loc3_.bitmapData;
        this._sheetLoaded = true;
        this.checkLoadCompletion();
    };

    private onCollectionSpritesheetLoaded = (param1: Event): void => {
        let _loc3_: Bitmap = null;
        let _loc2_: Loader = asInstanceOf(param1.currentTarget.loader, Loader);
        this.removeImageLoaderListeners(_loc2_, this.onCollectionSpritesheetLoaded, this.onCollectionLoadError, this.onCollectionSecurityError);
        _loc3_ = asInstanceOf(_loc2_.content, Bitmap);
        if (_loc3_ == null || _loc3_.bitmapData == null) {
            Logger.log("[HabbiconAssetManager] Loaded habbicon collection icon spritesheet without bitmap data.");
            this._collectionSheetLoaded = true;
            this.checkLoadCompletion();
            return;
        }
        this._SafeStr_14280 = _loc3_.bitmapData;
        this._collectionSheetLoaded = true;
        this.checkLoadCompletion();
    };

    private onLoadError = (param1: IOErrorEvent): void => {
        Logger.log("[HabbiconAssetManager] Failed to load habbicon asset: " + param1.text);
        this.markLoadFailed();
    };

    private onCollectionLoadError = (param1: IOErrorEvent): void => {
        let _loc2_: Loader = asInstanceOf(param1.currentTarget.loader, Loader);
        this.removeImageLoaderListeners(_loc2_, this.onCollectionSpritesheetLoaded, this.onCollectionLoadError, this.onCollectionSecurityError);
        Logger.log("[HabbiconAssetManager] Failed to load habbicon collection icon asset: " + param1.text);
        this._collectionSheetLoaded = true;
        this.checkLoadCompletion();
    };

    private onSecurityError = (param1: SecurityErrorEvent): void => {
        Logger.log("[HabbiconAssetManager] Security error while loading habbicon asset: " + param1.text);
        this.markLoadFailed();
    };

    private onCollectionSecurityError = (param1: SecurityErrorEvent): void => {
        let _loc2_: Loader = asInstanceOf(param1.currentTarget.loader, Loader);
        this.removeImageLoaderListeners(_loc2_, this.onCollectionSpritesheetLoaded, this.onCollectionLoadError, this.onCollectionSecurityError);
        Logger.log("[HabbiconAssetManager] Security error while loading habbicon collection icon asset: " + param1.text);
        this._collectionSheetLoaded = true;
        this.checkLoadCompletion();
    };

    private markLoadFailed(): void {
        this._isLoading = false;
        this._SafeStr_14268 = true;
    }

    private checkLoadCompletion(): void {
        if (this._jsonLoaded && this._sheetLoaded && this._collectionSheetLoaded) {
            this._isLoading = false;
            HabbiconAssetManager._events.dispatchEvent(new Event("habbicon_assets_loaded"));
        }
    }

    private buildDefinition(param1: any, param2: number, param3: number): HabbiconDefinition {
        let _loc5_: any[] = null;
        let _loc8_: any = null;
        let _loc7_: any[] = null;
        let _loc6_: boolean = false;
        let _loc4_: number = 1;
        _loc5_ = Array.isArray(param1.frameData) ? Array.isArray(param1.frameData) ? param1.frameData : null : [];
        _loc8_ = param1.animation;
        _loc7_ = _loc8_ != null && Array.isArray(_loc8_.steps) ? Array.isArray(_loc8_.steps) ? _loc8_.steps : null : [];
        if (_loc8_ != null && _loc8_.playbackSpeed != null) {
            _loc4_ = Number(_loc8_.playbackSpeed);
        }
        if (isNaN(_loc4_) || _loc4_ <= 0) {
            _loc4_ = 1;
        }
        _loc6_ = (param1.frameCount | 0) > 1 && _loc5_.length > 0 && _loc7_.length > 0;
        return new HabbiconDefinition(param2, param3, this.normalizeDirection(param1.dir), _loc6_, !!(param1 != null && param1.loop), this.buildRuntimeFrameDefinitions(_loc5_, param2, param3), this.buildRuntimeAnimationSteps(_loc7_, _loc4_));
    }

    private buildRuntimeFrameDefinitions(param1: any[], param2: number, param3: number): any[] {
        let _loc5_: any = null;
        let _loc4_: any[] = [];
        if (param1 == null) {
            return _loc4_;
        }
        for (_loc5_ of param1 ?? []) {
            if (_loc5_ != null) {
                _loc4_.push({ "id": _loc5_.id | 0, "x": _loc5_.x | 0, "y": _loc5_.y | 0, "width": this.normalizeDimension(_loc5_.width, param2), "height": this.normalizeDimension(_loc5_.height, param3) });
            }
        }
        _loc4_.sort((a, b) => a.id - b.id);
        return _loc4_;
    }

    private buildRuntimeAnimationSteps(param1: any[], param2: number): any[] {
        let _loc4_: any = null;
        let _loc5_: number = 0;
        let _loc3_: any[] = [];
        if (param1 == null) {
            return _loc3_;
        }
        for (_loc4_ of param1 ?? []) {
            if (_loc4_ != null) {
                if (_loc4_.enabled !== false) {
                    _loc5_ = Math.max(1, _loc4_.durationMs | 0) | 0;
                    _loc5_ = Math.max(1, _loc5_ / param2) | 0;
                    _loc3_.push({ "sourceFrame": Math.max(0, _loc4_.sourceFrame | 0), "durationMs": _loc5_ });
                }
            }
        }
        return _loc3_;
    }

    private buildFallbackRuntimeAsset(param1: number, param2: HabbiconDefinition): any {
        let _loc3_: BitmapData = this.resolvePreviewBitmap(param1, false);
        let _loc4_: BitmapData = this.resolvePreviewBitmap(param1, true);
        if (_loc3_ == null) {
            return null;
        }
        return { "animated": false, "loop": false, "direction": param2.direction, "baseWidth": _loc3_.width, "baseHeight": _loc3_.height, "frames": [{ "bitmap": _loc3_, "smallBitmap": _loc4_ ?? _loc3_, "width": _loc3_.width, "height": _loc3_.height }], "steps": [{ "sourceFrame": 0, "durationMs": 0 }], "playbackDurationMs": 0 };
    }

    private loadRuntimeAsset(param1: number, param2: HabbiconDefinition): void {
        let _loc3_: Loader = null;
        let _loc4_: string = null;
        if (param2 == null || !param2.animated || this._SafeStr_14278.get(param1) || this._SafeStr_14277.get(param1) != null) {
            return;
        }
        _loc4_ = this.refreshAssetRoot();
        if (_loc4_ == null || _loc4_ == "") {
            return;
        }
        this._SafeStr_14278.set(param1, true);
        _loc3_ = new Loader();
        _loc3_.name = String(param1);
        _loc3_.contentLoaderInfo.addEventListener("complete", this.onRuntimeSheetLoaded);
        _loc3_.contentLoaderInfo.addEventListener("ioError", this.onRuntimeLoadError);
        _loc3_.contentLoaderInfo.addEventListener("securityError", this.onRuntimeSecurityError);
        _loc3_.load(new URLRequest(_loc4_ + "animation/" + param1 + ".png"));
    }

    private onRuntimeSheetLoaded = (param1: Event): void => {
        let _loc3_: Loader = asInstanceOf(param1.currentTarget.loader, Loader);
        let _loc4_: Bitmap = _loc3_ != null ? asInstanceOf(_loc3_.content, Bitmap) : null;
        let _loc2_: number = _loc3_ != null ? Number(_loc3_.name) | 0 : 0;
        let _loc5_: HabbiconDefinition = asInstanceOf(this._SafeStr_14275.get(_loc2_), HabbiconDefinition);
        this.removeImageLoaderListeners(_loc3_, this.onRuntimeSheetLoaded, this.onRuntimeLoadError, this.onRuntimeSecurityError);
        this._SafeStr_14278.delete(_loc2_);
        if (_loc4_ == null || _loc4_.bitmapData == null || _loc5_ == null) {
            return;
        }
        this._SafeStr_14277.set(_loc2_, this.buildAnimatedRuntimeAsset(_loc5_, _loc4_.bitmapData));
    };

    private onRuntimeLoadError = (param1: IOErrorEvent): void => {
        let _loc2_: Loader = asInstanceOf(param1.currentTarget.loader, Loader);
        if (_loc2_ != null) {
            this.removeImageLoaderListeners(_loc2_, this.onRuntimeSheetLoaded, this.onRuntimeLoadError, this.onRuntimeSecurityError);
            this._SafeStr_14278.delete(Number(_loc2_.name) | 0);
        }
        Logger.log("[HabbiconAssetManager] Failed to load habbicon runtime asset: " + param1.text);
    };

    private onRuntimeSecurityError = (param1: SecurityErrorEvent): void => {
        let _loc2_: Loader = asInstanceOf(param1.currentTarget.loader, Loader);
        if (_loc2_ != null) {
            this.removeImageLoaderListeners(_loc2_, this.onRuntimeSheetLoaded, this.onRuntimeLoadError, this.onRuntimeSecurityError);
            this._SafeStr_14278.delete(Number(_loc2_.name) | 0);
        }
        Logger.log("[HabbiconAssetManager] Security error while loading habbicon runtime asset: " + param1.text);
    };

    private buildAnimatedRuntimeAsset(param1: HabbiconDefinition, param2: BitmapData): any {
        let _loc8_: any = null;
        let _loc5_: BitmapData = null;
        let _loc7_: BitmapData = null;
        let _loc6_: any = null;
        let _loc4_: any[] = [];
        let _loc3_: number = 0;
        if (param1 == null || param2 == null || param1.frames == null || param1.frames.length == 0) {
            return null;
        }
        for (_loc8_ of param1.frames ?? []) {
            _loc5_ = this.extractFrameBitmapFromSheet(param2, _loc8_);
            if (_loc5_ != null) {
                _loc7_ = BitmapHelper.resampleBitmapData(_loc5_, 0.5);
                _loc4_.push({ "bitmap": _loc5_, "smallBitmap": _loc7_, "width": _loc5_.width, "height": _loc5_.height });
            }
        }
        if (_loc4_.length == 0) {
            return null;
        }
        for (_loc6_ of param1.steps ?? []) {
            _loc3_ = _loc3_ + Math.max(1, _loc6_.durationMs | 0) | 0;
        }
        return { "animated": true, "loop": param1.loop, "direction": param1.direction, "baseWidth": param1.previewWidth, "baseHeight": param1.previewHeight, "frames": _loc4_, "steps": (param1.steps != null && param1.steps.length > 0 ? param1.steps : [{ "sourceFrame": 0, "durationMs": 0 }]), "playbackDurationMs": _loc3_ };
    }

    private extractFrameBitmap(param1: any): BitmapData {
        let _loc2_: Rectangle = null;
        let _loc3_: BitmapData = null;
        _loc2_ = this.createValidRect(param1.x | 0, param1.y | 0, param1.width | 0, param1.height | 0);
        if (_loc2_ == null) {
            return null;
        }
        _loc3_ = new BitmapData(_loc2_.width | 0, _loc2_.height | 0, true, 0);
        _loc3_.copyPixels(this._SafeStr_14279, _loc2_, new Point(0, 0), null, null, true);
        return _loc3_;
    }

    private extractFrameBitmapFromSheet(param1: BitmapData, param2: any): BitmapData {
        let _loc3_: Rectangle = null;
        let _loc4_: BitmapData = null;
        _loc3_ = this.createValidRectForSheet(param1, param2.x | 0, param2.y | 0, param2.width | 0, param2.height | 0);
        if (_loc3_ == null) {
            return null;
        }
        _loc4_ = new BitmapData(_loc3_.width | 0, _loc3_.height | 0, true, 0);
        _loc4_.copyPixels(param1, _loc3_, new Point(0, 0), null, null, true);
        return _loc4_;
    }

    private createValidRect(param1: number, param2: number, param3: number, param4: number): Rectangle {
        return this.createValidRectForSheet(this._SafeStr_14279, param1, param2, param3, param4);
    }

    private createValidRectForSheet(param1: BitmapData, param2: number, param3: number, param4: number, param5: number): Rectangle {
        let _loc6_: Rectangle = null;
        if (param1 == null) {
            return null;
        }
        _loc6_ = new Rectangle(param2, param1.height - param3 - param5, param4, param5);
        if (this.isRectWithinBitmap(param1, _loc6_)) {
            return _loc6_;
        }
        _loc6_ = new Rectangle(param2, param3, param4, param5);
        if (this.isRectWithinBitmap(param1, _loc6_)) {
            return _loc6_;
        }
        return null;
    }

    private isRectWithinBitmap(param1: BitmapData, param2: Rectangle): boolean {
        return param1 != null && param2.x >= 0 && param2.y >= 0 && param2.right <= param1.width && param2.bottom <= param1.height;
    }

    private normalizeDimension(param1: any, param2: number = 40): number {
        let _loc3_: number = param1 | 0;
        return _loc3_ > 0 ? _loc3_ : param2;
    }

    private normalizeDirection(param1: any): number {
        let _loc2_: number = 0;
        if (param1 == null) {
            return 0;
        }
        _loc2_ = param1 | 0;
        if (_loc2_ < 0) {
            return -1;
        }
        if (_loc2_ > 0) {
            return 1;
        }
        return 0;
    }

    private removeTextLoaderListeners(param1: URLLoader): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("complete", this.onMetadataLoaded);
        param1.removeEventListener("ioError", this.onLoadError);
        param1.removeEventListener("securityError", this.onSecurityError);
    }

    private removeImageLoaderListeners(param1: Loader, param2: (...args: any[]) => any = null, param3: (...args: any[]) => any = null, param4: (...args: any[]) => any = null): void {
        if (param1 == null || param1.contentLoaderInfo == null) {
            return;
        }
        param1.contentLoaderInfo.removeEventListener("complete", param2 ?? this.onSpritesheetLoaded);
        param1.contentLoaderInfo.removeEventListener("ioError", param3 ?? this.onLoadError);
        param1.contentLoaderInfo.removeEventListener("securityError", param4 ?? this.onSecurityError);
    }
}
