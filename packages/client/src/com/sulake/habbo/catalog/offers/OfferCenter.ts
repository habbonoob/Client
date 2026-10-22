import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IOfferCenter } from '@/com/sulake/habbo/catalog/offers/IOfferCenter';
import type { IOfferExtension } from '@/com/sulake/habbo/catalog/offers/IOfferExtension';
import type { IOfferProvider } from '@/com/sulake/habbo/catalog/offers/IOfferProvider';
import type { OfferRewardDeliveredMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/OfferRewardDeliveredMessageParser';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { OfferReward } from '@/com/sulake/habbo/catalog/offers/OfferReward';
import { SponsorPayProvider } from '@/com/sulake/habbo/catalog/offers/SponsorPayProvider';
import { SupersonicProvider } from '@/com/sulake/habbo/catalog/offers/SupersonicProvider';
import { OfferRewardDeliveredMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/OfferRewardDeliveredMessageEvent';

export class OfferCenter implements IOfferCenter, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.offers::OfferCenter'); }

    private static readonly PROVIDER_POLLING_FREQUENCY: number = 1800000;

    constructor(param1: IHabboWindowManager, param2: IAssetLibrary, param3: IHabboCatalog) {
        this._windowManager = param1;
        this._assets = param2;
        this._catalog = param3;
        this._offerRewardDeliveredMessageEvent = new OfferRewardDeliveredMessageEvent(this.onOfferRewardDelivered);
        this._catalog.connection.addMessageEvent(this._offerRewardDeliveredMessageEvent);
        this._providers = new Array<IOfferProvider>(0).fill(null);
        this._providers.push(new SupersonicProvider(this));
        this._providers.push(new SponsorPayProvider(this));
        this._rewards = new Array<OfferReward>(0).fill(null);
        this._SafeStr_3267 = new Timer(1800000);
        this._SafeStr_3267.addEventListener("timer", this.onPollTimer);
        this._SafeStr_3267.start();
        this.onPollTimer(null);
    }

    declare private _windowManager: IHabboWindowManager;

    declare private _assets: IAssetLibrary;

    declare private _catalog: IHabboCatalog;

    declare private _window: IWindowContainer;

    declare private _SafeStr_3641: IOfferProvider;

    declare private _providers: IOfferProvider[];

    declare private _rewards: OfferReward[];

    declare private _rewardTemplate: IWindow;

    declare private _SafeStr_3267: Timer;

    declare private _offerRewardDeliveredMessageEvent: OfferRewardDeliveredMessageEvent;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _offerExtension: IOfferExtension;

    public set offerExtension(param1: IOfferExtension) {
        this._offerExtension = param1;
    }

    public get showingVideo(): boolean {
        return this._SafeStr_3641 != null && this._SafeStr_3641.showingPopup;
    }

    public get configuration(): ICoreConfiguration {
        return isICoreConfiguration(this._catalog) ? this._catalog : null;
    }

    private get visible(): boolean {
        return this._window != null && !this._window.disposed && Boolean(this._window.visible);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        if (this._providers != null) {
            for (const _loc1_ of this._providers ?? []) {
                _loc1_.dispose();
            }
            this._providers = null;
        }
        if (this._SafeStr_3267 != null) {
            this._SafeStr_3267.stop();
            this._SafeStr_3267 = null;
        }
        this._catalog.connection.removeMessageEvent(this._offerRewardDeliveredMessageEvent);
        this._offerRewardDeliveredMessageEvent = null;
        this._rewards = null;
        this._offerExtension = null;
        this._windowManager = null;
        this._catalog = null;
        this._assets = null;
        this._disposed = true;
    }

    public showRewards(): void {
        this.hide();
        this._window = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._assets.getAssetByName("offer_center_xml").content, XML)), isIWindowContainer);
        this._window.procedure = this.windowProcedure;
        this._window.center();
        this._rewardTemplate = castGuarded(this._window.findChildByName("reward_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").removeListItemAt(0);
        this.populateRewardList();
    }

    public showVideo(): void {
        if (this._SafeStr_3641 != null) {
            this._SafeStr_3641.showVideo();
        }
    }

    public updateVideoStatus(): void {
        if (this._offerExtension != null) {
            this._SafeStr_3641 = this.getNextProvider();
            this._offerExtension.indicateVideoAvailable(this._SafeStr_3641 != null && this._SafeStr_3641.videoAvailable);
        }
    }

    public showSuccess(): void {
    }

    private getNextProvider(): IOfferProvider {
        if (this._providers == null) {
            return null;
        }
        for (const _loc1_ of this._providers ?? []) {
            if (_loc1_.enabled && _loc1_.videoAvailable) {
                return _loc1_;
            }
        }
        return null;
    }

    private onOfferRewardDelivered = (param1: OfferRewardDeliveredMessageEvent): void => {
        let _loc2_: OfferRewardDeliveredMessageParser = param1.getParser();
        this.addReward(_loc2_.name, _loc2_.contentType, _loc2_.classId);
    };

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK" || !this.visible) {
            return;
        }
        let _loc3_: any = param2.name;
        if ("header_button_close" === _loc3_) {
            this.hide();
        }
    };

    private hide(): void {
        if (this._window != null) {
            this._rewardTemplate.dispose();
            this._rewardTemplate = null;
            this._window.dispose();
            this._window = null;
        }
    }

    private addReward(param1: string, param2: string, param3: number): void {
        let _loc4_: OfferReward = new OfferReward(param1, param2, param3);
        this._rewards.unshift(_loc4_);
        if (this.visible) {
            castGuarded(this._window.findChildByName("reward_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").addListItemAt(this.createRewardItem(_loc4_), 0);
        } else if (this._offerExtension != null) {
            this._offerExtension.indicateRewards();
        }
    }

    private populateRewardList(): void {
        if (!this.visible) {
            return;
        }
        let _loc2_: IItemListWindow = asGuarded(this._window.findChildByName("reward_list"), isIItemListWindow);
        _loc2_.destroyListItems();
        for (const _loc1_ of this._rewards ?? []) {
            _loc2_.addListItem(this.createRewardItem(_loc1_));
        }
    }

    private createRewardItem(param1: OfferReward): IWindow {
        let _loc2_: IWindowContainer = asGuarded(this._rewardTemplate.clone(), isIWindowContainer);
        _loc2_.findChildByName("reward_date").caption = new Date().toLocaleString();
        _loc2_.findChildByName("reward_name").caption = param1.name;
        this._catalog.displayProductIcon(param1.contentType, param1.classId, castGuarded(_loc2_.findChildByName("reward_icon"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow"));
        return _loc2_;
    }

    private onPollTimer = (param1: TimerEvent): void => {
        if (this._providers == null) {
            return;
        }
        for (const _loc2_ of this._providers ?? []) {
            if (_loc2_.enabled) {
                _loc2_.load();
            }
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
