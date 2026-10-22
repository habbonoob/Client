import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VideoOfferTypeEnum } from '@/com/sulake/habbo/catalog/enum/VideoOfferTypeEnum';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IVideoOfferLauncher } from '@/com/sulake/habbo/catalog/IVideoOfferLauncher';
import type { IVideoOfferManager } from '@/com/sulake/habbo/catalog/IVideoOfferManager';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { UserRightsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserRightsMessageEvent';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';

export class VideoOfferManager implements IVideoOfferManager, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog::VideoOfferManager'); }

    private static readonly CAMPAIGN_READY_CALLBACK: string = "supersaverAdsOnCampaignsReady";
    private static readonly CAMPAIGN_COMPLETE_CALLBACK: string = "supersaverAdsOnCampaignCompleted";
    private static readonly CAMPAIGN_OPEN_CALLBACK: string = "supersaverAdsOnCampaignOpen";
    private static readonly CAMPAIGN_CLOSE_CALLBACK: string = "supersaverAdsOnCampaignClose";
    private static readonly _SafeStr_7903: string = "supersaverAdsLoadCampaigns";
    private static readonly _SafeStr_7915: string = "supersaverAdsCamapaignEngage";

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _catalog: HabboCatalog;

    declare private _enabled: boolean;
    static { (this.prototype as any)._enabled = false; }

    declare private _offersAvailable: number;
    static { (this.prototype as any)._offersAvailable = 0; }

    private _offersViewed: number = 0;

    declare private _offersRequested: boolean;
    static { (this.prototype as any)._offersRequested = false; }

    declare private _offersReceived: boolean;
    static { (this.prototype as any)._offersReceived = false; }

    declare private _launchers: IVideoOfferLauncher[];

    declare private _callbacksAdded: boolean;
    static { (this.prototype as any)._callbacksAdded = false; }

    constructor(param1: HabboCatalog) {
        this._catalog = param1;
        this._launchers = [];
        this._enabled = false;
        this._catalog.connection.addMessageEvent(new UserRightsMessageEvent(this.onUserRights));
        this.addCallbacks();
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._catalog = null;
        this._launchers = null;
        this._enabled = false;
        if (this._callbacksAdded && Boolean(ExternalInterface.available)) {
            ExternalInterface.addCallback("supersaverAdsOnCampaignsReady", null);
            ExternalInterface.addCallback("supersaverAdsOnCampaignCompleted", null);
            ExternalInterface.addCallback("supersaverAdsOnCampaignOpen", null);
            ExternalInterface.addCallback("supersaverAdsOnCampaignClose", null);
            this._callbacksAdded = false;
        }
        this._disposed = true;
    }

    private addCallbacks(): void {
        if (this._enabled && !this._callbacksAdded && Boolean(ExternalInterface.available)) {
            ExternalInterface.addCallback("supersaverAdsOnCampaignsReady", this.onCampaignsReady);
            ExternalInterface.addCallback("supersaverAdsOnCampaignCompleted", this.onCampaignComplete);
            ExternalInterface.addCallback("supersaverAdsOnCampaignOpen", this.onCampaignOpen);
            ExternalInterface.addCallback("supersaverAdsOnCampaignClose", this.onCampaignClose);
            this._callbacksAdded = true;
        }
    }

    private onUserRights = (param1: UserRightsMessageEvent): void => {
        if (param1.securityLevel >= 1) {
            this._enabled = false;
            this.addCallbacks();
        }
    };

    public load(param1: IVideoOfferLauncher): void {
        if (!this._enabled) {
            return;
        }
        if (this._offersRequested && this._offersReceived) {
            param1.offersAvailable(this._offersAvailable);
        } else {
            if (!this._offersRequested && Boolean(ExternalInterface.available)) {
                ExternalInterface.call("supersaverAdsLoadCampaigns");
                this._offersRequested = true;
            }
            this._launchers.push(param1);
        }
    }

    public launch(param1: VideoOfferTypeEnum): boolean {
        if (!this._enabled || this._offersAvailable < 1) {
            return false;
        }
        if (ExternalInterface.available) {
            this._offersViewed += 1;
            ExternalInterface.call("supersaverAdsCamapaignEngage");
            this.turnVolumeDown();
            if (this._catalog.connection) {
                this._catalog.connection.send(new EventLogMessageComposer("SuperSaverAds", "client_action", "supersaverads.video.promo.launched"));
            }
            return this._offersAvailable > this._offersViewed;
        }
        return false;
    }

    public onCampaignsReady = (param1: string): void => {
        this._offersReceived = true;
        this._offersAvailable = parseInt(param1) | 0;
        if (isNaN(this._offersAvailable)) {
            this._offersAvailable = 0;
        }
        while (this._launchers.length > 0) {
            this._launchers.pop().offersAvailable(this._offersAvailable);
        }
    };

    public onCampaignOpen = (): void => {
    };

    public onCampaignClose = (): void => {
        this.turnVolumeUp();
        if (this._catalog.connection) {
            this._catalog.connection.send(new EventLogMessageComposer("SuperSaverAds", "client_action", "supersaverads.video.promo.close"));
        }
    };

    public onCampaignComplete = (): void => {
        this.turnVolumeUp();
        if (this._catalog.connection) {
            this._catalog.connection.send(new EventLogMessageComposer("SuperSaverAds", "client_action", "supersaverads.video.promo.complete"));
        }
    };

    private turnVolumeDown(): void {
        if (this._catalog.soundManager) {
            this._catalog.soundManager.mute(true);
        }
    }

    private turnVolumeUp(): void {
        if (this._catalog.soundManager) {
            this._catalog.soundManager.mute(false);
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
