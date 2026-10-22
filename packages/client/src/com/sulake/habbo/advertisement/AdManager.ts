import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
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
import { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
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
    private static readonly OPAQUE_WHITE: number = 0xFFFFFFFF;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _catalog: IHabboCatalog;

    declare private _adWarningLeft: BitmapData;

    declare private _adWarningRight: BitmapData;

    declare private _billboardImageLoaders: UtilsMap;

    declare private _interstitialMessageEvent: IMessageEvent;

    constructor(context: IContext, flags: number = 0, assetLibrary: IAssetLibrary = null) {
        super(context, flags, assetLibrary);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (communicationManager: IHabboCommunicationManager): void => {
                this._communicationManager = communicationManager;
            }), new ComponentDependency(new IIDHabboConfigurationManager(), null), new ComponentDependency(new IIDSessionDataManager(), (sessionDataManager: ISessionDataManager): void => {
                this._sessionDataManager = sessionDataManager;
            }, false), new ComponentDependency(new IIDHabboCatalog(), (catalog: IHabboCatalog): void => {
                this._catalog = catalog;
            }, false)]);
    }

    protected override initComponent(): void {
        let request: URLRequest = null;
        let loader: AssetLoaderStruct = null;
        this._billboardImageLoaders = new UtilsMap();
        this._interstitialMessageEvent = this._communicationManager.addHabboConnectionMessageEvent(new InterstitialMessageEvent(this.onInterstitial));
        let adsDomain: string = this.getProperty("ads.domain");
        if (adsDomain != "") {
            Security.loadPolicyFile("http://" + adsDomain + "/crossdomain.xml");
        }
        let adWarningLeftUrl: string = this.getProperty("billboard.adwarning.left.url");
        let adWarningRightUrl: string = this.getProperty("billboard.adwarning.right.url");
        let imageLibraryUrl: string = this.getProperty("image.library.url");
        if (adWarningLeftUrl != "" && adWarningRightUrl != "") {
            adWarningLeftUrl = imageLibraryUrl + adWarningLeftUrl;
            adWarningRightUrl = imageLibraryUrl + adWarningRightUrl;
            request = new URLRequest(adWarningLeftUrl);
            loader = this.assets.loadAssetFromFile("adWarningL", request, "image/png");
            loader.addEventListener(AssetLoaderEvent.ASSET_LOADER_EVENT_COMPLETE, this.adWarningLeftReady);
            request = new URLRequest(adWarningRightUrl);
            loader = this.assets.loadAssetFromFile("adWarningRight", request, "image/png");
            loader.addEventListener(AssetLoaderEvent.ASSET_LOADER_EVENT_COMPLETE, this.adWarningRightReady);
        }
        if (ExternalInterface.available) {
            ExternalInterface.addCallback(AdManager.INTERSTITIAL_COMPLETE_CALLBACK, this.interstitialCompleteCallback);
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

    public interstitialCompleteCallback(status: string): void {
        this.events.dispatchEvent(new InterstitialEvent(InterstitialEvent.INTERSTITIAL_COMPLETE, status));
    }

    public loadRoomAdImage(roomId: number, objectId: number, objectCategory: number, imageUrl: string, clickUrl: string): void {
        let asset: IAsset = null;
        let bitmapData: BitmapData = null;
        if (imageUrl == null || imageUrl.length == 0) {
            return;
        }
        if (this.assets.hasAsset(imageUrl)) {
            asset = this.assets.getAssetByName(imageUrl);
            if (asset != null) {
                bitmapData = asInstanceOf(asset.content, BitmapData);
                if (bitmapData != null) {
                    this.dispatchImageAsset(bitmapData.clone(), roomId, objectId, objectCategory, imageUrl, clickUrl);
                }
            }
            return;
        }
        let pendingRequests: any[] = this._billboardImageLoaders.getValue(imageUrl);
        if (pendingRequests == null) {
            pendingRequests = [];
            this._billboardImageLoaders.add(imageUrl, pendingRequests);
        }
        if (pendingRequests.length > 0) {
            for (const pendingRequest of pendingRequests ?? []) {
                if (pendingRequest.roomId == roomId && pendingRequest.objectId == objectId && pendingRequest.objectCategory == objectCategory) {
                    return;
                }
            }
        }
        pendingRequests.push(new AdImageRequest(roomId, imageUrl, clickUrl, objectId, objectCategory));
        let request: URLRequest = new URLRequest(imageUrl);
        let loader: AssetLoaderStruct = this.assets.loadAssetFromFile(imageUrl, request, "image/png");
        loader.addEventListener(AssetLoaderEvent.ASSET_LOADER_EVENT_COMPLETE, this.onBillboardImageReady);
        loader.addEventListener(AssetLoaderEvent.ASSET_LOADER_EVENT_ERROR, this.onBillboardImageLoadError);
    }

    private onInterstitial(event: InterstitialMessageEvent): void {
        let parser: InterstitialMessageParser = event.getParser();
        if (parser && parser.canShowInterstitial) {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.showInterstitial");
                this.events.dispatchEvent(new InterstitialEvent(InterstitialEvent.INTERSTITIAL_SHOW));
            } else {
                this.noInterstitialAvailable();
            }
        } else {
            this.noInterstitialAvailable();
        }
    }

    private noInterstitialAvailable(): void {
        if (this.events != null) {
            this.events.dispatchEvent(new InterstitialEvent(InterstitialEvent.INTERSTITIAL_NOT_SHOWN));
        }
    }

    private emulateBackgroundTransparency(source: BitmapData): BitmapData {
        if (source == null) {
            return null;
        }
        let pixel: number = 0;
        let result: BitmapData = new BitmapData(source.width, source.height, true, 0);
        for (let y: number = 0; y < result.height; y++) {
            for (let x: number = 0; x < result.width; x++) {
                pixel = source.getPixel32(x, y);
                if (pixel != AdManager.OPAQUE_WHITE) {
                    result.setPixel32(x, y, pixel);
                }
            }
        }
        return result;
    }

    private isValidAdImage(bitmap: Bitmap): boolean {
        return bitmap != null && bitmap.bitmapData != null && (bitmap.width > 1 || bitmap.height > 1);
    }

    private dispatchImageAsset(image: BitmapData, roomId: number, objectId: number, objectCategory: number, imageUrl: string, clickUrl: string): void {
        if (this.events != null) {
            this.events.dispatchEvent(new AdEvent(AdEvent.ROOM_AD_IMAGE_LOADED, roomId, image, imageUrl, clickUrl, null, null, objectId, objectCategory));
        }
    }

    private adWarningLeftReady(event: AssetLoaderEvent): void {
        let loader: AssetLoaderStruct = asInstanceOf(event.target, AssetLoaderStruct);
        let bitmap: Bitmap = asInstanceOf(loader.assetLoader.content, Bitmap);
        if (bitmap != null) {
            this._adWarningLeft = this.emulateBackgroundTransparency(bitmap.bitmapData);
        }
    }

    private adWarningRightReady(event: AssetLoaderEvent): void {
        let loader: AssetLoaderStruct = asInstanceOf(event.target, AssetLoaderStruct);
        let bitmap: Bitmap = asInstanceOf(loader.assetLoader.content, Bitmap);
        if (bitmap != null) {
            this._adWarningRight = this.emulateBackgroundTransparency(bitmap.bitmapData);
        }
    }

    private onBillboardImageReady(event: AssetLoaderEvent): void {
        let bitmapData: BitmapData = null;
        let loader: AssetLoaderStruct = asInstanceOf(event.target, AssetLoaderStruct);
        let bitmap: Bitmap = asInstanceOf(loader.assetLoader.content, Bitmap);
        let pendingRequests: any[] = this._billboardImageLoaders.remove(loader.assetName);
        if (pendingRequests == null || pendingRequests.length == 0) {
            return;
        }
        if (this.isValidAdImage(bitmap)) {
            bitmapData = bitmap.bitmapData;
            if (bitmapData != null) {
                for (const pendingRequest of pendingRequests ?? []) {
                    this.dispatchImageAsset(bitmapData.clone(), pendingRequest.roomId, pendingRequest.objectId, pendingRequest.objectCategory, pendingRequest.imageURL, pendingRequest.clickURL);
                }
            }
        }
    }

    private onBillboardImageLoadError(event: AssetLoaderEvent): void {
        let loader: AssetLoaderStruct = asInstanceOf(event.target, AssetLoaderStruct);
        let pendingRequests: any[] = this._billboardImageLoaders.remove(loader.assetName);
        if (pendingRequests == null || pendingRequests.length == 0) {
            return;
        }
        for (const pendingRequest of pendingRequests ?? []) {
            this.dispatchImageAsset(null, pendingRequest.roomId, pendingRequest.objectId, pendingRequest.objectCategory, pendingRequest.imageURL, pendingRequest.clickURL);
        }
    }

    protected override initInstanceFields(): void {
        this.interstitialCompleteCallback = this.interstitialCompleteCallback.bind(this);
        this.onInterstitial = this.onInterstitial.bind(this);
        this.adWarningLeftReady = this.adWarningLeftReady.bind(this);
        this.adWarningRightReady = this.adWarningRightReady.bind(this);
        this.onBillboardImageReady = this.onBillboardImageReady.bind(this);
        this.onBillboardImageLoadError = this.onBillboardImageLoadError.bind(this);
        this._adWarningLeft = null;
        this._adWarningRight = null;
        super.initInstanceFields();
    }
}
