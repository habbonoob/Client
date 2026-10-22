import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILocalization } from '@/com/sulake/core/localization/ILocalization';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ClubBuyOfferData } from '@/com/sulake/habbo/catalog/club/ClubBuyOfferData';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';

export class ClubBuyItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.club::ClubBuyItem'); }

    constructor(param1: ClubBuyOfferData, param2: ICatalogPage) {
        let _loc5_: XML = null;
        let _loc3_: ILocalization = null;
        this._offer = param1;
        this._page = param2;
        if (param1.vip) {
            _loc5_ = this.getAssetXML("club_buy_vip_item");
        } else {
            _loc5_ = this.getAssetXML("club_buy_hc_item");
        }
        this._window = asGuarded(this._page.viewer.catalog.windowManager.buildFromXML(_loc5_), isIWindowContainer);
        let _loc4_: IHabboLocalizationManager = (asInstanceOf(param2.viewer.catalog, HabboCatalog)).localization;
        _loc4_.registerParameter("catalog.club.item.header", "months", String(param1.months));
        _loc3_ = _loc4_.getLocalizationRaw("catalog.club.item.header");
        this._window.findChildByName("item_header").caption = _loc3_.value;
        _loc4_.registerParameter("catalog.club.price", "price", String(param1.priceCredits));
        _loc3_ = _loc4_.getLocalizationRaw("catalog.club.price");
        this._window.findChildByName("item_price").caption = _loc3_.value;
        let _loc6_: IButtonWindow = asGuarded(this._window.findChildByName("item_buy"), isIButtonWindow);
        if (_loc6_ != null) {
            _loc6_.addEventListener("WME_CLICK", this.onBuy);
        }
    }

    declare private _offer: ClubBuyOfferData;

    declare private _page: ICatalogPage;

    declare private _window: IWindowContainer;

    public get window(): IWindow {
        return this._window;
    }

    public dispose(): void {
        this._window.dispose();
    }

    private onBuy = (param1: WindowMouseEvent): void => {
        castTo(this._page.viewer.catalog, HabboCatalog).showPurchaseConfirmation(this._offer, this._page.pageId);
    };

    private getAssetXML(param1: string): XML {
        if (!this._page || !this._page.viewer || !this._page.viewer.catalog || !this._page.viewer.catalog.assets) {
            return null;
        }
        let _loc2_: XmlAsset = asInstanceOf(this._page.viewer.catalog.assets.getAssetByName(param1), XmlAsset);
        if (_loc2_ == null) {
            return null;
        }
        return asInstanceOf(_loc2_.content, XML);
    }
}
