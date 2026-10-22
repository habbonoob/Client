import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { ClubBuyController } from '@/com/sulake/habbo/catalog/club/ClubBuyController';
import type { ClubBuyOfferData } from '@/com/sulake/habbo/catalog/club/ClubBuyOfferData';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import type { ICatalogViewer } from '@/com/sulake/habbo/catalog/viewer/ICatalogViewer';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IVipBuyCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/IVipBuyCatalogWidget';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { CatalogPage, ClubBuyItem, HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class ClubBuyCatalogWidget extends CatalogWidget implements ICatalogWidget, IVipBuyCatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::ClubBuyCatalogWidget'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        ClubBuyCatalogWidget.#initStatics();
        return ClubBuyCatalogWidget._log;
    }

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    declare private _controller: ClubBuyController;

    declare private _offers: any[];

    public get isGift(): boolean {
        return false;
    }

    public override dispose(): void {
        if (this._controller != null) {
            this._controller.unRegisterVisualization(this);
        }
        this._controller = null;
        this.reset();
        super.dispose();
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this._offers = [];
        this.attachWidgetView("clubBuyWidget");
        this._controller = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).getClubBuyController();
        this._controller.registerVisualization(this);
        this._controller.requestOffers(0);
        return true;
    }

    public reset(): void {
        for (const _loc1_ of this._offers ?? []) {
            _loc1_.dispose();
        }
        this._offers = [];
    }

    public initClubType(param1: number): void {
        let _loc5_: HabboCatalog = null;
        let _loc2_: IHabboLocalizationManager = null;
        let _loc8_: IPurse = null;
        let _loc7_: number = 0;
        let _loc6_: number = 0;
        let _loc4_: number = 0;
        if (this.disposed) {
            return;
        }
        let _loc3_: ICatalogViewer = this.page.viewer;
        if (_loc3_) {
            _loc5_ = asInstanceOf(_loc3_.catalog, HabboCatalog);
            if (_loc5_) {
                _loc2_ = _loc5_.localization;
                _loc8_ = _loc5_.getPurse();
                if (_loc8_ && _loc2_) {
                    _loc7_ = _loc8_.clubDays;
                    _loc6_ = _loc8_.clubPeriods;
                    _loc4_ = _loc6_ * 31 + _loc7_;
                    _loc2_.registerParameter("catalog.club.buy.remaining.hc", "days", String(_loc4_));
                    _loc2_.registerParameter("catalog.club.buy.remaining.vip", "days", String(_loc4_));
                }
            }
        }
        try {
            if (this._window) {
                switch (param1) {
                    case 0:
                        this._window.findChildByName("club_header").caption = "${catalog.club.buy.header.none}";
                        this._window.findChildByName("club_info").caption = "${catalog.club.buy.info.none}";
                        this._window.findChildByName("club_remaining").visible = false;
                        this._window.findChildByName("club_remaining_bg").visible = false;
                        break;
                    case 1:
                        this._window.findChildByName("club_header").caption = "${catalog.club.buy.header.hc}";
                        this._window.findChildByName("club_info").caption = "${catalog.club.buy.info.hc}";
                        this._window.findChildByName("club_remaining").caption = "${catalog.club.buy.remaining.hc}";
                        break;
                    case 2:
                        this._window.findChildByName("club_header").caption = "${catalog.club.buy.header.vip}";
                        this._window.findChildByName("club_info").caption = "${catalog.club.buy.info.vip}";
                        this._window.findChildByName("club_remaining").caption = "${catalog.club.buy.remaining.vip}";
                        this.showClubInfo();
                }
            }
        } catch (e) {
            ErrorReportStorage.addDebugData("ClubBuyCatalogWidget", "initClubType - Window not properly constructed!");
        }
        this.initLinks();
    }

    public showOffer(param1: ClubBuyOfferData): void {
        let _loc2_: ClubBuyItem = null;
        let _loc3_: IItemListWindow = null;
        if (this.disposed) {
            return;
        }
        ClubBuyCatalogWidget._log.info("Offer: " + [param1.offerId, param1.productCode, param1.priceCredits, param1.vip, param1.months, param1.daysLeftAfterPurchase, param1.year, param1.month, param1.day, param1.upgradeHcPeriodToVip]);
        param1.page = this.page;
        try {
            _loc2_ = new ClubBuyItem(param1, asInstanceOf(this.page, CatalogPage));
        } catch (e) {
            ErrorReportStorage.addDebugData("ClubBuyCatalogWidget", "showOffer - new ClubBuyItem(" + String(param1) + ", " + (String(asInstanceOf(this.page, CatalogPage))) + ") crashed!");
            return;
        }
        if (param1.vip) {
            _loc3_ = asGuarded(this._window.findChildByName("item_list_vip"), isIItemListWindow);
        } else {
            _loc3_ = asGuarded(this._window.findChildByName("item_list_hc"), isIItemListWindow);
        }
        if (_loc3_ != null) {
            _loc3_.addListItem(_loc2_.window);
        }
        this._offers.push(_loc2_);
    }

    private initLinks(): void {
        let _loc1_: IWindow = null;
        if (this._window) {
            _loc1_ = this._window.findChildByName("club_link");
            if (_loc1_) {
                _loc1_.setParamFlag(1);
                _loc1_.mouseThreshold = 0;
                _loc1_.addEventListener("WME_CLICK", this.onClickLink);
            }
        }
    }

    private onClickLink = (param1: WindowMouseEvent): void => {
        let _loc3_: string = null;
        let _loc4_: string = param1.target.name;
        let _loc2_: ICoreConfiguration = asInstanceOf(this.page.viewer.catalog, HabboCatalog);
        let _loc5_: any = _loc4_;
        if ("club_link" === _loc5_) {
            _loc3_ = _loc2_.getProperty("link.format.club");
            this.openExternalLink(_loc3_);
        }
    };

    private openExternalLink(param1: string): void {
        if (param1 != "") {
            this.page.viewer.catalog.windowManager.alert("${catalog.alert.external.link.title}", "${catalog.alert.external.link.desc}", 0, this.onExternalLink);
            HabboWebTools.navigateToURL(param1, "habboMain");
        }
    }

    private onExternalLink = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
    };

    private showClubInfo(): void {
        let _loc2_: XML = null;
        let _loc1_: IWindow = null;
        let _loc3_: IItemListWindow = asGuarded(this._window.findChildByName("item_list_hc"), isIItemListWindow);
        if (_loc3_ != null) {
            _loc2_ = this.getAssetXML("club_buy_info_item");
            _loc1_ = this.page.viewer.catalog.windowManager.buildFromXML(_loc2_);
            _loc3_.addListItem(_loc1_);
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ClubBuyCatalogWidget.#staticsReady) return;
        ClubBuyCatalogWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ClubBuyCatalogWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.viewer.widgets.ClubBuyCatalogWidget"));
    }
}
