import { asGuarded, asInstanceOf, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import type { CameraPublishStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/camera/CameraPublishStatusMessageEvent';
import type { CompetitionStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/camera/CompetitionStatusMessageEvent';
import type { CameraWidget } from '@/com/sulake/habbo/ui/widget/camera/CameraWidget';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { navigateToURL } from '@habbo-pixi/runtime/net/navigateToURL';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { BitmapFileLoader } from '@/com/sulake/core/runtime/Component.group';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';
import { TextWindowUtils } from '@/com/sulake/habbo/utils/TextWindowUtils';
import { AlertDialogCaption } from '@/com/sulake/habbo/window/utils/AlertDialogCaption';

export class PhotoPurchaseConfirmationDialog {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.camera::PhotoPurchaseConfirmationDialog'); }

    private static readonly STATE_LOADING_IMAGE: string = "loading_image";
    private static readonly STATE_IMAGE_LOADED: string = "image_loaded";
    private static readonly STATE_WAITING_PURCHASE_TO_COMPLETE: string = "waiting_purchase_to_complete";
    private static readonly STATE_WAITING_PUBLISH_TO_COMPLETE: string = "waiting_publish_to_complete";
    private static readonly STATE_WAITING_COMPETITION_SUBMIT_TO_COMPLETE: string = "waiting_competition_submit_to_complete";
    private static readonly STATE_RENDERING_FAILED: string = "rendering_failed";

    constructor(param1: CameraWidget, param2: string) {
        this._widget = param1;
        this._caption = param2;
        this._window = asGuarded(this._widget.getXmlWindow("photo_purchase_confirmation"), isIWindowContainer);
        let _loc3_: IItemListWindow = asGuarded((isIFrameWindow(this._window) ? this._window : null).content.getChildByName("contentlist"), isIItemListWindow);
        if (param1.component.getBoolean("camera.competition.enabled")) {
            TextWindowUtils.setHTMLLinkStyle(asGuarded(this._window.findChildByName("competition_info"), isITextWindow), 16777215, 16777215, 16777215);
        } else {
            _loc3_.removeListItem(_loc3_.getListItemByName("competition_wrapper"));
        }
        if (param1.component.getBoolean("disclaimer.credit_spending.enabled")) {
            this.setDisclaimerAccepted(false);
        } else {
            _loc3_.removeListItem(_loc3_.getListItemByName("disclaimer"));
            this.setDisclaimerAccepted(true);
        }
        if (!param1.component.getBoolean("camera.photo.publishing.enabled")) {
            _loc3_.removeListItem(_loc3_.getListItemByName("publish_wrapper"));
        }
        (isIFrameWindow(this._window) ? this._window : null).resizeToFitContent();
        this.setState("loading_image");
        this._window.center();
        this._window.procedure = this.windowEventHandler;
    }

    declare private _state: string;

    declare private _window: IWindowContainer;

    declare private _widget: CameraWidget;

    declare private _image: BitmapData;

    declare private _caption: string;

    declare private _SafeStr_5725: boolean;
    static { (this.prototype as any)._SafeStr_5725 = false; }

    private _SafeStr_5505: boolean = false;
    private _SafeStr_4819: boolean = false;
    private _SafeStr_4914: string = null;

    declare private _SafeStr_2561: Timer;

    private _SafeStr_5805: number = 0;

    public animateIconToToolbar(): void {
        if (!this._window) {
            return;
        }
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("product_image"), isIBitmapWrapperWindow);
        let _loc4_: Point = new Point();
        _loc2_.getGlobalPosition(_loc4_);
        let _loc1_: string = "HTIE_ICON_INVENTORY";
        let _loc6_: BitmapData = new BitmapData(120, 120);
        let _loc3_: number = _loc6_.width / this._image.width;
        let _loc5_: Matrix = new Matrix(_loc3_, 0, 0, _loc3_, 0, 0);
        _loc6_.draw(this._image, _loc5_);
        this._widget.component.toolbar.createTransitionToIcon(_loc1_, _loc6_, _loc4_.x | 0, _loc4_.y | 0);
        this._window.findChildByName("status_info").caption = this._widget.localizations.getLocalization("camera.purchase.successful");
        this._window.findChildByName("buy_button").caption = this._widget.localizations.getLocalization("camera.buy.another.button.text");
        this._window.findChildByName("inventory_link_area").visible = true;
        this._SafeStr_5805 = this._SafeStr_5805 + 1;
        this._window.findChildByName("purchase_count").caption = "";
        this._window.findChildByName("purchase_count").caption = this._SafeStr_5805.toString();
        this.setState("image_loaded");
    }

    public setImageUrl(param1: string): void {
        let _loc2_: BitmapFileLoader = null;
        if (this._widget == null) {
            return;
        }
        if (param1 && param1.length > 0) {
            param1 = this._widget.component.context.configuration.getProperty("stories.image_url_base") + param1;
            _loc2_ = new BitmapFileLoader("image/png", new URLRequest(param1));
            _loc2_.addEventListener("AssetLoaderEventComplete", this.onImageLoaded);
        } else {
            this.setRenderingFailed();
            this._widget.windowManager.alert("${generic.alert.title}", "${camera.render.count.info}", 0, null);
        }
    }

    public setRenderingFailed(): void {
        if (this._window == null) {
            return;
        }
        let _loc1_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("product_image"), isIBitmapWrapperWindow);
        if (_loc1_ != null) {
            this._image = new BitmapData(_loc1_.width, _loc1_.height, false, 0);
            if (_loc1_.bitmap == null) {
                _loc1_.bitmap = this._image;
            } else {
                _loc1_.bitmap.dispose();
                _loc1_.bitmap.draw(this._image);
            }
        }
        this.setState("rendering_failed");
    }

    public publishingStatus(param1: CameraPublishStatusMessageEvent): void {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc2_: string = null;
        if (this._window == null) {
            return;
        }
        if (param1.getParser().isOk()) {
            this._SafeStr_4914 = param1.getParser().getExtraDataId();
            this._window.findChildByName("status_info").caption = this._widget.localizations.getLocalization("camera.publish.successful");
            this._window.findChildByName("publish_explanation").caption = this._widget.localizations.getLocalization("camera.publish.successful");
            this._window.findChildByName("publish_detailed_explanation").caption = this._widget.localizations.getLocalization("camera.publish.success.short.info");
            this._window.findChildByName("publish_button").visible = false;
            this._window.findChildByName("publish_price_area").visible = false;
            this._window.findChildByName("publish_link_area").visible = true;
            if (this._SafeStr_2561 != null) {
                this._SafeStr_2561.reset();
            }
        } else {
            _loc4_ = param1.getParser().getSecondsToWait();
            _loc3_ = _loc4_ / 60 + 1 | 0;
            _loc2_ = this._widget.localizations.registerParameter("camera.publish.wait", "minutes", _loc3_.toString());
            this._widget.windowManager.alert("${generic.alert.title}", _loc2_, 0, null);
            this._window.findChildByName("status_info").caption = "";
            if (this._SafeStr_2561 == null) {
                this._SafeStr_2561 = new Timer(_loc4_ * 1000, 1);
                this._SafeStr_2561.addEventListener("timerComplete", this.onPublishTimerComplete);
            } else {
                this._SafeStr_2561.reset();
                this._SafeStr_2561.delay = _loc4_ * 1000;
            }
            this._SafeStr_2561.start();
        }
        this.setState("image_loaded");
    }

    public competitionStatus(param1: CompetitionStatusMessageEvent): void {
        let _loc2_: IConfirmDialog = null;
        if (this._window == null || this._window.findChildByName("competition_wrapper") == null) {
            return;
        }
        if (param1.getParser().isOk()) {
            this._window.findChildByName("status_info").caption = this._widget.localizations.getLocalization("camera.competition.submitted.status");
            this._window.findChildByName("competition_name").caption = this._widget.localizations.getLocalization("camera.competition.submitted.info");
        } else if (param1.getParser().getErrorReason() == "too-many-submits") {
            this._window.findChildByName("status_info").caption = this._widget.localizations.getLocalization("generic.failed");
            this._window.findChildByName("competition_name").caption = this._widget.localizations.getLocalization("camera.competition.limit.info");
        } else if (param1.getParser().getErrorReason() == "email-not-verified") {
            this._SafeStr_5505 = false;
            this._window.findChildByName("status_info").caption = this._widget.localizations.getLocalization("generic.failed");
            _loc2_ = this._widget.windowManager.confirm("${generic.alert.title}", "${camera.competition.email.not.verified}", (0x10 | 0x20) >>> 0, this.onEmailVerificationGo);
            _loc2_.setButtonCaption(16, new AlertDialogCaption(this._widget.localizations.getLocalization("email.settings"), "", true));
            _loc2_.setButtonCaption(32, new AlertDialogCaption(this._widget.localizations.getLocalization("groupforum.settings.cancel"), "", true));
        }
        this.setState("image_loaded");
        let _loc3_: IWindow = this._window.findChildByName("competition_button");
        if (_loc3_ != null && _loc3_.y < 10) {
            _loc3_.y = 10;
        }
    }

    public setPrices(param1: number, param2: number, param3: number): void {
        let _loc4_: ITextWindow = asGuarded(this._window.findChildByName("purchase_credit_cost_text"), isITextWindow);
        _loc4_.text = param1.toString();
        let _loc5_: ITextWindow = asGuarded(this._window.findChildByName("purchase_ducket_cost_text"), isITextWindow);
        if (param2 > 0) {
            _loc5_.text = param2.toString();
        } else {
            _loc5_.visible = false;
            this._window.findChildByName("ducket_icon").visible = false;
        }
        let _loc6_: ITextWindow = asGuarded(this._window.findChildByName("publish_ducket_cost_text"), isITextWindow);
        if (_loc6_) {
            _loc6_.text = param3.toString();
        }
    }

    public hide(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._image = null;
        this._widget = null;
        if (this._SafeStr_2561 != null) {
            this._SafeStr_2561.stop();
            this._SafeStr_2561 = null;
        }
    }

    private checkPurse(param1: number, param2: number): boolean {
        let _loc3_: IPurse = this._widget.catalog.getPurse();
        if (_loc3_.credits < param1) {
            this._widget.catalog.showNotEnoughCreditsAlert();
            return false;
        }
        if (_loc3_.getActivityPointsForType(0) < param2) {
            this._widget.catalog.showNotEnoughActivityPointsAlert(0);
            return false;
        }
        return true;
    }

    private disableButtons(param1: boolean): void {
        let _loc4_: IButtonWindow = castGuarded(this._window.findChildByName("buy_button"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
        let _loc2_: IButtonWindow = castGuarded(this._window.findChildByName("publish_button"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
        let _loc3_: IButtonWindow = castGuarded(this._window.findChildByName("competition_button"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
        if (_loc4_) {
            _loc4_.disable();
        }
        if (_loc2_) {
            _loc2_.disable();
        }
        if (_loc3_) {
            _loc3_.disable();
        }
        if (param1) {
            castGuarded(this._window.findChildByName("cancel_button"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow").caption = this._widget.localizations.getLocalization("generic.close");
            this._window.findChildByName("status_info").caption = this._widget.localizations.getLocalization("camera.purchase.pleasewait");
        }
    }

    private setState(param1: string): void {
        if (this._window == null) {
            return;
        }
        this._state = param1;
        let _loc4_: IButtonWindow = castGuarded(this._window.findChildByName("buy_button"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
        let _loc2_: IButtonWindow = castGuarded(this._window.findChildByName("publish_button"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
        let _loc3_: IButtonWindow = castGuarded(this._window.findChildByName("competition_button"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
        switch (param1) {
            case "loading_image":
                this.disableButtons(false);
                break;
            case "image_loaded":
                if (this._SafeStr_5725) {
                    _loc4_.enable();
                }
                if (!this._SafeStr_4819) {
                    if (_loc2_) {
                        _loc2_.enable();
                    }
                }
                if (!this._SafeStr_5505 && _loc3_) {
                    _loc3_.enable();
                }
                break;
            case "waiting_purchase_to_complete":
                this.disableButtons(true);
                if (this._widget.component.getBoolean("disclaimer.credit_spending.enabled")) {
                    this.setDisclaimerAccepted(false);
                }
                break;
            case "waiting_publish_to_complete":
                this._SafeStr_4819 = true;
                this.disableButtons(true);
                break;
            case "waiting_competition_submit_to_complete":
                this._SafeStr_5505 = true;
                this.disableButtons(true);
                break;
            case "rendering_failed":
                this.disableButtons(false);
                this._window.findChildByName("status_info").caption = "";
        }
    }

    private setImage(param1: BitmapData): void {
        if (this._window == null || param1 == null) {
            return;
        }
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("product_image"), isIBitmapWrapperWindow);
        if (_loc3_ == null) {
            return;
        }
        if (_loc3_.bitmap != null) {
            _loc3_.bitmap.dispose();
            _loc3_.bitmap = null;
        }
        if (_loc3_.bitmap == null) {
            _loc3_.bitmap = new BitmapData(_loc3_.width, _loc3_.height, true, 0);
        }
        let _loc2_: number = _loc3_.width / param1.width;
        _loc3_.bitmap.draw(param1, new Matrix(_loc2_, 0, 0, _loc2_, 0, 0), null, null, null, true);
        this._image = param1;
    }

    private onEmailVerificationGo = (param1: IConfirmDialog, param2: WindowEvent): void => {
        let _loc4_: string = null;
        let _loc3_: string = null;
        if (param2.type == "WE_OK") {
            _loc4_ = this._widget.component.context.configuration.getProperty("email.verification.url");
            if (!StringUtil.isEmpty(_loc4_)) {
                _loc3_ = this._widget.component.getInteger("spaweb", 0) == 1 ? "" : "_blank";
                navigateToURL(new URLRequest(_loc4_), _loc3_);
            }
        }
        param1.dispose();
    };

    private windowEventHandler = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: string = null;
        let _loc4_: string = null;
        if (!param1 || !param2) {
            return;
        }
        if (param1.type != "WME_CLICK" && param1.type != "WME_DOUBLE_CLICK") {
            return;
        }
        switch (param2.name) {
            case "spending_disclaimer":
                this.setDisclaimerAccepted(castGuarded(param2, isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected);
                break;
            case "competition_button":
                if (this._state == "image_loaded") {
                    this.setState("waiting_competition_submit_to_complete");
                    this._widget.handler.confirmPhotoCompetitionSubmit();
                }
                break;
            case "buy_button":
                if (this._state == "image_loaded" && this._SafeStr_5725 && this.checkPurse(this._widget.handler.creditPrice, this._widget.handler.ducketPrice)) {
                    this.setState("waiting_purchase_to_complete");
                    this._widget.handler.confirmPhotoPurchase();
                }
                break;
            case "publish_button":
                if (this._state == "image_loaded" && this.checkPurse(0, this._widget.handler.publishDucketPrice)) {
                    this.setState("waiting_publish_to_complete");
                    this._widget.handler.confirmPhotoPublish();
                }
                break;
            case "inventory_link":
                this._widget.component.context.createLinkEvent("inventory/open/furni");
                break;
            case "publish_link":
                _loc3_ = this._widget.container.sessionDataManager.userName;
                _loc4_ = "/profile/" + _loc3_ + "/photo/" + this._SafeStr_4914;
                HabboWebTools.openPage(_loc4_);
                break;
            case "header_button_close":
            case "cancel_button":
                this._widget.startTakingPhoto("photoPurchaseCancel");
                this.hide();
        }
    };

    private setDisclaimerAccepted(param1: boolean): void {
        if (this._window == null) {
            return;
        }
        let _loc2_: IWindow = this._window.findChildByName("buy_button");
        if (_loc2_ == null) {
            return;
        }
        this._SafeStr_5725 = param1;
        if (param1 && this._state == "image_loaded") {
            _loc2_.enable();
        } else {
            _loc2_.disable();
        }
    }

    private onImageLoaded = (param1: AssetLoaderEvent): void => {
        if (!this._window) {
            return;
        }
        let _loc2_: Bitmap = asInstanceOf(castTo(param1.target, BitmapFileLoader).content, Bitmap);
        if (_loc2_) {
            this.setImage(_loc2_.bitmapData);
        }
        this._window.findChildByName("status_info").caption = this._widget.localizations.getLocalization("camera.confirm_phase.info");
        this.setState("image_loaded");
    };

    private onPublishTimerComplete = (param1: TimerEvent): void => {
        let _loc2_: IButtonWindow = null;
        this._SafeStr_4819 = false;
        this._SafeStr_2561 = null;
        if (this._state == "image_loaded") {
            _loc2_ = castGuarded(this._window.findChildByName("publish_button"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
            _loc2_.enable();
        }
    };
}
