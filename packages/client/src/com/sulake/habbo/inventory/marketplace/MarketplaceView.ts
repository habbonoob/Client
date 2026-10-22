import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { FurnitureItem } from '@/com/sulake/habbo/inventory/items/FurnitureItem';
import type { MarketplaceModel } from '@/com/sulake/habbo/inventory/marketplace/MarketplaceModel';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { ILimitedItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemPreviewOverlayWidget';
import type { IRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { isILimitedItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemPreviewOverlayWidget';
import { isIRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class MarketplaceView implements IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.inventory.marketplace::MarketplaceView'); }

    constructor(param1: MarketplaceModel, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IRoomEngine, param5: IHabboLocalizationManager, param6: HabboInventory) {
        this._SafeStr_2134 = param1;
        this._SafeStr_3052 = param3;
        this._windowManager = param2;
        this._roomEngine = param4;
        this._localization = param5;
        this._SafeStr_7264 = param6;
    }

    declare private _windowManager: IHabboWindowManager;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _view: IFrameWindow;

    declare private _SafeStr_2134: MarketplaceModel;

    declare private _roomEngine: IRoomEngine;

    declare private _localization: IHabboLocalizationManager;

    declare private _SafeStr_6874: number;
    static { (this.prototype as any)._SafeStr_6874 = 0; }

    declare private _SafeStr_5773: number;
    static { (this.prototype as any)._SafeStr_5773 = 0; }

    declare private _furniName: string;

    declare private _SafeStr_7264: HabboInventory;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._SafeStr_2134 = null;
            this._SafeStr_3052 = null;
            this._windowManager = null;
            this._roomEngine = null;
            this._localization = null;
            this.disposeView();
            this._disposed = true;
        }
    }

    public showBuyTokens(param1: number, param2: number): void {
        if (this._localization) {
            this._localization.registerParameter("inventory.marketplace.buy_tokens.info", "price", param1.toString());
            this._localization.registerParameter("inventory.marketplace.buy_tokens.info", "count", param2.toString());
            this._localization.registerParameter("inventory.marketplace.buy_tokens.info", "free", (param2 - 1).toString());
            this._localization.registerParameter("inventory.marketplace.buy_tokens.buy", "price", param1.toString());
        }
        this._view = asGuarded(this.createWindow("buy_marketplace_tokens_xml"), isIFrameWindow);
        if (this._view == null) {
            return;
        }
        this._view.procedure = this.clickHandler;
        this._view.center();
    }

    public showMakeOffer(param1: FurnitureItem): void {
        let _loc8_: ImageResult = null;
        let _loc11_: string = null;
        let _loc5_: string = null;
        let _loc7_: IWidgetWindow = null;
        let _loc4_: ILimitedItemPreviewOverlayWidget = null;
        let _loc10_: IWidgetWindow = null;
        let _loc9_: IRarityItemGridOverlayWidget = null;
        if (!param1 || !this._localization || !this._roomEngine || !this._SafeStr_2134) {
            return;
        }
        this._view = asGuarded(this.createWindow("make_marketplace_offer_xml"), isIFrameWindow);
        if (!this._view) {
            return;
        }
        let _loc2_: ITextFieldWindow = asGuarded(this._view.findChildByName("price_input"), isITextFieldWindow);
        if (_loc2_ != null) {
            _loc2_.restrict = "0-9";
        }
        this.checkPrice();
        this._localization.registerParameter("inventory.marketplace.make_offer.expiration_info", "time", this._SafeStr_2134.expirationHours.toString());
        this._localization.registerParameter("inventory.marketplace.make_offer.min_price", "minprice", this._SafeStr_2134.offerMinPrice.toString());
        this._localization.registerParameter("inventory.marketplace.make_offer.max_price", "maxprice", this._SafeStr_2134.offerMaxPrice.toString());
        let _loc6_: number = 4293848814;
        if (!param1.isWallItem) {
            _loc8_ = this._roomEngine.getFurnitureImage(param1.type, new Vector3d(90, 0, 0), 64, this, _loc6_ >>> 0, String(param1.extra));
        } else {
            _loc8_ = this._roomEngine.getWallItemImage(param1.type, new Vector3d(90, 0, 0), 64, this, _loc6_ >>> 0, param1.stuffData.getLegacyString());
        }
        if (!_loc8_) {
            return;
        }
        this._SafeStr_6874 = _loc8_.id;
        this.setFurniImage(_loc8_.data);
        if (param1.isWallItem) {
            _loc11_ = "wallItem.name." + param1.type;
            _loc5_ = "wallItem.desc." + param1.type;
        } else {
            _loc11_ = "roomItem.name." + param1.type;
            _loc5_ = "roomItem.desc." + param1.type;
        }
        if (param1.category == 6) {
            _loc11_ = "poster_" + param1.stuffData.getLegacyString() + "_name";
            _loc5_ = "poster_" + param1.stuffData.getLegacyString() + "_desc";
        }
        this._furniName = this._localization.getLocalization(_loc11_);
        this.setText("furni_name", "${" + _loc11_ + "}");
        this.setText("furni_desc", "${" + _loc5_ + "}");
        this._view.procedure = this.clickHandler;
        this._view.center();
        let _loc3_: ITextWindow = asGuarded(this._view.findChildByName("average_price"), isITextWindow);
        if (_loc3_) {
            _loc3_.visible = false;
        }
        if (param1.stuffData != null && param1.stuffData.uniqueSerialNumber > 0) {
            _loc7_ = castGuarded(this._view.findChildByName("unique_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            _loc7_.visible = true;
            _loc4_ = castGuarded(_loc7_.widget, isILimitedItemPreviewOverlayWidget, "com.sulake.habbo.window.widgets.ILimitedItemPreviewOverlayWidget");
            _loc4_.serialNumber = param1.stuffData.uniqueSerialNumber;
            _loc4_.seriesSize = param1.stuffData.uniqueSeriesSize;
        }
        if (param1.stuffData != null && param1.stuffData.rarityLevel >= 0) {
            _loc10_ = castGuarded(this._view.findChildByName("rarity_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            _loc10_.visible = true;
            _loc9_ = castGuarded(_loc10_.widget, isIRarityItemGridOverlayWidget, "com.sulake.habbo.window.widgets.IRarityItemGridOverlayWidget");
            _loc9_.rarityLevel = param1.stuffData.rarityLevel;
        }
        this._SafeStr_2134.getItemStats();
    }

    public showNoCredits(param1: number): void {
        if (this._localization) {
            this._localization.registerParameter("inventory.marketplace.no_credits.info", "price", param1.toString());
        }
        this._view = asGuarded(this.createWindow("marketplace_no_credits_xml"), isIFrameWindow);
        if (this._view == null) {
            return;
        }
        this._view.procedure = this.clickHandler;
        this._view.center();
    }

    public showResult(param1: number): void {
        let _loc2_: string = null;
        if (param1 == 1) {
            _loc2_ = "${inventory.marketplace.result.title.success}";
        } else {
            _loc2_ = "${inventory.marketplace.result.title.failure}";
        }
        let _loc3_: string = "${inventory.marketplace.result." + param1 + "}";
        this._windowManager.alert(_loc2_, _loc3_, 0, this.closeAlert);
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this._SafeStr_6874 == param1) {
            this.setFurniImage(param2);
        }
    }

    public imageFailed(param1: number): void {
    }

    public showAlert(param1: string, param2: string): void {
        this._windowManager.alert(param1, param2, 0, this.closeAlert);
    }

    public updateAveragePrice(param1: number, param2: number): void {
        if (!this._view || !this._localization || !this._SafeStr_2134) {
            return;
        }
        let _loc3_: ITextWindow = asGuarded(this._view.findChildByName("average_price"), isITextWindow);
        if (!_loc3_) {
            return;
        }
        let _loc6_: number = Math.floor(param1 / (1 + this._SafeStr_2134.commission * 0.01)) | 0;
        this._localization.registerParameter("inventory.marketplace.make_offer.average_price", "days", param2.toString());
        let _loc4_: string = param1 == 0 ? " - " : param1.toString();
        this._localization.registerParameter("inventory.marketplace.make_offer.average_price", "price", _loc4_);
        let _loc5_: string = _loc6_ == 0 ? " - " : _loc6_.toString();
        this._localization.registerParameter("inventory.marketplace.make_offer.average_price", "price_no_commission", _loc5_);
        _loc3_.visible = true;
    }

    private disposeView(): void {
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
    }

    private setFurniImage(param1: BitmapData): void {
        if (param1 == null || this._view == null) {
            return;
        }
        let _loc5_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("furni_image"), isIBitmapWrapperWindow);
        if (_loc5_ == null) {
            return;
        }
        let _loc2_: BitmapData = new BitmapData(_loc5_.width, _loc5_.height, true, 0);
        let _loc3_: number = (_loc2_.width - param1.width) * 0.5 | 0;
        let _loc4_: number = (_loc2_.height - param1.height) * 0.5 | 0;
        _loc2_.draw(param1, new Matrix(1, 0, 0, 1, _loc3_, _loc4_));
        _loc5_.bitmap = _loc2_;
    }

    private setText(param1: string, param2: string): void {
        if (this._view == null) {
            return;
        }
        let _loc3_: ITextWindow = asGuarded(this._view.findChildByName(param1), isITextWindow);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.text = param2;
    }

    private showConfirmation(): void {
        this._localization.registerParameter("inventory.marketplace.confirm_offer.info", "furniname", this._furniName);
        this._localization.registerParameter("inventory.marketplace.confirm_offer.info", "price", this.calculateFinalPrice(this._SafeStr_5773).toString());
        let _loc2_: string = "${inventory.marketplace.confirm_offer.title}";
        let _loc1_: string = "${inventory.marketplace.confirm_offer.info}";
        this._windowManager.confirm(_loc2_, _loc1_, 0, this.confirmationCallback);
    }

    private confirmationCallback = (param1: IConfirmDialog, param2: WindowEvent): void => {
        if (param1 == null || param2 == null) {
            return;
        }
        param1.dispose();
        if (this._SafeStr_2134 == null) {
            return;
        }
        if (param2.type == "WE_OK") {
            this._SafeStr_2134.makeOffer(this._SafeStr_5773);
        }
        this._SafeStr_2134.releaseItem();
    };

    private createWindow(param1: string): IWindow {
        if (this._SafeStr_3052 == null || this._windowManager == null) {
            return null;
        }
        let _loc2_: XmlAsset = asInstanceOf(this._SafeStr_3052.getAssetByName(param1), XmlAsset);
        if (_loc2_ == null) {
            return null;
        }
        return this._windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML));
    }

    private clickHandler = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: ITextFieldWindow = null;
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "buy_tokens_button":
                    this._SafeStr_2134.buyMarketplaceTokens();
                    this.disposeView();
                    break;
                case "cancel_buy_tokens_button":
                case "cancel_make_offer_button":
                case "cancel_no_credits_button":
                case "header_button_close":
                    this._SafeStr_2134.releaseItem();
                    this.disposeView();
                    break;
                case "make_offer_button":
                    _loc3_ = asGuarded(this._view.findChildByName("price_input"), isITextFieldWindow);
                    if (_loc3_ != null) {
                        this._SafeStr_5773 = parseInt(_loc3_.text) | 0;
                        this.showConfirmation();
                    }
                    this.disposeView();
                    break;
                case "get_credits_button":
                    this._SafeStr_2134.releaseItem();
                    this.openCreditsPage();
                    this.disposeView();
            }
        }
        if (param1.type == "WE_CHANGE") {
            if (param2.name == "price_input") {
                this.checkPrice();
            }
        }
    };

    private openCreditsPage(): void {
        HabboWebTools.openWebPageAndMinimizeClient(this._SafeStr_7264.getProperty("web.shop.relativeUrl"));
    }

    private calculateFinalPrice(param1: number): number {
        let _loc2_: number = Math.ceil(Math.round(1000 * (param1 * (this._SafeStr_2134.sellingFeePercentage / 100 + 0.5 * param1 / this._SafeStr_2134.halfTaxLimit))) / 1000) | 0;
        return param1 - _loc2_;
    }

    private checkPrice(): void {
        if (this._view == null) {
            return;
        }
        let _loc2_: ITextFieldWindow = asGuarded(this._view.findChildByName("price_input"), isITextFieldWindow);
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: number = parseInt(_loc2_.text) | 0;
        if (_loc3_ > this._SafeStr_2134.offerMaxPrice) {
            _loc2_.text = this._SafeStr_2134.offerMaxPrice.toString();
            _loc3_ = this._SafeStr_2134.offerMaxPrice;
        }
        let _loc4_: number = this.calculateFinalPrice(_loc3_);
        let _loc1_: IButtonWindow = asGuarded(this._view.findChildByName("make_offer_button"), isIButtonWindow);
        let _loc5_: ITextWindow = asGuarded(this._view.findChildByName("final_price"), isITextWindow);
        if (_loc1_ == null || _loc5_ == null) {
            return;
        }
        if (_loc3_ < this._SafeStr_2134.offerMinPrice) {
            this._localization.registerParameter("shop.marketplace.invalid.price", "minPrice", this._SafeStr_2134.offerMinPrice.toString());
            this._localization.registerParameter("shop.marketplace.invalid.price", "maxPrice", this._SafeStr_2134.offerMaxPrice.toString());
            _loc5_.text = "${shop.marketplace.invalid.price}";
            _loc1_.disable();
        } else {
            _loc5_.text = this._localization.getLocalization("sell.in.marketplace.revenue.label") + ": " + _loc4_;
            _loc1_.enable();
        }
    }

    private closeAlert = (param1: IAlertDialog, param2: WindowEvent): void => {
        if (param1 == null) {
            return;
        }
        this._SafeStr_2134.releaseItem();
        param1.dispose();
    };

    get [IGetImageListener](): true {
        return true;
    }
}
