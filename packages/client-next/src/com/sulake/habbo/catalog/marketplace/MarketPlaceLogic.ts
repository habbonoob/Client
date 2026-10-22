import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IMarketPlace } from '@/com/sulake/habbo/catalog/marketplace/IMarketPlace';
import type { IMarketPlaceOfferData } from '@/com/sulake/habbo/catalog/marketplace/IMarketPlaceOfferData';
import type { IMarketPlaceVisualization } from '@/com/sulake/habbo/catalog/marketplace/IMarketPlaceVisualization';
import type { MarketplaceItemStats } from '@/com/sulake/habbo/catalog/marketplace/MarketplaceItemStats';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { MarketplaceConfirmationDialog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { _SafeCls_6014 } from '@/com/sulake/habbo/catalog/marketplace/_SafeCls_6014';
import { MarketPlaceOfferData } from '@/com/sulake/habbo/catalog/marketplace/MarketPlaceOfferData';
import { MarketplaceBuyOfferResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceBuyOfferResultEvent';
import { MarketplaceCancelAllOffersResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceCancelAllOffersResultEvent';
import { MarketplaceCancelOfferResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceCancelOfferResultEvent';
import { MarketplaceClearOwnHistoryResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketplaceClearOwnHistoryResultEvent';
import { MarketPlaceOffersEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketPlaceOffersEvent';
import { MarketPlaceOwnOffersEvent } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketPlaceOwnOffersEvent';
import { GetMarketplaceConfigurationMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/GetMarketplaceConfigurationMessageComposer';
import { _SafeCls_6012 } from '@/com/sulake/habbo/communication/messages/parser/marketplace/_SafeCls_6012';
import { _SafeCls_6013 } from '@/com/sulake/habbo/communication/messages/parser/marketplace/_SafeCls_6013';
import { MarketplaceBuyOfferResultParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceBuyOfferResultParser';
import { MarketplaceCancelOfferResultParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceCancelOfferResultParser';
import { MarketPlaceOffersParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketPlaceOffersParser';
import { MarketPlaceOwnOffersParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketPlaceOwnOffersParser';

export class MarketPlaceLogic implements IMarketPlace {
    static { registerClassName(this, 'com.sulake.habbo.catalog.marketplace::MarketPlaceLogic'); }

    private static readonly TYPE_POSTER: string = "poster";
    public readonly PURCHASE_CONFIRM_TYPE_NORMAL: number = 1;
    public readonly PURCHASE_CONFIRM_TYPE_HIGHER: number = 2;
    public readonly _SafeStr_8111: number = 3;

    declare private _catalog: HabboCatalog;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _visualization: IMarketPlaceVisualization;

    declare private _SafeStr_2174: MarketplaceConfirmationDialog;

    declare private _latestOffers: UtilsMap;

    declare private _latestOwnOffers: UtilsMap;

    declare private _creditsWaiting: number;
    static { (this.prototype as any)._creditsWaiting = 0; }

    private _SafeStr_6490: number = -1;

    declare private _SafeStr_6393: MarketplaceItemStats;

    declare private _SafeStr_6349: number;
    static { (this.prototype as any)._SafeStr_6349 = 0; }

    declare private _SafeStr_6427: number;
    static { (this.prototype as any)._SafeStr_6427 = 0; }

    declare private _totalItemsFound: number;
    static { (this.prototype as any)._totalItemsFound = 0; }

    private _SafeStr_14150: number = 1;
    private _SafeStr_14151: number = 0;
    private _minPrice: number = 0;
    private _maxPrice: number = 0;
    private _searchString: string = "";
    private _sortOrder: number = -1;
    private _combineUniques: boolean = true;
    private _disposed: boolean = false;

    constructor(param1: HabboCatalog, param2: IHabboWindowManager, param3: IRoomEngine) {
        this._catalog = param1;
        this._windowManager = param2;
        this._roomEngine = param3;
        this.getConfiguration();
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._catalog = null;
        this._windowManager = null;
        if (this._latestOffers != null) {
            this.disposeOffers(this._latestOffers);
            this._latestOffers = null;
        }
        if (this._latestOwnOffers != null) {
            this.disposeOffers(this._latestOwnOffers);
            this._latestOwnOffers = null;
        }
        this._disposed = true;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get localization(): IHabboLocalizationManager {
        return this._catalog.localization;
    }

    public registerVisualization(param1: IMarketPlaceVisualization = null): void {
        if (param1 == null) {
            return;
        }
        this._visualization = param1;
    }

    private getConfiguration(): void {
        if (!this._catalog || !this._catalog.connection) {
            return;
        }
        this._catalog.connection.send(new GetMarketplaceConfigurationMessageComposer());
    }

    private showConfirmation(param1: number, param2: MarketPlaceOfferData): void {
        if (!this._SafeStr_2174) {
            this._SafeStr_2174 = new MarketplaceConfirmationDialog(this, this._catalog, this._roomEngine);
        }
        this._SafeStr_2174.showConfirmation(param1, param2);
    }

    public requestOffersByName(param1: string, param2: boolean = true): void {
        this.requestOffers(-1, -1, param1, -1, param2);
    }

    public requestOffersByPrice(param1: number, param2: boolean = true): void {
        this.requestOffers(param1, -1, "", -1, param2);
    }

    public requestOffers(param1: number, param2: number, param3: string, param4: number, param5: boolean = true): void {
        this._minPrice = param1;
        this._maxPrice = param2;
        this._searchString = param3;
        this._sortOrder = param4;
        this._combineUniques = param5;
        if (this._catalog) {
            this._catalog.getPublicMarketPlaceOffers(param1, param2, param3, param4, param5);
        }
    }

    public refreshOffers(): void {
        this.requestOffers(this._minPrice, this._maxPrice, this._searchString, this._sortOrder, this._combineUniques);
    }

    public requestOwnItems(param1: number = 1): void {
        this._SafeStr_14150 = param1;
        if (this._catalog) {
            this._catalog.getOwnMarketPlaceOffers(param1);
        }
    }

    public requestItemStats(param1: IMarketPlaceOfferData): void {
        if (this._catalog == null || param1 == null) {
            return;
        }
        this._SafeStr_6427 = param1.furniId;
        this._SafeStr_6349 = this.resolveStatsRequestCategory(param1);
        let _loc2_: string = null;
        if (this.isPosterItem(param1)) {
            _loc2_ = param1.extraData;
        }
        this._catalog.getMarketplaceItemStats(this._SafeStr_6349, param1.furniId, _loc2_);
    }

    public buyOffer(param1: number): void {
        if (!this._latestOffers || !this._catalog || !this._catalog.getPurse()) {
            return;
        }
        let _loc2_: MarketPlaceOfferData = asInstanceOf(this._latestOffers.getValue(param1), MarketPlaceOfferData);
        if (!_loc2_) {
            return;
        }
        if (this._catalog.getPurse().credits < _loc2_.price) {
            this._catalog.showNotEnoughCreditsAlert();
            return;
        }
        this.showConfirmation(1, _loc2_);
    }

    public redeemExpiredOffer(param1: number): void {
        if (this._catalog) {
            this._catalog.redeemExpiredMarketPlaceOffer(param1);
        }
    }

    public recallAllOffers(): void {
        if (this._catalog) {
            this._catalog.cancelAllMarketPlaceOffers();
        }
    }

    public clearOwnHistory(param1: number): void {
        if (!this._catalog || !_SafeCls_6014.isClearable(param1)) {
            return;
        }
        this._SafeStr_14151 = param1;
        this._catalog.clearOwnMarketPlaceHistory(param1);
    }

    private disposeOffers(param1: UtilsMap): void {
        if (param1 != null) {
            for (const _loc2_ of valuesOf(param1)) {
                if (_loc2_ != null) {
                    _loc2_.dispose();
                }
            }
            param1.dispose();
        }
    }

    public onOffers(param1: IMessageEvent): void {
        let _loc3_: MarketPlaceOfferData = null;
        let _loc4_: MarketPlaceOffersEvent = param1 instanceof MarketPlaceOffersEvent ? param1 : null;
        if (_loc4_ == null) {
            return;
        }
        let _loc2_: MarketPlaceOffersParser = asInstanceOf(_loc4_.getParser(), MarketPlaceOffersParser);
        if (_loc2_ == null) {
            return;
        }
        this.disposeOffers(this._latestOffers);
        this._latestOffers = new UtilsMap();
        for (const _loc5_ of _loc2_.offers ?? []) {
            _loc3_ = new MarketPlaceOfferData(_loc5_.offerId | 0, _loc5_.furniId | 0, _loc5_.furniType | 0, stringOrNull(_loc5_.extraData), _loc5_.stuffData, _loc5_.price | 0, _loc5_.status | 0, _loc5_.averagePrice | 0, _loc5_.offerCount | 0, _loc5_.isUsable, _loc5_.isUsed);
            _loc3_.timeLeftMinutes = _loc5_.timeLeftMinutes | 0;
            this._latestOffers.add(_loc5_.offerId, _loc3_);
        }
        this._totalItemsFound = _loc2_.totalItemsFound;
        if (this._visualization != null) {
            this._visualization.listUpdatedNotify();
        }
    }

    public onOwnOffers(param1: IMessageEvent): void {
        let _loc3_: MarketPlaceOfferData = null;
        let _loc4_: MarketPlaceOwnOffersEvent = param1 instanceof MarketPlaceOwnOffersEvent ? param1 : null;
        if (_loc4_ == null) {
            return;
        }
        let _loc2_: MarketPlaceOwnOffersParser = asInstanceOf(_loc4_.getParser(), MarketPlaceOwnOffersParser);
        if (_loc2_ == null) {
            return;
        }
        this.disposeOffers(this._latestOwnOffers);
        this._latestOwnOffers = new UtilsMap();
        this._creditsWaiting = _loc2_.creditsWaiting;
        for (const _loc5_ of _loc2_.offers ?? []) {
            _loc3_ = new MarketPlaceOfferData(_loc5_.offerId | 0, _loc5_.furniId | 0, _loc5_.furniType | 0, stringOrNull(_loc5_.extraData), _loc5_.stuffData, _loc5_.price | 0, _loc5_.status | 0, _loc5_.averagePrice | 0);
            _loc3_.timeLeftMinutes = _loc5_.timeLeftMinutes | 0;
            _loc3_.statusTime = Number(_loc5_.statusTime);
            this._latestOwnOffers.add(_loc5_.offerId, _loc3_);
        }
        if (this._visualization != null) {
            this._visualization.listUpdatedNotify();
        }
    }

    public onBuyResult(param1: IMessageEvent): void {
        let parser: MarketplaceBuyOfferResultParser;
        let item: MarketPlaceOfferData;
        let updateItem: MarketPlaceOfferData;
        let event: IMessageEvent = param1;
        let buyEvent: MarketplaceBuyOfferResultEvent = event instanceof MarketplaceBuyOfferResultEvent ? event : null;
        if (event == null) {
            return;
        }
        parser = asInstanceOf(buyEvent.getParser(), MarketplaceBuyOfferResultParser);
        if (parser == null) {
            return;
        }
        if (parser.result == 1) {
            this.refreshOffers();
        } else if (parser.result == 2) {
            item = this._latestOffers.remove(parser.requestedOfferId);
            if (item != null) {
                item.dispose();
            }
            if (this._visualization != null) {
                this._visualization.listUpdatedNotify();
            }
            if (this._windowManager != null) {
                this._windowManager.alert("${catalog.marketplace.not_available_title}", "${catalog.marketplace.not_available_header}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                   param1.dispose();
               });
            }
        } else if (parser.result == 3) {
            updateItem = asInstanceOf(this._latestOffers.getValue(parser.requestedOfferId), MarketPlaceOfferData);
            if (updateItem) {
                updateItem.offerId = parser.offerId;
                updateItem.price = parser.newPrice;
                updateItem.offerCount--;
                this._latestOffers.add(parser.offerId, updateItem);
            }
            this._latestOffers.remove(parser.requestedOfferId);
            this.showConfirmation(2, updateItem);
            if (this._visualization != null) {
                this._visualization.listUpdatedNotify();
            }
        } else if (parser.result == 4) {
            if (this._windowManager != null) {
                this._windowManager.alert("${catalog.alert.notenough.title}", "${catalog.alert.notenough.credits.description}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                   param1.dispose();
               });
            }
        }
    }

    public onCancelResult(param1: IMessageEvent): void {
        let parser: MarketplaceCancelOfferResultParser;
        let item: MarketPlaceOfferData;
        let event: IMessageEvent = param1;
        let cancelEvent: MarketplaceCancelOfferResultEvent = event instanceof MarketplaceCancelOfferResultEvent ? event : null;
        if (cancelEvent == null) {
            return;
        }
        parser = asInstanceOf(cancelEvent.getParser(), MarketplaceCancelOfferResultParser);
        if (parser == null) {
            return;
        }
        if (parser.success) {
            item = this._latestOwnOffers.remove(parser.offerId);
            if (item != null) {
                item.dispose();
            }
            if (this._visualization != null) {
                this._visualization.removeOfferIds([parser.offerId]);
            }
        } else if (this._windowManager != null) {
            this._windowManager.alert("${catalog.marketplace.operation_failed.topic}", "${catalog.marketplace.cancel_failed}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                param1.dispose();
            });
        }
    }

    public onCancelAllResult(param1: IMessageEvent): void {
        let parser: _SafeCls_6013;
        let removedOfferIds: any[];
        let offerId: number = 0;
        let item: MarketPlaceOfferData;
        let event: IMessageEvent = param1;
        let cancelEvent: MarketplaceCancelAllOffersResultEvent = event instanceof MarketplaceCancelAllOffersResultEvent ? event : null;
        if (cancelEvent == null) {
            return;
        }
        parser = asInstanceOf(cancelEvent.getParser(), _SafeCls_6013);
        if (parser == null) {
            return;
        }
        if (parser.success) {
            removedOfferIds = [];
            if (this._latestOwnOffers != null) {
                for (offerId of parser.offerIds ?? []) {
                    item = this._latestOwnOffers.remove(offerId);
                    if (item != null) {
                        removedOfferIds.push(offerId);
                        item.dispose();
                    }
                }
            }
            if (this._visualization != null) {
                this._visualization.removeOfferIds(removedOfferIds);
            }
        } else if (this._windowManager != null) {
            this._windowManager.alert("${catalog.marketplace.operation_failed.topic}", "${shop.marketplace.recall.failed}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                param1.dispose();
            });
        }
    }

    public onClearOwnHistoryResult(param1: IMessageEvent): void {
        let parser: _SafeCls_6012;
        let pendingCategory: number = 0;
        let removedOfferIds: any[];
        let offerId: number = 0;
        let item: MarketPlaceOfferData;
        let event: IMessageEvent = param1;
        let clearEvent: MarketplaceClearOwnHistoryResultEvent = event instanceof MarketplaceClearOwnHistoryResultEvent ? event : null;
        if (clearEvent == null) {
            return;
        }
        parser = asInstanceOf(clearEvent.getParser(), _SafeCls_6012);
        if (parser == null) {
            return;
        }
        pendingCategory = this._SafeStr_14151;
        this._SafeStr_14151 = 0;
        if (parser.success) {
            if (pendingCategory != this._SafeStr_14150 || this._latestOwnOffers == null) {
                return;
            }
            removedOfferIds = this._latestOwnOffers.getKeys();
            if (removedOfferIds == null) {
                removedOfferIds = [];
            }
            for (offerId of removedOfferIds ?? []) {
                item = this._latestOwnOffers.remove(offerId);
                if (item != null) {
                    item.dispose();
                }
            }
            if (this._visualization != null) {
                this._visualization.removeOfferIds(removedOfferIds);
            }
        } else if (this._windowManager != null) {
            this._windowManager.alert("${catalog.marketplace.operation_failed.topic}", "${shop.marketplace.mark.as.seen.failed}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                param1.dispose();
            });
        }
    }

    public latestOffers(): UtilsMap {
        return this._latestOffers;
    }

    public latestOwnOffers(): UtilsMap {
        return this._latestOwnOffers;
    }

    public totalItemsFound(): number {
        return this._totalItemsFound;
    }

    public set itemStats(param1: MarketplaceItemStats) {
        if (param1.furniCategoryId != this._SafeStr_6349 || param1.furniTypeId != this._SafeStr_6427) {
            return;
        }
        this._SafeStr_6393 = param1;
        if (this._visualization != null) {
            this._visualization.updateStats();
        }
    }

    public get itemStats(): MarketplaceItemStats {
        return this._SafeStr_6393;
    }

    public get creditsWaiting(): number {
        return this._creditsWaiting;
    }

    public get ownOffersCategory(): number {
        return this._SafeStr_14150;
    }

    public get averagePricePeriod(): number {
        return this._SafeStr_6490;
    }

    public set averagePricePeriod(param1: number) {
        this._SafeStr_6490 = param1;
    }

    private resolveStatsRequestCategory(param1: IMarketPlaceOfferData): number {
        if (param1 != null && param1.isUniqueLimitedItem) {
            return 3;
        }
        return param1 != null && param1.furniType == 2 ? 2 : 1;
    }

    private isPosterItem(param1: IMarketPlaceOfferData): boolean {
        let _loc2_: IFurnitureData = null;
        let _loc3_: string = null;
        let _loc4_: boolean = false;
        if (param1.furniType == 2 && param1.extraData != null) {
            _loc2_ = this._catalog.getFurnitureData(param1.furniId, "i");
            if (_loc2_) {
                _loc3_ = _loc2_.className;
                if (_loc3_ != null && _loc3_ == "poster") {
                    _loc4_ = true;
                }
            }
        }
        return _loc4_;
    }

    public getNameLocalizationKey(param1: IMarketPlaceOfferData): string {
        let _loc2_: string = "";
        if (param1 != null) {
            if (this.isPosterItem(param1)) {
                _loc2_ = "poster_" + param1.extraData + "_name";
            } else if (param1.furniType == 1) {
                _loc2_ = "roomItem.name." + param1.furniId;
            } else if (param1.furniType == 2) {
                _loc2_ = "wallItem.name." + param1.furniId;
            }
        }
        return _loc2_;
    }

    public getDescriptionLocalizationKey(param1: IMarketPlaceOfferData): string {
        let _loc2_: string = "";
        if (param1 != null) {
            if (this.isPosterItem(param1)) {
                _loc2_ = "poster_" + param1.extraData + "_desc";
            } else if (param1.furniType == 1) {
                _loc2_ = "roomItem.desc." + param1.furniId;
            } else if (param1.furniType == 2) {
                _loc2_ = "wallItem.desc." + param1.furniId;
            }
        }
        return _loc2_;
    }

    public isAccountSafetyLocked(): boolean {
        if (this._catalog) {
            return this._catalog.sessionDataManager.isAccountSafetyLocked();
        }
        return false;
    }
}
