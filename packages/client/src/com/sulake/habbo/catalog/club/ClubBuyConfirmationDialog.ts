import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ClubBuyController } from '@/com/sulake/habbo/catalog/club/ClubBuyController';
import type { ClubBuyOfferData } from '@/com/sulake/habbo/catalog/club/ClubBuyOfferData';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class ClubBuyConfirmationDialog {
    static { registerClassName(this, 'com.sulake.habbo.catalog.club::ClubBuyConfirmationDialog'); }

    constructor(param1: ClubBuyController, param2: ClubBuyOfferData, param3: number) {
        this._offer = param2;
        this._controller = param1;
        this._pageId = param3;
        this.showConfirmation();
    }

    declare private _offer: ClubBuyOfferData;

    declare private _controller: ClubBuyController;

    declare private _view: IFrameWindow;

    declare private _pageId: number;
    static { (this.prototype as any)._pageId = 0; }

    public dispose(): void {
        this._controller = null;
        this._offer = null;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
    }

    public showConfirmation(): void {
        if (!this._offer || !this._controller) {
            return;
        }
        this._view = asGuarded(this._controller.catalog.utils.createWindow("club_buy_confirmation"), isIFrameWindow);
        if (!this._view) {
            return;
        }
        this._view.procedure = this.windowEventHandler;
        this._view.center();
        if (this._controller.catalog.getBoolean("disclaimer.credit_spending.enabled")) {
            this.setDisclaimerAccepted(false);
        } else {
            this._view.findChildByName("disclaimer").dispose();
            this.setDisclaimerAccepted(true);
        }
        let _loc1_: IHabboLocalizationManager = this._controller.localization;
        let _loc4_: IPurse = this._controller.getPurse();
        let _loc5_: string = _loc4_.hasClubLeft && _loc4_.isVIP ? "extension." : "subscription.";
        let _loc3_: string = this._offer.months == 0 ? "days" : "months";
        let _loc2_: string = "catalog.vip.buy.confirm." + _loc5_ + _loc3_;
        _loc1_.registerParameter(_loc2_, "num_" + _loc3_, String(this._offer.months == 0 ? this._offer.extraDays : this._offer.months));
        this._view.findChildByName("subscription_name").caption = _loc1_.getLocalization(_loc2_);
        _loc1_.registerParameter("catalog.vip.buy.confirm.end_date", "day", String(this._offer.day));
        _loc1_.registerParameter("catalog.vip.buy.confirm.end_date", "month", String(this._offer.month));
        _loc1_.registerParameter("catalog.vip.buy.confirm.end_date", "year", String(this._offer.year));
        this._controller.catalog.utils.showPriceInContainer(asGuarded(this._view.findChildByName("purchase_cost_box"), isIWindowContainer), this._offer);
    }

    private setDisclaimerAccepted(param1: boolean): void {
        if (this._view == null) {
            return;
        }
        let _loc2_: IWindow = this._view.findChildByName("select_button");
        if (_loc2_ == null) {
            return;
        }
        if (param1) {
            _loc2_.enable();
        } else {
            _loc2_.disable();
        }
    }

    private windowEventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (!param1 || !param2 || !this._controller || !this._offer) {
            return;
        }
        if (param1.type != "WME_CLICK" && param1.type != "WME_DOUBLE_CLICK") {
            return;
        }
        switch (param2.name) {
            case "spending_disclaimer":
                this.setDisclaimerAccepted(castGuarded(param2, isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected);
                break;
            case "select_button":
                this._controller.catalog.doNotCloseAfterVipPurchase();
                this._controller.confirmSelection(this._offer, this._pageId);
                break;
            case "header_button_close":
            case "cancel_button":
                this._controller.catalog.forgetPageDuringVipPurchase();
                this._controller.closeConfirmation();
        }
    };
}
