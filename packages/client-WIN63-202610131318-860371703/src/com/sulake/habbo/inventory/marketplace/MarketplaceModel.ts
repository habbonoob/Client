import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { MarketplaceItemStats } from '@/com/sulake/habbo/catalog/marketplace/MarketplaceItemStats';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { FurniModel } from '@/com/sulake/habbo/inventory/furni/FurniModel';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { GroupItem } from '@/com/sulake/habbo/inventory/items/GroupItem';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Set } from '@/com/sulake/core/utils/Set';
import { BuyMarketplaceTokensMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/BuyMarketplaceTokensMessageComposer';
import { GetMarketplaceCanMakeOfferMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/GetMarketplaceCanMakeOfferMessageComposer';
import { GetMarketplaceConfigurationMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/GetMarketplaceConfigurationMessageComposer';
import { GetMarketplaceItemStatsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/GetMarketplaceItemStatsComposer';
import { MakeOfferMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/MakeOfferMessageComposer';
import { IInventoryModel } from '@/com/sulake/habbo/inventory/IInventoryModel';
import { FurnitureItem } from '@/com/sulake/habbo/inventory/items/FurnitureItem';
import { MarketplaceView } from '@/com/sulake/habbo/inventory/marketplace/MarketplaceView';
import { Logger } from '@/com/sulake/habbo/Logger';

export class MarketplaceModel implements IInventoryModel {
    static { registerClassName(this, 'com.sulake.habbo.inventory.marketplace::MarketplaceModel'); }

    private static readonly DEFAULT_BULK_OFFER_LIMIT: number = 500;

    declare private _controller: HabboInventory;

    declare private _assets: IAssetLibrary;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _communication: IHabboCommunicationManager;

    private _disposed: boolean = false;

    declare private _offerGroup: GroupItem;

    declare private _offerItems: FurnitureItem[];

    declare private _isEnabled: boolean;
    static { (this.prototype as any)._isEnabled = false; }

    declare private _SafeStr_6305: number;
    static { (this.prototype as any)._SafeStr_6305 = 0; }

    declare private _tokenBatchPrice: number;
    static { (this.prototype as any)._tokenBatchPrice = 0; }

    declare private _SafeStr_5540: number;
    static { (this.prototype as any)._SafeStr_5540 = 0; }

    declare private _offerMinPrice: number;
    static { (this.prototype as any)._offerMinPrice = 0; }

    declare private _offerMaxPrice: number;
    static { (this.prototype as any)._offerMaxPrice = 0; }

    declare private _expirationHours: number;
    static { (this.prototype as any)._expirationHours = 0; }

    declare private _SafeStr_6490: number;
    static { (this.prototype as any)._SafeStr_6490 = 0; }

    declare private _averagePricePeriod: number;
    static { (this.prototype as any)._averagePricePeriod = 0; }

    declare private _revenueLimit: number;
    static { (this.prototype as any)._revenueLimit = 0; }

    declare private _halfTaxLimit: number;
    static { (this.prototype as any)._halfTaxLimit = 0; }

    declare private _SafeStr_6349: number;
    static { (this.prototype as any)._SafeStr_6349 = 0; }

    declare private _SafeStr_6427: number;
    static { (this.prototype as any)._SafeStr_6427 = 0; }

    declare private _view: MarketplaceView;

    private _SafeStr_3885: boolean = false;

    constructor(param1: HabboInventory, param2: IHabboWindowManager, param3: IHabboCommunicationManager, param4: IAssetLibrary, param5: IRoomEngine, param6: IHabboLocalizationManager) {
        this._controller = param1;
        this._communication = param3;
        this._windowManager = param2;
        this._assets = param4;
        this._roomEngine = param5;
        this._view = new MarketplaceView(this, this._windowManager, this._assets, param5, param6, param1);
    }

    public get id(): string {
        return "marketplace";
    }

    public set isEnabled(param1: boolean) {
        this._isEnabled = param1;
    }

    public set commission(param1: number) {
        this._SafeStr_6305 = param1;
    }

    public set tokenBatchPrice(param1: number) {
        this._tokenBatchPrice = param1;
    }

    public set tokenBatchSize(param1: number) {
        this._SafeStr_5540 = param1;
    }

    public set offerMinPrice(param1: number) {
        this._offerMinPrice = param1;
    }

    public set offerMaxPrice(param1: number) {
        this._offerMaxPrice = param1;
    }

    public set expirationHours(param1: number) {
        this._expirationHours = param1;
    }

    public set averagePricePeriod(param1: number) {
        this._SafeStr_6490 = param1;
    }

    public set sellingFeePercentage(param1: number) {
        this._averagePricePeriod = param1;
    }

    public set revenueLimit(param1: number) {
        this._revenueLimit = param1;
    }

    public set halfTaxLimit(param1: number) {
        this._halfTaxLimit = param1;
    }

    public get isEnabled(): boolean {
        return this._isEnabled;
    }

    public get commission(): number {
        return this._SafeStr_6305;
    }

    public get tokenBatchPrice(): number {
        return this._tokenBatchPrice;
    }

    public get tokenBatchSize(): number {
        return this._SafeStr_5540;
    }

    public get offerMinPrice(): number {
        return this._offerMinPrice;
    }

    public get offerMaxPrice(): number {
        return this._offerMaxPrice;
    }

    public get expirationHours(): number {
        return this._expirationHours;
    }

    public get sellingFeePercentage(): number {
        return this._averagePricePeriod;
    }

    public get revenueLimit(): number {
        return this._revenueLimit;
    }

    public get halfTaxLimit(): number {
        return this._halfTaxLimit;
    }

    public get bulkOfferLimit(): number {
        let _loc1_: number = 0;
        if (this._controller != null) {
            _loc1_ = Number(this._controller.getProperty("marketplace.bulkOfferLimit")) | 0;
        }
        return _loc1_ > 0 ? _loc1_ : 500;
    }

    public get controller(): HabboInventory {
        return this._controller;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        this.releaseItems();
        this._controller = null;
        this._communication = null;
        this._windowManager = null;
        this._assets = null;
        this._roomEngine = null;
    }

    public releaseItems(): void {
        let _loc2_: Set = null;
        if (this._controller != null && this._controller.furniModel != null && this._offerItems != null && this._offerGroup != null) {
            _loc2_ = new Set();
            for (const _loc1_ of this._offerItems ?? []) {
                _loc2_.add(_loc1_.id);
            }
            this._controller.furniModel.removeLocksFor(this._offerGroup, _loc2_);
        }
        this._offerItems = null;
        this._offerGroup = null;
    }

    public startOfferMaking(param1: GroupItem): void {
        if (this._offerGroup != null || param1 == null) {
            return;
        }
        if (this._controller == null) {
            return;
        }
        let _loc2_: FurniModel = this._controller.furniModel;
        if (_loc2_ == null) {
            return;
        }
        this._offerGroup = param1;
        this.send(new GetMarketplaceCanMakeOfferMessageComposer());
    }

    public buyMarketplaceTokens(): void {
        this.send(new BuyMarketplaceTokensMessageComposer());
        this._SafeStr_3885 = true;
    }

    public makeOffer(param1: number, param2: number): void {
        let _loc4_: number = 0;
        if (this._offerItems == null || this._offerItems.length == 0) {
            return;
        }
        let _loc6_: number = Math.max(1, Math.min(param2, this._offerItems.length)) | 0;
        let _loc3_: number[] = [];
        _loc4_ = 0;
        while (_loc4_ < _loc6_) {
            _loc3_.push(this._offerItems[_loc4_].ref);
            _loc4_++;
        }
        let _loc5_: number = this._offerItems[0].isWallItem ? 2 : 1;
        this.send(new MakeOfferMessageComposer(param1, _loc5_, _loc3_));
        this.releaseItems();
    }

    public getItemStats(): void {
        let _loc1_: FurnitureItem = asInstanceOf(this.getOfferItem(), FurnitureItem);
        if (_loc1_ == null) {
            return;
        }
        let _loc3_: number = this.resolveStatsRequestCategory(_loc1_);
        let _loc2_: string = null;
        if (_loc1_.category == 6) {
            if (_loc1_.stuffData != null) {
                _loc2_ = _loc1_.stuffData.getLegacyString();
            } else if (!isNaN(_loc1_.extra)) {
                _loc2_ = String(_loc1_.extra | 0);
            }
        }
        this._SafeStr_6349 = _loc3_;
        this._SafeStr_6427 = _loc1_.type;
        this.send(new GetMarketplaceItemStatsComposer(_loc3_, _loc1_.type, _loc2_));
    }

    public proceedOfferMaking(param1: number, param2: number): void {
        this._SafeStr_3885 = false;
        switch (param1 - 1) {
            case 0:
                if (this._offerGroup == null) {
                    this.releaseItems();
                    return;
                }
                this._offerItems = this._controller.furniModel.lockAllSellable(this._offerGroup);
                if (this._offerItems == null || this._offerItems.length == 0) {
                    this.releaseItems();
                    return;
                }
                this._view.showMakeOffer(this._offerItems[0], Math.min(this._offerItems.length, this.bulkOfferLimit) | 0);
                break;
            case 1:
                this._view.showAlert("${inventory.marketplace.no_trading_privilege.title}", "${inventory.marketplace.no_trading_privilege.info}");
                break;
            case 2:
                this._view.showAlert("${inventory.marketplace.no_trading_pass.title}", "${inventory.marketplace.no_trading_pass.info}");
                break;
            case 3:
                this._view.showBuyTokens(this._tokenBatchPrice, this._SafeStr_5540);
                break;
            case 4:
                this.releaseItems();
                break;
            case 5:
                this._view.showAlert("${inventory.marketplace.trading_lock.title}", "${inventory.marketplace.trading_lock.info}");
        }
    }

    public endOfferMaking(param1: number): void {
        if (!this._view) {
            return;
        }
        this._view.showResult(param1);
    }

    public setItemStats(param1: MarketplaceItemStats): void {
        if (param1 == null) {
            return;
        }
        if (param1.furniCategoryId != this._SafeStr_6349 || param1.furniTypeId != this._SafeStr_6427) {
            return;
        }
        if (!this._view) {
            return;
        }
        this._view.updateItemStats(param1, this._SafeStr_6490);
    }

    private resolveStatsRequestCategory(param1: FurnitureItem): number {
        if (param1 != null && param1.stuffData != null && param1.stuffData.uniqueSerialNumber > 0) {
            return 3;
        }
        return param1 != null && param1.isWallItem ? 2 : 1;
    }

    public onNotEnoughCredits(): void {
        if (this._SafeStr_3885) {
            this._SafeStr_3885 = false;
            this.releaseItems();
        }
    }

    public requestInitialization(): void {
        this.send(new GetMarketplaceConfigurationMessageComposer());
    }

    public getOfferItem(): IFurnitureItem {
        if (this._offerItems != null && this._offerItems.length > 0) {
            return this._offerItems[0];
        }
        if (this._offerGroup != null) {
            return this._offerGroup.getOneForSelling();
        }
        return null;
    }

    public getOfferItemRefs(): any[] {
        let _loc2_: any[] = [];
        if (this._offerItems == null) {
            return _loc2_;
        }
        for (const _loc1_ of this._offerItems ?? []) {
            _loc2_.push(_loc1_.ref);
        }
        return _loc2_;
    }

    public getWindowContainer(): IWindowContainer {
        return null;
    }

    public categorySwitch(param1: string): void {
    }

    public subCategorySwitch(param1: string): void {
    }

    public closingInventoryView(): void {
    }

    public updateView(): void {
    }

    private send(param1: IMessageComposer): void {
        if (this._communication != null && this._communication.connection != null) {
            this._communication.connection.send(param1);
        }
    }

    public selectItemById(param1: string): void {
        Logger.log("NOT SUPPORTED: MARKETPLACE SELECT BY ID");
    }

    get [IInventoryModel](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
