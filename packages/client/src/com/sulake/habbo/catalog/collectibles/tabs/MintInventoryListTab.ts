import { asGuarded, asInstanceOf, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { CollectiblesController } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesController';
import type { CollectiblesView } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesView';
import type { IRenderableCollectibleItem } from '@/com/sulake/habbo/catalog/collectibles/IRenderableCollectibleItem';
import type { CollectiblesProductItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectiblesProductItem';
import type { MintTokenOffer } from '@/com/sulake/habbo/communication/messages/parser/collectibles/MintTokenOffer';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { MintInventoryItemRenderer } from '@/com/sulake/habbo/catalog/collectibles/renderer/MintInventoryItemRenderer';
import { MintableItemWrapper } from '@/com/sulake/habbo/catalog/collectibles/renderer/model/MintableItemWrapper';
import { CollectionsTab } from '@/com/sulake/habbo/catalog/collectibles/tabs/CollectionsTab';
import { MintTokenPurchaseOffer } from '@/com/sulake/habbo/catalog/collectibles/tabs/MintTokenPurchaseOffer';
import { CollectibleProductPreviewer } from '@/com/sulake/habbo/catalog/collectibles/tabs/subviews/CollectibleProductPreviewer';
import { CatalogEvent } from '@/com/sulake/habbo/catalog/event/CatalogEvent';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { CollectableMintableItemTypesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/CollectableMintableItemTypesMessageEvent';
import { CollectibleMintableItemResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/CollectibleMintableItemResultMessageEvent';
import { CollectibleMintingEnabledMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/CollectibleMintingEnabledMessageEvent';
import { CollectibleMintTokenCountMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/CollectibleMintTokenCountMessageEvent';
import { CollectibleMintTokenOffersMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/CollectibleMintTokenOffersMessageEvent';
import { GetCollectibleMintableItemTypesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/GetCollectibleMintableItemTypesMessageComposer';
import { GetCollectibleMintingEnabledMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/GetCollectibleMintingEnabledMessageComposer';
import { GetCollectibleMintTokensMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/GetCollectibleMintTokensMessageComposer';
import { GetMintTokenOffersMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/GetMintTokenOffersMessageComposer';
import { MintItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/MintItemMessageComposer';
import { CollectibleMintableItemResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleMintableItemResultMessageEventParser';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class MintInventoryListTab implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.tabs::MintInventoryListTab'); }

    private static PROGRESS_BAR_UPDATE_THRESHOLD: number = 1000;

    constructor(param1: CollectiblesView, param2: CollectiblesController) {
        this._SafeStr_3090 = param1;
        this._SafeStr_2288 = param2;
        this._items = new Array<MintInventoryItemRenderer>(0).fill(null);
        this._SafeStr_2225 = asGuarded(this._SafeStr_3090.window.findChildByName("mintingContainer"), isIWindowContainer);
        this._SafeStr_4127 = asGuarded(this._SafeStr_2225.findChildByName("itemgrid_inventory"), isIItemGridWindow);
        this._SafeStr_5624 = asGuarded(this._SafeStr_4127.getGridItemAt(0), isIWindowContainer);
        this._SafeStr_4127.removeGridItem(this._SafeStr_5624);
        this._SafeStr_3957 = castGuarded(this._SafeStr_2225.findChildByName("bg_star"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        this._loadingIcon = castGuarded(this._SafeStr_2225.findChildByName("loading_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        this._SafeStr_4176 = new CollectibleProductPreviewer(this.productPreviewBitmap, null, null, null, this.avatarImageWidget, this.placeholderImage);
        this._SafeStr_4176.setPlaceholder();
        this.addMessageEvents();
        this.initializeData();
        this.updateReadyState(false);
        param2.registerUpdateReceiver(this, 1);
        this.createWalletButton.addEventListener("WME_CLICK", this.onClickCreateWallet);
        this.moreInfoButton.addEventListener("WME_CLICK", this.onClickMoreInfo);
        this.stampsPurchaseDropdown.addEventListener("WE_SELECTED", this.onSelectTokenOffer);
        this.stampBuyButton.addEventListener("WME_CLICK", this.onBuyStampsClicked);
        this.collectButton.addEventListener("WME_CLICK", this.onCollectClicked);
    }

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_4127: IItemGridWindow;

    declare private _SafeStr_3090: CollectiblesView;

    declare private _SafeStr_2225: IWindowContainer;

    declare private _SafeStr_2288: CollectiblesController;

    declare private _SafeStr_5624: IWindowContainer;

    declare private _SafeStr_5196: boolean;
    static { (this.prototype as any)._SafeStr_5196 = false; }

    declare private _SafeStr_5447: boolean;
    static { (this.prototype as any)._SafeStr_5447 = false; }

    declare private _SafeStr_4951: boolean;
    static { (this.prototype as any)._SafeStr_4951 = false; }

    declare private _SafeStr_5118: boolean;
    static { (this.prototype as any)._SafeStr_5118 = false; }

    declare private _SafeStr_5442: boolean;
    static { (this.prototype as any)._SafeStr_5442 = false; }

    declare private _isReady: boolean;
    static { (this.prototype as any)._isReady = false; }

    declare private _SafeStr_5602: number;
    static { (this.prototype as any)._SafeStr_5602 = 0; }

    declare private _productItems: CollectiblesProductItem[];

    declare private _SafeStr_7273: boolean;
    static { (this.prototype as any)._SafeStr_7273 = false; }

    declare private _tokenOffers: MintTokenOffer[];

    declare private _SafeStr_5150: boolean;
    static { (this.prototype as any)._SafeStr_5150 = false; }

    declare private _selectedItem: MintInventoryItemRenderer;

    declare private _SafeStr_4176: CollectibleProductPreviewer;

    declare private _SafeStr_3957: IStaticBitmapWrapperWindow;

    declare private _loadingIcon: IStaticBitmapWrapperWindow;

    declare private _SafeStr_4585: number;
    static { (this.prototype as any)._SafeStr_4585 = NaN; }

    declare private _items: MintInventoryItemRenderer[];

    declare private _SafeStr_5061: boolean;
    static { (this.prototype as any)._SafeStr_5061 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set activeWallet(param1: string) {
        this._SafeStr_5118 = false;
        if (param1 != null) {
            this._SafeStr_5196 = true;
            this._SafeStr_2288.send(new GetCollectibleMintTokensMessageComposer(param1));
        }
        this.updateReadyState(true);
        this.stampPurchasingContainer.visible = param1 != null;
        this.noWalletContainer.visible = param1 == null;
    }

    private get selectedTokenOffer(): MintTokenOffer {
        let _loc1_: number = this.stampsPurchaseDropdown.selection;
        if (_loc1_ < 0 || _loc1_ >= this._tokenOffers.length) {
            return null;
        }
        return this._tokenOffers[_loc1_];
    }

    private get localization(): IHabboLocalizationManager {
        return this._SafeStr_2288.localizationManager;
    }

    private get loadingContainer(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("loading_contents"), isIWindowContainer);
    }

    private get loadedContainer(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("loaded_content"), isIWindowContainer);
    }

    private get previewWindow(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("preview_container"), isIWindowContainer);
    }

    private get productPreviewBitmap(): IBitmapWrapperWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("product_preview"), isIBitmapWrapperWindow);
    }

    private get avatarImageWidget(): IWidgetWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("avatar_image_widget"), isIWidgetWindow);
    }

    private get productNameText(): ITextWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("preview_furni_name"), isITextWindow);
    }

    private get placeholderImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("placeholder_image"), isIStaticBitmapWrapperWindow);
    }

    private get stampPricingText(): ITextWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("stamp_pricing"), isITextWindow);
    }

    private get collectButton(): IButtonWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("collect_button"), isIButtonWindow);
    }

    private get noFurniNotification(): IBorderWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("no_furni_notify"), isIBorderWindow);
    }

    private get mintLockedText(): IHTMLTextWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("mint_lock_text"), isIHTMLTextWindow);
    }

    private get mintLockOpenImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("mint_lock_open_icon"), isIStaticBitmapWrapperWindow);
    }

    private get mintLockClosedImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("mint_lock_closed_icon"), isIStaticBitmapWrapperWindow);
    }

    private get completionProgressBar(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("progress_bar"), isIWindowContainer);
    }

    private get completionProgressBarPadded(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("progress_padded_bar"), isIWindowContainer);
    }

    private get completionProgressBarTop(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("progress_bar_top"), isIWindowContainer);
    }

    private get completionProgressBarBottom(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("progress_bar_bottom"), isIWindowContainer);
    }

    private get completionProgressBarText(): ITextWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("progress_bar_text"), isITextWindow);
    }

    private get stampPurchasingContainer(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("stamp_purchasing_container"), isIWindowContainer);
    }

    private get noWalletContainer(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("no_wallet_container"), isIWindowContainer);
    }

    private get createWalletButton(): IButtonWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("create_wallet_button"), isIButtonWindow);
    }

    private get moreInfoButton(): IButtonWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("more_info_button"), isIButtonWindow);
    }

    private get mintTokenBalanceText(): ITextWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("mint_token_balance"), isITextWindow);
    }

    private get silverCost(): ITextWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("silver_cost_text"), isITextWindow);
    }

    private get stampBuyButton(): IButtonWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("silver_buy_button"), isIButtonWindow);
    }

    private get stampsPurchaseDropdown(): IDropMenuWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("stamps_purchase_dropdown"), isIDropMenuWindow);
    }

    public onInventoryInitialize(param1: string): void {
        if (param1 != "furni") {
            return;
        }
        this._SafeStr_5442 = false;
        this.updateReadyState(true);
    }

    public amountChangedForItem(param1: string, param2: number, param3: boolean): void {
        let _loc5_: CollectiblesProductItem = null;
        let _loc6_: boolean = false;
        let _loc7_: any[] = null;
        if (param1 != "furni") {
            return;
        }
        if (this._isReady && this._items != null && this._items.length > 0) {
            for (const _loc4_ of this._items ?? []) {
                _loc5_ = _loc4_.item;
                _loc6_ = _loc5_.itemType == "i" && param3 || _loc5_.itemType == "s" && !param3;
                if (_loc6_ && _loc5_.itemTypeId == param2) {
                    _loc7_ = this.getIdsInInventory(_loc5_);
                    (asInstanceOf(_loc4_.renderableItem, MintableItemWrapper)).amount = _loc7_.length | 0;
                    _loc4_.updateVisuals();
                    if (_loc4_ == this._selectedItem) {
                        this.reloadPreview();
                    }
                    return;
                }
            }
        }
    }

    public populateItems(param1: CollectiblesProductItem[]): void {
        let _loc4_: IWindowContainer = null;
        let _loc3_: MintInventoryItemRenderer = null;
        for (const _loc2_ of param1 ?? []) {
            _loc4_ = asGuarded(this._SafeStr_5624.clone(), isIWindowContainer);
            _loc3_ = new MintInventoryItemRenderer(this._SafeStr_2288, _loc2_, _loc4_, this, this.getIdsInInventory(_loc2_).length | 0);
            this._SafeStr_4127.addGridItem(_loc4_);
            this._items.push(_loc3_);
        }
        this._SafeStr_5061 = true;
        if (this._items.length > 0) {
            this._selectedItem = this._items[0];
            this._selectedItem.activate();
            this.initMintItemPreview();
        }
        this.previewWindow.visible = this._items.length > 0;
    }

    public selectItem(param1: MintInventoryItemRenderer): void {
        if (this._selectedItem != null) {
            this._selectedItem.deactivate();
            this._selectedItem = null;
        }
        if (param1 != null) {
            this._selectedItem = param1;
            this._selectedItem.activate();
            this.initMintItemPreview();
        } else {
            this._selectedItem = null;
        }
    }

    public updateProgressBar(param1: boolean = true, param2: number = 0): void {
        let _loc6_: number = NaN;
        let _loc10_: number = NaN;
        let _loc3_: number = NaN;
        let _loc7_: number = NaN;
        let _loc4_: any = false;
        let _loc11_: number = 0;
        let _loc12_: number = 0;
        let _loc13_: string = null;
        this._SafeStr_4585 += param2;
        let _loc9_: boolean = param1 || this._SafeStr_4585 >= MintInventoryListTab.PROGRESS_BAR_UPDATE_THRESHOLD;
        if (!_loc9_ || !this._selectedItem) {
            return;
        }
        this._SafeStr_4585 = 0;
        let _loc5_: number = this._selectedItem.item.startTime * 1000;
        let _loc8_: number = this._selectedItem.item.endTime * 1000;
        if (_loc5_ > 0 && _loc8_ > 0) {
            _loc6_ = new Date().getTime();
            _loc10_ = Math.max(0, _loc8_ - _loc6_);
            _loc3_ = _loc8_ - _loc5_;
            _loc7_ = Math.min(1, _loc10_ / _loc3_);
            _loc4_ = _loc7_ <= 0;
            _loc7_ = Math.max(0, _loc7_);
            _loc11_ = this.completionProgressBarPadded.width;
            _loc12_ = _loc11_ * _loc7_ | 0;
            this.completionProgressBarTop.width = _loc12_;
            this.completionProgressBarBottom.width = _loc12_;
            if (!_loc4_) {
                _loc13_ = FriendlyTime.getFriendlyTime(this.localization, _loc10_ / 1000);
                this.completionProgressBarText.caption = this.localization.getLocalizationWithParams("shop.minting.time_left") + ": " + _loc13_;
            } else {
                this.completionProgressBarText.caption = this.localization.getLocalizationWithParams("shop.minting.time_ended");
                this.collectButton.disable();
            }
        }
    }

    public clearItems(): void {
        if (this._items) {
            for (const _loc1_ of this._items ?? []) {
                _loc1_.dispose();
            }
            this._items.length = 0;
        }
        if (this._SafeStr_4127) {
            this._SafeStr_4127.destroyGridItems();
        }
        this._SafeStr_5061 = false;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.clearItems();
        this.removeMessageEvents();
        this._SafeStr_2288.removeUpdateReceiver(this);
        throw new TypeError("super.dispose is not a function");
    }

    public update(param1: number): void {
        let _loc2_: number = NaN;
        _loc2_ = NaN;
        if (this._isReady) {
            _loc2_ = CollectionsTab.BG_STAR_ROTATE_SPEED * (param1 / 1000);
            this._SafeStr_3957.rotation += _loc2_;
            this._SafeStr_3957.rotation %= 360;
            this._SafeStr_3957.invalidate();
            this.updateProgressBar(false, param1);
        } else {
            _loc2_ = CollectionsTab._SafeStr_4583 * (param1 / 1000);
            this._loadingIcon.rotation += _loc2_;
            this._loadingIcon.rotation %= 360;
            this._loadingIcon.invalidate();
        }
    }

    private addMessageEvents(): void {
        if (!this._SafeStr_2288) {
            return;
        }
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this._messageEvents.push(new CollectibleMintTokenCountMessageEvent(this.onCollectibleMintTokensMessage));
        this._messageEvents.push(new CollectibleMintingEnabledMessageEvent(this.onCollectibleMintingEnabledMessage));
        this._messageEvents.push(new CollectableMintableItemTypesMessageEvent(this.onCollectableMintableItemTypesMessage));
        this._messageEvents.push(new CollectibleMintTokenOffersMessageEvent(this.onMintTokenOffersMessage));
        this._messageEvents.push(new CollectibleMintableItemResultMessageEvent(this.onMintItemResult));
        for (const _loc1_ of this._messageEvents ?? []) {
            this._SafeStr_2288.addMessageEvent(_loc1_);
        }
    }

    private updateReadyState(param1: boolean): void {
        let _loc2_: boolean = !this._SafeStr_5118 && !this._SafeStr_5442 && !this._SafeStr_5447 && !this._SafeStr_4951 && !this._SafeStr_5196;
        if (_loc2_) {
            if (!this._isReady && !this._SafeStr_5061) {
                this.populateItems(this._productItems);
            } else if (param1) {
                this.reloadPreview();
            }
        }
        this._isReady = _loc2_;
        this.loadedContainer.visible = this._isReady;
        this.loadingContainer.visible = !this._isReady;
    }

    private onCollectibleMintTokensMessage = (param1: CollectibleMintTokenCountMessageEvent): void => {
        this._SafeStr_5196 = false;
        this._SafeStr_5602 = param1.getParser().totalTokens;
        this.mintTokenBalanceText.caption = String(this._SafeStr_5602);
        this.updateReadyState(true);
    };

    private onCollectibleMintingEnabledMessage = (param1: CollectibleMintingEnabledMessageEvent): void => {
        this._SafeStr_4951 = false;
        this._SafeStr_7273 = param1.getParser().enabled;
        this.updateReadyState(true);
    };

    private onCollectableMintableItemTypesMessage = (param1: CollectableMintableItemTypesMessageEvent): void => {
        this._SafeStr_5447 = false;
        this._productItems = param1.getParser().collectibleProductItems;
        this.updateReadyState(true);
    };

    private onMintTokenOffersMessage = (param1: CollectibleMintTokenOffersMessageEvent): void => {
        this._tokenOffers = param1.getParser().tokenOffers;
        let _loc3_: string[] = [];
        for (const _loc2_ of this._tokenOffers ?? []) {
            _loc3_.push(String(_loc2_.amountTokens));
        }
        this.stampsPurchaseDropdown.populateWithVector(_loc3_);
        if (_loc3_.length > 0) {
            this.stampsPurchaseDropdown.selection = 0;
            this.onSelectTokenOffer(null);
        }
    };

    private onSelectTokenOffer = (param1: WindowEvent): void => {
        let _loc2_: MintTokenOffer = this.selectedTokenOffer;
        this.silverCost.caption = String(_loc2_.silverPrice);
        if (_loc2_.silverPrice <= this._SafeStr_2288.catalog.getPurse().silverBalance) {
            this.stampBuyButton.enable();
        } else {
            this.stampBuyButton.disable();
        }
    };

    private onBuyStampsClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: MintTokenOffer = this.selectedTokenOffer;
        let _loc3_: string = this._SafeStr_3090.activeWallet;
        if (_loc2_ == null || _loc3_ == null) {
            return;
        }
        let _loc4_: MintTokenPurchaseOffer = new MintTokenPurchaseOffer(_loc2_);
        castTo(this._SafeStr_2288.catalog, HabboCatalog).showPurchaseConfirmation(_loc4_, -1, _loc3_);
    };

    private initializeData(): void {
        this._SafeStr_5447 = true;
        this._SafeStr_2288.send(new GetCollectibleMintableItemTypesMessageComposer());
        this._SafeStr_4951 = true;
        this._SafeStr_2288.send(new GetCollectibleMintingEnabledMessageComposer());
        if (!this._SafeStr_2288.inventory.checkCategoryInitilization("furni")) {
            this._SafeStr_5442 = true;
        }
        this._SafeStr_5118 = true;
        if (this._SafeStr_3090.walletsLoaded()) {
            this.activeWallet = this._SafeStr_3090.activeWallet;
        }
        this.stampBuyButton.disable();
        this._SafeStr_2288.send(new GetMintTokenOffersMessageComposer());
    }

    private getIdsInInventory(param1: CollectiblesProductItem): any[] {
        let _loc4_: string = param1.itemType;
        let _loc2_: boolean = false;
        if (_loc4_ == "i") {
            _loc2_ = true;
        } else if (_loc4_ != "s") {
            return [];
        }
        let _loc5_: IHabboInventory = this._SafeStr_2288.inventory;
        let _loc3_: any[] = _loc5_.getNonRentedInventoryIds("furni", param1.itemTypeId, _loc2_);
        return _loc3_ == null ? [] : _loc3_;
    }

    private reloadPreview(): void {
        this.initMintItemPreview();
    }

    private initMintItemPreview(): void {
        if (this._selectedItem == null) {
            return;
        }
        let _loc3_: MintInventoryItemRenderer = this._selectedItem;
        this._SafeStr_4176.clearPreviewer();
        this._SafeStr_2288.previewImage(_loc3_.renderableItem, this._SafeStr_4176);
        this.productNameText.caption = this._SafeStr_2288.getProductName(_loc3_.renderableItem);
        let _loc5_: IRenderableCollectibleItem = _loc3_.renderableItem;
        let _loc1_: CollectiblesProductItem = _loc3_.item;
        let _loc2_: any = this._SafeStr_3090.activeWallet == null;
        let _loc4_: any = _loc5_.amount == 0;
        let _loc6_: any = this._SafeStr_5602 < _loc1_.price;
        let _loc7_: boolean = this.isMintPeriodExpired();
        this.stampPricingText.caption = String(_loc1_.price);
        this.noFurniNotification.visible = _loc4_;
        if (_loc1_.regionLocked) {
            this.mintLockedText.caption = this.localization.getLocalization("shop.minting.region_locked");
            this.mintLockClosedImage.visible = true;
            this.mintLockOpenImage.visible = false;
        } else {
            this.mintLockedText.caption = this.localization.getLocalization("shop.minting.region_unlocked");
            this.mintLockClosedImage.visible = false;
            this.mintLockOpenImage.visible = true;
        }
        this.updateProgressBar(true);
        if (_loc2_ || _loc4_ || _loc6_ || _loc7_ || !this._SafeStr_7273 || this._SafeStr_5150) {
            this.collectButton.disable();
        } else {
            this.collectButton.enable();
        }
    }

    private onCollectClicked = (param1: WindowMouseEvent): void => {
        this.collectButton.disable();
        let _loc2_: IConfirmDialog = this._SafeStr_2288.windowManager.confirm("${shop.minting.confirm.title}", "${shop.minting.confirm.description}", 0, this.onCollectConfirmDialogConfirm);
        _loc2_.titleBarColor = 2763306;
    };

    private onCollectConfirmDialogConfirm = (param1: IConfirmDialog, param2: WindowEvent): void => {
        let _loc3_: string = null;
        let _loc4_: any[] = null;
        param1.dispose();
        if (param2.type == "WE_OK") {
            _loc3_ = this._SafeStr_3090.activeWallet;
            if (this._selectedItem == null || _loc3_ == null) {
                return;
            }
            _loc4_ = this.getIdsInInventory(this._selectedItem.item);
            if (_loc4_.length == 0) {
                return;
            }
            this._SafeStr_5150 = true;
            this._SafeStr_2288.send(new MintItemMessageComposer(_loc4_[0] | 0, _loc3_));
        }
        this.reloadPreview();
    };

    private onMintItemResult = (param1: CollectibleMintableItemResultMessageEvent): void => {
        let _loc2_: any = param1.getParser().mintResult == CollectibleMintableItemResultMessageEventParser._SafeStr_5833;
        this._SafeStr_2288.catalog.events.dispatchEvent(new CatalogEvent(_loc2_ ? "COLLECTIBLES_MINT_SUCCESS" : "COLLECTIBLES_MINT_FAIL"));
        this._SafeStr_5150 = false;
        this.reloadPreview();
    };

    private isMintPeriodExpired(): boolean {
        if (this._selectedItem == null) {
            return true;
        }
        return this._selectedItem.item.endTime * 1000 < new Date().getTime();
    }

    private onClickCreateWallet = (param1: WindowMouseEvent): void => {
        HabboWebTools.openWebPageAndMinimizeClient(this._SafeStr_2288.getProperty("nft.wallet.create.url"));
    };

    private onClickMoreInfo = (param1: WindowMouseEvent): void => {
        HabboWebTools.openWebPageAndMinimizeClient(this._SafeStr_2288.getProperty("web.settings.wallet.relativeUrl"));
    };

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
