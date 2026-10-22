import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
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
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { MarketPlaceOfferData } from '@/com/sulake/habbo/catalog/marketplace/MarketPlaceOfferData';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { isILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';
import { isIRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';

export class MarketPlaceOwnItemsCatalogWidget extends CatalogWidget implements ICatalogWidget, IGetImageListener, IMarketPlaceVisualization {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::MarketPlaceOwnItemsCatalogWidget'); }

    private readonly STATUS_SEARCHING: number = 1;
    private readonly STATUS_LIST_AVAILABLE: number = 2;

    constructor(param1: IWindowContainer) {
        super(param1);
        this._itemTemplates = new UtilsMap();
    }

    declare private _itemTemplates: UtilsMap;

    declare private _itemList: IItemListWindow;

    declare private _offers: UtilsMap;

    private get marketPlace(): IMarketPlace {
        if (!this.page || !this.page.viewer || !this.page.viewer.catalog) {
            return null;
        }
        return this.page.viewer.catalog.getMarketPlace();
    }

    public override dispose(): void {
        super.dispose();
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        if (this.marketPlace == null) {
            return false;
        }
        let _loc2_: IHabboWindowManager = this.marketPlace.windowManager;
        if (_loc2_ == null) {
            return false;
        }
        this.displayMainView();
        let _loc1_: IItemListWindow = asGuarded(this._window.findChildByName("item_list"), isIItemListWindow);
        this._itemTemplates.add(1, _loc1_.removeListItem(_loc1_.getListItemByName("ongoing_item")));
        this._itemTemplates.add(2, _loc1_.removeListItem(_loc1_.getListItemByName("sold_item")));
        this._itemTemplates.add(3, _loc1_.removeListItem(_loc1_.getListItemByName("expired_item")));
        this.marketPlace.registerVisualization(this);
        this.marketPlace.requestOwnItems();
        this.updateStatusDisplay(1);
        this.showRedeemInfo(false);
        return true;
    }

    public listUpdatedNotify(): void {
        if (this.marketPlace == null) {
            return;
        }
        this.updateList(this.marketPlace.latestOwnOffers());
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

    public updateStats(): void {
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
        } else if (param2 > 0) {
            _loc5_ = _loc3_.getLocalization("catalog.marketplace.items_found");
            _loc5_ = _loc5_.replace("%count%", String(param2));
        } else {
            _loc5_ = _loc3_.getLocalization("catalog.marketplace.no_items");
        }
        _loc4_.caption = _loc5_;
    }

    private updateList(param1: UtilsMap): void {
        let _loc24_: IWindowContainer = null;
        let _loc21_: number = 0;
        let _loc14_: number = 0;
        let _loc17_: MarketPlaceOfferData = null;
        let _loc4_: IWindowContainer = null;
        let _loc8_: IWindow = null;
        let _loc11_: IWindow = null;
        let _loc31_: IWindow = null;
        let _loc12_: string = null;
        let _loc10_: IWindow = null;
        let _loc26_: number = 0;
        let _loc18_: number = 0;
        let _loc20_: number = 0;
        let _loc13_: string = null;
        let _loc29_: string = null;
        let _loc22_: IWindow = null;
        let _loc16_: IWindow = null;
        let _loc6_: ImageResult = null;
        let _loc23_: IBitmapWrapperWindow = null;
        let _loc9_: Point = null;
        let _loc28_: IWindow = null;
        let _loc19_: IWidgetWindow = null;
        let _loc27_: ILimitedItemGridOverlayWidget = null;
        let _loc25_: IWidgetWindow = null;
        let _loc3_: IRarityItemGridOverlayWidget = null;
        if (!param1 || !this.marketPlace || !this.window) {
            return;
        }
        this._offers = param1;
        let _loc2_: IHabboLocalizationManager = this.marketPlace.localization;
        if (!_loc2_) {
            return;
        }
        let _loc30_: IItemListWindow = asGuarded(this.window.findChildByName("item_list"), isIItemListWindow);
        if (!_loc30_) {
            return;
        }
        _loc30_.destroyListItems();
        let _loc7_: number = 0;
        let _loc5_: any[] = param1.getKeys();
        if (!_loc5_) {
            return;
        }
        this.updateStatusDisplay(2, _loc5_.length | 0);
        _loc21_ = 0;
        while (_loc21_ < _loc5_.length) {
            _loc14_ = _loc5_[_loc21_] | 0;
            _loc17_ = asInstanceOf(param1.getValue(_loc14_), MarketPlaceOfferData);
            if (_loc17_.status == 2) {
                _loc7_++;
            }
            _loc24_ = this._itemTemplates.getValue(_loc17_.status);
            if (_loc24_) {
                _loc4_ = asGuarded(_loc24_.clone(), isIWindowContainer);
                if (!(!_loc4_ || Boolean(_loc4_.disposed))) {
                    _loc8_ = _loc4_.findChildByName("item_name");
                    if (_loc8_ != null) {
                        _loc8_.caption = this.marketPlace != null ? "${" + this.marketPlace.getNameLocalizationKey(_loc17_) + "}" : "";
                    }
                    _loc11_ = _loc4_.findChildByName("item_desc");
                    if (_loc11_ != null) {
                        _loc11_.caption = this.marketPlace != null ? "${" + this.marketPlace.getDescriptionLocalizationKey(_loc17_) + "}" : "";
                    }
                    _loc31_ = _loc4_.findChildByName("item_price");
                    if (_loc31_ != null) {
                        _loc12_ = _loc2_.getLocalization("catalog.marketplace.offer.price_own_item");
                        _loc12_ = _loc12_.replace("%price%", String(_loc17_.price));
                        _loc31_.caption = _loc12_;
                    }
                    if (_loc17_.status == 1) {
                        _loc10_ = _loc4_.findChildByName("item_time");
                        if (_loc10_ != null) {
                            _loc26_ = Math.max(1, _loc17_.timeLeftMinutes) | 0;
                            _loc18_ = Math.floor(_loc26_ / 60) | 0;
                            _loc20_ = _loc26_ - _loc18_ * 60;
                            _loc13_ = _loc20_ + " " + _loc2_.getLocalization("catalog.marketplace.offer.minutes");
                            if (_loc18_ > 0) {
                                _loc13_ = _loc18_ + " " + _loc2_.getLocalization("catalog.marketplace.offer.hours") + " " + _loc13_;
                            }
                            _loc29_ = _loc2_.getLocalization("catalog.marketplace.offer.time_left");
                            _loc29_ = _loc29_.replace("%time%", _loc13_);
                            _loc10_.caption = _loc29_;
                        }
                    }
                    if (_loc17_.status == 2) {
                        _loc22_ = _loc4_.findChildByName("item_sold");
                        if (_loc22_ != null) {
                            _loc22_.caption = _loc2_.getLocalization("catalog.marketplace.offer.sold");
                        }
                    }
                    if (_loc17_.status == 3) {
                        _loc16_ = _loc4_.findChildByName("item_expired");
                        if (_loc16_ != null) {
                            _loc16_.caption = _loc2_.getLocalization("catalog.marketplace.offer.expired");
                        }
                    }
                    if (_loc17_.image == null) {
                        _loc6_ = this.getFurniImageResult(_loc17_.furniId, _loc17_.furniType, _loc17_.extraData);
                        if (_loc6_ != null && _loc6_.data != null) {
                            _loc17_.image = _loc6_.data instanceof BitmapData ? _loc6_.data : null;
                            _loc17_.imageCallback = _loc6_.id;
                            _loc4_.id = _loc6_.id;
                        }
                    }
                    if (_loc17_.image != null) {
                        _loc23_ = asGuarded(_loc4_.findChildByName("item_image"), isIBitmapWrapperWindow);
                        if (_loc23_ != null) {
                            _loc9_ = new Point((_loc23_.width - _loc17_.image.width) / 2, (_loc23_.height - _loc17_.image.height) / 2);
                            if (_loc23_.bitmap == null) {
                                _loc23_.bitmap = new BitmapData(_loc23_.width, _loc23_.height, true, 0);
                            }
                            _loc23_.bitmap.copyPixels(_loc17_.image, _loc17_.image.rect, _loc9_);
                        }
                    }
                    if (_loc17_.isUniqueLimitedItem) {
                        _loc28_ = _loc4_.findChildByName("unique_item_background_bitmap");
                        _loc19_ = castGuarded(_loc4_.findChildByName("unique_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
                        _loc27_ = castGuarded(_loc19_.widget, isILimitedItemGridOverlayWidget, "com.sulake.habbo.window.widgets.ILimitedItemGridOverlayWidget");
                        _loc27_.serialNumber = _loc17_.stuffData.uniqueSerialNumber;
                        _loc27_.animated = true;
                        _loc28_.visible = true;
                        _loc19_.visible = true;
                    }
                    if (_loc17_.stuffData && _loc17_.stuffData.rarityLevel >= 0) {
                        _loc25_ = castGuarded(_loc4_.findChildByName("rarity_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
                        _loc3_ = castGuarded(_loc25_.widget, isIRarityItemGridOverlayWidget, "com.sulake.habbo.window.widgets.IRarityItemGridOverlayWidget");
                        _loc25_.visible = true;
                        _loc3_.rarityLevel = _loc17_.stuffData.rarityLevel;
                    }
                    _loc30_.addListItem(_loc4_);
                    _loc4_.procedure = this.onGridEvent;
                }
            }
            _loc21_++;
        }
        this.showRedeemInfo(true);
        let _loc15_: IWindow = this.window.findChildByName("redeem_info");
        if (_loc15_) {
            if (_loc7_ > 0) {
                _loc2_.registerParameter("catalog.marketplace.redeem.get_credits", "count", _loc7_.toString());
                _loc2_.registerParameter("catalog.marketplace.redeem.get_credits", "credits", this.marketPlace.creditsWaiting.toString());
                _loc15_.caption = "${catalog.marketplace.redeem.get_credits}";
            } else {
                _loc15_.caption = "${catalog.marketplace.redeem.no_sold_items}";
            }
        }
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
        let _loc5_: IItemListWindow = null;
        let _loc6_: number = 0;
        let _loc3_: UtilsMap = null;
        let _loc4_: MarketPlaceOfferData = null;
        if (param1.type == "WME_CLICK") {
            if (!this.marketPlace || !param2 || !this.window) {
                return;
            }
            if (param2.name == "pick_button") {
                _loc5_ = asGuarded(this.window.findChildByName("item_list"), isIItemListWindow);
                if (_loc5_ == null) {
                    return;
                }
                _loc6_ = _loc5_.getListItemIndex(param1.window.parent);
                _loc3_ = this.marketPlace.latestOwnOffers();
                if (!_loc3_) {
                    return;
                }
                _loc4_ = asInstanceOf(_loc3_.getWithIndex(_loc6_), MarketPlaceOfferData);
                if (_loc4_) {
                    this.marketPlace.redeemExpiredOffer(_loc4_.offerId);
                }
            }
        }
    };

    private onWidgetEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param2 == null) {
            param2 = asGuarded(param1.target, isIWindow);
        }
        if (param1.type == "WME_CLICK") {
        }
    };

    get [IGetImageListener](): true {
        return true;
    }
}
