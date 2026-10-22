import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { HabboClubCenter } from '@/com/sulake/habbo/catalog/clubcenter/HabboClubCenter';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import type { ScrKickbackData } from '@/com/sulake/habbo/communication/messages/incoming/users/ScrKickbackData';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomPreviewerWidget } from '@/com/sulake/habbo/window/widgets/IRoomPreviewerWidget';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';
import { isIRoomPreviewerWidget } from '@/com/sulake/habbo/window/widgets/IRoomPreviewerWidget';

export class ClubCenterView implements IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.clubcenter::ClubCenterView'); }

    declare private _controller: HabboClubCenter;

    declare private _window: IWindowContainer;

    declare private _widget: IRoomPreviewerWidget;

    declare private _figure: string;

    constructor(param1: HabboClubCenter, param2: IHabboWindowManager, param3: string) {
        this._controller = param1;
        this._window = asGuarded(param2.buildFromXML(XML.from(this._controller.assets.getAssetByName("club_center_xml").content)), isIWindowContainer);
        if (!this.container) {
            return;
        }
        if (!this._controller.isKickbackEnabled()) {
            this.removeElement("special_breakdown_link");
            this.removeElement("special_content");
            this.removeElement("special_content_postit");
            this.container.invalidate();
        } else {
            this.setElementVisibility("special_amount_icon", false);
            this.setElementVisibility("special_amount_title", false);
            this.setElementVisibility("special_amount_content", false);
            this.setElementVisibility("special_breakdown_link", false);
            this.setElementVisibility("special_time_content", false);
        }
        this.setElementVisibility("btn_earn", false);
        this._controller.getOffers();
        this._window.center();
        this._window.addEventListener("WE_RELOCATE", this.onRelocate);
        this._figure = param3;
        this._widget = asGuarded(castGuarded(this._window.findChildByName("avatar"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIRoomPreviewerWidget);
        let _loc4_: IAvatarImage = this._controller.avatarRenderManager.createAvatarImage(param3, "h", null, this);
        if (_loc4_) {
            _loc4_.setDirection("full", 4);
            this._widget.showPreview(_loc4_.getCroppedImage("full"));
        }
        this.container.procedure = this.onInput;
    }

    public dispose(): void {
        if (this._window) {
            this._window.removeEventListener("WE_RELOCATE", this.onRelocate);
            this._window.dispose();
            this._window = null;
        }
        this._controller = null;
    }

    public dataReceived(param1: ScrKickbackData, param2: IPurse, param3: number, param4: BitmapData): void {
        let _loc7_: number = 0;
        let _loc6_: IButtonWindow = null;
        let _loc9_: string = this._controller.resolveClubStatus();
        this.setElementText("status_title", "${hccenter.status." + _loc9_ + "}");
        if (!param1 || !param2) {
            this.setElementVisibility("gift_content", false);
            this.setElementVisibility("special_container", false);
            return;
        }
        this.setElementVisibility("gift_content", true);
        let _loc5_: string = this.getLocalization("hccenter.status." + _loc9_ + ".info");
        _loc5_ = _loc5_.replace("%timeleft%", this.formatMinutes(param2.minutesUntilExpiration));
        _loc5_ = _loc5_.replace("%joindate%", param1.firstSubscriptionDate);
        _loc5_ = _loc5_.replace("%streakduration%", this.formatDays(param1.currentHcStreak));
        this.setElementText("status_info", _loc5_);
        let _loc8_: IBitmapWrapperWindow = asGuarded(this.container.findChildByName("hc_badge"), isIBitmapWrapperWindow);
        if (_loc8_ && param4) {
            _loc8_.bitmap = param4;
        }
        if (this._controller.isKickbackEnabled()) {
            if (param1.timeUntilPayday < 60) {
                this.setElementText("special_time_content", this.getLocalization("hccenter.special.time.soon"));
            } else {
                this.setElementText("special_time_content", this.formatMinutes(param1.timeUntilPayday));
            }
            this.setElementVisibility("special_time_content", true);
            _loc7_ = param1.creditRewardForMonthlySpent + param1.creditRewardForStreakBonus;
            if (_loc7_ > 0) {
                this.setElementVisibility("special_amount_icon", true);
                this.setElementVisibility("special_amount_title", true);
                this.setElementVisibility("special_amount_content", true);
                this.setElementVisibility("special_breakdown_link", true);
                this.setElementText("special_amount_content", this.getLocalization("hccenter.special.sum").replace("%credits%", String(_loc7_)));
            }
        }
        _loc6_ = asGuarded(this.container.findChildByName("btn_gift"), isIButtonWindow);
        if (_loc9_ == "active" && param3 > 0) {
            if (_loc6_) {
                _loc6_.caption = "${hccenter.btn.gifts.redeem}";
            }
            this.setElementText("gift_info", this.getLocalization("hccenter.unclaimedgifts").replace("%unclaimedgifts%", String(param3)));
        } else {
            if (_loc6_) {
                _loc6_.caption = "${hccenter.btn.gifts.view}";
            }
            this.setElementText("gift_info", this.getLocalization("hccenter.gift.info"));
        }
        _loc6_ = asGuarded(this.container.findChildByName("btn_buy"), isIButtonWindow);
        if (_loc9_ == "active") {
            if (_loc6_) {
                _loc6_.caption = "${hccenter.btn.extend}";
            }
        } else if (_loc6_) {
            _loc6_.caption = "${hccenter.btn.buy}";
        }
    }

    public avatarImageReady(param1: string): void {
        let _loc2_: IAvatarImage = null;
        if (param1 == this._figure) {
            _loc2_ = this._controller.avatarRenderManager.createAvatarImage(this._figure, "h", null, this);
            _loc2_.setDirection("full", 4);
            this._widget.showPreview(_loc2_.getCroppedImage("full"));
        }
    }

    private onInput = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK" || !this._controller) {
            return;
        }
        param1.stopImmediatePropagation();
        param1.stopPropagation();
        switch (param2.name) {
            case "header_button_close":
                this._controller.removeView();
                return;
            case "special_infolink":
                this._controller.openPaydayHelpPage();
                break;
            case "special_breakdown_link":
                this._controller.showPaydayBreakdownView();
                break;
            case "general_infolink":
                this._controller.openHelpPage();
                break;
            case "btn_gift":
                this._controller.openClubGiftPage();
                break;
            case "btn_buy":
                this._controller.openPurchasePage();
                break;
            case "btn_earn":
                if (this._controller.offerCenter) {
                    this._controller.offerCenter.showVideo();
                }
                break;
            default:
                return;
        }
    };

    private onRelocate = (param1: WindowEvent): void => {
        this._controller.removeBreakdown();
    };

    private get container(): IWindowContainer {
        return this._window;
    }

    private setElementText(param1: string, param2: string): void {
        if (!this.container) {
            return;
        }
        let _loc3_: ITextWindow = asGuarded(this.container.findChildByName(param1), isITextWindow);
        if (_loc3_) {
            _loc3_.text = param2;
        }
    }

    private setElementVisibility(param1: string, param2: boolean): void {
        if (!this.container) {
            return;
        }
        let _loc3_: IWindow = this.container.findChildByName(param1);
        if (_loc3_) {
            _loc3_.visible = param2;
        }
    }

    public getSpecialCalloutAnchor(): IWindow {
        return this.container ? this.container.findChildByName("special_content_postit") : null;
    }

    private removeElement(param1: any): void {
        if (!this.container) {
            return;
        }
        let _loc3_: IWindow = this.container.findChildByName(stringOrNull(param1));
        if (!_loc3_) {
            return;
        }
        let _loc2_: IWindowContainer = asGuarded(_loc3_.parent, isIWindowContainer);
        _loc2_.removeChild(_loc3_);
    }

    private getLocalization(param1: string): string {
        if (!this._controller || !this._controller.localization) {
            return "";
        }
        return this._controller.localization.getLocalization(param1, param1);
    }

    public formatMinutes(param1: number): string {
        return FriendlyTime.getShortFriendlyTime(this._controller.localization, param1 * 60);
    }

    public formatDays(param1: number): string {
        return FriendlyTime.getShortFriendlyTime(this._controller.localization, param1 * 86400);
    }

    public get disposed(): boolean {
        return this._controller == null;
    }

    public setVideoOfferButtonVisibility(param1: boolean, param2: boolean): void {
        let _loc3_: IWindow = this._window.findChildByName("btn_earn");
        if (_loc3_) {
            _loc3_.visible = param1;
            if (param2) {
                _loc3_.enable();
                _loc3_.alpha = 0;
            } else {
                _loc3_.disable();
                _loc3_.alpha = 51;
            }
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
