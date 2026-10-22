import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ClubBuyController } from '@/com/sulake/habbo/catalog/club/ClubBuyController';
import type { ClubBuyOfferData } from '@/com/sulake/habbo/catalog/club/ClubBuyOfferData';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IVipBuyCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/IVipBuyCatalogWidget';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { VipBuyItem } from '@/com/sulake/habbo/catalog/club/VipBuyItem';
import { CatalogPage } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { Logger } from '@/com/sulake/habbo/Logger';

export class LoyaltyVipBuyCatalogWidget extends CatalogWidget implements ICatalogWidget, IVipBuyCatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::LoyaltyVipBuyCatalogWidget'); }

    declare private _controller: ClubBuyController;

    declare private _offers: any[];

    declare private _catalog: HabboCatalog;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    public get isGift(): boolean {
        return false;
    }

    public override dispose(): void {
        if (this._controller != null) {
            this._controller.unRegisterVisualization(this);
            this._controller = null;
        }
        this.reset();
        super.dispose();
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this._offers = [];
        this._controller = this._catalog.getClubBuyController();
        this._controller.registerVisualization(this);
        this._controller.requestOffers(6);
        return true;
    }

    public reset(): void {
        for (const _loc1_ of this._offers ?? []) {
            _loc1_.dispose();
        }
        this._offers = [];
    }

    public initClubType(param1: number): void {
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        if (this.disposed) {
            return;
        }
        let _loc2_: IHabboLocalizationManager = this._catalog.localization;
        let _loc6_: IPurse = this._catalog.getPurse();
        if (_loc6_ != null && _loc2_ != null) {
            _loc5_ = _loc6_.clubDays;
            _loc4_ = _loc6_.clubPeriods;
            _loc3_ = _loc4_ * 31 + _loc5_;
            _loc2_.registerParameter("catalog.vip.extend.info", "days", String(_loc3_));
        }
        if (this._window != null && param1 == 2) {
            this._window.findChildByName("vip_title").caption = "${catalog.vip.extend.title}";
            this._window.findChildByName("vip_info").caption = "${catalog.vip.extend.info}";
        }
        if (this._window != null) {
            this.fixFormatting(asGuarded(this._window.findChildByName("vip_title"), isITextWindow));
            this.fixFormatting(asGuarded(this._window.findChildByName("vip_info"), isITextWindow), 3);
        }
        this.initLinks();
    }

    private fixFormatting(param1: ITextWindow, param2: number = 0): void {
        let _loc3_: TextFormat = param1.getTextFormat();
        _loc3_.align = "center";
        _loc3_.leading = param2;
        param1.setTextFormat(_loc3_);
    }

    private initLinks(): void {
        let _loc1_: IWindow = null;
        if (this._window) {
            _loc1_ = this._window.findChildByName("vip_link");
            if (_loc1_) {
                _loc1_.addEventListener("WME_CLICK", this.onBenefits);
                _loc1_.mouseThreshold = 0;
            }
        }
    }

    public onBenefits = (param1: WindowMouseEvent): void => {
        this._catalog.utils.showVipBenefits();
    };

    public showOffer(param1: ClubBuyOfferData): void {
        let _loc2_: VipBuyItem = null;
        if (this.disposed || !param1.vip) {
            return;
        }
        Logger.log("Offer: " + [param1.offerId, param1.productCode, param1.priceCredits, param1.vip, param1.months, param1.daysLeftAfterPurchase, param1.year, param1.month, param1.day, param1.upgradeHcPeriodToVip]);
        param1.page = this.page;
        try {
            _loc2_ = new VipBuyItem(param1, this._catalog, "HabboCatalogBuy");
        } catch (e) {
            ErrorReportStorage.addDebugData("ClubBuyCatalogWidget", "showOffer - new ClubBuyItem(" + String(param1) + ", " + (String(asInstanceOf(this.page, CatalogPage))) + ") crashed!");
            return;
        }
        let _loc3_: IItemListWindow = asGuarded(this._window.findChildByName("item_list_vip"), isIItemListWindow);
        if (_loc3_ != null) {
            _loc3_.addListItem(_loc2_.window);
        }
        this._offers.push(_loc2_);
    }
}
