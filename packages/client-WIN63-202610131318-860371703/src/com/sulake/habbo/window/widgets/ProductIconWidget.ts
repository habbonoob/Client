import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import type { IPetImageWidget } from '@/com/sulake/habbo/window/widgets/IPetImageWidget';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import { ProductIconUtil } from '@/com/sulake/habbo/window/utils/ProductIconUtil';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { isIPetImageWidget } from '@/com/sulake/habbo/window/widgets/IPetImageWidget';
import { IProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';

export class ProductIconWidget implements IProductIconWidget, IGetImageListener, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::ProductIconWidget'); }

    public static readonly TYPE: string = "product_icon";

    declare private _SafeStr_3955: number;
    static { (this.prototype as any)._SafeStr_3955 = NaN; }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_5386: IProductDisplayInfo;

    declare private _blend: number;
    static { (this.prototype as any)._blend = NaN; }

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = castGuarded(this._windowManager.buildFromXML(XML.from(this._windowManager.assets.getAssetByName("product_icon_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2293.rootWindow = this._root;
        this.clearPreviewer();
    }

    public set productInfo(param1: IProductDisplayInfo) {
        this._SafeStr_5386 = param1;
        this.previewImage(param1);
    }

    public get productInfo(): IProductDisplayInfo {
        return this._SafeStr_5386;
    }

    public get properties(): any[] {
        return [];
    }

    public set properties(param1: any[]) {
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public previewImage(param1: IProductDisplayInfo): void {
        let _loc3_: IFurnitureData = null;
        _loc3_ = null;
        let _loc4_: number = 0;
        let _loc2_: ImageResult = null;
        let _loc5_: number = 0;
        _loc2_ = null;
        let _loc7_: number = 0;
        let _loc6_: number = 0;
        if (param1 == null) {
            this.setUnknownImage();
            return;
        }
        switch (param1.productTypeId - -1) {
            case 0:
                this.setUnknownImage();
                break;
            case 1:
                _loc3_ = this._windowManager.sessionDataManager.getWallItemData(parseInt(param1.itemTypeId) | 0);
                if (_loc3_ == null) {
                    this.clearPreviewer();
                    break;
                }
                _loc4_ = ProductIconUtil.categoryMapping("I", _loc3_.id);
                if (_loc4_ == 1) {
                    this.imageResult = this._windowManager.roomEngine.getWallItemIcon(_loc3_.id, this, param1.extraData);
                    break;
                }
                this.clearPreviewer();
                break;
            case 2:
            case 12:
                _loc3_ = this._windowManager.sessionDataManager.getFloorItemData(parseInt(param1.itemTypeId) | 0);
                if (_loc3_ == null) {
                    this.clearPreviewer();
                    break;
                }
                this.imageResult = this._windowManager.roomEngine.getFurnitureIcon(_loc3_.id, this);
                break;
            case 3:
                _loc2_ = new ImageResult();
                _loc2_.data = this._windowManager.catalog.getPixelEffectIcon(parseInt(param1.itemTypeId) | 0);
                this.imageResult = _loc2_;
                break;
            case 5:
                this.badgeResult = param1.itemTypeId;
                break;
            case 7:
                this.botResult = param1.botFigureString;
                break;
            case 9:
                _loc7_ = parseInt(param1.itemTypeId) | 0;
                _loc6_ = ActivityPointTypeEnum.getIconStyleFor(_loc7_, this._windowManager.context.configuration, true);
                if (_loc6_ == 0) {
                    this.clearPreviewer();
                    break;
                }
                this.iconResult = _loc6_;
                break;
            case 10:
                _loc5_ = parseInt(param1.itemTypeId) | 0;
                _loc2_ = new ImageResult();
                _loc2_.data = this._windowManager.freeFlowChat.chatStyleLibrary.getStyle(_loc5_).selectorPreview;
                this.imageResult = _loc2_;
                break;
            case 11:
                this.petResult = param1.petFigureString;
                break;
            case 13:
                this.habbiconResult = parseInt(param1.itemTypeId) | 0;
                break;
            default:
                Logger.log("[ProductIconWidget] Can not yet handle this type of product: ");
                this.clearPreviewer();
        }
    }

    public clearPreviewer(): void {
        this._SafeStr_3955 = -1;
        this.productPreviewBitmap.visible = false;
        this.badgeImageWidget.visible = false;
        this.petImageWidget.visible = false;
        this.unknownImageWindow.visible = false;
        this.iconWindow.visible = false;
        HabbiconAssetManager.removeEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
    }

    private set imageResult(param1: ImageResult) {
        this.clearPreviewer();
        if (param1 != null) {
            this._SafeStr_3955 = param1.id;
            this.setPreviewImage(param1.data);
        }
    }

    private set badgeResult(param1: string) {
        this.clearPreviewer();
        this.badgeImageWidget.visible = true;
        let _loc2_: IBadgeImageWidget = asGuarded(this.badgeImageWidget.widget, isIBadgeImageWidget);
        _loc2_.badgeId = param1;
    }

    private set petResult(param1: string) {
        this.clearPreviewer();
        this.petImageWidget.visible = true;
        let _loc2_: IPetImageWidget = asGuarded(this.petImageWidget.widget, isIPetImageWidget);
        _loc2_.figure = param1;
    }

    private set botResult(param1: string) {
        this.clearPreviewer();
        if (param1 == null || param1.length == 0 || this._windowManager.avatarRenderer == null) {
            this.setUnknownImage();
            return;
        }
        let _loc3_: IAvatarImage = this._windowManager.avatarRenderer.createAvatarImage(param1, "h", null, this);
        if (_loc3_ == null) {
            this.setUnknownImage();
            return;
        }
        _loc3_.setDirection("head", 3);
        let _loc2_: BitmapData = _loc3_.getCroppedImage("head");
        _loc3_.dispose();
        if (_loc2_ == null) {
            this.setUnknownImage();
            return;
        }
        this.setPreviewImage(_loc2_);
        _loc2_.dispose();
    }

    private setUnknownImage(): void {
        this.clearPreviewer();
        this.unknownImageWindow.visible = true;
    }

    private setPreviewImage(param1: BitmapData): void {
        if (this.productPreviewBitmap == null) {
            return;
        }
        if (param1 == null) {
            this.productPreviewBitmap.visible = false;
            return;
        }
        this.productPreviewBitmap.bitmap = param1.clone();
        this.productPreviewBitmap.visible = true;
    }

    private set iconResult(param1: number) {
        this.clearPreviewer();
        this.iconWindow.visible = true;
        this.iconWindow.style = param1 >>> 0;
        this.iconWindow.fitToSize();
    }

    private set habbiconResult(param1: number) {
        let _loc3_: BitmapData = null;
        this.clearPreviewer();
        let _loc2_: BitmapData = HabbiconAssetManager.getPreviewBitmap(param1, false);
        if (_loc2_ == null) {
            HabbiconAssetManager.addEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
            _loc3_ = new BitmapData(40, 40, false, 9408399);
            this.setPreviewImage(_loc3_);
            _loc3_.dispose();
            return;
        }
        this.setPreviewImage(_loc2_);
    }

    private onHabbiconAssetsLoaded = (param1: Event): void => {
        HabbiconAssetManager.removeEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
        if (this._SafeStr_5386 == null || this._SafeStr_5386.productTypeId != 12) {
            return;
        }
        let _loc2_: BitmapData = HabbiconAssetManager.getPreviewBitmap(parseInt(this._SafeStr_5386.itemTypeId) | 0, false);
        if (_loc2_ == null) {
            return;
        }
        this.setPreviewImage(_loc2_);
    };

    public imageReady(param1: number, param2: BitmapData): void {
        if (this._SafeStr_3955 == param1 && this.productPreviewBitmap != null) {
            this.setPreviewImage(param2);
        }
    }

    public imageFailed(param1: number): void {
    }

    public avatarImageReady(param1: string): void {
        if (!this._disposed && this._SafeStr_5386 != null && this._SafeStr_5386.productTypeId == 6 && this._SafeStr_5386.botFigureString == param1) {
            this.botResult = param1;
        }
    }

    public set unknownImageUri(param1: string) {
        this.unknownImageWindow.assetUri = param1;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._SafeStr_3955 = -1;
        HabbiconAssetManager.removeEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get productPreviewBitmap(): IBitmapWrapperWindow {
        return asGuarded(this._root.findChildByName("bitmap"), isIBitmapWrapperWindow);
    }

    private get badgeImageWidget(): IWidgetWindow {
        return asGuarded(this._root.findChildByName("badge_image_widget"), isIWidgetWindow);
    }

    private get petImageWidget(): IWidgetWindow {
        return asGuarded(this._root.findChildByName("pet_image_widget"), isIWidgetWindow);
    }

    private get unknownImageWindow(): IStaticBitmapWrapperWindow {
        return asGuarded(this._root.findChildByName("unknown_image"), isIStaticBitmapWrapperWindow);
    }

    private get iconWindow(): IIconWindow {
        return asGuarded(this._root.findChildByName("icon"), isIIconWindow);
    }

    public set blend(param1: number) {
        this._blend = param1;
        this.productPreviewBitmap.blend = this.blend;
        this.unknownImageWindow.blend = this.blend;
        this.badgeImageWidget.blend = this.blend;
        this.petImageWidget.blend = this.blend;
        (asGuarded(this.petImageWidget.widget, isIPetImageWidget)).refresh();
        (asGuarded(this.badgeImageWidget.widget, isIBadgeImageWidget)).refresh();
    }

    public get blend(): number {
        return this._blend;
    }

    get [IProductIconWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
