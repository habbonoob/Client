import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { ICollectorHub } from '@/com/sulake/habbo/catalog/collectibles/ICollectorHub';
import type { TradeNftItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/trading/TradeNftItem';
import type { CollectiblesModel } from '@/com/sulake/habbo/inventory/collectibles/CollectiblesModel';
import type { IInventoryView } from '@/com/sulake/habbo/inventory/IInventoryView';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { CollectibleGroupedItem } from '@/com/sulake/habbo/inventory/collectibles/CollectibleGroupedItem';
import { CollectiblesGridView } from '@/com/sulake/habbo/inventory/collectibles/CollectiblesGridView';
import { isIProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';

export class CollectiblesView implements IInventoryView, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.inventory.collectibles::CollectiblesView'); }

    private static readonly IMAGE_UPDATE_DELAY_MS: number = 30;
    private static readonly FILTER_OPTIONS: any[] = [1, 0, 11, 9, 4, 2, 10];
    private readonly STATE_NULL: number = 0;
    private readonly STATE_INITIALIZING: number = 1;
    private readonly STATE_EMPTY: number = 2;
    private readonly STATE_CONTENT: number = 3;

    declare private _windowManager: IHabboWindowManager;

    declare private _view: IWindowContainer;

    declare private _SafeStr_2134: CollectiblesModel;

    private _disposed: boolean = false;
    private _isInitialized: boolean = false;

    declare private _grid: CollectiblesGridView;

    private _groupedItems: UtilsMap = new UtilsMap();
    private _SafeStr_3894: number = 0;

    declare private _SafeStr_3259: Timer;

    constructor(param1: CollectiblesModel, param2: IHabboWindowManager, param3: IAssetLibrary) {
        this._SafeStr_2134 = param1;
        this._windowManager = param2;
        this._SafeStr_3259 = new Timer(30);
        this._SafeStr_3259.addEventListener("timer", this.onImageUpdateTimerEvent);
        this._SafeStr_3259.start();
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get isVisible(): boolean {
        return !!(this._view && this._view.parent != null && this._view.visible);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._windowManager = null;
        this._SafeStr_2134 = null;
        if (this._grid != null) {
            this._grid.dispose();
            this._grid = null;
        }
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        if (this._SafeStr_3259 != null) {
            this._SafeStr_3259.removeEventListener("timer", this.onImageUpdateTimerEvent);
            this._SafeStr_3259.stop();
            this._SafeStr_3259 = null;
        }
    }

    public getWindowContainer(): IWindowContainer {
        if (!this._isInitialized) {
            this.init();
        }
        if (this._view == null || Boolean(this._view.disposed)) {
            return null;
        }
        return this._view;
    }

    public initCollectibles(param1: TradeNftItem[], param2: TradeNftItem[]): void {
        let _loc5_: CollectibleGroupedItem = null;
        let _loc8_: string = null;
        let _loc6_: any = undefined;
        for (const _loc3_ of param1 ?? []) {
            _loc8_ = this.groupKey(_loc3_);
            if (this._groupedItems.hasKey(_loc8_)) {
                _loc5_ = this._groupedItems.getValue(_loc8_);
                _loc5_.addAssetId(_loc3_.assetId);
            } else {
                _loc6_ = [];
                _loc6_.push(_loc3_.assetId);
                _loc5_ = new CollectibleGroupedItem(_loc3_, _loc6_, this._SafeStr_2134);
                this._groupedItems.add(_loc8_, _loc5_);
            }
        }
        for (const _loc9_ of param2 ?? []) {
            _loc8_ = this.groupKey(_loc9_);
            if (this._groupedItems.hasKey(_loc8_)) {
                _loc5_ = this._groupedItems.getValue(_loc8_);
                if (_loc5_.removeAssetId(_loc9_.assetId)) {
                    if (_loc5_.amount == 0) {
                        _loc5_.dispose();
                        this._groupedItems.remove(_loc8_);
                    }
                }
            }
        }
        let _loc7_: CollectibleGroupedItem[] = [];
        for (const _loc4_ of this._groupedItems.getValues() ?? []) {
            _loc7_.push(_loc4_);
        }
        this._grid.setItems(_loc7_);
        this.updateState();
        this.updatePreview();
    }

    private maybeSelectFirst(): void {
        if (this._SafeStr_2134.selected == null && this._grid.currentPageItems != null && this._grid.currentPageItems.length > 0) {
            this._SafeStr_2134.setSelected(this._grid.currentPageItems[0]);
        }
    }

    public unlockAll(): void {
        let _loc1_: any[] = this._groupedItems.getValues();
        for (const _loc2_ of _loc1_ ?? []) {
            _loc2_.unlockAll();
        }
    }

    public findGroupedItem(param1: TradeNftItem, param2: boolean = true): CollectibleGroupedItem {
        let _loc4_: string = this.groupKey(param1);
        let _loc3_: CollectibleGroupedItem = this._groupedItems.getValue(_loc4_);
        if (_loc3_ == null) {
            return null;
        }
        if (!param2 || _loc3_.hasAsset(param1.assetId)) {
            return _loc3_;
        }
        return null;
    }

    public updateFilters(): void {
        if (!this._isInitialized) {
            return;
        }
        if (this._view == null || Boolean(this._view.disposed)) {
            return;
        }
        let _loc2_: number = this.filterOptions.selection;
        let _loc1_: number = Number(_loc2_ <= 0 ? -1 : CollectiblesView.FILTER_OPTIONS[_loc2_ - 1]) | 0;
        this._grid.setFilter(_loc1_, this.filterText.caption);
    }

    private groupKey(param1: TradeNftItem): string {
        return param1.productCode;
    }

    public updatePreview(): void {
        if (!this._isInitialized) {
            return;
        }
        this.maybeSelectFirst();
        if (this._view == null || Boolean(this._view.disposed)) {
            return;
        }
        let _loc4_: CollectibleGroupedItem = this._SafeStr_2134.selected;
        if (_loc4_ == null) {
            return;
        }
        let _loc1_: ICollectorHub = this._SafeStr_2134.controller.catalog.collectorHub;
        let _loc2_: string = _loc1_.getProductName(_loc4_.renderableItem);
        let _loc3_: string = _loc1_.getProductType(_loc4_.renderableItem);
        (asGuarded(this.nftImageWidget.widget, isIProductImageWidget)).productInfo = _loc4_.renderableItem;
        this.nftNameText.text = _loc2_;
        this.nftTypeText.text = this._SafeStr_2134.controller.localization.getLocalization("collectibles.item.type") + ": " + _loc3_;
        if (_loc4_ == null || _loc4_.unlockedAssetCount == 0) {
            this.offerButton.disable();
        } else {
            this.offerButton.enable();
        }
    }

    private init(): void {
        this._view = this._SafeStr_2134.controller.view.getView("collectibles");
        this._view.procedure = this.windowEventProc;
        this._view.visible = false;
        let _loc1_: IItemGridWindow = asGuarded(this._view.findChildByName("item_grid"), isIItemGridWindow);
        let _loc2_: IItemListWindow = asGuarded(this._view.findChildByName("item_grid_pages"), isIItemListWindow);
        this._grid = new CollectiblesGridView(this, _loc1_, _loc2_);
        this._view.findChildByName("filter").caption = "";
        this.populateFilterOptions();
        this._isInitialized = true;
        this.updateState();
    }

    private onImageUpdateTimerEvent = (param1: TimerEvent): void => {
        this.initListImages();
    };

    private initListImages(): void {
        if (this._grid && this._grid.currentPageItems) {
            for (const _loc1_ of this._grid.currentPageItems ?? []) {
                if (!_loc1_.isInitialized) {
                    _loc1_.initializeImage();
                    break;
                }
            }
        }
    }

    private populateFilterOptions(): void {
        let _loc3_: any[] = [];
        let _loc2_: IHabboLocalizationManager = this._SafeStr_2134.controller.localization;
        _loc3_.push(_loc2_.getLocalization("inventory.filter.option.everything", "Everything"));
        for (const _loc1_ of CollectiblesView.FILTER_OPTIONS ?? []) {
            switch (_loc1_) {
                case 0:
                    _loc3_.push(_loc2_.getLocalization("product.type.wall"));
                    break;
                case 1:
                    _loc3_.push(_loc2_.getLocalization("product.type.room"));
                    break;
                case 2:
                    _loc3_.push(_loc2_.getLocalization("product.type.effect"));
                    break;
                case 4:
                    _loc3_.push(_loc2_.getLocalization("product.type.badge"));
                    break;
                case 9:
                    _loc3_.push(_loc2_.getLocalization("product.type.chatstyle"));
                    break;
                case 10:
                    _loc3_.push(_loc2_.getLocalization("product.type.pets"));
                    break;
                case 11:
                    _loc3_.push(_loc2_.getLocalization("product.type.clothing"));
            }
        }
        this.filterOptions.populate(_loc3_);
        this.filterOptions.selection = 0;
    }

    public updateState(): void {
        let _loc1_: number = 0;
        if (!this._isInitialized) {
            return;
        }
        let _loc2_: UtilsMap = this._SafeStr_2134.items;
        if (!this._SafeStr_2134.isListInitialized()) {
            _loc1_ = 1;
        } else if (!_loc2_ || _loc2_.length == 0) {
            _loc1_ = 2;
        } else {
            _loc1_ = 3;
        }
        if (this._SafeStr_3894 == _loc1_) {
            return;
        }
        this._SafeStr_3894 = _loc1_;
        this.updateContainerVisibility();
    }

    public updateContainerVisibility(): void {
        if (this._SafeStr_2134.controller.currentCategoryId != "collectibles") {
            return;
        }
        let _loc1_: IWindowContainer = this._SafeStr_2134.controller.view.loadingContainer;
        let _loc4_: IWindowContainer = this._SafeStr_2134.controller.view.emptyContainer;
        let _loc5_: IWindow = this._view.findChildByName("grid_container");
        let _loc3_: IWindow = this._view.findChildByName("options_container");
        let _loc2_: IWindow = this._view.findChildByName("preview_container");
        switch (this._SafeStr_3894 - 1) {
            case 0:
                if (_loc1_) {
                    _loc1_.visible = true;
                }
                if (_loc4_) {
                    _loc4_.visible = false;
                }
                _loc5_.visible = false;
                _loc3_.visible = false;
                _loc2_.visible = false;
                break;
            case 1:
                if (_loc1_) {
                    _loc1_.visible = false;
                }
                if (_loc4_) {
                    _loc4_.visible = true;
                }
                _loc5_.visible = false;
                _loc3_.visible = false;
                _loc2_.visible = false;
                break;
            case 2:
                if (_loc1_) {
                    _loc1_.visible = false;
                }
                if (_loc4_) {
                    _loc4_.visible = false;
                }
                _loc5_.visible = true;
                _loc3_.visible = true;
                _loc2_.visible = true;
        }
    }

    private windowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc5_: string;
        let _loc4_: number = 0;
        let _loc3_: WindowKeyboardEvent = null;
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "clear_filter_button":
                    this._view.findChildByName("filter").caption = "";
                    param2.visible = false;
                    this.updateFilters();
                    break;
                case "offertotrade_btn":
                    _loc4_ = Math.min(Math.max(1, Number(this.offerAmountInput.caption) | 0), this._SafeStr_2134.selected.unlockedAssetCount) | 0;
                    if (_loc4_ != (Number(this.offerAmountInput.caption) | 0)) {
                        this.offerAmountInput.caption = String(_loc4_);
                    }
                    this._SafeStr_2134.requestAddTrading(this._SafeStr_2134.selected, _loc4_);
            }
        } else if (param1.type == "WKE_KEY_UP") {
            _loc3_ = param1 instanceof WindowKeyboardEvent ? param1 : null;
            _loc5_ = param2.name;
            if ("filter" === _loc5_) {
                this._view.findChildByName("clear_filter_button").visible = param2.caption.length > 0;
                if (_loc3_.keyCode == 13) {
                    this.updateFilters();
                }
            }
        }
        if (param1.type == "WE_SELECTED") {
            _loc5_ = param2.name;
            if ("filter.options" === _loc5_) {
                this.updateFilters();
            }
        }
    };

    public avatarImageReady(param1: string): void {
    }

    private get nftImageWidget(): IWidgetWindow {
        return asGuarded(this._view.findChildByName("nft_image"), isIWidgetWindow);
    }

    private get nftNameText(): ITextWindow {
        return asGuarded(this._view.findChildByName("nft_name"), isITextWindow);
    }

    private get nftTypeText(): ITextWindow {
        return asGuarded(this._view.findChildByName("nft_type"), isITextWindow);
    }

    private get offerAmountInput(): ITextFieldWindow {
        return asGuarded(this._view.findChildByName("offertotrade_cnt"), isITextFieldWindow);
    }

    private get offerButton(): IButtonWindow {
        return asGuarded(this._view.findChildByName("offertotrade_btn"), isIButtonWindow);
    }

    private get filterOptions(): IDropMenuWindow {
        return asGuarded(this._view.findChildByName("filter.options"), isIDropMenuWindow);
    }

    private get filterText(): ITextFieldWindow {
        return asGuarded(this._view.findChildByName("filter"), isITextFieldWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
