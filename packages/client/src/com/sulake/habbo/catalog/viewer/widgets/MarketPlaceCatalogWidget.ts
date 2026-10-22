import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { ISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IMarketPlace } from '@/com/sulake/habbo/catalog/marketplace/IMarketPlace';
import type { IMarketPlaceVisualization } from '@/com/sulake/habbo/catalog/marketplace/IMarketPlaceVisualization';
import type { MarketplaceItemStats } from '@/com/sulake/habbo/catalog/marketplace/MarketplaceItemStats';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { ILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';
import type { ILimitedItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemPreviewOverlayWidget';
import type { IRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { MarketplaceChart } from '@/com/sulake/habbo/catalog/marketplace/MarketplaceChart';
import { MarketPlaceOfferData } from '@/com/sulake/habbo/catalog/marketplace/MarketPlaceOfferData';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { isILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';
import { isILimitedItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemPreviewOverlayWidget';
import { isIRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';

export class MarketPlaceCatalogWidget extends CatalogWidget implements ICatalogWidget, IGetImageListener, IMarketPlaceVisualization {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::MarketPlaceCatalogWidget'); }

    private readonly STATUS_SEARCHING: number = 1;
    private readonly STATUS_LIST_AVAILABLE: number = 2;
    private readonly MAX_SEARCH_STRING_LENGTH: number = 40;
    private readonly MAX_PRICE_STRING_LENGTH: number = 10;

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    private _sortTypes: any[] = [];

    declare private _SafeStr_4075: MarketPlaceOfferData;

    declare private _itemList: IItemListWindow;

    declare private _SafeStr_3490: IWindowContainer;

    declare private _SafeStr_3082: Timer;

    declare private _offers: UtilsMap;

    declare private _SafeStr_4178: number;
    static { (this.prototype as any)._SafeStr_4178 = 0; }

    private get marketPlace(): IMarketPlace {
        if (this.page && this.page.viewer && this.page.viewer.catalog) {
            return this.page.viewer.catalog.getMarketPlace();
        }
        return null;
    }

    public override dispose(): void {
        super.dispose();
        this._SafeStr_4075 = null;
        this._offers = null;
        this._itemList = null;
        if (this._SafeStr_3490) {
            this._SafeStr_3490.dispose();
            this._SafeStr_3490 = null;
        }
        if (this._SafeStr_3082) {
            this._SafeStr_3082.removeEventListener("timer", this.onPopulationTimer);
            this._SafeStr_3082 = null;
        }
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        if (this.marketPlace == null) {
            return false;
        }
        this.marketPlace.registerVisualization(this);
        this.displayMainView();
        let _loc1_: IItemListWindow = asGuarded(this._window.findChildByName("offer_list"), isIItemListWindow);
        this._SafeStr_3490 = asGuarded(_loc1_.removeListItem(_loc1_.getListItemByName("offer_item")), isIWindowContainer);
        return true;
    }

    public listUpdatedNotify(): void {
        this.hideDetails();
        this.updateList();
    }

    public updateStats(): void {
        let _loc9_: MarketplaceChart = null;
        let _loc3_: BitmapData = null;
        let _loc10_: string = null;
        if (!this.marketPlace || !this.marketPlace.localization || !this._window) {
            return;
        }
        let _loc2_: MarketplaceItemStats = this.marketPlace.itemStats;
        if (!_loc2_) {
            return;
        }
        let _loc5_: IWindowContainer = asGuarded(this._window.findChildByName("details_container"), isIWindowContainer);
        if (!_loc5_ || !_loc5_.visible) {
            return;
        }
        let _loc4_: IWindow = _loc5_.findChildByName("offer_count");
        if (_loc4_) {
            this.marketPlace.localization.registerParameter("catalog.marketplace.offer_details.offer_count", "count", _loc2_.offerCount.toString());
            _loc4_.visible = true;
        }
        let _loc6_: ISelectorWindow = asGuarded(_loc5_.findChildByName("chart_selector"), isISelectorWindow);
        if (!_loc6_) {
            return;
        }
        let _loc1_: ISelectableWindow = _loc6_.getSelected();
        if (!_loc1_) {
            return;
        }
        switch (_loc1_.name) {
            case "price_development":
                _loc9_ = new MarketplaceChart(_loc2_.dayOffsets, _loc2_.averagePrices);
                break;
            case "trade_volume":
                _loc9_ = new MarketplaceChart(_loc2_.dayOffsets, _loc2_.soldAmounts);
                break;
            default:
                return;
        }
        if (!_loc9_) {
            return;
        }
        let _loc7_: IBitmapWrapperWindow = asGuarded(_loc5_.findChildByName("chart_bitmap"), isIBitmapWrapperWindow);
        if (_loc7_) {
            _loc7_.bitmap = null;
            _loc7_.bitmap = new BitmapData(_loc7_.width, _loc7_.height);
            _loc3_ = _loc9_.draw(_loc7_.width, _loc7_.height);
            _loc7_.bitmap.draw(_loc3_);
            _loc3_.dispose();
        }
        let _loc8_: IWindow = _loc5_.findChildByName("chart_title");
        if (_loc8_) {
            if (_loc9_.available) {
                _loc10_ = "catalog.marketplace.offer_details.chart_title." + _loc1_.name;
                this.marketPlace.localization.registerParameter(_loc10_, "days", _loc2_.historyLength.toString());
            } else {
                _loc10_ = "catalog.marketplace.offer_details.chart_title.not_available";
            }
            _loc8_.caption = this.marketPlace.localization.getLocalization(_loc10_);
        }
    }

    public displayMainView(): void {
        this.attachWidgetView("marketPlaceWidget");
        this.window.procedure = this.onWidgetEvent;
        this._itemList = asGuarded(this.window.findChildByName("offer_list"), isIItemListWindow);
        this.selectSearchCategory("search_by_activity");
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

    private selectSearchCategory(param1: string): void {
        let _loc5_: string = null;
        let _loc4_: ISelectorWindow = asGuarded(this._window.findChildByName("search_selector"), isISelectorWindow);
        if (_loc4_ == null) {
            return;
        }
        let _loc2_: ISelectableWindow = _loc4_.getSelectableByName(param1);
        if (_loc2_ == null) {
            return;
        }
        _loc4_.setSelected(_loc2_);
        let _loc3_: IWindowContainer = asGuarded(this._window.findChildByName("search_container"), isIWindowContainer);
        if (_loc3_ == null) {
            return;
        }
        while (_loc3_.numChildren > 0) {
            _loc3_.removeChildAt(0);
        }
        switch (param1) {
            case "search_by_value":
                _loc5_ = "marketplace_search_simple";
                this._sortTypes = [1, 2];
                break;
            case "search_by_activity":
                _loc5_ = "marketplace_search_simple";
                this._sortTypes = [3, 4, 5, 6];
                break;
            case "search_advanced":
                _loc5_ = "marketplace_search_advanced";
                this._sortTypes = [1, 2, 3, 4, 5, 6];
                break;
            default:
                return;
        }
        let _loc7_: IWindowContainer = asGuarded(this.createWindow(_loc5_), isIWindowContainer);
        _loc3_.addChild(_loc7_);
        let _loc6_: IDropMenuWindow = asGuarded(this._window.findChildByName("sort_dropmenu"), isIDropMenuWindow);
        if (_loc6_ != null) {
            _loc6_.populate(this.getSortKeys(this._sortTypes));
            _loc6_.selection = 0;
        }
    }

    private getSortKeys(param1: any[]): any[] {
        let _loc2_: any[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc2_.push("${catalog.marketplace.sort." + _loc3_ + "}");
        }
        return _loc2_;
    }

    private createWindow(param1: string): IWindow {
        if (!this.page || !this.page.viewer || !this.page.viewer.catalog || !this.page.viewer.catalog.assets || !this.page.viewer.catalog.windowManager) {
            return null;
        }
        let _loc3_: XmlAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName(param1), XmlAsset);
        if (!_loc3_ || !_loc3_.content) {
            return null;
        }
        let _loc2_: XML = asInstanceOf(_loc3_.content, XML);
        if (!_loc2_) {
            return null;
        }
        return this.page.viewer.catalog.windowManager.buildFromXML(_loc2_);
    }

    private updateStatusDisplay(param1: number, param2: number = -1, param3: number = -1): void {
        let _loc6_: string = null;
        let _loc4_: IHabboLocalizationManager = this.marketPlace.localization;
        if (!_loc4_) {
            return;
        }
        if (!this.window || !this.page || !this.page.viewer || !this.page.viewer.catalog) {
            return;
        }
        let _loc5_: IWindow = this.window.findChildByName("status_text");
        if (_loc5_ == null) {
            return;
        }
        if (param1 == 1) {
            _loc6_ = _loc4_.getLocalization("catalog.marketplace.searching");
        } else if (param3 > 0) {
            _loc6_ = _loc4_.getLocalization("catalog.marketplace.items_found");
            _loc6_ = _loc6_.replace("%count%", String(param3));
            if (param2 > 0 && param2 < param3) {
                _loc6_ += ". " + _loc4_.getLocalization("catalog.marketplace.items_shown") + ".";
                _loc6_ = _loc6_.replace("%count%", String(param2));
            }
        } else {
            _loc6_ = _loc4_.getLocalization("catalog.marketplace.no_items");
        }
        _loc5_.caption = _loc6_;
    }

    private updateList(): void {
        if (!this.marketPlace || !this.window) {
            return;
        }
        let _loc1_: UtilsMap = this.marketPlace.latestOffers();
        if (!_loc1_) {
            return;
        }
        let _loc3_: number = this.marketPlace.totalItemsFound();
        this._offers = _loc1_;
        if (!this._itemList) {
            return;
        }
        this._itemList.destroyListItems();
        if (!this._SafeStr_3490) {
            return;
        }
        let _loc2_: any[] = _loc1_.getKeys();
        if (_loc2_ == null) {
            return;
        }
        this.updateStatusDisplay(2, _loc2_.length | 0, _loc3_);
        if (!this._SafeStr_3082) {
            this._SafeStr_3082 = new Timer(25);
            this._SafeStr_3082.addEventListener("timer", this.onPopulationTimer);
        }
        this._SafeStr_4178 = 0;
        this.populateList();
        this._SafeStr_3082.start();
    }

    private populateList(): boolean {
        let _loc1_: number = 0;
        if (!this._offers) {
            return true;
        }
        _loc1_ = 0;
        while (_loc1_ < 5) {
            if (this._SafeStr_4178 >= this._offers.length) {
                return true;
            }
            this.addListItem(this._offers.getWithIndex(this._SafeStr_4178));
            this._SafeStr_4178 = this._SafeStr_4178 + 1;
            _loc1_++;
        }
        return false;
    }

    private addListItem(param1: MarketPlaceOfferData): void {
        let _loc17_: string = null;
        let _loc6_: string = null;
        let _loc4_: ImageResult = null;
        let _loc5_: IBitmapWrapperWindow = null;
        let _loc12_: Point = null;
        let _loc13_: IWindow = null;
        let _loc3_: IWidgetWindow = null;
        let _loc10_: ILimitedItemGridOverlayWidget = null;
        let _loc7_: IWidgetWindow = null;
        let _loc2_: IRarityItemGridOverlayWidget = null;
        let _loc8_: IWindow = null;
        if (!param1 || !this._itemList || !this._SafeStr_3490 || !this.marketPlace.localization) {
            return;
        }
        let _loc14_: IWindowContainer = asGuarded(this._SafeStr_3490.clone(), isIWindowContainer);
        if (!_loc14_ || Boolean(_loc14_.disposed)) {
            return;
        }
        let _loc9_: IWindow = _loc14_.findChildByName("item_name");
        if (_loc9_ != null) {
            _loc9_.caption = "${" + this.marketPlace.getNameLocalizationKey(param1) + "}";
        }
        let _loc15_: IWindow = _loc14_.findChildByName("item_desc");
        if (_loc15_ != null) {
            _loc15_.caption = "${" + this.marketPlace.getDescriptionLocalizationKey(param1) + "}";
        }
        let _loc16_: IWindow = _loc14_.findChildByName("item_price");
        if (_loc16_ != null) {
            _loc17_ = this.marketPlace.localization.getLocalization("catalog.marketplace.offer.price_public_item");
            _loc17_ = _loc17_.replace("%price%", String(param1.price));
            _loc17_ = _loc17_.replace("%average%", param1.averagePrice != 0 ? param1.averagePrice.toString() : " - ");
            _loc16_.caption = _loc17_;
        }
        let _loc11_: IWindow = _loc14_.findChildByName("offer_count");
        if (_loc11_) {
            _loc6_ = this.marketPlace.localization.getLocalization("catalog.marketplace.offer_count");
            _loc6_ = _loc6_.replace("%count%", String(param1.offerCount));
            _loc11_.caption = _loc6_;
        }
        if (param1.image == null) {
            _loc4_ = this.getFurniImageResult(param1.furniId, param1.furniType, param1.extraData);
            if (_loc4_ != null && _loc4_.data != null) {
                param1.image = _loc4_.data instanceof BitmapData ? _loc4_.data : null;
                param1.imageCallback = _loc4_.id;
            }
            _loc14_.id = _loc4_.id;
        }
        if (param1.image != null) {
            _loc5_ = asGuarded(_loc14_.findChildByName("item_image"), isIBitmapWrapperWindow);
            if (_loc5_ != null) {
                _loc12_ = new Point((_loc5_.width - param1.image.width) / 2, (_loc5_.height - param1.image.height) / 2);
                if (_loc5_.bitmap == null) {
                    _loc5_.bitmap = new BitmapData(_loc5_.width, _loc5_.height, true, 0);
                }
                _loc5_.bitmap.copyPixels(param1.image, param1.image.rect, _loc12_);
            }
        }
        if (param1.isUniqueLimitedItem) {
            _loc13_ = _loc14_.findChildByName("unique_item_background_bitmap");
            _loc3_ = castGuarded(_loc14_.findChildByName("unique_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            _loc10_ = castGuarded(_loc3_.widget, isILimitedItemGridOverlayWidget, "com.sulake.habbo.window.widgets.ILimitedItemGridOverlayWidget");
            _loc10_.serialNumber = param1.stuffData.uniqueSerialNumber;
            _loc10_.animated = true;
            _loc13_.visible = true;
            _loc3_.visible = true;
        }
        if (param1.stuffData && param1.stuffData.rarityLevel >= 0) {
            _loc7_ = castGuarded(_loc14_.findChildByName("rarity_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            _loc2_ = castGuarded(_loc7_.widget, isIRarityItemGridOverlayWidget, "com.sulake.habbo.window.widgets.IRarityItemGridOverlayWidget");
            _loc7_.visible = true;
            _loc2_.rarityLevel = param1.stuffData.rarityLevel;
        }
        if (this.marketPlace.isAccountSafetyLocked()) {
            _loc8_ = _loc14_.findChildByName("buy_button");
            if (_loc8_ != null) {
                _loc8_.disable();
            }
        }
        this._itemList.addListItem(_loc14_);
        _loc14_.procedure = this.onOfferListEvent;
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

    private onOfferListEvent = (param1: WindowEvent, param2: IWindow = null): void => {
        let _loc5_: number = 0;
        let _loc3_: UtilsMap = null;
        let _loc4_: MarketPlaceOfferData = null;
        if (param1.type == "WME_CLICK") {
            if (!this.window || !this.marketPlace || !param2) {
                return;
            }
            if (this._itemList == null) {
                return;
            }
            _loc5_ = this._itemList.getListItemIndex(param1.window.parent);
            _loc3_ = this.marketPlace.latestOffers();
            _loc4_ = asInstanceOf(_loc3_.getWithIndex(_loc5_), MarketPlaceOfferData);
            if (!_loc4_) {
                return;
            }
            switch (param2.name) {
                case "buy_button":
                    this.marketPlace.buyOffer(_loc4_.offerId);
                    break;
                case "more_button":
                    this.showDetails(_loc4_);
            }
        }
    };

    private showDetails(param1: MarketPlaceOfferData): void {
        let _loc6_: ImageResult = null;
        let _loc7_: IBitmapWrapperWindow = null;
        let _loc11_: ILimitedItemPreviewOverlayWidget = null;
        let _loc3_: IRarityItemGridOverlayWidget = null;
        let _loc10_: IWindow = null;
        if (!param1 || !this._window || !this.marketPlace) {
            return;
        }
        this._SafeStr_4075 = param1;
        let _loc2_: IHabboLocalizationManager = this.marketPlace.localization;
        if (!_loc2_) {
            return;
        }
        this._window.getChildAt(0).visible = false;
        let _loc12_: IWindowContainer = asGuarded(this._window.findChildByName("details_container"), isIWindowContainer);
        if (_loc12_) {
            _loc12_.visible = true;
        } else {
            _loc12_ = asGuarded(this.createWindow("marketplace_offer_details"), isIWindowContainer);
            this._window.addChild(_loc12_);
            _loc12_.procedure = this.detailsEventHandler;
        }
        let _loc8_: IWindow = _loc12_.findChildByName("item_name");
        if (_loc8_) {
            _loc8_.caption = "${" + this.marketPlace.getNameLocalizationKey(param1) + "}";
        }
        _loc8_ = _loc12_.findChildByName("item_description");
        if (_loc8_) {
            _loc8_.caption = "${" + this.marketPlace.getDescriptionLocalizationKey(param1) + "}";
        }
        _loc8_ = _loc12_.findChildByName("item_count");
        if (_loc8_) {
            _loc8_.visible = false;
        }
        _loc2_.registerParameter("catalog.marketplace.offer_details.price", "price", param1.price.toString());
        _loc2_.registerParameter("catalog.marketplace.offer_details.average_price", "days", this.marketPlace.averagePricePeriod.toString());
        let _loc4_: string = param1.averagePrice == 0 ? " - " : param1.averagePrice.toString();
        _loc2_.registerParameter("catalog.marketplace.offer_details.average_price", "average", _loc4_);
        if (param1.image == null) {
            _loc6_ = this.getFurniImageResult(param1.furniId, param1.furniType, param1.extraData);
            if (_loc6_ != null && _loc6_.data != null) {
                param1.image = _loc6_.data instanceof BitmapData ? _loc6_.data : null;
                param1.imageCallback = _loc6_.id;
            }
        }
        if (param1.image != null) {
            _loc7_ = asGuarded(_loc12_.findChildByName("item_image"), isIBitmapWrapperWindow);
            if (_loc7_ != null) {
                _loc7_.bitmap = null;
                _loc7_.bitmap = new BitmapData(_loc7_.width, _loc7_.height, true, 0);
                _loc7_.bitmap.draw(param1.image, new Matrix(1, 0, 0, 1, (_loc7_.width - param1.image.width) / 2, (_loc7_.height - param1.image.height) / 2));
            }
        }
        let _loc13_: ISelectorWindow = asGuarded(_loc12_.findChildByName("chart_selector"), isISelectorWindow);
        if (_loc13_) {
            _loc13_.setSelected(_loc13_.getSelectableAt(0));
        }
        let _loc14_: IBitmapWrapperWindow = asGuarded(_loc12_.findChildByName("chart_bitmap"), isIBitmapWrapperWindow);
        if (_loc14_) {
            _loc14_.bitmap = null;
        }
        let _loc5_: IWidgetWindow = castGuarded(_loc12_.findChildByName("unique_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        if (param1.isUniqueLimitedItem) {
            _loc11_ = castGuarded(_loc5_.widget, isILimitedItemPreviewOverlayWidget, "com.sulake.habbo.window.widgets.ILimitedItemPreviewOverlayWidget");
            _loc11_.serialNumber = param1.stuffData.uniqueSerialNumber;
            _loc11_.seriesSize = param1.stuffData.uniqueSeriesSize;
            _loc5_.visible = true;
        } else {
            _loc5_.visible = false;
        }
        let _loc9_: IWidgetWindow = castGuarded(_loc12_.findChildByName("rarity_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        if (param1.stuffData && param1.stuffData.rarityLevel >= 0) {
            _loc3_ = castGuarded(_loc9_.widget, isIRarityItemGridOverlayWidget, "com.sulake.habbo.window.widgets.IRarityItemGridOverlayWidget");
            _loc9_.visible = true;
            _loc3_.rarityLevel = param1.stuffData.rarityLevel;
        } else {
            _loc9_.visible = false;
        }
        if (this.marketPlace.isAccountSafetyLocked()) {
            _loc10_ = _loc12_.findChildByName("buy_button");
            if (_loc10_ != null) {
                _loc10_.disable();
            }
        }
        this.marketPlace.requestItemStats(param1.furniType, param1.furniId);
    }

    private hideDetails(): void {
        if (!this._window) {
            return;
        }
        this._SafeStr_4075 = null;
        let _loc1_: IWindow = this._window.findChildByName("details_container");
        if (_loc1_) {
            _loc1_.visible = false;
        }
        this._window.getChildAt(0).visible = true;
    }

    private doSearch(): void {
        let _loc1_: IWindow = null;
        this.updateStatusDisplay(1);
        let _loc4_: number = -1;
        let _loc6_: number = -1;
        let _loc2_: string = "";
        let _loc3_: number = 1;
        _loc1_ = this._window.findChildByName("min_price_input");
        if (_loc1_) {
            if (_loc1_.caption == "") {
                _loc4_ = -1;
            } else {
                _loc4_ = parseInt(_loc1_.caption) | 0;
            }
        }
        _loc1_ = this._window.findChildByName("max_price_input");
        if (_loc1_) {
            if (_loc1_.caption == "") {
                _loc6_ = -1;
            } else {
                _loc6_ = parseInt(_loc1_.caption) | 0;
            }
        }
        _loc1_ = this._window.findChildByName("search_input");
        if (_loc1_) {
            _loc2_ = _loc1_.caption;
        }
        let _loc5_: IDropMenuWindow = asGuarded(this._window.findChildByName("sort_dropmenu"), isIDropMenuWindow);
        if (_loc5_ && _loc5_.selection >= 0 && _loc5_.selection < this._sortTypes.length) {
            _loc3_ = this._sortTypes[_loc5_.selection] | 0;
        }
        this.marketPlace.requestOffers(_loc4_, _loc6_, _loc2_, _loc3_);
    }

    private onWidgetEvent = (param1: WindowEvent, param2: IWindow = null): void => {
        let _loc7_: ISelectorWindow = null;
        let _loc6_: ISelectableWindow = null;
        let _loc5_: ITextFieldWindow = null;
        let _loc8_: number = 0;
        if (!param1 || !param2 || !this.marketPlace) {
            return;
        }
        let _loc3_: IHabboLocalizationManager = this.marketPlace.localization;
        let _loc4_: IWindow = this.window.findChildByName("search_input");
        if (param1.type == "WE_SELECTED") {
            switch (param2.name) {
                case "sort_dropmenu":
                    _loc7_ = asGuarded(this._window.findChildByName("search_selector"), isISelectorWindow);
                    if (!_loc7_) {
                        return;
                    }
                    _loc6_ = _loc7_.getSelected();
                    if (!_loc6_) {
                        return;
                    }
                    if (_loc6_.name == "search_by_value" || _loc6_.name == "search_by_activity") {
                        this.doSearch();
                    }
                    break;
                case "search_by_value":
                case "search_by_activity":
                case "search_advanced":
                    this.selectSearchCategory(param2.name);
            }
        } else if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "search_input":
                    if (_loc3_ && _loc4_ && _loc4_.caption == _loc3_.getLocalization("catalog.marketplace.search_name")) {
                        _loc4_.caption = "";
                    }
                    break;
                case "search_button":
                    if (_loc3_ && _loc4_ && _loc4_.caption == _loc3_.getLocalization("catalog.marketplace.search_name")) {
                        return;
                    }
                    this.doSearch();
            }
        } else if (param1.type == "WE_CHANGE") {
            _loc5_ = isITextFieldWindow(param2) ? param2 : null;
            if (!_loc5_) {
                return;
            }
            switch (_loc5_.name) {
                case "min_price_input":
                case "max_price_input":
                    _loc8_ = 10;
                    break;
                case "search_input":
                    _loc8_ = 40;
                    break;
                default:
                    return;
            }
            if (_loc5_.text.length > _loc8_) {
                _loc5_.text = _loc5_.text.substr(0, _loc8_);
            }
            _loc5_.scrollH = 0;
        }
    };

    private detailsEventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (!param1 || !param2) {
            return;
        }
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "back_button":
                    this.hideDetails();
                    break;
                case "buy_button":
                    this.marketPlace.buyOffer(this._SafeStr_4075.offerId);
            }
            return;
        }
        if (param1.type == "WE_SELECTED") {
            switch (param2.name) {
                case "price_development":
                case "trade_volume":
                    this.updateStats();
            }
        }
    };

    private onPopulationTimer = (param1: TimerEvent): void => {
        if (!this._SafeStr_3082) {
            return;
        }
        if (this.populateList()) {
            this._SafeStr_3082.stop();
        }
    };

    get [IGetImageListener](): true {
        return true;
    }
}
