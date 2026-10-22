import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { TargetedOffer } from '@/com/sulake/habbo/catalog/targetedoffers/data/TargetedOffer';
import type { OfferController } from '@/com/sulake/habbo/catalog/targetedoffers/OfferController';
import { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { OfferView } from '@/com/sulake/habbo/catalog/targetedoffers/OfferView';

export class TargetedOfferDialogView extends OfferView {
    static { registerClassName(this, 'com.sulake.habbo.catalog.targetedoffers::TargetedOfferDialogView'); }

    private static readonly IMAGE_DEFAULT_URL: string = "targetedoffers/offer_default.png";
    private _quantity: number = 1;

    constructor(param1: OfferController, param2: TargetedOffer) {
        super(param1, param2);
    }

    public buildWindow(param1: string): void {
        let _loc2_: string = null;
        let _loc4_: string = null;
        if (!this._controller.catalog || !this._controller.catalog.windowManager) {
            return;
        }
        this._window = castGuarded(this._controller.catalog.windowManager.buildFromXML(XML.from(this._controller.catalog.assets.getAssetByName(param1).content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (castGuarded(this._window, isIFrameWindow, "com.sulake.core.window.components.IFrameWindow")) {
            castGuarded(this._window, isIFrameWindow, "com.sulake.core.window.components.IFrameWindow").title.text = this.getLocalization(this._offer.title);
        }
        let _loc5_: ITextWindow = castGuarded(this._window.findChildByName("txt_title"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (_loc5_) {
            _loc5_.text = this.getLocalization(this._offer.title);
        }
        _loc5_ = castGuarded(this._window.findChildByName("txt_description"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (_loc5_) {
            _loc5_.text = this.getLocalization(this._offer.description);
            this.setLinkStyle(_loc5_);
        }
        _loc5_ = castGuarded(this._window.findChildByName("txt_price_label"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (_loc5_) {
            _loc5_.text = this.getLocalization("targeted.offer.price.label");
        }
        let _loc6_: UtilsMap = this._controller.catalog.utils.getPriceMap(this._offer, this._quantity);
        this.renderPrice(this._window, _loc6_);
        let _loc3_: IStaticBitmapWrapperWindow = castGuarded(this._window.findChildByName("bmp_illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        if (_loc3_) {
            _loc2_ = (asGuarded(this._controller.catalog, isICoreConfiguration)).getProperty("image.library.url");
            _loc4_ = this.getPreviewImageOverride(this._offer);
            if (_loc4_ == null || _loc4_.length == 0) {
                _loc4_ = this._offer.imageUrl && this._offer.imageUrl.length > 0 ? this._offer.imageUrl : "targetedoffers/offer_default.png";
            }
            _loc3_.assetUri = _loc2_ + _loc4_;
        }
        this._SafeStr_3113 = this.getLocalization("targeted.offer.timeleft", "");
        if (this._offer.expirationTime == 0) {
            if (this._window.findChildByName("cnt_time_left")) {
                this._window.findChildByName("cnt_time_left").visible = false;
            }
        } else {
            this.startUpdateTimer();
        }
        let _loc7_: ITextFieldWindow = asGuarded(this._window.findChildByName("quantity_input"), isITextFieldWindow);
        if (_loc7_) {
            _loc7_.addEventListener("WKE_KEY_UP", this.onQuantityInputEvent);
        }
        this._window.procedure = this.onInput;
        this._window.center();
        this.updatePriceText();
        this.updateButtonStates();
    }

    private renderPrice(param1: IWindowContainer, param2: UtilsMap): void {
        if (param1 == null) {
            return;
        }
        let _loc3_: any = param2.getValue("credit");
        param1.findChildByName("txt_price_credits").caption = stringOrNull(_loc3_.amount);
        let _loc4_: any = param2.getValue("activityPoint");
        if (_loc4_ != null) {
            param1.findChildByName("txt_price_activityPoints").caption = stringOrNull(_loc4_.amount);
            this.setActivityPointIconStyle("activityPoints_icon", param1, _loc4_.activityPointType | 0);
        } else {
            param1.findChildByName("txt_price_activityPoints").caption = "0";
            this.setActivityPointIconStyle("activityPoints_icon", param1, 5);
        }
    }

    private setActivityPointIconStyle(param1: string, param2: IWindowContainer, param3: number): void {
        let _loc4_: IWindow = param2.findChildByName(param1);
        _loc4_.style = ActivityPointTypeEnum.getIconStyleFor(param3, this._controller.catalog, true) >>> 0;
    }

    protected override setTimeLeft(param1: string): void {
        let _loc3_: ITextWindow = castGuarded(this._window.findChildByName("txt_time_left"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (!_loc3_) {
            return;
        }
        _loc3_.text = param1;
        if (!this._SafeStr_3113) {
            return;
        }
        let _loc4_: number = Math.max(this._SafeStr_3113.indexOf("%timeleft%"), 0) | 0;
        let _loc2_: ITextWindow = castGuarded(this._window.findChildByName("txt_time_left_label_1"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (_loc2_) {
            _loc2_.text = this._SafeStr_3113.substr(0, _loc4_ - 1);
        }
        _loc2_ = castGuarded(this._window.findChildByName("txt_time_left_label_2"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (_loc2_) {
            _loc2_.text = this._SafeStr_3113.substr(_loc4_ + 10, this._SafeStr_3113.length);
        }
    }

    public updateButtonStates(): void {
        let _loc4_: ITextWindow = castGuarded(this._window.findChildByName("txt_status"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (!_loc4_) {
            return;
        }
        let _loc1_: boolean = this._offer.checkPurseBalance(this._controller.catalog.getPurse(), this._quantity);
        if (_loc1_) {
            _loc4_.text = "";
        } else if (this._window.findChildByName("btn_buy")) {
            this._window.findChildByName("btn_buy").disable();
        }
        if (this._window.findChildByName("cnt_quantity")) {
            this._window.findChildByName("cnt_quantity").visible = this._offer.purchaseLimit > 1;
        }
        if (this._window.findChildByName("btn_get_credits")) {
            this._window.findChildByName("btn_get_credits").visible = !_loc1_;
        }
        let _loc2_: IWindow = this._window.findChildByName("btn_buy");
        if (_loc2_) {
            if (_loc1_ && this.isQuantityValid()) {
                _loc2_.enable();
            } else {
                _loc2_.disable();
            }
        }
        let _loc3_: IItemListWindow = castGuarded(this._window.findChildByName("itemlist_buttonbar"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        if (_loc3_) {
            _loc3_.arrangeListItems();
            _loc3_.arrangeListItems();
        }
    }

    private updatePriceText(): void {
        let _loc2_: ITextWindow = castGuarded(this._window.findChildByName("txt_price_credits"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (_loc2_) {
            _loc2_.text = this._quantity * this._offer.priceInCredits + "";
        }
        let _loc1_: ITextWindow = castGuarded(this._window.findChildByName("txt_price_activityPoints"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (_loc1_) {
            _loc1_.text = this._quantity * this._offer.priceInActivityPoints + "";
        }
    }

    private onInput = (param1: WindowEvent, param2: IWindow): void => {
        if (!this._controller) {
            return;
        }
        if (param1.type == "WME_DOWN") {
            switch (param2.name) {
                case "header_button_close":
                    this._controller.minimizeOffer(this._offer);
                    break;
                case "btn_get_credits":
                    this._controller.purchaseCredits(this._offer);
                    break;
                case "btn_buy":
                    if (!this.isQuantityValid()) {
                        return;
                    }
                    this._controller.showConfirmation(this._offer, this._quantity);
            }
        }
    };

    private isQuantityValid(): boolean {
        return this._quantity >= 1 && this._quantity <= this._offer.purchaseLimit;
    }

    private onQuantityInputEvent = (param1: WindowKeyboardEvent): void => {
        let _loc2_: number = parseInt(param1.target.caption) | 0;
        if (_loc2_ == 0 && param1.target.caption != "" || _loc2_ > 999 || _loc2_ > this._offer.purchaseLimit) {
            param1.target.caption = this._quantity.toString();
            return;
        }
        this._quantity = _loc2_;
        this.updatePriceText();
        this.updateButtonStates();
    };

    private setLinkStyle(param1: ITextWindow): void {
        if (!param1) {
            return;
        }
        let _loc3_: StyleSheet = new StyleSheet();
        let _loc2_: any = {};
        _loc2_.textDecoration = "underline";
        _loc3_.setStyle("a:link", _loc2_);
        param1.styleSheet = _loc3_;
    }

    private getPreviewImageOverride(param1: TargetedOffer): string {
        return this._controller.catalog.getProperty("targeted.offer.override.preview_image." + param1.id);
    }
}
