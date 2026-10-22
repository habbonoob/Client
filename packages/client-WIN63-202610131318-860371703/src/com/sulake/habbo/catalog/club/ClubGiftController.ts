import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import type { ClubGiftWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ClubGiftWidget';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { ClubGiftConfirmationDialog } from '@/com/sulake/habbo/catalog/club/ClubGiftConfirmationDialog';
import { GetClubGiftInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetClubGiftInfoMessageComposer';
import { SelectClubGiftComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/SelectClubGiftComposer';

export class ClubGiftController {
    static { registerClassName(this, 'com.sulake.habbo.catalog.club::ClubGiftController'); }

    declare private _widget: ClubGiftWidget;

    declare private _daysUntilNextGift: number;
    static { (this.prototype as any)._daysUntilNextGift = 0; }

    declare private _giftsAvailable: number;
    static { (this.prototype as any)._giftsAvailable = 0; }

    declare private _offers: any[];

    declare private _giftData: UtilsMap;

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_2174: ClubGiftConfirmationDialog;

    constructor(param1: HabboCatalog) {
        this._catalog = param1;
    }

    public dispose(): void {
        this._catalog = null;
        if (this._SafeStr_2174) {
            this._SafeStr_2174.dispose();
            this._SafeStr_2174 = null;
        }
    }

    public set widget(param1: ClubGiftWidget) {
        this._widget = param1;
        this._catalog.connection.send(new GetClubGiftInfoMessageComposer());
    }

    public get daysUntilNextGift(): number {
        return this._daysUntilNextGift;
    }

    public get giftsAvailable(): number {
        return this._giftsAvailable;
    }

    public setInfo(param1: number, param2: number, param3: any[], param4: UtilsMap): void {
        this._daysUntilNextGift = param1;
        this._giftsAvailable = param2;
        this._offers = param3;
        this._giftData = param4;
        if (this._widget) {
            this._widget.update();
        }
    }

    public selectGift(param1: IPurchasableOffer): void {
        this.closeConfirmation();
        this._SafeStr_2174 = new ClubGiftConfirmationDialog(this, param1);
    }

    public confirmSelection(param1: string): void {
        if (!param1 || !this._catalog || !this._catalog.connection) {
            return;
        }
        this._catalog.connection.send(new SelectClubGiftComposer(param1));
        this._giftsAvailable = this._giftsAvailable - 1;
        this._widget.update();
        this.closeConfirmation();
    }

    public closeConfirmation(): void {
        if (this._SafeStr_2174) {
            this._SafeStr_2174.dispose();
            this._SafeStr_2174 = null;
        }
    }

    public getOffers(): any[] {
        return this._offers;
    }

    public getGiftData(): UtilsMap {
        return this._giftData;
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

    public get purse(): IPurse {
        if (!this._catalog) {
            return null;
        }
        return this._catalog.getPurse();
    }

    public get catalog(): HabboCatalog {
        return this._catalog;
    }
}
