import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ClubExtendController } from '@/com/sulake/habbo/catalog/club/ClubExtendController';
import type { ClubOfferExtendData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/ClubOfferExtendData';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { Logger } from '@/com/sulake/habbo/Logger';

export class ClubExtendConfirmationDialog {
    static { registerClassName(this, 'com.sulake.habbo.catalog.club::ClubExtendConfirmationDialog'); }

    private static readonly CREDIT_IMAGE_COUNT: number = 7;
    private static readonly YOUR_PRICE_ICON_BITMAP_ELEMENT_NAME: string = "your_price_icon_left";

    private static readonly _SafeStr_8120: string = "${image.library.catalogue.url}catalogue/vip_extend_tsr.png";

    private static readonly TEASER_IMAGE_MIME_TYPE: string = "image/png";
    private static readonly ANIMATION_TRIGGER_INTERVAL: number = 2000;
    private static readonly _SafeStr_7937: number = 75;
    private static readonly LINK_COLOR_DEFAULT: number = 0;
    private static readonly LINK_COLOR_HOVER: number = 9552639;

    declare private _controller: ClubExtendController;

    declare private _view: IFrameWindow;

    declare private _offer: ClubOfferExtendData;

    declare private _SafeStr_3124: IRegionWindow;

    declare private _SafeStr_3311: ITextWindow;

    declare private _SafeStr_2765: IBitmapWrapperWindow;

    declare private _creditImages: BitmapData[];

    declare private _SafeStr_3541: Timer;

    declare private _SafeStr_2769: Timer;

    private _animationFrame: number = 0;
    private _SafeStr_3854: number = 0;
    private _disposed: boolean = false;
    private _localizationKey: string = "catalog.club.extend.";

    constructor(param1: ClubExtendController, param2: ClubOfferExtendData) {
        this._controller = param1;
        this._offer = param2;
        this._creditImages = new Array<BitmapData>(7).fill(null);
    }

    public dispose(): void {
        let _loc1_: number = 0;
        if (this._disposed) {
            return;
        }
        this._offer = null;
        this._controller = null;
        this.clearAnimation();
        if (this._SafeStr_3124) {
            this._SafeStr_3124.removeEventListener("WME_OUT", this.onMouseOutLaterRegion);
            this._SafeStr_3124.removeEventListener("WME_OVER", this.onMouseOverLaterRegion);
            this._SafeStr_3124 = null;
        }
        if (this._SafeStr_3311) {
            this._SafeStr_3311 = null;
        }
        if (this._SafeStr_2765) {
            this._SafeStr_2765 = null;
        }
        if (this._creditImages) {
            while (_loc1_ < 7) {
                this._creditImages[_loc1_].dispose();
                this._creditImages[_loc1_] = null;
                _loc1_++;
            }
            this._creditImages = null;
        }
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        this._disposed = true;
    }

    public showConfirmation(): void {
        let _loc10_: IIconWindow = null;
        let _loc11_: string = null;
        let _loc8_: number = 0;
        let _loc6_: BitmapDataAsset = null;
        let _loc12_: BitmapData = null;
        if (!this._offer || !this._controller || this._disposed) {
            return;
        }
        this._view = asGuarded(this.createWindow("club_extend_confirmation"), isIFrameWindow);
        if (!this._view) {
            return;
        }
        this._view.procedure = this.windowEventHandler;
        this._view.center();
        if (!this._offer.vip) {
            this._localizationKey += "basic.";
            _loc10_ = asGuarded(this._view.findChildByName("club_level_icon"), isIIconWindow);
            if (_loc10_) {
                _loc10_.style = 17;
                _loc10_.x += 15;
            }
        }
        let _loc3_: IHabboLocalizationManager = this._controller.localization;
        this._view.findChildByName("normal_price_price_left").caption = this._offer.originalPrice.toString();
        this._view.findChildByName("normal_price_price_right").caption = this._offer.originalActivityPointPrice.toString();
        this._view.findChildByName("you_save_price_left").caption = this._offer.discountCreditAmount.toString();
        this._view.findChildByName("you_save_price_right").caption = this._offer.discountActivityPointAmount.toString();
        this._view.findChildByName("your_price_price_left").caption = this._offer.priceCredits.toString();
        this._view.findChildByName("your_price_price_right").caption = this._offer.priceActivityPoints.toString();
        this._view.title.caption = _loc3_.getLocalization(this._localizationKey + "confirm.caption");
        this._view.findChildByName("extend_title").caption = _loc3_.getLocalization(this._localizationKey + "confirm.title");
        this._view.findChildByName("normal_price_label").caption = _loc3_.getLocalization(this._localizationKey + "normal.label");
        this._view.findChildByName("you_save_label").caption = _loc3_.getLocalization(this._localizationKey + "save.label");
        this._view.findChildByName("your_price_label").caption = _loc3_.getLocalization(this._localizationKey + "price.label");
        this._view.findChildByName("buy_now_button").caption = _loc3_.getLocalization(this._localizationKey + "buy.button");
        this._view.findChildByName("maybe_later_link").caption = _loc3_.getLocalization(this._localizationKey + "later.link");
        if (this._offer.subscriptionDaysLeft > 1) {
            _loc3_.registerParameter(this._localizationKey + "expiration_days_left", "day", this._offer.subscriptionDaysLeft.toString());
            _loc3_.registerParameter(this._localizationKey + "expiration_days_left", "duration", (31 * this._offer.months).toString());
            _loc11_ = _loc3_.getLocalization(this._localizationKey + "expiration_days_left");
        } else {
            _loc11_ = _loc3_.getLocalization(this._localizationKey + "expires_today");
        }
        this._view.findChildByName("offer_expiration").caption = _loc11_;
        this._SafeStr_3124 = asGuarded(this._view.findChildByName("maybe_later_region"), isIRegionWindow);
        this._SafeStr_3311 = asGuarded(this._view.findChildByName("maybe_later_link"), isITextWindow);
        if (!this._SafeStr_3124 || !this._SafeStr_3311) {
            return;
        }
        this._SafeStr_3124.addEventListener("WME_OUT", this.onMouseOutLaterRegion);
        this._SafeStr_3124.addEventListener("WME_OVER", this.onMouseOverLaterRegion);
        let _loc5_: BitmapData = this.getBitmapDataFromAsset("icon_credit_0");
        this.setElementBitmapData("normal_price_icon_left", _loc5_);
        this.setElementBitmapData("you_save_icon_left", _loc5_);
        this.setActivityPointIconStyle("normal_price_icon_right");
        this.setActivityPointIconStyle("you_save_icon_right");
        this.setActivityPointIconStyle("your_price_icon_right");
        let _loc1_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("club_teaser"), isIBitmapWrapperWindow);
        _loc1_.x = 1;
        _loc1_.y = this._view.height - 144;
        _loc1_.height = 144;
        _loc1_.width = 133;
        let _loc7_: string = this._controller.config.interpolate("${image.library.catalogue.url}catalogue/vip_extend_tsr.png");
        if (this._controller.config) {
            _loc7_ = this._controller.config.updateUrlProtocol(_loc7_);
        }
        this.loadAssetFromUrl("club_teaser", "club_teaser", _loc7_, "image/png", this.onTeaserLoaded);
        let _loc9_: IItemListWindow = asGuarded(this._view.findChildByName("itemlist_vertical"), isIItemListWindow);
        if (!_loc9_) {
            return;
        }
        let _loc4_: IWindowContainer = asGuarded(this._view.findChildByName("total_amount_line"), isIWindowContainer);
        if (!_loc4_) {
            return;
        }
        let _loc2_: IWindowContainer = asGuarded(this._view.findChildByName("background_container"), isIWindowContainer);
        if (!_loc2_) {
            return;
        }
        _loc2_.height = _loc9_.y + _loc4_.height + _loc4_.y;
        this._SafeStr_2765 = asGuarded(this._view.findChildByName("your_price_icon_left"), isIBitmapWrapperWindow);
        if (this._SafeStr_2765 == null) {
            return;
        }
        _loc8_ = 0;
        while (_loc8_ < 7) {
            _loc6_ = asInstanceOf(this._controller.assets.getAssetByName("icon_credit_" + _loc8_), BitmapDataAsset);
            _loc12_ = asInstanceOf(_loc6_.content, BitmapData);
            this._creditImages[_loc8_] = _loc12_.clone();
            _loc8_++;
        }
        this.startAnimation();
    }

    private setActivityPointIconStyle(param1: string): void {
        let _loc2_: IWindow = this._view.findChildByName(param1);
        _loc2_.style = ActivityPointTypeEnum.getIconStyleFor(this._offer.originalActivityPointType, this._controller.config, true) >>> 0;
    }

    private onMouseOutLaterRegion = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_3311) {
            this._SafeStr_3311.textColor = 0;
        }
    };

    private onMouseOverLaterRegion = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_3311) {
            this._SafeStr_3311.textColor = 9552639;
        }
    };

    private startAnimation(): void {
        if (this._SafeStr_3541) {
            this.clearAnimation();
        }
        this.setAnimationFrame();
        this._SafeStr_3541 = new Timer(2000);
        this._SafeStr_3541.addEventListener("timer", this.onAnimationTrigger);
        this._SafeStr_3541.start();
    }

    private clearAnimation(): void {
        this._animationFrame = 0;
        this._SafeStr_3854 = 0;
        if (this._SafeStr_2769) {
            this._SafeStr_2769.stop();
            this._SafeStr_2769 = null;
        }
        if (this._SafeStr_3541) {
            this._SafeStr_3541.stop();
            this._SafeStr_3541 = null;
        }
    }

    private setAnimationFrame(): void {
        if (!this._SafeStr_2765) {
            return;
        }
        if (this._SafeStr_2765.bitmap) {
            this._SafeStr_2765.bitmap.dispose();
        }
        if (this._animationFrame < 7) {
            this._SafeStr_2765.bitmap = new BitmapData(this._SafeStr_2765.width, this._SafeStr_2765.height, true, 0);
            this._SafeStr_2765.bitmap.copyPixels(this._creditImages[this._animationFrame], this._creditImages[this._animationFrame].rect, new Point(0, 0));
        } else {
            Logger.log("Animation frame " + this._animationFrame);
        }
    }

    private startAnimationFrame(): void {
        this._SafeStr_2769 = new Timer(75, 7 - 1);
        this._SafeStr_2769.addEventListener("timer", this.onAnimationFrame);
        this._SafeStr_2769.addEventListener("timerComplete", this.onAnimationFrameComplete);
        this._SafeStr_2769.start();
    }

    private onAnimationTrigger = (param1: TimerEvent): void => {
        this.startAnimationFrame();
    };

    private onAnimationFrame = (param1: TimerEvent): void => {
        this._animationFrame += 1;
        this.setAnimationFrame();
    };

    private onAnimationFrameComplete = (param1: TimerEvent): void => {
        if (this._SafeStr_2769) {
            this._SafeStr_2769.stop();
            this._SafeStr_2769 = null;
        }
        this._animationFrame = 0;
        this.setAnimationFrame();
        if (this._SafeStr_3854 == 0) {
            this._SafeStr_3854 = 1;
            this.startAnimationFrame();
        } else {
            this._SafeStr_3854 = 0;
        }
    };

    private getBitmapDataFromAsset(param1: string): BitmapData {
        let _loc2_: BitmapDataAsset = asInstanceOf(this._controller.assets.getAssetByName(param1), BitmapDataAsset);
        if (_loc2_ != null) {
            return asInstanceOf(_loc2_.content, BitmapData);
        }
        return null;
    }

    private setElementBitmapData(param1: string, param2: BitmapData): void {
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName(param1), isIBitmapWrapperWindow);
        if (_loc3_.bitmap != null) {
            _loc3_.bitmap.dispose();
        }
        if (param2 != null && _loc3_ != null) {
            if (_loc3_.width != param2.width) {
                _loc3_.width = param2.width;
            }
            if (_loc3_.height != param2.height) {
                _loc3_.height = param2.height;
            }
            _loc3_.bitmap = new BitmapData(_loc3_.width, _loc3_.height, true, 0);
            _loc3_.bitmap.copyPixels(param2, param2.rect, new Point(0, 0));
        }
    }

    private loadAssetFromUrl(param1: string, param2: string, param3: string, param4: string, param5: (...args: any[]) => any): boolean {
        let _loc8_: BitmapData = this.getBitmapDataFromAsset(param2);
        if (_loc8_ != null) {
            this.setElementBitmapData(param1, _loc8_);
            return true;
        }
        let _loc6_: URLRequest = new URLRequest(param3);
        let _loc7_: AssetLoaderStruct = this._controller.assets.loadAssetFromFile(param2, _loc6_, param4);
        if (!_loc7_) {
            return false;
        }
        _loc7_.addEventListener("AssetLoaderEventComplete", param5);
        return true;
    }

    private onTeaserLoaded = (param1: AssetLoaderEvent): void => {
        let _loc2_: AssetLoaderStruct = null;
        let _loc3_: BitmapData = null;
        if (!this._disposed) {
            _loc2_ = asInstanceOf(param1.target, AssetLoaderStruct);
            if (_loc2_ != null) {
                _loc3_ = this.getBitmapDataFromAsset(_loc2_.assetName);
                this.setElementBitmapData("club_teaser", _loc3_);
            }
        }
    };

    private windowEventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (!param1 || !param2 || !this._controller || !this._offer || this._disposed) {
            return;
        }
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "buy_now_button":
                this._controller.confirmSelection();
                break;
            case "header_button_close":
            case "maybe_later_region":
                this._controller.closeConfirmation();
        }
    };

    private createWindow(param1: string): IWindow {
        if (!this._controller || !this._controller.assets || !this._controller.windowManager || this._disposed) {
            return null;
        }
        let _loc3_: XmlAsset = asInstanceOf(this._controller.assets.getAssetByName(param1), XmlAsset);
        if (!_loc3_ || !_loc3_.content) {
            return null;
        }
        let _loc2_: XML = asInstanceOf(_loc3_.content, XML);
        if (!_loc2_) {
            return null;
        }
        return this._controller.windowManager.buildFromXML(_loc2_);
    }
}
