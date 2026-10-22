import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IOfferProvider } from '@/com/sulake/habbo/catalog/offers/IOfferProvider';
import type { OfferCenter } from '@/com/sulake/habbo/catalog/offers/OfferCenter';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class SupersonicProvider implements IOfferProvider {
    static { registerClassName(this, 'com.sulake.habbo.catalog.offers::SupersonicProvider'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        SupersonicProvider.#initStatics();
        return SupersonicProvider._log;
    }

    private static readonly CAMPAIGN_READY_CALLBACK: string = "supersonicAdsOnCampaignsReady";
    private static readonly CAMPAIGN_COMPLETED_CALLBACK: string = "supersonicAdsOnCampaignCompleted";
    private static readonly CAMPAIGN_OPEN_CALLBACK: string = "supersonicAdsOnCampaignOpen";
    private static readonly CAMPAIGN_CLOSE_CALLBACK: string = "supersonicAdsOnCampaignClose";
    private static readonly _SafeStr_7903: string = "supersonicAdsLoadCampaigns";
    private static readonly _SafeStr_7915: string = "supersonicAdsCamapaignEngage";

    constructor(param1: OfferCenter) {
        this._offerCenter = param1;
        if (this.enabled) {
            ExternalInterface.addCallback("supersonicAdsOnCampaignsReady", this.onCampaignsReady);
            ExternalInterface.addCallback("supersonicAdsOnCampaignCompleted", this.onCampaignCompleted);
            ExternalInterface.addCallback("supersonicAdsOnCampaignOpen", this.onCampaignOpen);
            ExternalInterface.addCallback("supersonicAdsOnCampaignClose", this.onCampaignClose);
        }
    }

    declare private _offerCenter: OfferCenter;

    declare private _offerCount: number;
    static { (this.prototype as any)._offerCount = 0; }

    declare private _loaded: boolean;
    static { (this.prototype as any)._loaded = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _showingPopup: boolean;
    static { (this.prototype as any)._showingPopup = false; }

    public get showingPopup(): boolean {
        return this._showingPopup;
    }

    public get videoAvailable(): boolean {
        return this._offerCount > 0;
    }

    public get enabled(): boolean {
        return this._offerCenter.configuration.getBoolean("offers.supersonic.enabled") && ExternalInterface.available;
    }

    public onCampaignsReady = (param1: string): void => {
        this._offerCount = Number(param1) | 0;
        this.updateVideoStatus();
    };

    public onCampaignOpen = (): void => {
        this._showingPopup = true;
        this.updateVideoStatus();
    };

    public onCampaignClose = (): void => {
        this._showingPopup = false;
        this.updateVideoStatus();
    };

    public onCampaignCompleted = (): void => {
    };

    public load(): void {
        if (this.enabled && !this._loaded) {
            try {
                ExternalInterface.call("supersonicAdsLoadCampaigns");
                this._loaded = true;
            } catch (e) {
                SupersonicProvider._log.warn("External interface not working. Could not call supersonicAdsLoadCampaigns: " + e);
            }
        }
    }

    public showVideo(): void {
        if (this.enabled && this._offerCount > 0) {
            try {
                ExternalInterface.call("supersonicAdsCamapaignEngage");
                this._offerCount = this._offerCount - 1;
            } catch (e) {
                SupersonicProvider._log.warn("External interface not working. Could not call supersonicAdsCamapaignEngage: " + e);
            }
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (ExternalInterface.available) {
            ExternalInterface.addCallback("supersonicAdsOnCampaignsReady", null);
            ExternalInterface.addCallback("supersonicAdsOnCampaignCompleted", null);
            ExternalInterface.addCallback("supersonicAdsOnCampaignOpen", null);
            ExternalInterface.addCallback("supersonicAdsOnCampaignClose", null);
        }
        this._offerCenter = null;
        this._disposed = true;
    }

    private updateVideoStatus(): void {
        if (this._offerCenter != null) {
            this._offerCenter.updateVideoStatus();
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (SupersonicProvider.#staticsReady) return;
        SupersonicProvider.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(SupersonicProvider, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.offers.SupersonicProvider"));
    }

    get [IDisposable](): true {
        return true;
    }
}
