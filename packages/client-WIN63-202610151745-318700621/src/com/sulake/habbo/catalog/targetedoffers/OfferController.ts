import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { PurseUpdateEvent } from '@/com/sulake/habbo/catalog/purse/PurseUpdateEvent';
import type { HabboMallOffer } from '@/com/sulake/habbo/catalog/targetedoffers/data/HabboMallOffer';
import type { TargetedOfferParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/TargetedOfferParser';
import type { IProductDataListener } from '@/com/sulake/habbo/session/product/IProductDataListener';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { TargetedOfferPurchaseConfirmationView } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { TargetedOffer } from '@/com/sulake/habbo/catalog/targetedoffers/data/TargetedOffer';
import { MallOfferDialogView } from '@/com/sulake/habbo/catalog/targetedoffers/MallOfferDialogView';
import { MallOfferMinimizedView } from '@/com/sulake/habbo/catalog/targetedoffers/MallOfferMinimizedView';
import { TargetedOfferDialogView } from '@/com/sulake/habbo/catalog/targetedoffers/TargetedOfferDialogView';
import { TargetedOfferMinimizedView } from '@/com/sulake/habbo/catalog/targetedoffers/TargetedOfferMinimizedView';
import { MallOfferExternalInterfaceHelper } from '@/com/sulake/habbo/catalog/targetedoffers/util/MallOfferExternalInterfaceHelper';
import { TargetedOfferEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/TargetedOfferEvent';
import { TargetedOfferNotFoundEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/TargetedOfferNotFoundEvent';
import { GetNextTargetedOfferComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetNextTargetedOfferComposer';
import { PurchaseTargetedOfferComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/PurchaseTargetedOfferComposer';
import { SetTargetedOfferStateComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/SetTargetedOfferStateComposer';
import { ShopTargetedOfferViewedComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/ShopTargetedOfferViewedComposer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';

export class OfferController implements IProductDataListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.targetedoffers::OfferController'); }

    declare private _offerDialog: TargetedOfferDialogView;

    declare private _SafeStr_4043: MallOfferDialogView;

    declare private _SafeStr_3759: IDisposable;

    declare private _SafeStr_3939: TargetedOfferPurchaseConfirmationView;

    declare private _SafeStr_4603: MallOfferExternalInterfaceHelper;

    declare private _catalog: HabboCatalog;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: HabboCatalog) {
        this._catalog = param1;
        this._catalog.connection.addMessageEvent(new TargetedOfferEvent(this.onTargetedOffer));
        this._catalog.connection.addMessageEvent(new TargetedOfferNotFoundEvent(this.onTargetedOfferNotFound));
        this._catalog.events.addEventListener("catalog_purse_update", this.onPurseUpdate);
        this._catalog.sessionDataManager.addProductsReadyEventListener(this);
    }

    public get catalog(): HabboCatalog {
        return this._catalog;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        this.destroyView();
        if (this._SafeStr_4603) {
            this._SafeStr_4603.dispose();
            this._SafeStr_4603 = null;
        }
    }

    public productDataReady(): void {
        this._catalog.connection.send(new GetNextTargetedOfferComposer());
    }

    private onTargetedOffer = (param1: TargetedOfferEvent): void => {
        let _loc3_: TargetedOfferParser = param1.getParser();
        let _loc2_: TargetedOffer = new TargetedOffer(_loc3_.data);
        if (_loc2_.trackingState == 4) {
            this.minimizeOffer(_loc2_);
        } else {
            this.maximizeOffer(_loc2_);
        }
    };

    private onTargetedOfferNotFound = (param1: TargetedOfferNotFoundEvent): void => {
        this._SafeStr_4603 = new MallOfferExternalInterfaceHelper(this);
    };

    public onHabboMallOffer(param1: HabboMallOffer): void {
        if (param1.trackingState == 2) {
            return;
        }
        switch (param1.trackingState) {
            case 0:
            case 5:
            case 6:
                this.maximizeMallOffer(param1);
                break;
            case 2:
                return;
            default:
                this.minimizeMallOffer(param1);
        }
    }

    public maximizeMallOffer(param1: HabboMallOffer): void {
        if (this._SafeStr_4043) {
            return;
        }
        this.destroyView();
        this._SafeStr_4043 = new MallOfferDialogView(this, param1);
        this._catalog.connection.send(new ShopTargetedOfferViewedComposer(param1.targetedOfferId, 6));
    }

    public minimizeMallOffer(param1: HabboMallOffer, param2: boolean = false): void {
        this.destroyView();
        this._SafeStr_3759 = new MallOfferMinimizedView(this, param1);
    }

    public onHabboMallOfferOpened(param1: HabboMallOffer): void {
        this._catalog.connection.send(new ShopTargetedOfferViewedComposer(param1.targetedOfferId, 1));
        this._catalog.openCreditsHabblet();
        this.minimizeMallOffer(param1);
    }

    public onHabboMallOfferClosed(param1: HabboMallOffer): void {
        this._catalog.connection.send(new ShopTargetedOfferViewedComposer(param1.targetedOfferId, 4));
        this.minimizeMallOffer(param1);
    }

    public minimizeOffer(param1: TargetedOffer): void {
        this.destroyView();
        this._SafeStr_3759 = new TargetedOfferMinimizedView(this, param1);
        this._catalog.connection.send(new SetTargetedOfferStateComposer(param1.id, 4));
    }

    public maximizeOffer(param1: TargetedOffer): void {
        let _loc2_: string = null;
        if (this._offerDialog) {
            return;
        }
        this.destroyView();
        if (!param1.isExpired()) {
            _loc2_ = this.getLayoutOverride(param1);
            this._offerDialog = new TargetedOfferDialogView(this, param1);
            if (_loc2_ != null && _loc2_.length > 0 && this._catalog.assets.hasAsset(_loc2_)) {
                this._offerDialog.buildWindow(_loc2_);
            } else {
                this._offerDialog.buildWindow("targeted_offer_dialog_xml");
            }
            this._catalog.connection.send(new SetTargetedOfferStateComposer(param1.id, 1));
        }
    }

    public purchaseTargetedOffer(param1: TargetedOffer, param2: number): void {
        this._catalog.connection.send(new PurchaseTargetedOfferComposer(param1.id, param2));
        param1.purchased(param2);
        if (param1.purchaseLimit > 0) {
            this.minimizeOffer(param1);
        } else {
            this.destroyView();
        }
    }

    public sendLogEvent(param1: string, param2: string = ""): void {
        if (!this._catalog || !this._catalog.connection) {
            return;
        }
        this._catalog.connection.send(new EventLogMessageComposer("TargetedOffers", "FLASH.UNKNOWN", param1, param2));
    }

    public purchaseCredits(param1: TargetedOffer): void {
        this.sendLogEvent("targeted.offer.open.credits.page.clicked", param1.identifier);
        this._catalog.openCreditsHabblet();
    }

    public attachExtension(param1: IWindow): void {
        this._catalog.toolbar.extensionView.attachExtension("targeted_offer", param1, 13);
    }

    public showConfirmation(param1: TargetedOffer, param2: number): void {
        if (this._SafeStr_3939) {
            return;
        }
        this.destroyView();
        this._SafeStr_3939 = new TargetedOfferPurchaseConfirmationView(this, param1, param2);
    }

    private onPurseUpdate = (param1: PurseUpdateEvent): void => {
        if (this._offerDialog) {
            this._offerDialog.updateButtonStates();
        }
    };

    public destroyView(): void {
        if (this._offerDialog) {
            this._offerDialog.dispose();
            this._offerDialog = null;
        }
        if (this._SafeStr_4043) {
            this._SafeStr_4043.dispose();
            this._SafeStr_4043 = null;
        }
        if (this._SafeStr_3759) {
            this._catalog.toolbar.extensionView.detachExtension("targeted_offer");
            this._SafeStr_3759.dispose();
            this._SafeStr_3759 = null;
        }
        if (this._SafeStr_3939) {
            this._SafeStr_3939.dispose();
            this._SafeStr_3939 = null;
        }
    }

    private getLayoutOverride(param1: TargetedOffer): string {
        return this._catalog.getProperty("targeted.offer.override.layout." + param1.id);
    }

    get [IDisposable](): true {
        return true;
    }
}
