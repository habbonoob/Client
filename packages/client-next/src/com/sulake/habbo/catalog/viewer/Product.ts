import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { BadgeImageReadyEvent } from '@/com/sulake/habbo/session/events/BadgeImageReadyEvent';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { ProductContainer } from '@/com/sulake/habbo/catalog/viewer/ProductContainer.group';
import { ProductGridItem } from '@/com/sulake/habbo/catalog/viewer/ProductGridItem';
import { BundleGridViewCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/BundleGridViewCatalogWidget';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';

export class Product extends ProductGridItem implements IProduct, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::Product'); }

    public static readonly EFFECT_CLASSID_NINJA_DISAPPEAR: number = 108;

    declare private _productType: string;

    declare private _productClassId: number;
    static { (this.prototype as any)._productClassId = 0; }

    declare private _extraParam: string;

    declare private _productCount: number;
    static { (this.prototype as any)._productCount = 0; }

    declare private _productData: IProductData;

    declare private _furnitureData: IFurnitureData;

    declare private _SafeStr_6906: boolean;
    static { (this.prototype as any)._SafeStr_6906 = false; }

    declare private _uniqueLimitedItemSeriesSize: number;
    static { (this.prototype as any)._uniqueLimitedItemSeriesSize = 0; }

    declare private _uniqueLimitedItemsLeft: number;
    static { (this.prototype as any)._uniqueLimitedItemsLeft = 0; }

    declare private _SafeStr_2499: IProductContainer;

    constructor(param1: string, param2: number, param3: string, param4: number, param5: IProductData, param6: IFurnitureData, param7: HabboCatalog, param8: boolean = false, param9: number = 0, param10: number = 0) {
        super(param7);
        this._productType = param1;
        this._productClassId = param2;
        this._extraParam = param3;
        this._productCount = param4;
        this._productData = param5;
        this._furnitureData = param6;
        this._SafeStr_6906 = param8;
        this._uniqueLimitedItemSeriesSize = param9;
        this._uniqueLimitedItemsLeft = param10;
    }

    public static stripAddonProducts(param1: IProduct[]): IProduct[] {
        let _loc2_: any = null;
        if (param1.length == 1) {
            return param1;
        }
        let _loc3_: IProduct[] = new Array<IProduct>(0).fill(null);
        for (_loc2_ of param1 ?? []) {
            if (_loc2_.productType != "b" && !(_loc2_.productType == "e" && _loc2_.productClassId == 108) && _loc2_.productType != "chat_style") {
                _loc3_.push(_loc2_);
            }
        }
        return _loc3_;
    }

    public get productType(): string {
        return this._productType;
    }

    public get productClassId(): number {
        return this._productClassId;
    }

    public set extraParam(param1: string) {
        this._extraParam = param1;
    }

    public get extraParam(): string {
        return this._extraParam;
    }

    public get productCount(): number {
        return this._productCount;
    }

    public get productData(): IProductData {
        return this._productData;
    }

    public get furnitureData(): IFurnitureData {
        return this._furnitureData;
    }

    public get isUniqueLimitedItem(): boolean {
        return this._SafeStr_6906;
    }

    public get uniqueLimitedItemSeriesSize(): number {
        return this._uniqueLimitedItemSeriesSize;
    }

    public get uniqueLimitedItemsLeft(): number {
        return this._uniqueLimitedItemsLeft;
    }

    public set uniqueLimitedItemsLeft(param1: number) {
        this._uniqueLimitedItemsLeft = param1;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._productType = "";
        this._productClassId = 0;
        this._extraParam = "";
        this._productCount = 0;
        this._productData = null;
        this._furnitureData = null;
        if (this.catalog && this.catalog.sessionDataManager) {
            this.catalog.sessionDataManager.events.removeEventListener("BIRE_BADGE_IMAGE_READY", this.onBadgeImageReady);
        }
        HabbiconAssetManager.removeEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
        super.dispose();
    }

    public initIcon(param1: IProductContainer, param2: IGetImageListener = null, param3: IAvatarImageListener = null, param4: IPurchasableOffer = null, param5: IBitmapWrapperWindow = null, param6: IStuffData = null, param7: (...args: any[]) => any = null): BitmapData {
        let _loc10_: IRoomEngine = null;
        let _loc8_: ImageResult = null;
        let _loc11_: string = null;
        if (this.disposed) {
            return null;
        }
        let _loc9_: BitmapData = null;
        if (param2 == null) {
            param2 = this;
        }
        if (param1 instanceof BundleGridViewCatalogWidget) {
            _loc10_ = (param1 instanceof BundleGridViewCatalogWidget ? param1 : null).offer.page.viewer.roomEngine;
        } else {
            _loc10_ = (param1 instanceof ProductContainer ? param1 : null).offer.page.viewer.roomEngine;
        }
        if (!_loc10_ || !this.catalog) {
            return null;
        }
        switch (this._productType) {
            case "s":
                _loc8_ = _loc10_.getFurnitureIcon(this.productClassId, param2, null, param6);
                break;
            case "i":
                if (param4 && this._furnitureData) {
                    _loc11_ = "";
                    switch (this._furnitureData.className) {
                        case "floor":
                            _loc11_ = ["th", this._furnitureData.className, param4.product.extraParam].join("_");
                            break;
                        case "wallpaper":
                            _loc11_ = ["th", "wall", param4.product.extraParam].join("_");
                            break;
                        case "landscape":
                            _loc11_ = ["th", this._furnitureData.className, param4.product.extraParam.replace(".", "_"), "001"].join("_");
                            break;
                        default:
                            _loc8_ = _loc10_.getWallItemIcon(this.productClassId, param2, this._extraParam);
                    }
                    this.catalog.setImageFromAsset(param5, _loc11_, param7);
                } else {
                    _loc8_ = _loc10_.getWallItemIcon(this.productClassId, param2, this._extraParam);
                }
                break;
            case "e":
                _loc9_ = this.catalog.getPixelEffectIcon(this.productClassId);
                if (param2 == this) {
                    this.setIconImage(_loc9_, true);
                }
                break;
            case "h":
                _loc9_ = this.catalog.getSubscriptionProductIcon(this.productClassId);
                break;
            case "b":
                this.catalog.sessionDataManager.events.addEventListener("BIRE_BADGE_IMAGE_READY", this.onBadgeImageReady);
                _loc9_ = this.catalog.sessionDataManager.getBadgeImage(this._extraParam);
                this._SafeStr_2499 = param1;
                break;
            case "r":
                _loc9_ = this.renderAvatarImage(this._extraParam, param3);
                this.setIconImage(_loc9_, false);
                break;
            case "chat_style":
                _loc9_ = this.catalog.freeFlowChat.chatStyleLibrary.getStyle(Number(this._extraParam) | 0).selectorPreview.clone();
                break;
            case "habbicon":
                _loc9_ = this.getHabbiconPreviewBitmap();
                if (_loc9_ == null) {
                    HabbiconAssetManager.addEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
                    _loc9_ = new BitmapData(40, 40, false, 9408399);
                }
                if (param2 == this) {
                    this.setIconImage(_loc9_, true);
                }
                break;
            default:
                Logger.log("[Product] Can not yet handle this type of product: " + this.productType);
        }
        if (_loc8_ != null) {
            _loc9_ = _loc8_.data;
            if (param2 == this) {
                this.setIconImage(_loc9_, true);
            }
        }
        return _loc9_;
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (!this.disposed) {
            this.setIconImage(param2, true);
        }
    }

    public imageFailed(param1: number): void {
    }

    private onBadgeImageReady = (param1: BadgeImageReadyEvent): void => {
        if (!this.disposed) {
            if (this._productType == "b" && param1.badgeId == this._extraParam) {
                castTo(this._SafeStr_2499, ProductGridItem).setIconImage(param1.badgeImage, false);
                if (this.catalog && this.catalog.sessionDataManager) {
                    this.catalog.sessionDataManager.events.removeEventListener("BIRE_BADGE_IMAGE_READY", this.onBadgeImageReady);
                }
            }
        }
    };

    private onHabbiconAssetsLoaded = (param1: Event): void => {
        if (this.disposed || this._productType != "habbicon") {
            return;
        }
        let _loc2_: BitmapData = this.getHabbiconPreviewBitmap();
        if (_loc2_ != null) {
            this.setIconImage(_loc2_, true);
            HabbiconAssetManager.removeEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
        }
    };

    private getHabbiconPreviewBitmap(): BitmapData {
        let _loc1_: BitmapData = HabbiconAssetManager.getPreviewBitmap(Number(this._extraParam) | 0, false);
        return _loc1_ != null ? _loc1_.clone() : null;
    }

    public get isColorable(): boolean {
        if (this._furnitureData && this._furnitureData.fullName) {
            return this._furnitureData.fullName.indexOf("*") != -1;
        }
        return false;
    }

    public override set view(param1: IWindowContainer) {
        let _loc2_: IWindow = null;
        let _loc3_: ITextWindow = null;
        if (!param1) {
            return;
        }
        super.view = param1;
        if (this._productCount > 1) {
            _loc2_ = this._view.findChildByName("multiContainer");
            if (_loc2_) {
                _loc2_.visible = true;
            }
            _loc3_ = asGuarded(this._view.findChildByName("multiCounter"), isITextWindow);
            if (_loc3_) {
                _loc3_.text = "x" + this.productCount;
            }
        }
    }

    public override get view(): IWindowContainer {
        return super.view;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
