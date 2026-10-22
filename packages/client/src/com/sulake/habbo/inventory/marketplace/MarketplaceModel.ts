import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { FurniModel } from '@/com/sulake/habbo/inventory/furni/FurniModel';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { FurnitureItem } from '@/com/sulake/habbo/inventory/items/FurnitureItem';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { BuyMarketplaceTokensMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/BuyMarketplaceTokensMessageComposer';
import { GetMarketplaceCanMakeOfferMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/GetMarketplaceCanMakeOfferMessageComposer';
import { GetMarketplaceConfigurationMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/GetMarketplaceConfigurationMessageComposer';
import { GetMarketplaceItemStatsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/GetMarketplaceItemStatsComposer';
import { MakeOfferMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/marketplace/MakeOfferMessageComposer';
import { IInventoryModel } from '@/com/sulake/habbo/inventory/IInventoryModel';
import { MarketplaceView } from '@/com/sulake/habbo/inventory/marketplace/MarketplaceView';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class MarketplaceModel implements IInventoryModel {
    static { registerClassName(this, 'com.sulake.habbo.inventory.marketplace::MarketplaceModel'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        MarketplaceModel.#initStatics();
        return MarketplaceModel._log;
    }

    constructor(param1: HabboInventory, param2: IHabboWindowManager, param3: IHabboCommunicationManager, param4: IAssetLibrary, param5: IRoomEngine, param6: IHabboLocalizationManager) {
        this._controller = param1;
        this._communication = param3;
        this._windowManager = param2;
        this._assets = param4;
        this._roomEngine = param5;
        this._view = new MarketplaceView(this, this._windowManager, this._assets, param5, param6, param1);
    }

    declare private _controller: HabboInventory;

    declare private _assets: IAssetLibrary;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _communication: IHabboCommunicationManager;

    declare private _item: FurnitureItem;

    declare private _isEnabled: boolean;
    static { (this.prototype as any)._isEnabled = false; }

    declare private _commission: number;
    static { (this.prototype as any)._commission = 0; }

    declare private _tokenBatchPrice: number;
    static { (this.prototype as any)._tokenBatchPrice = 0; }

    declare private _SafeStr_5540: number;
    static { (this.prototype as any)._SafeStr_5540 = 0; }

    declare private _averagePricePeriod: number;
    static { (this.prototype as any)._averagePricePeriod = 0; }

    declare private _sellingFeePercentage: number;
    static { (this.prototype as any)._sellingFeePercentage = 0; }

    declare private _SafeStr_6349: number;
    static { (this.prototype as any)._SafeStr_6349 = 0; }

    declare private _SafeStr_6427: number;
    static { (this.prototype as any)._SafeStr_6427 = 0; }

    declare private _view: MarketplaceView;

    private _SafeStr_3885: boolean = false;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _offerMinPrice: number;
    static { (this.prototype as any)._offerMinPrice = 0; }

    public get offerMinPrice(): number {
        return this._offerMinPrice;
    }

    public set offerMinPrice(param1: number) {
        this._offerMinPrice = param1;
    }

    declare private _offerMaxPrice: number;
    static { (this.prototype as any)._offerMaxPrice = 0; }

    public get offerMaxPrice(): number {
        return this._offerMaxPrice;
    }

    public set offerMaxPrice(param1: number) {
        this._offerMaxPrice = param1;
    }

    declare private _expirationHours: number;
    static { (this.prototype as any)._expirationHours = 0; }

    public get expirationHours(): number {
        return this._expirationHours;
    }

    public set expirationHours(param1: number) {
        this._expirationHours = param1;
    }

    declare private _revenueLimit: number;
    static { (this.prototype as any)._revenueLimit = 0; }

    public get revenueLimit(): number {
        return this._revenueLimit;
    }

    public set revenueLimit(param1: number) {
        this._revenueLimit = param1;
    }

    declare private _halfTaxLimit: number;
    static { (this.prototype as any)._halfTaxLimit = 0; }

    public get halfTaxLimit(): number {
        return this._halfTaxLimit;
    }

    public set halfTaxLimit(param1: number) {
        this._halfTaxLimit = param1;
    }

    public get id(): string {
        return "marketplace";
    }

    public set averagePricePeriod(param1: number) {
        this._averagePricePeriod = param1;
    }

    public get isEnabled(): boolean {
        return this._isEnabled;
    }

    public set isEnabled(param1: boolean) {
        this._isEnabled = param1;
    }

    public get commission(): number {
        return this._commission;
    }

    public set commission(param1: number) {
        this._commission = param1;
    }

    public get tokenBatchPrice(): number {
        return this._tokenBatchPrice;
    }

    public set tokenBatchPrice(param1: number) {
        this._tokenBatchPrice = param1;
    }

    public get tokenBatchSize(): number {
        return this._SafeStr_5540;
    }

    public set tokenBatchSize(param1: number) {
        this._SafeStr_5540 = param1;
    }

    public get sellingFeePercentage(): number {
        return this._sellingFeePercentage;
    }

    public set sellingFeePercentage(param1: number) {
        this._sellingFeePercentage = param1;
    }

    public get controller(): HabboInventory {
        return this._controller;
    }

    public dispose(): void {
        this._controller = null;
        this._communication = null;
        this._windowManager = null;
        this._assets = null;
        this._roomEngine = null;
    }

    public releaseItem(): void {
        if (this._controller != null && this._controller.furniModel != null && this._item != null) {
            this._controller.furniModel.removeLockFrom(this._item.id);
            this._item = null;
        }
    }

    public startOfferMaking(param1: FurnitureItem): void {
        if (this._item != null || param1 == null) {
            return;
        }
        if (this._controller == null) {
            return;
        }
        let _loc2_: FurniModel = this._controller.furniModel;
        if (_loc2_ == null) {
            return;
        }
        this._item = param1;
        _loc2_.addLockTo(param1.id);
        this.send(new GetMarketplaceCanMakeOfferMessageComposer());
    }

    public buyMarketplaceTokens(): void {
        this.send(new BuyMarketplaceTokensMessageComposer());
        this._SafeStr_3885 = true;
    }

    public makeOffer(param1: number): void {
        if (this._item == null) {
            return;
        }
        let _loc2_: number = this._item.isWallItem ? 2 : 1;
        this.send(new MakeOfferMessageComposer(param1, _loc2_, this._item.ref));
        this.releaseItem();
    }

    public getItemStats(): void {
        if (this._item == null) {
            return;
        }
        let _loc1_: number = this._item.isWallItem ? 2 : 1;
        this._SafeStr_6349 = _loc1_;
        this._SafeStr_6427 = this._item.type;
        this.send(new GetMarketplaceItemStatsComposer(_loc1_, this._item.type));
    }

    public proceedOfferMaking(param1: number, param2: number): void {
        this._SafeStr_3885 = false;
        switch (param1 - 1) {
            case 0:
                this._view.showMakeOffer(this._item);
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

    public setAveragePrice(param1: number, param2: number, param3: number): void {
        if (param1 != this._SafeStr_6349 || param2 != this._SafeStr_6427) {
            return;
        }
        if (!this._view) {
            return;
        }
        this._view.updateAveragePrice(param3, this._averagePricePeriod);
    }

    public onNotEnoughCredits(): void {
        if (this._SafeStr_3885) {
            this._SafeStr_3885 = false;
            this.releaseItem();
        }
    }

    public requestInitialization(): void {
        this.send(new GetMarketplaceConfigurationMessageComposer());
    }

    public getOfferItem(): IFurnitureItem {
        return this._item;
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

    public selectItemById(param1: string): void {
        MarketplaceModel._log.warn("NOT SUPPORTED: MARKETPLACE SELECT BY ID");
    }

    private send(param1: IMessageComposer): void {
        if (this._communication != null && this._communication.connection != null) {
            this._communication.connection.send(param1);
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (MarketplaceModel.#staticsReady) return;
        MarketplaceModel.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(MarketplaceModel, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.inventory.marketplace.MarketplaceModel"));
    }

    get [IInventoryModel](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
