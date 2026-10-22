import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILocalization } from '@/com/sulake/core/localization/ILocalization';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ClubBuyOfferData } from '@/com/sulake/habbo/catalog/club/ClubBuyOfferData';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class VipBuyItem implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.club::VipBuyItem'); }

    constructor(param1: ClubBuyOfferData, param2: HabboCatalog, param3: string) {
        let _loc4_: ILocalization = null;
        this._offer = param1;
        this._catalog = param2;
        this._SafeStr_7336 = param3;
        this._window = asGuarded(this._catalog.utils.createWindow("vip_buy_item"), isIWindowContainer);
        let _loc5_: IHabboLocalizationManager = this._catalog.localization;
        if (param1.months > 0) {
            _loc5_.registerParameter("catalog.vip.item.header.months", "num_months", String(param1.months));
            _loc4_ = _loc5_.getLocalizationRaw("catalog.vip.item.header.months");
        } else {
            _loc5_.registerParameter("catalog.vip.item.header.days", "num_days", String(param1.extraDays));
            _loc4_ = _loc5_.getLocalizationRaw("catalog.vip.item.header.days");
        }
        this._window.findChildByName("item_header").caption = _loc4_ != null ? _loc4_.value : "-";
        this._catalog.utils.showPriceInContainer(asGuarded(this._window.findChildByName("item_price"), isIWindowContainer), this._offer);
        this._window.findChildByName("item_buy").addEventListener("WME_CLICK", this.onBuy);
        if (param1.giftable) {
            this._window.findChildByName("item_gift").addEventListener("WME_CLICK", this.onGift);
        } else {
            this._window.findChildByName("item_gift").visible = false;
        }
    }

    declare private _offer: ClubBuyOfferData;

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_7336: string;

    declare private _window: IWindowContainer;

    public get window(): IWindow {
        return this._window;
    }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._window.dispose();
            this._window = null;
            this._disposed = true;
        }
    }

    private onBuy = (param1: WindowMouseEvent): void => {
        this._catalog.purchaseWillBeGift(false);
        this._catalog.showPurchaseConfirmation(this._offer, this._offer.page.pageId);
    };

    private onGift = (param1: WindowMouseEvent): void => {
        this._catalog.purchaseWillBeGift(true);
        this._catalog.showPurchaseConfirmation(this._offer, this._offer.page.pageId);
    };

    get [IDisposable](): true {
        return true;
    }
}
