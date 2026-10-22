import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { HabboInventoryHabboClubEvent } from '@/com/sulake/habbo/inventory/events/HabboInventoryHabboClubEvent';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import type { IExtensionView } from '@/com/sulake/habbo/toolbar/IExtensionView';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { GetHabboClubExtendOfferMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetHabboClubExtendOfferMessageComposer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';

export class CitizenshipVipDiscountPromoExtension {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions::CitizenshipVipDiscountPromoExtension'); }

    declare private _toolbar: HabboToolbar;

    declare private _view: IBorderWindow;

    private _expanded: boolean = true;
    private _SafeStr_6265: number = 216;

    declare private _SafeStr_3129: Timer;

    constructor(param1: HabboToolbar) {
        this._toolbar = param1;
    }

    private createWindow(): IBorderWindow {
        let _loc1_: IBorderWindow = null;
        let _loc2_: IAsset = this._toolbar.assets.getAssetByName("vip_discount_promotion_v2_xml");
        if (_loc2_) {
            _loc1_ = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML), 1), isIBorderWindow);
            if (_loc1_) {
                castGuarded(_loc1_.findChildByName("extend_button").addEventListener("WME_CLICK", this.onButtonClicked), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
                castGuarded(_loc1_.findChildByName("minimize_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").addEventListener("WME_CLICK", this.onMinMax);
                castGuarded(_loc1_.findChildByName("maximize_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").addEventListener("WME_CLICK", this.onMinMax);
                this._SafeStr_6265 = _loc1_.height;
            }
        }
        return _loc1_;
    }

    private destroyWindow(): void {
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        this.destroyExpirationTimer();
    }

    private get extensionView(): IExtensionView {
        return this._toolbar.extensionView;
    }

    public dispose(): void {
        if (this._toolbar == null) {
            return;
        }
        if (this.extensionView != null) {
            this.extensionView.detachExtension("club_promo");
        }
        this.destroyWindow();
        this._toolbar = null;
    }

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        if (this._toolbar.inventory.clubLevel == 2) {
            this._toolbar.connection.send(new EventLogMessageComposer("DiscountPromo", "citizenshipdiscount", "client.club.extend.discount.clicked"));
            this._toolbar.connection.send(new GetHabboClubExtendOfferMessageComposer());
        }
    };

    private assignState(): void {
        this._view.findChildByName("content_itemlist").visible = this._expanded;
        this._view.findChildByName("promo_img").visible = this._expanded;
        this._view.height = this._expanded ? this._SafeStr_6265 : 33;
    }

    public onClubChanged(param1: HabboInventoryHabboClubEvent): void {
        if (this._toolbar.inventory.citizenshipVipIsExpiring && this._view == null && this.isExtensionEnabled()) {
            this._view = this.createWindow();
            if (this._SafeStr_3129 != null) {
                this.destroyExpirationTimer();
            }
            if (this._toolbar.inventory.clubMinutesUntilExpiration < 1440 && this._toolbar.inventory.clubMinutesUntilExpiration > 0) {
                this._SafeStr_3129 = new Timer(this._toolbar.inventory.clubMinutesUntilExpiration * 60 * 1000, 1);
                this._SafeStr_3129.addEventListener("timerComplete", this.onExtendOfferExpire);
                this._SafeStr_3129.start();
            }
            this.assignState();
            if (!this._toolbar.extensionView.hasExtension("vip_quests")) {
                this._toolbar.extensionView.attachExtension("club_promo", this._view, 10);
            }
        } else {
            this._toolbar.extensionView.detachExtension("vip_quests");
            this.destroyWindow();
        }
    }

    private destroyExpirationTimer(): void {
        if (this._SafeStr_3129) {
            this._SafeStr_3129.stop();
            this._SafeStr_3129.removeEventListener("timerComplete", this.onExtendOfferExpire);
            this._SafeStr_3129 = null;
        }
    }

    private onExtendOfferExpire = (param1: TimerEvent): void => {
        this._toolbar.extensionView.detachExtension("club_promo");
        this.destroyWindow();
    };

    private isExtensionEnabled(): boolean {
        return this._toolbar.inventory.clubLevel == 2 && this._toolbar.getBoolean("club.membership.extend.vip.promotion.enabled");
    }

    private onMinMax = (param1: WindowMouseEvent): void => {
        this._expanded = !this._expanded;
        this.assignState();
    };
}
