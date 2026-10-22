import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CollectiblesController } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesController';
import type { CollectiblesView } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesView';
import type { NftBonusItemClaimResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftBonusItemClaimResultMessageEventParser';
import type { NftCollection } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftCollection';
import type { NftRewardItemClaimResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftRewardItemClaimResultMessageEventParser';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CollectionsNavigationNodeRenderer } from '@/com/sulake/habbo/catalog/collectibles/renderer/collections/CollectionsNavigationNodeRenderer';
import { CollectionView } from '@/com/sulake/habbo/catalog/collectibles/tabs/subviews/CollectionView';
import { CatalogEvent } from '@/com/sulake/habbo/catalog/event/CatalogEvent';
import { NftBonusItemClaimResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/NftBonusItemClaimResultMessageEvent';
import { NftCollectionsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/NftCollectionsMessageEvent';
import { NftRewardItemClaimResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/NftRewardItemClaimResultMessageEvent';
import { GetNftCollectionsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/GetNftCollectionsMessageComposer';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class CollectionsTab implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.tabs::CollectionsTab'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        CollectionsTab.#initStatics();
        return CollectionsTab._log;
    }

    public static BG_STAR_ROTATE_SPEED: number = 20;
    public static _SafeStr_4583: number = 90;

    private static sortCollectionsByBonus(param1: any[]): any[] {
        let _loc2_: any[] = [];
        let _loc3_: any[] = [];
        let _loc5_: any[] = [];
        for (const _loc4_ of param1 ?? []) {
            if (_loc4_.canClaimBonus) {
                _loc2_.push(_loc4_);
            } else if (_loc4_.hasBonusItem && !_loc4_.isBonusSnapshotPassed()) {
                _loc3_.push(_loc4_);
            } else {
                _loc5_.push(_loc4_);
            }
        }
        return _loc2_.concat(_loc3_, _loc5_);
    }

    constructor(param1: CollectiblesView, param2: CollectiblesController) {
        this._SafeStr_3090 = param1;
        this._SafeStr_2288 = param2;
        this._SafeStr_2225 = castGuarded(this._SafeStr_3090.window.findChildByName("collectionsContainer"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._navigationList = castGuarded(this._SafeStr_2225.findChildByName("navigationList"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._navigationItemTemplate = this._navigationList.removeListItem(this._navigationList.getListItemByName("item_template"));
        this._renderableItems = [];
        let _loc3_: IItemGridWindow = asGuarded(this._SafeStr_2225.findChildByName("itemgrid_collection"), isIItemGridWindow);
        this._gridItemTemplate = asGuarded(_loc3_.getGridItemAt(0), isIWindowContainer);
        _loc3_.removeGridItems();
        let _loc4_: IItemListWindow = asGuarded(this._SafeStr_2225.findChildByName("product_info_list"), isIItemListWindow);
        this._productInfoEntryTemplate = asGuarded(_loc4_.getListItemAt(0), isIWindowContainer);
        _loc4_.removeListItems();
        this.setReady(false);
        this.addMessageEvents();
        if (this._SafeStr_3090.walletAddresses) {
            this.initializeWallets(this._SafeStr_3090.walletAddresses);
        }
        this.walletSelection.addEventListener("WE_SELECTED", this.onWalletSelectAction);
        this.populateSortOptions();
        this.sortSelection.addEventListener("WE_SELECTED", this.onSortSelectAction);
        this.searchInput.addEventListener("WE_CHANGE", this.onFilterChangeAction);
        this.clearSearchButton.addEventListener("WME_CLICK", this.onClearSearchAction);
        this._SafeStr_3957 = castGuarded(this._SafeStr_2225.findChildByName("bg_star"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        this._loadingIcon = castGuarded(this._SafeStr_2225.findChildByName("loading_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        this.controller.registerUpdateReceiver(this, 1);
    }

    declare private _SafeStr_3090: CollectiblesView;

    declare private _SafeStr_2288: CollectiblesController;

    declare private _SafeStr_2225: IWindowContainer;

    declare private _navigationList: IItemListWindow;

    declare private _renderableItems: CollectionsNavigationNodeRenderer[];

    declare private _navigationItemTemplate: IWindow;

    declare private _SafeStr_5337: boolean;
    static { (this.prototype as any)._SafeStr_5337 = false; }

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_2638: CollectionsNavigationNodeRenderer;

    declare private _SafeStr_2917: CollectionView;

    declare private _SafeStr_3957: IStaticBitmapWrapperWindow;

    declare private _loadingIcon: IStaticBitmapWrapperWindow;

    declare private _isReady: boolean;
    static { (this.prototype as any)._isReady = false; }

    declare private _gridItemTemplate: IWindowContainer;

    declare private _productInfoEntryTemplate: IWindowContainer;

    declare private _ignoreWalletSelectionEvents: boolean;
    static { (this.prototype as any)._ignoreWalletSelectionEvents = false; }

    private _SafeStr_4180: any[] = [];

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

    public set activeWallet(param1: string) {
        let _loc3_: number = this._SafeStr_3090.walletAddresses.indexOf(param1);
        if (_loc3_ == -1 && param1 != null) {
            CollectionsTab._log.warn("selected an unavailable wallet");
            return;
        }
        this._ignoreWalletSelectionEvents = true;
        this.walletSelection.selection = _loc3_;
        this._ignoreWalletSelectionEvents = false;
        this.setReady(false);
        this.requestCollections(param1);
        let _loc2_: string = stringOrNull(this.walletSelection.enumerateSelection()[_loc3_]);
        if (_loc2_ && _loc2_.length > 19) {
            this.walletSelection.caption = _loc2_.substring(0, 19) + "...";
        }
    }

    public get gridItemTemplate(): IWindowContainer {
        return this._gridItemTemplate;
    }

    public get productInfoEntryTemplate(): IWindowContainer {
        return this._productInfoEntryTemplate;
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

    private get walletSelection(): IDropMenuWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("wallet_selection"), isIDropMenuWindow);
    }

    private get sortSelection(): IDropMenuWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("sort_selection"), isIDropMenuWindow);
    }

    private get searchInput(): ITextFieldWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("search_input"), isITextFieldWindow);
    }

    private get searchPlaceholder(): IWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("search_placeholder"), isIWindow);
    }

    private get searchIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("search_icon"), isIStaticBitmapWrapperWindow);
    }

    private get clearSearchButton(): IButtonWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("search_clear_button"), isIButtonWindow);
    }

    public onWalletsAddressesUpdated(param1: any[]): void {
        this.initializeWallets(param1);
    }

    public sendClaimWaitNotification(): void {
        this.controller.catalog.events.dispatchEvent(new CatalogEvent("COLLECTIBLE_CLAIM_WAIT"));
    }

    public activateCollection(param1: CollectionsNavigationNodeRenderer): void {
        if (this._SafeStr_2638 == param1) {
            return;
        }
        if (this._SafeStr_2638 != null) {
            this._SafeStr_2638.deactivate();
        }
        if (this._SafeStr_2917 != null) {
            this._SafeStr_2917.dispose();
        }
        this._SafeStr_2638 = param1;
        this._SafeStr_2917 = new CollectionView(this, this.collectionContainer, this._SafeStr_2638.nftCollection);
        this._SafeStr_2638.activate();
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.controller.removeUpdateReceiver(this);
        this.clearNavigationList();
        this.removeMessageEvents();
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
            _loc2_ = CollectionsTab.BG_STAR_ROTATE_SPEED * (param1 / 1000);
            this._SafeStr_3957.rotation += _loc2_;
            this._SafeStr_3957.rotation %= 360;
            this._SafeStr_3957.invalidate();
            if (this._SafeStr_2917 != null) {
                this._SafeStr_2917.updateBonusProgressBar(false, param1);
            }
        } else {
            _loc2_ = CollectionsTab._SafeStr_4583 * (param1 / 1000);
            this._loadingIcon.rotation += _loc2_;
            this._loadingIcon.rotation %= 360;
            this._loadingIcon.invalidate();
        }
    }

    private addMessageEvents(): void {
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this._messageEvents.push(new NftCollectionsMessageEvent(this.onNftCollectionsMessage));
        this._messageEvents.push(new NftBonusItemClaimResultMessageEvent(this.onBonusClaimResult));
        this._messageEvents.push(new NftRewardItemClaimResultMessageEvent(this.onRewardClaimResult));
        for (const _loc1_ of this._messageEvents ?? []) {
            this._SafeStr_2288.addMessageEvent(_loc1_);
        }
    }

    private initializeWallets(param1: any[]): void {
        if (param1.length == 0) {
            this.walletSelection.color = 13421772;
            this.walletSelection.disable();
            return;
        }
        this.walletSelection.color = 16777215;
        this.walletSelection.enable();
        let _loc3_: any[] = [];
        for (const _loc2_ of param1 ?? []) {
            _loc3_.push(_loc2_ == this._SafeStr_3090.stardustWallet ? "Collector Wallet" : _loc2_);
        }
        this.walletSelection.populate(_loc3_);
    }

    private populateSortOptions(): void {
        let _loc1_: any[] = [];
        _loc1_.push(this.controller.localizationManager.getLocalization("collectibles.sort.default", "Default"));
        _loc1_.push(this.controller.localizationManager.getLocalization("collectibles.sort.progress", "Progress"));
        _loc1_.push(this.controller.localizationManager.getLocalization("collectibles.sort.score", "Score"));
        this.sortSelection.populate(_loc1_);
    }

    private onSortSelectAction = (param1: WindowEvent): void => {
        let _loc2_: CollectionsNavigationNodeRenderer = null;
        this.clearNavigationList();
        let _loc3_: any[] = [];
        if (this.sortSelection.selection == 1) {
            _loc3_ = this.sortCollectionsByProgress(this._SafeStr_4180);
        } else if (this.sortSelection.selection == 2) {
            _loc3_ = this.sortCollectionsByScore(this._SafeStr_4180);
        } else {
            _loc3_ = CollectionsTab.sortCollectionsByBonus(this._SafeStr_4180);
        }
        for (const _loc4_ of _loc3_ ?? []) {
            _loc2_ = new CollectionsNavigationNodeRenderer(this, _loc4_);
            this._navigationList.addListItem(_loc2_.window);
            this._renderableItems.push(_loc2_);
        }
        this.filterSearchResults();
    };

    private onFilterChangeAction = (param1: WindowEvent): void => {
        this.filterSearchResults();
    };

    private filterSearchResults(): void {
        let _loc2_: string = null;
        this._navigationList.autoArrangeItems = false;
        for (const _loc1_ of this._renderableItems ?? []) {
            if (this.searchInput.text.length > 0) {
                _loc2_ = _loc1_.nftCollection.collectionName.toLowerCase();
                if (_loc2_.indexOf(this.searchInput.text) == -1) {
                    _loc1_.window.visible = false;
                } else {
                    _loc1_.window.visible = true;
                }
            } else {
                _loc1_.window.visible = true;
            }
        }
        this._navigationList.autoArrangeItems = true;
        let _loc3_: any = this.searchInput.text.length > 0;
        this.setSearchState(_loc3_);
    }

    private setSearchState(param1: boolean): void {
        this.searchIcon.visible = param1;
        this.searchPlaceholder.visible = !param1;
    }

    private onClearSearchAction = (param1: WindowMouseEvent): void => {
        this.searchInput.text = "";
        this.filterSearchResults();
    };

    private onWalletSelectAction = (param1: WindowEvent): void => {
        if (!this._ignoreWalletSelectionEvents) {
            this._SafeStr_3090.setActiveWalletIndex(this.walletSelection.selection);
        }
    };

    private onNftCollectionsMessage = (param1: NftCollectionsMessageEvent): void => {
        if (!this._SafeStr_5337 || this._navigationList.numListItems != 0) {
            return;
        }
        this._SafeStr_5337 = false;
        let _loc2_: any[] = param1.getParser().nftCollections;
        this._SafeStr_4180 = _loc2_;
        this.sortSelection.selection = 0;
        if (this._renderableItems.length > 0) {
            this.activateCollection(this._renderableItems[0]);
        }
        this.setReady(true);
        this.collectionContainer.visible = this._renderableItems.length > 0;
    };

    private sortCollectionsByScore(param1: any[]): any[] {
        let _loc2_: any[] = [];
        let _loc4_: any[] = [];
        for (const _loc3_ of param1 ?? []) {
            if (_loc3_.collectionScore > 0) {
                _loc2_.push(_loc3_);
            } else {
                _loc4_.push(_loc3_);
            }
        }
        _loc2_.sort(this.compareByScore);
        return _loc2_.concat(_loc4_);
    }

    private sortCollectionsByProgress(param1: any[]): any[] {
        let _loc2_: any[] = [];
        let _loc4_: any[] = [];
        for (const _loc3_ of param1 ?? []) {
            if (_loc3_.progressPercentage > 0) {
                _loc2_.push(_loc3_);
            } else {
                _loc4_.push(_loc3_);
            }
        }
        _loc2_.sort(this.compareByProgress);
        return _loc2_.concat(_loc4_);
    }

    private compareByProgress = (param1: NftCollection, param2: NftCollection): number => {
        if (param1.progressPercentage >= param2.progressPercentage) {
            return -1;
        }
        if (param1.progressPercentage < param2.progressPercentage) {
            return 1;
        }
        return 0;
    };

    private compareByScore = (param1: NftCollection, param2: NftCollection): number => {
        if (param1.collectionScore >= param2.collectionScore) {
            return -1;
        }
        if (param1.collectionScore < param2.collectionScore) {
            return 1;
        }
        return 0;
    };

    private sendClaimNotification(param1: boolean): void {
        this.controller.catalog.events.dispatchEvent(new CatalogEvent(param1 ? "COLLECTIBLE_CLAIM_SUCCESS" : "COLLECTIBLES_CLAIM_FAIL"));
    }

    private onBonusClaimResult = (param1: NftBonusItemClaimResultMessageEvent): void => {
        let _loc2_: NftBonusItemClaimResultMessageEventParser = param1.getParser();
        this.sendClaimNotification(_loc2_.success);
        if (this._SafeStr_3090.activeWallet != _loc2_.walletAddress) {
            return;
        }
        let _loc3_: NftCollection = this.getCollectionById(_loc2_.collectionId);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.claimBonusFinished(_loc2_.success);
        if (this._SafeStr_2917 != null && this._SafeStr_2917.nftCollection.collectionId == _loc2_.collectionId) {
            this._SafeStr_2917.claimingFinished(true, _loc2_.success);
        }
    };

    private onRewardClaimResult = (param1: NftRewardItemClaimResultMessageEvent): void => {
        let _loc2_: NftRewardItemClaimResultMessageEventParser = param1.getParser();
        this.sendClaimNotification(_loc2_.success);
        if (this._SafeStr_3090.activeWallet != _loc2_.walletAddress) {
            return;
        }
        let _loc3_: NftCollection = this.getCollectionById(_loc2_.collectionId);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.claimRewardFinished(_loc2_.success);
        if (this._SafeStr_2917 != null && this._SafeStr_2917.nftCollection.collectionId == _loc2_.collectionId) {
            this._SafeStr_2917.claimingFinished(true, _loc2_.success);
        }
    };

    private getCollectionById(param1: string): NftCollection {
        let _loc3_: NftCollection = null;
        if (this._renderableItems == null) {
            return null;
        }
        for (const _loc2_ of this._renderableItems ?? []) {
            _loc3_ = _loc2_.nftCollection;
            if (_loc3_.collectionId == param1) {
                return _loc3_;
            }
        }
        return null;
    }

    private setReady(param1: boolean): void {
        this.loadedContainer.visible = param1;
        this.loadingContainer.visible = !param1;
        this._isReady = param1;
    }

    private requestCollections(param1: string): void {
        this.clearNavigationList();
        this._SafeStr_5337 = true;
        this._SafeStr_2288.send(new GetNftCollectionsMessageComposer(param1 == null ? "" : param1));
    }

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

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (CollectionsTab.#staticsReady) return;
        CollectionsTab.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(CollectionsTab, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.collectibles.tabs.CollectionsTab"));
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
