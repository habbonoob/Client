import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { IMarketPlace } from '@/com/sulake/habbo/catalog/marketplace/IMarketPlace';
import type { IMarketPlaceVisualization } from '@/com/sulake/habbo/catalog/marketplace/IMarketPlaceVisualization';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { ILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';
import type { IRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { MarketPlaceOfferData } from '@/com/sulake/habbo/catalog/marketplace/MarketPlaceOfferData';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { isILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';
import { isIRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';

export class MarketPlaceOwnItemsCatalogWidget extends CatalogWidget implements ICatalogWidget, IGetImageListener, IMarketPlaceVisualization {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::MarketPlaceOwnItemsCatalogWidget'); }

    private static readonly ITEM_POOL_MAX_SIZE: number = 2000;
    private readonly STATUS_SEARCHING: number = 1;
    private readonly STATUS_LIST_AVAILABLE: number = 2;
    private readonly MAX_SEARCH_STRING_LENGTH: number = 40;

    declare private _itemTemplates: UtilsMap;

    declare private _itemPools: UtilsMap;

    declare private _itemList: IItemListWindow;

    declare private _allOffers: UtilsMap;

    declare private _offers: UtilsMap;

    declare private _offerWindowsById: UtilsMap;

    private _SafeStr_3657: string = "";
    private _SafeStr_14159: number = 1;
    private _ignoreCategorySelectionEvents: boolean = false;

    constructor(param1: IWindowContainer) {
        super(param1);
        this._itemTemplates = new UtilsMap();
        this._itemPools = new UtilsMap();
        this._offerWindowsById = new UtilsMap();
    }

    public override dispose(): void {
        this.clearVisibleItems();
        if (this._itemTemplates != null) {
            for (const _loc1_ of valuesOf(this._itemTemplates)) {
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
            }
            this._itemTemplates.dispose();
            this._itemTemplates = null;
        }
        if (this._itemPools != null) {
            for (const _loc2_ of valuesOf(this._itemPools)) {
                this.disposeItemPool(_loc2_);
            }
            this._itemPools.dispose();
            this._itemPools = null;
        }
        if (this._offerWindowsById != null) {
            this._offerWindowsById.dispose();
            this._offerWindowsById = null;
        }
        if (this._offers != null) {
            this._offers.dispose();
            this._offers = null;
        }
        this._allOffers = null;
        super.dispose();
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        if (this.marketPlace == null) {
            return false;
        }
        let _loc3_: IHabboWindowManager = this.marketPlace.windowManager;
        if (_loc3_ == null) {
            return false;
        }
        this.displayMainView();
        let _loc2_: IItemListWindow = asGuarded(this._window.findChildByName("item_list"), isIItemListWindow);
        this._itemTemplates.add(1, _loc2_.removeListItem(_loc2_.getListItemByName("ongoing_item")));
        this._itemTemplates.add(2, _loc2_.removeListItem(_loc2_.getListItemByName("sold_item")));
        this._itemTemplates.add(3, _loc2_.removeListItem(_loc2_.getListItemByName("expired_item")));
        let _loc1_: ITextFieldWindow = asGuarded(this._window.findChildByName("search_input"), isITextFieldWindow);
        if (_loc1_ != null) {
            _loc1_.text = "";
        }
        this.updateSearchUiState();
        this.populateCategoryDropMenu();
        this.marketPlace.registerVisualization(this);
        this.setSelectedCategory(1);
        return true;
    }

    private showRedeemInfo(param1: boolean): void {
        if (!this.window) {
            return;
        }
        let _loc2_: IWindowContainer = asGuarded(this.window.findChildByName("redeem_border"), isIWindowContainer);
        if (_loc2_) {
            _loc2_.visible = param1;
        }
    }

    private updateBottomActionButtons(param1: boolean): void {
        if (!this.window) {
            return;
        }
        let _loc2_: boolean = this._SafeStr_14159 == 1;
        let _loc3_: IButtonWindow = asGuarded(this.window.findChildByName("recall_all_button"), isIButtonWindow);
        if (_loc3_ != null) {
            _loc3_.visible = _loc2_;
            if (param1 && _loc2_) {
                _loc3_.enable();
            } else {
                _loc3_.disable();
            }
        }
        let _loc4_: IButtonWindow = asGuarded(this.window.findChildByName("mark_as_seen_button"), isIButtonWindow);
        if (_loc4_ != null) {
            _loc4_.visible = !_loc2_;
            if (param1 && !_loc2_) {
                _loc4_.enable();
            } else {
                _loc4_.disable();
            }
        }
    }

    public listUpdatedNotify(): void {
        if (this.marketPlace == null) {
            return;
        }
        this._allOffers = this.marketPlace.latestOwnOffers();
        this.applySearchFilter();
    }

    public removeOfferIds(param1: any[]): void {
        let _loc2_: IWindow = null;
        let _loc4_: IWindow = null;
        if (!this._itemList || !this._offers || !this._offerWindowsById || param1 == null) {
            return;
        }
        this._itemList.autoArrangeItems = false;
        for (const _loc3_ of param1 ?? []) {
            if (this._offers != null) {
                this._offers.remove(_loc3_);
            }
            _loc2_ = asGuarded(this._offerWindowsById.remove(_loc3_), isIWindow);
            if (_loc2_ != null) {
                _loc4_ = this._itemList.removeListItem(_loc2_);
                if (_loc4_ != null) {
                    this.recycleItemWindow(isIWindowContainer(_loc4_) ? _loc4_ : null);
                }
            }
        }
        this._itemList.autoArrangeItems = true;
        this.updateListSummary();
    }

    private applySearchFilter(): void {
        if (this._allOffers == null) {
            return;
        }
        if (this._offers != null) {
            this._offers.dispose();
        }
        this._offers = new UtilsMap();
        for (const _loc1_ of valuesOf(this._allOffers)) {
            if (this.matchesSearch(_loc1_)) {
                this._offers.add(_loc1_.offerId, _loc1_);
            }
        }
        this.updateList(this._offers);
    }

    private updateStatusDisplay(param1: number, param2: number = -1): void {
        let _loc5_: string = null;
        if (!this.marketPlace || !this.window) {
            return;
        }
        let _loc3_: IHabboLocalizationManager = this.marketPlace.localization;
        if (!_loc3_) {
            return;
        }
        let _loc4_: IWindow = this.window.findChildByName("status_text");
        if (_loc4_ == null) {
            return;
        }
        if (param1 == 1) {
            _loc5_ = _loc3_.getLocalization("catalog.marketplace.searching");
        } else if (param1 == 2) {
            if (param2 > 0) {
                _loc5_ = _loc3_.getLocalization("catalog.marketplace.items_found");
                _loc5_ = _loc5_.replace("%count%", String(param2));
            } else {
                _loc5_ = _loc3_.getLocalization("catalog.marketplace.no_items");
            }
        }
        _loc4_.caption = _loc5_;
    }

    private get marketPlace(): IMarketPlace {
        if (!this.page || !this.page.viewer || !this.page.viewer.catalog) {
            return null;
        }
        return this.page.viewer.catalog.getMarketPlace();
    }

    private updateList(param1: UtilsMap): void {
        let _loc19_: number = 0;
        let _loc13_: number = 0;
        let _loc15_: MarketPlaceOfferData = null;
        let _loc4_: IWindowContainer = null;
        let _loc7_: IWindow = null;
        let _loc10_: IWindow = null;
        let _loc27_: IWindow = null;
        let _loc11_: string = null;
        let _loc9_: IWindow = null;
        let _loc23_: number = 0;
        let _loc16_: number = 0;
        let _loc18_: number = 0;
        let _loc12_: string = null;
        let _loc26_: string = null;
        let _loc20_: IWindow = null;
        let _loc14_: IWindow = null;
        let _loc6_: ImageResult = null;
        let _loc21_: IBitmapWrapperWindow = null;
        let _loc8_: Point = null;
        let _loc25_: IWindow = null;
        let _loc17_: IWidgetWindow = null;
        let _loc24_: ILimitedItemGridOverlayWidget = null;
        let _loc22_: IWidgetWindow = null;
        let _loc3_: IRarityItemGridOverlayWidget = null;
        if (!param1 || !this.marketPlace || !this.window) {
            return;
        }
        let _loc2_: IHabboLocalizationManager = this.marketPlace.localization;
        if (!_loc2_) {
            return;
        }
        if (!this._itemList) {
            return;
        }
        this.clearVisibleItems();
        let _loc5_: any[] = param1.getKeys();
        if (!_loc5_) {
            return;
        }
        _loc19_ = 0;
        while (_loc19_ < _loc5_.length) {
            _loc13_ = _loc5_[_loc19_] | 0;
            _loc15_ = asInstanceOf(param1.getValue(_loc13_), MarketPlaceOfferData);
            _loc4_ = this.claimItemWindow(_loc15_.status);
            if (!(!_loc4_ || Boolean(_loc4_.disposed))) {
                _loc7_ = _loc4_.findChildByName("item_name");
                if (_loc7_ != null) {
                    _loc7_.caption = this.marketPlace != null ? "${" + this.marketPlace.getNameLocalizationKey(_loc15_) + "}" : "";
                }
                _loc10_ = _loc4_.findChildByName("item_desc");
                if (_loc10_ != null) {
                    _loc10_.caption = this.marketPlace != null ? "${" + this.marketPlace.getDescriptionLocalizationKey(_loc15_) + "}" : "";
                }
                _loc27_ = _loc4_.findChildByName("item_price");
                if (_loc27_ != null) {
                    _loc11_ = _loc2_.getLocalization("catalog.marketplace.offer.price_own_item");
                    _loc11_ = _loc11_.replace("%price%", String(_loc15_.price));
                    _loc27_.caption = _loc11_;
                }
                if (_loc15_.status == 1) {
                    _loc9_ = _loc4_.findChildByName("item_time");
                    if (_loc9_ != null) {
                        _loc23_ = Math.max(1, _loc15_.timeLeftMinutes) | 0;
                        _loc16_ = Math.floor(_loc23_ / 60) | 0;
                        _loc18_ = _loc23_ - _loc16_ * 60;
                        _loc12_ = _loc18_ + " " + _loc2_.getLocalization("catalog.marketplace.offer.minutes");
                        if (_loc16_ > 0) {
                            _loc12_ = _loc16_ + " " + _loc2_.getLocalization("catalog.marketplace.offer.hours") + " " + _loc12_;
                        }
                        _loc26_ = _loc2_.getLocalization("catalog.marketplace.offer.time_left");
                        _loc26_ = _loc26_.replace("%time%", _loc12_);
                        _loc9_.caption = _loc26_;
                    }
                }
                if (_loc15_.status == 2) {
                    _loc20_ = _loc4_.findChildByName("item_sold");
                    if (_loc20_ != null) {
                        _loc20_.caption = this.getStatusText(_loc2_, _loc15_, "catalog.marketplace.offer.sold", "catalog.marketplace.offer.sold_at");
                    }
                }
                if (_loc15_.status == 3) {
                    _loc14_ = _loc4_.findChildByName("item_expired");
                    if (_loc14_ != null) {
                        _loc14_.caption = this.getStatusText(_loc2_, _loc15_, "catalog.marketplace.offer.expired", "catalog.marketplace.offer.expired_at");
                    }
                }
                if (_loc15_.image == null) {
                    _loc6_ = this.getFurniImageResult(_loc15_.furniId, _loc15_.furniType, _loc15_.extraData);
                    if (_loc6_ != null) {
                        if (_loc6_.data != null) {
                            _loc15_.image = _loc6_.data instanceof BitmapData ? _loc6_.data : null;
                        } else {
                            _loc15_.imageCallback = _loc6_.id;
                            _loc4_.id = _loc6_.id;
                        }
                    }
                }
                if (_loc15_.image != null) {
                    _loc21_ = asGuarded(_loc4_.findChildByName("item_image"), isIBitmapWrapperWindow);
                    if (_loc21_ != null) {
                        _loc8_ = new Point((_loc21_.width - _loc15_.image.width) / 2, (_loc21_.height - _loc15_.image.height) / 2);
                        _loc21_.bitmap = new BitmapData(_loc21_.width, _loc21_.height, true, 0);
                        _loc21_.bitmap.copyPixels(_loc15_.image, _loc15_.image.rect, _loc8_);
                    }
                }
                if (_loc15_.isUniqueLimitedItem) {
                    _loc25_ = _loc4_.findChildByName("unique_item_background_bitmap");
                    _loc17_ = castGuarded(_loc4_.findChildByName("unique_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
                    _loc24_ = castGuarded(_loc17_.widget, isILimitedItemGridOverlayWidget, "com.sulake.habbo.window.widgets.ILimitedItemGridOverlayWidget");
                    _loc24_.serialNumber = _loc15_.stuffData.uniqueSerialNumber;
                    _loc24_.animated = true;
                    _loc25_.visible = true;
                    _loc17_.visible = true;
                }
                if (_loc15_.stuffData && _loc15_.stuffData.rarityLevel >= 0) {
                    _loc22_ = castGuarded(_loc4_.findChildByName("rarity_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
                    _loc3_ = castGuarded(_loc22_.widget, isIRarityItemGridOverlayWidget, "com.sulake.habbo.window.widgets.IRarityItemGridOverlayWidget");
                    _loc22_.visible = true;
                    _loc3_.rarityLevel = _loc15_.stuffData.rarityLevel;
                }
                this._itemList.addListItem(_loc4_);
                this._offerWindowsById.add(_loc15_.offerId, _loc4_);
                _loc4_.procedure = this.onGridEvent;
            }
            _loc19_++;
        }
        this.updateListSummary();
    }

    private updateListSummary(): void {
        if (!this.marketPlace || !this._allOffers || !this._offers || !this.window) {
            return;
        }
        let _loc1_: IHabboLocalizationManager = this.marketPlace.localization;
        if (!_loc1_) {
            return;
        }
        this.updateStatusDisplay(2, this._offers.length | 0);
        this.showRedeemInfo(true);
        this.updateBottomActionButtons(this._allOffers.length > 0);
    }

    public displayMainView(): void {
        this.attachWidgetView("marketPlaceOwnItemsWidget");
        this.window.procedure = this.onWidgetEvent;
        this._itemList = asGuarded(this.window.findChildByName("item_list"), isIItemListWindow);
    }

    public imageReady(param1: number, param2: BitmapData): void {
        let _loc5_: any = null;
        let _loc7_: IBitmapWrapperWindow = null;
        let _loc6_: Point = null;
        if (this.disposed || !this.marketPlace || !param2 || !this._itemList || !this._offers) {
            return;
        }
        let _loc4_: any[] = [];
        if (this._itemList.groupListItemsWithID(param1 >>> 0, _loc4_)) {
            for (_loc5_ of _loc4_ ?? []) {
                if (_loc5_) {
                    _loc7_ = asGuarded(_loc5_.findChildByName("item_image"), isIBitmapWrapperWindow);
                    if (_loc7_ != null) {
                        _loc7_.bitmap = new BitmapData(_loc7_.width, _loc7_.height, true, 16777215);
                        _loc6_ = new Point((_loc7_.width - param2.width) / 2, (_loc7_.height - param2.height) / 2);
                        _loc7_.bitmap.copyPixels(param2, param2.rect, _loc6_, null, null, true);
                    }
                    _loc5_.id = 0;
                }
            }
        }
        for (const _loc3_ of valuesOf(this._offers)) {
            if (_loc3_.imageCallback == param1) {
                _loc3_.imageCallback = 0;
                _loc3_.image = param2;
            }
        }
    }

    public imageFailed(param1: number): void {
    }

    private getFurniImageResult(param1: number, param2: number, param3: string = null): ImageResult {
        if (!this.page || !this.page.viewer || !this.page.viewer.roomEngine) {
            return null;
        }
        if (param2 == 1) {
            return this.page.viewer.roomEngine.getFurnitureIcon(param1, this);
        }
        if (param2 == 2) {
            return this.page.viewer.roomEngine.getWallItemIcon(param1, this, param3);
        }
        return null;
    }

    private onGridEvent = (param1: WindowEvent, param2: IWindow = null): void => {
        let _loc4_: IItemListWindow = null;
        let _loc5_: number = 0;
        let _loc3_: MarketPlaceOfferData = null;
        if (param1.type == "WME_CLICK") {
            if (!this.marketPlace || !param2 || !this.window) {
                return;
            }
            if (param2.name == "pick_button") {
                _loc4_ = asGuarded(this.window.findChildByName("item_list"), isIItemListWindow);
                if (_loc4_ == null) {
                    return;
                }
                _loc5_ = _loc4_.getListItemIndex(param1.window.parent);
                if (!this._offers) {
                    return;
                }
                _loc3_ = asInstanceOf(this._offers.getWithIndex(_loc5_), MarketPlaceOfferData);
                if (_loc3_) {
                    this.marketPlace.redeemExpiredOffer(_loc3_.offerId);
                }
            }
        }
    };

    private onWidgetEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: ITextFieldWindow = null;
        let _loc4_: number = 0;
        let _loc5_: WindowKeyboardEvent = null;
        if (param2 == null) {
            param2 = asGuarded(param1.target, isIWindow);
        }
        if (param1.type == "WME_CLICK") {
            if (!this.marketPlace || !param2) {
                return;
            }
            if (param2.name == "search_button") {
                this.performSearch();
            }
            if (param2.name == "cancel_search_btn" || param2.parent != null && param2.parent.name == "cancel_search_btn") {
                this.clearSearch();
            }
            if (param2.name == "recall_all_button") {
                this.marketPlace.windowManager.confirm("${shop.marketplace.recall.all.button}", "${shop.marketplace.recall.all.items}", 0, this.onRecallAllConfirm);
            }
            if (param2.name == "mark_as_seen_button") {
                this.marketPlace.windowManager.confirm("${shop.marketplace.mark.as.seen.button}", "${shop.marketplace.mark.as.seen.items}", 0, this.onMarkAsSeenConfirm);
            }
        } else if (param1.type == "WE_CHANGE") {
            _loc3_ = isITextFieldWindow(param2) ? param2 : null;
            if (_loc3_ == null || _loc3_.name != "search_input") {
                return;
            }
            if (_loc3_.text.length > 40) {
                _loc3_.text = _loc3_.text.substr(0, 40);
            }
            _loc3_.scrollH = 0;
            this.updateSearchUiState();
        } else if (param1.type == "WE_SELECTED") {
            if (this._ignoreCategorySelectionEvents || !(isIDropMenuWindow(param2)) || param2.name != "offer_category_dropmenu") {
                return;
            }
            _loc4_ = this.getCategoryForSelection(castGuarded(param2, isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow").selection);
            if (_loc4_ != this._SafeStr_14159) {
                this.setSelectedCategory(_loc4_);
            }
        } else if (param1.type == "WKE_KEY_DOWN") {
            if (isITextFieldWindow(param2) && param2.name == "search_input") {
                _loc5_ = param1 instanceof WindowKeyboardEvent ? param1 : null;
                if (_loc5_ != null && _loc5_.keyCode == 13) {
                    this.performSearch();
                }
            }
        }
    };

    private performSearch(): void {
        if (!this.window) {
            return;
        }
        let _loc1_: ITextFieldWindow = asGuarded(this.window.findChildByName("search_input"), isITextFieldWindow);
        if (_loc1_ == null) {
            return;
        }
        this._SafeStr_3657 = this.normalizeSearchText(_loc1_.text);
        this.applySearchFilter();
    }

    private clearSearch(): void {
        if (!this.window) {
            return;
        }
        let _loc1_: ITextFieldWindow = asGuarded(this.window.findChildByName("search_input"), isITextFieldWindow);
        if (_loc1_ != null) {
            _loc1_.text = "";
            _loc1_.scrollH = 0;
        }
        this._SafeStr_3657 = "";
        this.updateSearchUiState();
        this.applySearchFilter();
    }

    private matchesSearch(param1: MarketPlaceOfferData): boolean {
        if (this._SafeStr_3657 == "") {
            return true;
        }
        return this.getOfferSearchText(param1).indexOf(this._SafeStr_3657) >= 0;
    }

    private getOfferSearchText(param1: MarketPlaceOfferData): string {
        if (param1 == null || this.marketPlace == null || this.marketPlace.localization == null) {
            return "";
        }
        let _loc2_: IHabboLocalizationManager = this.marketPlace.localization;
        let _loc3_: string = this.marketPlace.getNameLocalizationKey(param1);
        let _loc4_: string = this.marketPlace.getDescriptionLocalizationKey(param1);
        let _loc6_: string = _loc2_.getLocalization(_loc3_, "");
        let _loc5_: string = _loc2_.getLocalization(_loc4_, "");
        return this.normalizeSearchText(_loc6_ + " " + _loc5_);
    }

    private normalizeSearchText(param1: string): string {
        return param1 == null ? "" : param1.toLowerCase();
    }

    private updateSearchUiState(): void {
        if (!this.window) {
            return;
        }
        let _loc1_: ITextFieldWindow = asGuarded(this.window.findChildByName("search_input"), isITextFieldWindow);
        let _loc3_: IWindow = this.window.findChildByName("search_placeholder");
        let _loc2_: IWindow = this.window.findChildByName("cancel_search_btn");
        let _loc4_: boolean = _loc1_ != null && _loc1_.text.length > 0;
        if (_loc3_ != null) {
            _loc3_.visible = !_loc4_;
        }
        if (_loc2_ != null) {
            _loc2_.visible = _loc4_;
        }
    }

    private getStatusText(param1: IHabboLocalizationManager, param2: MarketPlaceOfferData, param3: string, param4: string): string {
        let _loc5_: string = param1.getLocalization(param3, "");
        if (param2 == null || isNaN(param2.statusTime) || param2.statusTime <= 0) {
            return _loc5_;
        }
        return param1.getLocalizationWithParams(param4, _loc5_, "timestamp", this.formatStatusTime(param2.statusTime));
    }

    private formatStatusTime(param1: number): string {
        return new Date(param1).toLocaleString();
    }

    private populateCategoryDropMenu(): void {
        if (!this.window || this.marketPlace == null || this.marketPlace.localization == null) {
            return;
        }
        let _loc2_: IDropMenuWindow = asGuarded(this.window.findChildByName("offer_category_dropmenu"), isIDropMenuWindow);
        if (_loc2_ == null) {
            return;
        }
        let _loc1_: IHabboLocalizationManager = this.marketPlace.localization;
        let _loc3_: any[] = [];
        _loc3_.push(_loc1_.getLocalization("shop.marketplace.own.offers.category.open", "OPEN"));
        _loc3_.push(_loc1_.getLocalization("shop.marketplace.own.offers.category.sold", "SOLD"));
        _loc3_.push(_loc1_.getLocalization("shop.marketplace.own.offers.category.expired", "EXPIRED"));
        this._ignoreCategorySelectionEvents = true;
        _loc2_.populate(_loc3_);
        _loc2_.selection = this.getDropMenuSelectionForCategory(this._SafeStr_14159);
        this._ignoreCategorySelectionEvents = false;
    }

    private setSelectedCategory(param1: number): void {
        let _loc3_: IDropMenuWindow = null;
        let _loc2_: number = 0;
        this._SafeStr_14159 = param1;
        if (this.window != null) {
            _loc3_ = asGuarded(this.window.findChildByName("offer_category_dropmenu"), isIDropMenuWindow);
            if (_loc3_ != null) {
                _loc2_ = this.getDropMenuSelectionForCategory(param1);
                if (_loc3_.selection != _loc2_) {
                    this._ignoreCategorySelectionEvents = true;
                    _loc3_.selection = _loc2_;
                    this._ignoreCategorySelectionEvents = false;
                }
            }
        }
        this.clearCurrentOffersView();
        this.updateBottomActionButtons(false);
        if (this.marketPlace != null) {
            this.marketPlace.requestOwnItems(param1);
        }
    }

    private clearCurrentOffersView(): void {
        this.clearVisibleItems();
        if (this._offers != null) {
            this._offers.dispose();
            this._offers = null;
        }
        this._allOffers = null;
        this.updateStatusDisplay(1);
        this.showRedeemInfo(false);
    }

    private getDropMenuSelectionForCategory(param1: number): number {
        switch (param1 - 2) {
            case 0:
                return 1;
            case 1:
                return 2;
            default:
                return 0;
        }
    }

    private getCategoryForSelection(param1: number): number {
        switch (param1 - 1) {
            case 0:
                return 2;
            case 1:
                return 3;
            default:
                return 1;
        }
    }

    private clearVisibleItems(): void {
        if (this._itemList == null) {
            return;
        }
        this._itemList.autoArrangeItems = false;
        while (this._itemList.numListItems > 0) {
            this.recycleItemWindow(asGuarded(this._itemList.removeListItemAt(0), isIWindowContainer));
        }
        this._itemList.autoArrangeItems = true;
        if (this._offerWindowsById != null) {
            this._offerWindowsById.reset();
        }
    }

    private claimItemWindow(param1: number): IWindowContainer {
        let _loc2_: IWindowContainer[] = this.getItemPool(param1);
        if (_loc2_.length > 0) {
            return _loc2_.pop();
        }
        let _loc3_: IWindowContainer = asGuarded(this._itemTemplates.getValue(param1), isIWindowContainer);
        return _loc3_ == null ? null : asGuarded(_loc3_.clone(), isIWindowContainer);
    }

    private recycleItemWindow(param1: IWindowContainer): void {
        if (param1 == null) {
            return;
        }
        let _loc3_: number = this.getStatusForWindow(param1);
        let _loc2_: IWindowContainer[] = this.getItemPool(_loc3_);
        if (_loc2_ == null || _loc2_.length >= 2000) {
            param1.dispose();
            return;
        }
        this.resetPooledWindow(param1);
        _loc2_.push(param1);
    }

    private getItemPool(param1: number): IWindowContainer[] {
        if (this._itemPools == null || param1 < 0) {
            return null;
        }
        let _loc2_: IWindowContainer[] = asGuarded(this._itemPools.getValue(param1), Array.isArray);
        if (_loc2_ == null) {
            _loc2_ = new Array<IWindowContainer>(0).fill(null);
            this._itemPools.add(param1, _loc2_);
        }
        return _loc2_;
    }

    private disposeItemPool(param1: IWindowContainer[]): void {
        if (param1 == null) {
            return;
        }
        for (const _loc2_ of param1 ?? []) {
            if (_loc2_ != null) {
                _loc2_.dispose();
            }
        }
        param1.length = 0;
    }

    private resetPooledWindow(param1: IWindowContainer): void {
        param1.id = 0;
        param1.procedure = null;
        let _loc4_: IBitmapWrapperWindow = asGuarded(param1.findChildByName("item_image"), isIBitmapWrapperWindow);
        if (_loc4_ != null) {
            _loc4_.bitmap = null;
        }
        let _loc5_: IWindow = param1.findChildByName("unique_item_background_bitmap");
        if (_loc5_ != null) {
            _loc5_.visible = false;
        }
        let _loc2_: IWidgetWindow = asGuarded(param1.findChildByName("unique_item_overlay_widget"), isIWidgetWindow);
        if (_loc2_ != null) {
            _loc2_.visible = false;
        }
        let _loc3_: IWidgetWindow = asGuarded(param1.findChildByName("rarity_item_overlay_widget"), isIWidgetWindow);
        if (_loc3_ != null) {
            _loc3_.visible = false;
        }
    }

    private getStatusForWindow(param1: IWindowContainer): number {
        if (param1 == null) {
            return -1;
        }
        switch (param1.name) {
            case "ongoing_item":
                return 1;
            case "sold_item":
                return 2;
            case "expired_item":
                return 3;
            default:
                return -1;
        }
    }

    private onRecallAllConfirm = (param1: IConfirmDialog, param2: WindowEvent): void => {
        if (param1 == null) {
            return;
        }
        param1.dispose();
        if (param2.type != "WE_OK" || this.marketPlace == null) {
            return;
        }
        this.marketPlace.recallAllOffers();
    };

    private onMarkAsSeenConfirm = (param1: IConfirmDialog, param2: WindowEvent): void => {
        if (param1 == null) {
            return;
        }
        param1.dispose();
        if (param2.type != "WE_OK" || this.marketPlace == null) {
            return;
        }
        this.marketPlace.clearOwnHistory(this._SafeStr_14159);
    };

    public updateStats(): void {
    }

    get [IGetImageListener](): true {
        return true;
    }
}
