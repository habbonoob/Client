import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CollectiblesController } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesController';
import type { CollectiblesView } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesView';
import type { CollectionView } from '@/com/sulake/habbo/catalog/collectibles/tabs/subviews/CollectionView';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import type { NftStoreOffer } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftStoreOffer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ShopNavigationNodeRenderer } from '@/com/sulake/habbo/catalog/collectibles/renderer/collections/ShopNavigationNodeRenderer';
import { ShopCollectibleItemRenderer } from '@/com/sulake/habbo/catalog/collectibles/renderer/ShopCollectibleItemRenderer';
import { NftStorePurchaseOffer } from '@/com/sulake/habbo/catalog/collectibles/tabs/NftStorePurchaseOffer';
import { CollectibleProductPreviewer } from '@/com/sulake/habbo/catalog/collectibles/tabs/subviews/CollectibleProductPreviewer';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { NftStoreOffersMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/NftStoreOffersMessageEvent';
import { GetNftStoreOffersMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/GetNftStoreOffersMessageComposer';

export class ShopTab implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.tabs::ShopTab'); }

    public static BG_STAR_ROTATE_SPEED: number = 20;
    public static _SafeStr_4583: number = 90;

    constructor(param1: CollectiblesView, param2: CollectiblesController) {
        this._SafeStr_3090 = param1;
        this._SafeStr_2288 = param2;
        this._SafeStr_2225 = castGuarded(this._SafeStr_3090.window.findChildByName("shopContainer"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._navigationList = castGuarded(this._SafeStr_2225.findChildByName("navigationList"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._navigationItemTemplate = this._navigationList.removeListItem(this._navigationList.getListItemByName("item_template"));
        this._renderableItems = [];
        let _loc3_: IItemGridWindow = asGuarded(this._SafeStr_2225.findChildByName("itemgrid_shop"), isIItemGridWindow);
        this._SafeStr_7054 = _loc3_;
        this._gridItemTemplate = asGuarded(_loc3_.getGridItemAt(0), isIWindowContainer);
        _loc3_.removeGridItems();
        this._gridItems = [];
        this._SafeStr_4176 = new CollectibleProductPreviewer(this.productPreviewBitmap, this.badgeImageWidget, this.petImageWidget, this.unknownImageWindow, this.avatarImageWidget, this.placeholderImage, this.effectImageWidget, this.controller.avatarRenderManager);
        this._SafeStr_4176.setPlaceholder();
        this.setReady(false);
        this.addMessageEvents();
        this.requestNftStoreOffers();
        this.buyButton.addEventListener("WME_CLICK", this.onClickBuy);
        this._SafeStr_3957 = castGuarded(this._SafeStr_2225.findChildByName("bg_star"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        this._loadingIcon = castGuarded(this._SafeStr_2225.findChildByName("loading_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        this.controller.registerUpdateReceiver(this, 1);
    }

    declare private _SafeStr_3090: CollectiblesView;

    declare private _SafeStr_2288: CollectiblesController;

    declare private _SafeStr_2225: IWindowContainer;

    declare private _navigationList: IItemListWindow;

    declare private _renderableItems: ShopNavigationNodeRenderer[];

    declare private _navigationItemTemplate: IWindow;

    declare private _waitingForOffers: boolean;
    static { (this.prototype as any)._waitingForOffers = false; }

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_2638: ShopNavigationNodeRenderer;

    declare private _SafeStr_2917: CollectionView;

    declare private _SafeStr_3957: IStaticBitmapWrapperWindow;

    declare private _loadingIcon: IStaticBitmapWrapperWindow;

    declare private _isReady: boolean;
    static { (this.prototype as any)._isReady = false; }

    declare private _gridItemTemplate: IWindowContainer;

    declare private _SafeStr_7054: IItemGridWindow;

    declare private _gridItems: ShopCollectibleItemRenderer[];

    declare private _selectedItem: ShopCollectibleItemRenderer;

    declare private _SafeStr_4176: CollectibleProductPreviewer;

    private _currentOffers: any[] = [];

    private _offersByCategory: any = {};

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get navigationItemTemplate(): IWindow {
        return this._navigationItemTemplate;
    }

    public get controller(): CollectiblesController {
        return this._SafeStr_2288;
    }

    public get activeWallet(): string {
        return this._SafeStr_3090.activeWallet;
    }

    public get gridItemTemplate(): IWindowContainer {
        return this._gridItemTemplate;
    }

    public get itemGrid(): IItemGridWindow {
        return this._SafeStr_7054;
    }

    private get collectionContainer(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("collection_content"), isIWindowContainer);
    }

    private get loadingContainer(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("loading_contents"), isIWindowContainer);
    }

    private get loadedContainer(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("loaded_content"), isIWindowContainer);
    }

    private get avatarImageWidget(): IWidgetWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("avatar_image_widget"), isIWidgetWindow);
    }

    private get badgeImageWidget(): IWidgetWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("badge_image_widget"), isIWidgetWindow);
    }

    private get petImageWidget(): IWidgetWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("pet_image_widget"), isIWidgetWindow);
    }

    private get effectImageWidget(): IWidgetWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("effect_image_widget"), isIWidgetWindow);
    }

    private get unknownImageWindow(): IStaticBitmapWrapperWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("unknown_image"), isIStaticBitmapWrapperWindow);
    }

    private get placeholderImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("placeholder_image"), isIStaticBitmapWrapperWindow);
    }

    private get productPreviewBitmap(): IBitmapWrapperWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("product_preview"), isIBitmapWrapperWindow);
    }

    private get productNameText(): ITextWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("preview_furni_name"), isITextWindow);
    }

    private get buyButton(): IButtonWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("buy_button"), isIButtonWindow);
    }

    private get emeraldPriceText(): ITextWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("price_text"), isITextWindow);
    }

    private get mintLimitText(): ITextWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("mintlimit_text"), isITextWindow);
    }

    private get mintLimitContainer(): IWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("mintlimit_container"), isIWindow);
    }

    public activateCategory(param1: ShopNavigationNodeRenderer): void {
        if (this._SafeStr_2638 == param1) {
            return;
        }
        if (this._SafeStr_2638 != null) {
            this._SafeStr_2638.deactivate();
        }
        this._SafeStr_2638 = param1;
        this._SafeStr_2638.activate();
        this.populateGridItems();
    }

    public populateGridItems(): void {
        let _loc4_: IWindowContainer = null;
        let _loc3_: ShopCollectibleItemRenderer = null;
        this.clearGridItems();
        if (this._offersByCategory[this._SafeStr_2638.category].length <= 0) {
            return;
        }
        let _loc1_: IWindowContainer = this.gridItemTemplate;
        for (const _loc2_ of valuesOf(this._offersByCategory[this._SafeStr_2638.category])) {
            _loc4_ = asGuarded(_loc1_.clone(), isIWindowContainer);
            _loc3_ = new ShopCollectibleItemRenderer(this.controller, _loc2_, _loc4_, this);
            this.itemGrid.addGridItem(_loc4_);
            this._gridItems.push(_loc3_);
        }
        this.selectItem(this._gridItems[0]);
    }

    public clearGridItems(): void {
        this._selectedItem = null;
        if (this._gridItems) {
            for (const _loc1_ of this._gridItems ?? []) {
                _loc1_.dispose();
            }
            this._gridItems.length = 0;
        }
        if (this.itemGrid) {
            this.itemGrid.destroyGridItems();
        }
    }

    public selectItem(param1: ShopCollectibleItemRenderer): void {
        if (this._selectedItem != null) {
            this._selectedItem.deactivate();
            this._selectedItem = null;
        }
        if (param1 != null) {
            this._selectedItem = param1;
            this._selectedItem.activate();
            this.initItemPreview();
        } else {
            this._selectedItem = null;
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.controller.removeUpdateReceiver(this);
        this._SafeStr_4176.clearPreviewer();
        this.clearNavigationList();
        this.clearGridItems();
        this.removeMessageEvents();
        this.buyButton.removeEventListener("WME_CLICK", this.onClickBuy);
        if (this._SafeStr_2638 != null) {
            this._SafeStr_2638.dispose();
            this._SafeStr_2638 = null;
        }
        throw new TypeError("super.dispose is not a function");
    }

    public update(param1: number): void {
        let _loc2_: number = NaN;
        _loc2_ = NaN;
        if (this._isReady) {
            _loc2_ = ShopTab.BG_STAR_ROTATE_SPEED * (param1 / 1000);
            this._SafeStr_3957.rotation += _loc2_;
            this._SafeStr_3957.rotation %= 360;
            this._SafeStr_3957.invalidate();
            if (this._SafeStr_2917 != null) {
                this._SafeStr_2917.updateBonusProgressBar(false, param1);
            }
        } else {
            _loc2_ = ShopTab._SafeStr_4583 * (param1 / 1000);
            this._loadingIcon.rotation += _loc2_;
            this._loadingIcon.rotation %= 360;
            this._loadingIcon.invalidate();
        }
    }

    private addMessageEvents(): void {
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this._messageEvents.push(new NftStoreOffersMessageEvent(this.onNftStoreOffers));
        for (const _loc1_ of this._messageEvents ?? []) {
            this._SafeStr_2288.addMessageEvent(_loc1_);
        }
    }

    private onNftStoreOffers = (param1: NftStoreOffersMessageEvent): void => {
        if (!this._waitingForOffers || this._navigationList.numListItems != 0) {
            return;
        }
        this._waitingForOffers = false;
        let _loc2_: any[] = param1.getParser().nftStoreOffers;
        this._currentOffers = _loc2_;
        this.createNavigationNodes();
        if (this._renderableItems.length > 0) {
            this.activateCategory(this._renderableItems[0]);
        }
        this.setReady(true);
        this.collectionContainer.visible = this._renderableItems.length > 0;
    };

    private createNavigationNodes(): void {
        let _loc3_: string = null;
        let _loc2_: ShopNavigationNodeRenderer = null;
        for (const _loc1_ of this._currentOffers ?? []) {
            if (_loc1_ != null) {
                _loc3_ = this._SafeStr_2288.localizationManager.getLocalization(this.getNavigationCategory(_loc1_.productInfo.productTypeId | 0));
                if (!this._offersByCategory.hasOwnProperty(_loc3_)) {
                    this._offersByCategory[_loc3_] = [];
                    _loc2_ = new ShopNavigationNodeRenderer(this, _loc3_);
                    this._navigationList.addListItem(_loc2_.window);
                    this._renderableItems.push(_loc2_);
                }
                this._offersByCategory[_loc3_].push(_loc1_);
            }
        }
    }

    private getNavigationCategory(param1: number): string {
        switch (param1) {
            case 0:
            case 1:
                return "shop.furni.title";
            case 10:
                return "shop.pets.title";
            case 11:
                return "shop.clothes.title";
            default:
                return "product.type.other";
        }
    }

    private setReady(param1: boolean): void {
        this.loadedContainer.visible = param1;
        this.loadingContainer.visible = !param1;
        this._isReady = param1;
    }

    private requestNftStoreOffers(): void {
        this.clearNavigationList();
        this._waitingForOffers = true;
        this._SafeStr_2288.send(new GetNftStoreOffersMessageComposer());
    }

    private initItemPreview(): void {
        if (this._selectedItem == null) {
            return;
        }
        let _loc2_: ShopCollectibleItemRenderer = this._selectedItem;
        let _loc1_: NftStoreOffer = _loc2_.offer;
        this._SafeStr_4176.clearPreviewer();
        this._SafeStr_2288.previewImage(_loc2_.renderableItem, this._SafeStr_4176);
        this.productNameText.caption = this._SafeStr_2288.getProductName(_loc2_.renderableItem);
        this.emeraldPriceText.caption = _loc1_.emeraldPrice.toString();
        let _loc3_: any = _loc1_.mintLimit > 0;
        this.mintLimitContainer.visible = _loc3_;
        if (_loc3_) {
            this.mintLimitText.caption = _loc1_.mintedCount + "/" + _loc1_.mintLimit;
        }
        if (_loc1_.mintedCount < _loc1_.mintLimit || _loc1_.mintLimit == -1) {
            this.buyButton.enable();
        } else {
            this.buyButton.disable();
        }
    }

    private onClickBuy = (param1: WindowMouseEvent): void => {
        let _loc2_: NftStorePurchaseOffer = new NftStorePurchaseOffer(this._selectedItem.offer);
        let _loc3_: IPurse = this.controller.catalog.getPurse();
        if (_loc3_.emeraldBalance < _loc2_.priceInEmerald) {
            castTo(this._SafeStr_2288.catalog, HabboCatalog).showNotEnoughActivityPointsAlert(1001);
            return;
        }
        castTo(this._SafeStr_2288.catalog, HabboCatalog).showPurchaseConfirmation(_loc2_, -1, this.activeWallet);
    };

    private clearNavigationList(): void {
        this._SafeStr_2638 = null;
        this._navigationList.removeListItems();
        for (const _loc1_ of this._renderableItems ?? []) {
            _loc1_.dispose();
        }
        this._renderableItems.length = 0;
    }

    private removeMessageEvents(): void {
        if (!this._SafeStr_2288 || !this._messageEvents) {
            return;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this._SafeStr_2288.removeMessageEvent(_loc1_);
            _loc1_.dispose();
        }
        this._messageEvents = null;
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
