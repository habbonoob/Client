import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IAdManager } from '@/com/sulake/habbo/advertisement/IAdManager';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { InterstitialMessageParser } from '@/com/sulake/habbo/communication/messages/parser/advertisement/InterstitialMessageParser';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { Security } from '@habbo-pixi/runtime/system/Security';
import { AssetLoaderStruct, Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AdImageRequest } from '@/com/sulake/habbo/advertisement/AdImageRequest';
import { AdEvent } from '@/com/sulake/habbo/advertisement/events/AdEvent';
import { InterstitialEvent } from '@/com/sulake/habbo/advertisement/events/InterstitialEvent';
import { InterstitialMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/advertisement/InterstitialMessageEvent';
import { GetInterstitialMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/advertisement/GetInterstitialMessageComposer';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class AdManager extends Component implements IAdManager {
    static { registerClassName(this, 'com.sulake.habbo.advertisement::AdManager'); }

    private static readonly INTERSTITIAL_COMPLETE_CALLBACK: string = "interstitialCompleted";

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _catalog: IHabboCatalog;

    declare private _adWarningLeft: BitmapData;

    declare private _adWarningRight: BitmapData;

    declare private _billboardImageLoaders: UtilsMap;

    declare private _interstitialMessageEvent: IMessageEvent;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }), new ComponentDependency(new IIDHabboConfigurationManager(), null), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }, false), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }, false)]);
    }

    protected override initComponent(): void {
        let _loc1_: URLRequest = null;
        let _loc2_: AssetLoaderStruct = null;
        this._billboardImageLoaders = new UtilsMap();
        this._interstitialMessageEvent = this._communicationManager.addHabboConnectionMessageEvent(new InterstitialMessageEvent(this.onInterstitial));
        let _loc6_: string = this.getProperty("ads.domain");
        if (_loc6_ != "") {
            Security.loadPolicyFile("http://" + _loc6_ + "/crossdomain.xml");
        }
        let _loc3_: string = this.getProperty("billboard.adwarning.left.url");
        let _loc4_: string = this.getProperty("billboard.adwarning.right.url");
        let _loc5_: string = this.getProperty("image.library.url");
        if (_loc3_ != "" && _loc4_ != "") {
            _loc3_ = _loc5_ + _loc3_;
            _loc4_ = _loc5_ + _loc4_;
            _loc1_ = new URLRequest(_loc3_);
            _loc2_ = this.assets.loadAssetFromFile("adWarningL", _loc1_, "image/png");
            _loc2_.addEventListener("AssetLoaderEventComplete", this.adWarningLeftReady);
            _loc1_ = new URLRequest(_loc4_);
            _loc2_ = this.assets.loadAssetFromFile("adWarningRight", _loc1_, "image/png");
            _loc2_.addEventListener("AssetLoaderEventComplete", this.adWarningRightReady);
        }
        if (ExternalInterface.available) {
            ExternalInterface.addCallback("interstitialCompleted", this.interstitialCompleteCallback);
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._billboardImageLoaders != null) {
            this._billboardImageLoaders.dispose();
            this._billboardImageLoaders = null;
        }
        if (this._communicationManager != null) {
            this._communicationManager.removeHabboConnectionMessageEvent(this._interstitialMessageEvent);
            this._interstitialMessageEvent = null;
        }
        if (this._adWarningLeft) {
            this._adWarningLeft.dispose();
            this._adWarningLeft = null;
        }
        if (this._adWarningRight) {
            this._adWarningRight.dispose();
            this._adWarningRight = null;
        }
        super.dispose();
    }

    public showInterstitial(): void {
        if (!this.getBoolean("interstitials.2016.enabled")) {
            this.noInterstitialAvailable();
            return;
        }
        this._communicationManager.connection.send(new GetInterstitialMessageComposer());
    }

    private onInterstitial(param1: InterstitialMessageEvent): void {
        let _loc2_: InterstitialMessageParser = param1.getParser();
        if (_loc2_ && _loc2_.canShowInterstitial) {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.showInterstitial");
                this.events.dispatchEvent(new InterstitialEvent("AE_INTERSTITIAL_SHOW"));
            } else {
                this.noInterstitialAvailable();
            }
        } else {
            this.noInterstitialAvailable();
        }
    }

    private noInterstitialAvailable(): void {
        if (this.events != null) {
            this.events.dispatchEvent(new InterstitialEvent("AE_INTERSTITIAL_NOT_SHOWN"));
        }
    }

    public interstitialCompleteCallback(param1: string): void {
        this.events.dispatchEvent(new InterstitialEvent("AE_INTERSTITIAL_COMPLETE", param1));
    }

    private adWarningLeftReady(param1: AssetLoaderEvent): void {
        let _loc3_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        let _loc2_: Bitmap = asInstanceOf(_loc3_.assetLoader.content, Bitmap);
        if (_loc2_ != null) {
            this._adWarningLeft = this.emulateBackgroundTransparency(_loc2_.bitmapData);
        }
    }

    private adWarningRightReady(param1: AssetLoaderEvent): void {
        let _loc3_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        let _loc2_: Bitmap = asInstanceOf(_loc3_.assetLoader.content, Bitmap);
        if (_loc2_ != null) {
            this._adWarningRight = this.emulateBackgroundTransparency(_loc2_.bitmapData);
        }
    }

    private emulateBackgroundTransparency(param1: BitmapData): BitmapData {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc3_: any = 0;
        if (param1 == null) {
            return null;
        }
        let _loc2_: BitmapData = new BitmapData(param1.width, param1.height, true, 0);
        _loc4_ = 0;
        while (_loc4_ < _loc2_.height) {
            _loc5_ = 0;
            while (_loc5_ < _loc2_.width) {
                _loc3_ = param1.getPixel32(_loc5_, _loc4_);
                if (_loc3_ != 4294967295) {
                    _loc2_.setPixel32(_loc5_, _loc4_, _loc3_ >>> 0);
                }
                _loc5_++;
            }
            _loc4_++;
        }
        return _loc2_;
    }

    private isValidAdImage(param1: Bitmap): boolean {
        if (param1 != null && param1.bitmapData != null && (param1.width > 1 || param1.height > 1)) {
            return true;
        }
        return false;
    }

    public loadRoomAdImage(param1: number, param2: number, param3: number, param4: string, param5: string): void {
        let _loc10_: IAsset = null;
        let _loc11_: BitmapData = null;
        if (param4 == null || param4.length == 0) {
            return;
        }
        if (this.assets.hasAsset(param4)) {
            _loc10_ = this.assets.getAssetByName(param4);
            if (_loc10_ != null) {
                _loc11_ = asInstanceOf(_loc10_.content, BitmapData);
                if (_loc11_ != null) {
                    this.dispatchImageAsset(_loc11_.clone(), param1, param2, param3, param4, param5);
                }
            }
            return;
        }
        let _loc9_: any[] = this._billboardImageLoaders.getValue(param4);
        if (_loc9_ == null) {
            _loc9_ = [];
            this._billboardImageLoaders.add(param4, _loc9_);
        }
        if (_loc9_.length > 0) {
            for (const _loc7_ of _loc9_ ?? []) {
                if (_loc7_.roomId == param1 && _loc7_.objectId == param2 && _loc7_.objectCategory == param3) {
                    return;
                }
            }
        }
        _loc9_.push(new AdImageRequest(param1, param4, param5, param2, param3));
        let _loc6_: URLRequest = new URLRequest(param4);
        let _loc8_: AssetLoaderStruct = this.assets.loadAssetFromFile(param4, _loc6_, "image/png");
        _loc8_.addEventListener("AssetLoaderEventComplete", this.onBillboardImageReady);
        _loc8_.addEventListener("AssetLoaderEventError", this.onBillboardImageLoadError);
    }

    private onBillboardImageReady(param1: AssetLoaderEvent): void {
        let _loc4_: BitmapData = null;
        let _loc5_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        let _loc2_: Bitmap = asInstanceOf(_loc5_.assetLoader.content, Bitmap);
        let _loc6_: any[] = this._billboardImageLoaders.remove(_loc5_.assetName);
        if (_loc6_ == null || _loc6_.length == 0) {
            return;
        }
        if (this.isValidAdImage(_loc2_)) {
            _loc4_ = _loc2_.bitmapData;
            if (_loc4_ != null) {
                for (const _loc3_ of _loc6_ ?? []) {
                    this.dispatchImageAsset(_loc4_.clone(), _loc3_.roomId | 0, _loc3_.objectId | 0, _loc3_.objectCategory | 0, stringOrNull(_loc3_.imageURL), stringOrNull(_loc3_.clickURL));
                }
            }
        }
    }

    private dispatchImageAsset(param1: BitmapData, param2: number, param3: number, param4: number, param5: string, param6: string): void {
        if (this.events != null) {
            this.events.dispatchEvent(new AdEvent("AE_ROOM_AD_IMAGE_LOADED", param2, param1, param5, param6, null, null, param3, param4));
        }
    }

    private onBillboardImageLoadError(param1: AssetLoaderEvent): void {
        let _loc3_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        let _loc4_: any[] = this._billboardImageLoaders.remove(_loc3_.assetName);
        if (_loc4_ == null || _loc4_.length == 0) {
            return;
        }
        for (const _loc2_ of _loc4_ ?? []) {
            this.dispatchImageAsset(null, _loc2_.roomId | 0, _loc2_.objectId | 0, _loc2_.objectCategory | 0, stringOrNull(_loc2_.imageURL), stringOrNull(_loc2_.clickURL));
        }
    }

    protected override initInstanceFields(): void {
        this.onInterstitial = this.onInterstitial.bind(this);
        this.interstitialCompleteCallback = this.interstitialCompleteCallback.bind(this);
        this.adWarningLeftReady = this.adWarningLeftReady.bind(this);
        this.adWarningRightReady = this.adWarningRightReady.bind(this);
        this.onBillboardImageReady = this.onBillboardImageReady.bind(this);
        this.onBillboardImageLoadError = this.onBillboardImageLoadError.bind(this);
        this._adWarningLeft = null;
        this._adWarningRight = null;
        super.initInstanceFields();
    }
}
