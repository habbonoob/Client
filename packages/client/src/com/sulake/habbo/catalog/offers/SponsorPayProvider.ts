import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IOfferProvider } from '@/com/sulake/habbo/catalog/offers/IOfferProvider';
import type { OfferCenter } from '@/com/sulake/habbo/catalog/offers/OfferCenter';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class SponsorPayProvider implements IOfferProvider {
    static { registerClassName(this, 'com.sulake.habbo.catalog.offers::SponsorPayProvider'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        SponsorPayProvider.#initStatics();
        return SponsorPayProvider._log;
    }

    private static readonly LOADED_CALLBACK: string = "sponsorPayLoaded";
    private static readonly ON_START_CALLBACK: string = "sponsorPayOnStart";
    private static readonly NO_OFFERS_CALLBACK: string = "sponsorPayNoOffers";
    private static readonly ON_CLOSE_CALLBACK: string = "sponsorPayOnClose";
    private static readonly ON_CONVERSION_CALLBACK: string = "sponsorPayOnConversion";
    private static readonly _SafeStr_7840: string = "SponsorPay.loadIntegration";
    private static readonly SHOW_VIDEO_FUNCTION: string = "SponsorPay.showVideo";
    private static readonly BACKGROUND_LOAD_FUNCTION: string = "SponsorPay.backgroundLoad";
    private static readonly _SafeStr_7729: number = 150000;

    constructor(param1: OfferCenter) {
        this._offerCenter = param1;
        if (!this.enabled) {
            return;
        }
        ExternalInterface.addCallback("sponsorPayLoaded", this.sponsorPayLoaded);
        ExternalInterface.addCallback("sponsorPayOnStart", this.sponsorPayOnStart);
        ExternalInterface.addCallback("sponsorPayNoOffers", this.sponsorPayNoOffers);
        ExternalInterface.addCallback("sponsorPayOnClose", this.sponsorPayOnClose);
        ExternalInterface.addCallback("sponsorPayOnConversion", this.sponsorPayOnConversion);
        this._SafeStr_2841 = new Timer(150000, 1);
        this._SafeStr_2841.addEventListener("timer", this.onResetTimer);
    }

    declare private _offerCenter: OfferCenter;

    declare private _loaded: boolean;
    static { (this.prototype as any)._loaded = false; }

    declare private _SafeStr_4012: boolean;
    static { (this.prototype as any)._SafeStr_4012 = false; }

    declare private _SafeStr_2841: Timer;

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
        return this._SafeStr_4012;
    }

    public get enabled(): boolean {
        return this.appId != "" && ExternalInterface.available;
    }

    private get appId(): string {
        return this._offerCenter.configuration.getProperty("offers.sponsorpay.appid");
    }

    public load(): void {
        if (this._loaded) {
            this.sponsorPayLoaded();
            return;
        }
        if (this.enabled) {
            try {
                ExternalInterface.call("SponsorPay.loadIntegration", this.appId);
                this._loaded = true;
            } catch (e) {
                SponsorPayProvider._log.warn("External interface not working. Could not call SponsorPay.loadIntegration: " + e);
            }
        }
    }

    public showVideo(): void {
        if (this._loaded && this.enabled) {
            try {
                ExternalInterface.call("SponsorPay.showVideo");
                this._showingPopup = true;
                this._SafeStr_2841.reset();
                this._SafeStr_2841.start();
                this.updateVideoStatus();
            } catch (e) {
                SponsorPayProvider._log.warn("External interface not working. Could not call SponsorPay.showVideo: " + e);
            }
        }
    }

    public sponsorPayLoaded = (): void => {
        if (this._showingPopup) {
            return;
        }
        this._SafeStr_4012 = false;
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("SponsorPay.backgroundLoad");
            } else {
                SponsorPayProvider._log.warn("External interface not available. Could not call SponsorPay.backgroundLoad.");
            }
        } catch (e) {
            SponsorPayProvider._log.warn("External interface not working. Could not call SponsorPay.backgroundLoad: " + e);
        }
    };

    public sponsorPayOnStart = (param1: string): void => {
        this._SafeStr_4012 = true;
        this.updateVideoStatus();
    };

    public sponsorPayNoOffers = (): void => {
        this._SafeStr_4012 = false;
        this.updateVideoStatus();
    };

    public sponsorPayOnClose = (): void => {
        this._showingPopup = false;
        if (this._SafeStr_2841) {
            this._SafeStr_2841.stop();
        }
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("SponsorPay.backgroundLoad");
            } else {
                SponsorPayProvider._log.warn("External interface not available. Could not call SponsorPay.backgroundLoad.");
            }
        } catch (e) {
            SponsorPayProvider._log.warn("External interface not working. Could not call SponsorPay.backgroundLoad: " + e);
        } finally {
            this.updateVideoStatus();
        }
    };

    public sponsorPayOnConversion = (): void => {
        if (this._offerCenter != null) {
            this._offerCenter.showSuccess();
        }
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (ExternalInterface.available) {
            ExternalInterface.addCallback("sponsorPayLoaded", null);
            ExternalInterface.addCallback("sponsorPayOnStart", null);
            ExternalInterface.addCallback("sponsorPayNoOffers", null);
            ExternalInterface.addCallback("sponsorPayOnClose", null);
            ExternalInterface.addCallback("sponsorPayOnConversion", null);
        }
        if (this._SafeStr_2841 != null) {
            this._SafeStr_2841.removeEventListener("timer", this.onResetTimer);
            this._SafeStr_2841.stop();
            this._SafeStr_2841 = null;
        }
        this._offerCenter = null;
        this._disposed = true;
    }

    private updateVideoStatus(): void {
        if (this._offerCenter != null) {
            this._offerCenter.updateVideoStatus();
        }
    }

    private onResetTimer = (param1: TimerEvent): void => {
        this.sponsorPayOnClose();
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (SponsorPayProvider.#staticsReady) return;
        SponsorPayProvider.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(SponsorPayProvider, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.offers.SponsorPayProvider"));
    }

    get [IDisposable](): true {
        return true;
    }
}
