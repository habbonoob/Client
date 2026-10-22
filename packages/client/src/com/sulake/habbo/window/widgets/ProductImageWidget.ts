import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IPropertyMap } from '@/com/sulake/core/window/theme/IPropertyMap';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import type { IPetImageWidget } from '@/com/sulake/habbo/window/widgets/IPetImageWidget';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { PivotPoint } from '@/com/sulake/core/window/enum/PivotPoint';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import { EffectPreviewer } from '@/com/sulake/habbo/window/utils/EffectPreviewer';
import { ProductIconUtil } from '@/com/sulake/habbo/window/utils/ProductIconUtil';
import { BadgeImageWidget } from '@/com/sulake/habbo/window/widgets/BadgeImageWidget';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { isIPetImageWidget } from '@/com/sulake/habbo/window/widgets/IPetImageWidget';
import { IProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class ProductImageWidget implements IProductImageWidget, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::ProductImageWidget'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        ProductImageWidget.#initStatics();
        return ProductImageWidget._log;
    }

    public static readonly TYPE: string = "product_image";

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = castGuarded(this._windowManager.buildFromXML(XML.from(this._windowManager.assets.getAssetByName("product_image_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3084 = new EffectPreviewer(this.effectImageWidget, param2.avatarRenderer);
        this._SafeStr_2293.rootWindow = this._root;
        this._root.width = this._SafeStr_2293.width;
        this._root.height = this._SafeStr_2293.height;
        this.setPlaceholder();
    }

    declare private _SafeStr_3955: number;
    static { (this.prototype as any)._SafeStr_3955 = NaN; }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _SafeStr_3084: EffectPreviewer;

    declare private _root: IWindowContainer;

    declare private _SafeStr_5386: IProductDisplayInfo;

    declare private _SafeStr_3717: number;
    static { (this.prototype as any)._SafeStr_3717 = 0; }

    private _blend: number = 1;
    private _SafeStr_6247: number = -1;
    private _SafeStr_6627: string = "";
    private _SafeStr_2864: number = 0;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get productInfo(): IProductDisplayInfo {
        return this._SafeStr_5386;
    }

    public set productInfo(param1: IProductDisplayInfo) {
        this._SafeStr_5386 = param1;
        this.previewImage(param1);
    }

    public get properties(): any[] {
        let _loc2_: any[] = [];
        if (this._disposed) {
            return _loc2_;
        }
        let _loc1_: IPropertyMap = this._windowManager.getThemeManager().getPropertyDefaults(this._SafeStr_2293.style);
        _loc2_.push(_loc1_._SafeStr_2119("pivot_point").withValue(PivotPoint.PIVOT_NAMES[this._SafeStr_3717]));
        return _loc2_;
    }

    public set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            let _loc3_: any = _loc2_.key;
            if ("pivot_point" === _loc3_) {
                this.pivot = PivotPoint.pivotFromName(String(_loc2_.value));
            }
        }
    }

    public get pivot(): number {
        return this._SafeStr_3717;
    }

    public set pivot(param1: number) {
        this._SafeStr_3717 = param1;
        (asGuarded(this.productPreviewBitmap, isIBitmapDataContainer)).pivotPoint = param1;
        (asInstanceOf(this.badgeImageWidget.widget, BadgeImageWidget)).pivotPoint = param1;
        this.placeholderImage.pivotPoint = param1;
        this.refresh();
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public set unknownImageUri(param1: string) {
        this.unknownImageWindow.assetUri = param1;
    }

    public get blend(): number {
        return this._blend;
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

    private set imageResult(param1: ImageResult) {
        this.clearPreviewer();
        if (param1 != null) {
            this._SafeStr_3955 = param1.id;
            this.setPreviewImage(param1.data);
        }
    }

    private set avatarResult(param1: string) {
        this.clearPreviewer();
        this.avatarImageWidget.visible = true;
        let _loc2_: IAvatarImageWidget = asGuarded(this.avatarImageWidget.widget, isIAvatarImageWidget);
        _loc2_.figure = param1;
        this.centerWindow(this.avatarImageWidget);
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

    private get placeholderImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._root.findChildByName("placeholder_image"), isIStaticBitmapWrapperWindow);
    }

    private get productPreviewBitmap(): IBitmapWrapperWindow {
        return asGuarded(this._root.findChildByName("product_preview"), isIBitmapWrapperWindow);
    }

    private get avatarImageWidget(): IWidgetWindow {
        return asGuarded(this._root.findChildByName("avatar_image_widget"), isIWidgetWindow);
    }

    private get badgeImageWidget(): IWidgetWindow {
        return asGuarded(this._root.findChildByName("badge_image_widget"), isIWidgetWindow);
    }

    private get petImageWidget(): IWidgetWindow {
        return asGuarded(this._root.findChildByName("pet_image_widget"), isIWidgetWindow);
    }

    private get effectImageWidget(): IWidgetWindow {
        return asGuarded(this._root.findChildByName("effect_image_widget"), isIWidgetWindow);
    }

    private get unknownImageWindow(): IStaticBitmapWrapperWindow {
        return asGuarded(this._root.findChildByName("unknown_image"), isIStaticBitmapWrapperWindow);
    }

    public previewImage(param1: IProductDisplayInfo): void {
        let _loc6_: string = null;
        let _loc3_: IFurnitureData = null;
        _loc3_ = null;
        let _loc5_: number = 0;
        let _loc2_: ImageResult = null;
        let _loc4_: BitmapData = null;
        if (param1 == null) {
            this.setUnknownImage();
            return;
        }
        if (this.handlePreviewImageEasterEgg(param1)) {
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
                _loc5_ = ProductIconUtil.categoryMapping("I", _loc3_.id);
                if (_loc5_ == 1) {
                    this.imageResult = this._windowManager.roomEngine.getWallItemImage(_loc3_.id, new Vector3d(90), 64, this, 0, param1.extraData);
                    break;
                }
                this.clearPreviewer();
                break;
            case 2:
                _loc3_ = this._windowManager.sessionDataManager.getFloorItemData(parseInt(param1.itemTypeId) | 0);
                if (_loc3_ == null) {
                    this.clearPreviewer();
                    break;
                }
                this.imageResult = this._windowManager.roomEngine.getFurnitureImage(_loc3_.id, new Vector3d(90, 0, 0), 64, this);
                break;
            case 3:
                if (param1.itemTypeId == "") {
                    this.clearPreviewer();
                    break;
                }
                this.setEffectResult(this._windowManager.sessionDataManager.figure, parseInt(param1.itemTypeId) | 0);
                break;
            case 5:
                this.badgeResult = param1.itemTypeId;
                break;
            case 10:
                _loc2_ = new ImageResult();
                _loc4_ = ProductIconUtil.createChatItemPreview(this._windowManager, parseInt(param1.itemTypeId) | 0);
                if (_loc4_ == null) {
                    this.clearPreviewer();
                    break;
                }
                _loc2_.data = _loc4_;
                this.imageResult = _loc2_;
                break;
            case 11:
                this.petResult = param1.petFigureString;
                break;
            case 12:
                this.avatarResult = _loc6_ = this._windowManager.avatarRenderer.getFigureStringWithFigureIds(this._windowManager.sessionDataManager.figure, this._windowManager.sessionDataManager.gender, param1.figureSetIds);
                break;
            default:
                ProductImageWidget._log.warn("Can not yet handle this type of product: ");
                this.clearPreviewer();
        }
    }

    public clearPreviewer(): void {
        this._SafeStr_3955 = -1;
        this.avatarImageWidget.visible = false;
        this.productPreviewBitmap.visible = false;
        this.badgeImageWidget.visible = false;
        this.placeholderImage.visible = false;
        this.petImageWidget.visible = false;
        this._SafeStr_3084.visible = false;
        this.unknownImageWindow.visible = false;
    }

    public setUnknownImage(): void {
        this.clearPreviewer();
        this.unknownImageWindow.visible = true;
    }

    public setPlaceholder(): void {
        this.clearPreviewer();
        this.placeholderImage.visible = true;
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this._SafeStr_3955 == param1 && this.productPreviewBitmap != null) {
            this.setPreviewImage(param2);
        }
    }

    public imageFailed(param1: number): void {
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._SafeStr_3084 != null) {
            this._SafeStr_3084.dispose();
            this._SafeStr_3084 = null;
        }
        this._SafeStr_3955 = -1;
    }

    private refresh(): void {
        if (this._SafeStr_5386 != null) {
            this.previewImage(this._SafeStr_5386);
        }
    }

    private handlePreviewImageEasterEgg(param1: IProductDisplayInfo): boolean {
        let _loc4_: string = null;
        let _loc2_: ImageResult = null;
        let _loc3_: BitmapData = null;
        if (param1.productTypeId == this._SafeStr_6247 && param1.itemTypeId == this._SafeStr_6627) {
            this._SafeStr_2864 += 1;
        } else {
            this._SafeStr_2864 = 1;
        }
        this._SafeStr_6247 = param1.productTypeId;
        this._SafeStr_6627 = param1.itemTypeId;
        if (param1.productTypeId == 9) {
            _loc4_ = "";
            if (this._SafeStr_2864 == 7) {
                _loc4_ = "Evil Frank";
            }
            if (this._SafeStr_2864 == 10) {
                _loc4_ = "Bonne Blonde";
            }
            if (this._SafeStr_2864 == 15) {
                _loc4_ = "Furni fairy";
            }
            if (this._SafeStr_2864 == 22) {
                _loc4_ = "Wacky Wired";
            }
            if (this._SafeStr_2864 == 35) {
                _loc4_ = "Quacky duck";
            }
            if (this._SafeStr_2864 == 70) {
                _loc4_ = "Pixel poo";
            }
            if (this._SafeStr_2864 == 100) {
                _loc4_ = "Bobba filtered";
            }
            if (_loc4_ != "") {
                _loc2_ = new ImageResult();
                _loc3_ = ProductIconUtil.createChatItemPreview(this._windowManager, parseInt(param1.itemTypeId) | 0, _loc4_);
                if (_loc3_ == null) {
                    return false;
                }
                _loc2_.data = _loc3_;
                this.imageResult = _loc2_;
                return true;
            }
        }
        return false;
    }

    private centerWindow(param1: IWidgetWindow): void {
        param1.x = this._root.width / 2 - param1.width / 2 | 0;
        param1.y = this._root.height / 2 - param1.height / 2 | 0;
    }

    private setEffectResult(param1: string, param2: number): void {
        this.clearPreviewer();
        this.centerWindow(this.effectImageWidget);
        this.effectImageWidget.y += 50;
        this._SafeStr_3084.visible = true;
        this._SafeStr_3084.update(param1, param2);
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

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ProductImageWidget.#staticsReady) return;
        ProductImageWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ProductImageWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.window.widgets.ProductImageWidget"));
    }

    get [IProductImageWidget](): true {
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
