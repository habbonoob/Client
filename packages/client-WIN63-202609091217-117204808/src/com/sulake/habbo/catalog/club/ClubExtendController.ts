import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { ClubOfferExtendData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/ClubOfferExtendData';
import type { HabboClubExtendOfferMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/HabboClubExtendOfferMessageEvent';
import type { HabboClubExtendOfferMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/HabboClubExtendOfferMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { ClubExtendConfirmationDialog } from '@/com/sulake/habbo/catalog/club/ClubExtendConfirmationDialog';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';

export class ClubExtendController {
    static { registerClassName(this, 'com.sulake.habbo.catalog.club::ClubExtendController'); }

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_2174: ClubExtendConfirmationDialog;

    declare private _offer: ClubOfferExtendData;

    private _disposed: boolean = false;

    constructor(param1: HabboCatalog) {
        this._catalog = param1;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.closeConfirmation();
        this._offer = null;
        this._catalog = null;
        this._disposed = true;
    }

    public onOffer(param1: HabboClubExtendOfferMessageEvent): void {
        if (this._disposed) {
            return;
        }
        let _loc2_: HabboClubExtendOfferMessageParser = param1.getParser();
        this._offer = _loc2_.offer();
        this.showConfirmation();
        if (this._catalog.connection) {
            if (this._offer.vip) {
                this._catalog.connection.send(new EventLogMessageComposer("Catalog", "dialog_show", "vip.membership.extension.purchase"));
            } else {
                this._catalog.connection.send(new EventLogMessageComposer("Catalog", "dialog_show", "basic.membership.extension.purchase"));
            }
        }
    }

    public closeConfirmation(): void {
        if (this._SafeStr_2174) {
            this._SafeStr_2174.dispose();
            this._SafeStr_2174 = null;
        }
    }

    public showConfirmation(): void {
        this.closeConfirmation();
        this._SafeStr_2174 = new ClubExtendConfirmationDialog(this, this._offer);
        this._SafeStr_2174.showConfirmation();
    }

    public confirmSelection(): void {
        if (!this._catalog || !this._catalog.connection || !this._offer) {
            return;
        }
        if (this._catalog.getPurse().credits < this._offer.priceCredits) {
            this._catalog.showNotEnoughCreditsAlert();
            return;
        }
        if (this._offer.vip) {
            this._catalog.purchaseVipMembershipExtension(this._offer.offerId);
        } else {
            this._catalog.purchaseBasicMembershipExtension(this._offer.offerId);
        }
        this.closeConfirmation();
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

    public get config(): ICoreConfiguration {
        return this._catalog;
    }
}
