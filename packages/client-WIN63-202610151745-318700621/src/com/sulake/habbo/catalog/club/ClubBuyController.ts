import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import type { IVipBuyCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/IVipBuyCatalogWidget';
import type { HabboClubOffersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/HabboClubOffersMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { ClubBuyConfirmationDialog } from '@/com/sulake/habbo/catalog/club/ClubBuyConfirmationDialog';
import { ClubBuyOfferData } from '@/com/sulake/habbo/catalog/club/ClubBuyOfferData';

export class ClubBuyController {
    static { registerClassName(this, 'com.sulake.habbo.catalog.club::ClubBuyController'); }

    declare private _visualization: IVipBuyCatalogWidget;

    declare private _catalog: HabboCatalog;

    declare private _offers: any[];

    declare private _SafeStr_2174: ClubBuyConfirmationDialog;

    declare private _connection: IConnection;

    private _disposed: boolean = false;

    constructor(param1: HabboCatalog, param2: IConnection) {
        this._catalog = param1;
        this._connection = param2;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._visualization != null) {
            this._visualization.dispose();
            this._visualization = null;
        }
        this.reset();
        this.closeConfirmation();
        this._catalog = null;
        this._disposed = true;
    }

    public get catalog(): HabboCatalog {
        return this._catalog;
    }

    public reset(): void {
        for (const _loc1_ of this._offers ?? []) {
            _loc1_.dispose();
        }
        this._offers = [];
    }

    public onOffers(param1: HabboClubOffersMessageParser): void {
        let _loc9_: ClubBuyOfferData = null;
        let _loc6_: ClubBuyOfferData = null;
        let _loc7_: boolean = false;
        let _loc3_: any[] = null;
        let _loc8_: number = 0;
        if (this._disposed) {
            return;
        }
        this.reset();
        let _loc5_: number = 0;
        for (const _loc2_ of param1.offers ?? []) {
            _loc6_ = new ClubBuyOfferData(_loc2_.offerId | 0, stringOrNull(_loc2_.productCode), _loc2_.priceCredits | 0, _loc2_.priceActivityPoints | 0, _loc2_.priceActivityPointType | 0, _loc2_.vip, _loc2_.months | 0, _loc2_.extraDays | 0, _loc2_.daysLeftAfterPurchase | 0, _loc2_.year | 0, _loc2_.month | 0, _loc2_.day | 0, _loc2_.isGiftable);
            this._offers.push(_loc6_);
            if (_loc2_.vip) {
                _loc5_++;
                _loc9_ = _loc6_;
            }
        }
        if (_loc5_ == 1) {
            _loc9_.upgradeHcPeriodToVip = true;
        }
        this._offers.sort(this.orderByPrecedence);
        if (this._visualization != null) {
            this._visualization.reset();
            this._visualization.initClubType(this.getClubType());
            _loc7_ = this._visualization.isGift;
            _loc3_ = this.getPromotedMonths(_loc7_);
            for (const _loc4_ of this._offers ?? []) {
                if (_loc4_.months > 0) {
                    if (_loc3_.length > 0) {
                        _loc8_ = _loc4_.months | 0;
                        if (_loc3_.indexOf(_loc8_) == -1) {
                            continue;
                        }
                    }
                    this._visualization.showOffer(_loc4_);
                }
            }
        }
    }

    private getPromotedMonths(param1: boolean): any[] {
        let _loc4_: string = null;
        let _loc3_: any[] = null;
        let _loc6_: number = NaN;
        let _loc2_: any[] = [];
        let _loc7_: string = param1 ? "catalog.vip.gift.promo" : "catalog.vip.buy.promo";
        if (this._catalog.propertyExists(_loc7_)) {
            _loc4_ = this._catalog.getProperty(_loc7_, null);
            if (_loc4_ != null && _loc4_.length > 0) {
                _loc3_ = _loc4_.split(",");
                if (_loc3_.length > 0) {
                    for (const _loc5_ of _loc3_ ?? []) {
                        _loc6_ = Number(parseInt(stringOrNull(_loc5_)));
                        if (!isNaN(_loc6_) && _loc6_ > 0) {
                            _loc2_.push(_loc6_);
                        }
                    }
                }
            }
        }
        return _loc2_;
    }

    public unRegisterVisualization(param1: IVipBuyCatalogWidget): void {
        if (this._visualization == param1) {
            this._visualization = null;
        }
    }

    public registerVisualization(param1: IVipBuyCatalogWidget): void {
        this._visualization = param1;
    }

    public requestOffers(param1: number): void {
        this._catalog.getHabboClubOffers(param1);
    }

    public showConfirmation(param1: ClubBuyOfferData, param2: number): void {
        this.closeConfirmation();
        this._SafeStr_2174 = new ClubBuyConfirmationDialog(this, param1, param2);
    }

    public confirmSelection(param1: ClubBuyOfferData, param2: number): void {
        if (!this._catalog || !this._catalog.connection) {
            return;
        }
        this._catalog.purchaseProduct(param2, param1.offerId);
        this.closeConfirmation();
    }

    public closeConfirmation(): void {
        if (this._SafeStr_2174) {
            this._SafeStr_2174.dispose();
            this._SafeStr_2174 = null;
        }
    }

    public getClubType(): number {
        let _loc1_: number = 0;
        if (this._catalog.getPurse().hasClubLeft) {
            _loc1_ = this._catalog.getPurse().isVIP ? 2 : 1;
        }
        return _loc1_;
    }

    public get hasClub(): boolean {
        if (!this._catalog || !this._catalog.getPurse()) {
            return false;
        }
        return this._catalog.getPurse().clubDays > 0;
    }

    public get windowManager(): IHabboWindowManager {
        if (!this._catalog) {
            return null;
        }
        return this._catalog.windowManager;
    }

    public get localization(): IHabboLocalizationManager {
        if (!this._catalog) {
            return null;
        }
        return this._catalog.localization;
    }

    public get assets(): IAssetLibrary {
        if (!this._catalog) {
            return null;
        }
        return this._catalog.assets;
    }

    public get roomEngine(): IRoomEngine {
        if (!this._catalog) {
            return null;
        }
        return this._catalog.roomEngine;
    }

    public getProductData(param1: string): IProductData {
        if (!this._catalog) {
            return null;
        }
        return this._catalog.getProductData(param1);
    }

    public getPurse(): IPurse {
        if (!this._catalog) {
            return null;
        }
        return this._catalog.getPurse();
    }

    private orderByPrecedence = (param1: ClubBuyOfferData, param2: ClubBuyOfferData): number => {
        let _loc3_: number = param1.months;
        let _loc4_: number = param2.months;
        if (_loc3_ < _loc4_) {
            return -1;
        }
        if (_loc3_ > _loc4_) {
            return 1;
        }
        return 0;
    };
}
