import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import type { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';
import type { IProductDataListener } from '@/com/sulake/habbo/session/product/IProductDataListener';
import type { ICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { LimitedOfferAppearingNextMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/LimitedOfferAppearingNextMessageEvent';
import { GetLimitedOfferAppearingNextMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetLimitedOfferAppearingNextMessageComposer';
import { WidgetContainerLayout } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { ISettingsAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISettingsAwareWidget';
import { isICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';

export class NextLimitedRareCountdownWidget implements ILandingViewWidget, IProductDataListener, ISettingsAwareWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::NextLimitedRareCountdownWidget'); }

    private static readonly REFRESH_PERIOD_IN_MILLIS: number = 30000;

    declare private _landingView: HabboLandingView;

    declare private _container: IWindowContainer;

    private _appearsInSeconds: number = 0;

    declare private _pageId: number;
    static { (this.prototype as any)._pageId = 0; }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    declare private _productType: string;

    declare private _lastRequestTime: Date;

    declare private _SafeStr_2925: Timer;

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
    }

    public dispose(): void {
        if (!this.disposed) {
            if (this._SafeStr_2925 != null) {
                this._SafeStr_2925.stop();
                this._SafeStr_2925 = null;
            }
            this._landingView = null;
            this._container = null;
        }
    }

    public get disposed(): boolean {
        return this._container == null;
    }

    public initialize(): void {
        this._container = castGuarded(this._landingView.getXmlWindow("next_ltd_available"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._container.findChildByName("get").procedure = this.onOpenCatalogButton;
        this._container.findChildByName("catalogue_button").procedure = this.onOpenCatalogButton;
        this._container.visible = false;
        this._landingView.communicationManager.addHabboConnectionMessageEvent(new LimitedOfferAppearingNextMessageEvent(this.onLimitedOfferAppearingNextMessage));
        this.requestLimitedOfferAppearingNextMessage(null);
    }

    private requestLimitedOfferAppearingNextMessage = (param1: TimerEvent): void => {
        if (!this._landingView.getBoolean("next.limited.rare.countdown.widget.disabled")) {
            this._landingView.communicationManager.connection.send(new GetLimitedOfferAppearingNextMessageComposer());
        }
    };

    public refresh(): void {
        if (this._lastRequestTime == null || this._lastRequestTime.getTime() + 30000 < new Date().getTime()) {
            this.requestLimitedOfferAppearingNextMessage(null);
            this._lastRequestTime = new Date();
        }
    }

    public get container(): IWindow {
        return this._container;
    }

    public productDataReady(): void {
        this.refreshContent();
    }

    private refreshContent(): void {
        if (this.disposed) {
            return;
        }
        if (this._landingView.getProductData(this._productType, this) != null) {
            this._container.findChildByName("get").caption = this._landingView.getProductData(this._productType, this).name;
        }
        if (this._pageId >= 0) {
            this._container.visible = true;
            this._container.findChildByName("get").visible = true;
            this._container.findChildByName("countdown").visible = false;
        } else if (this._appearsInSeconds > 0) {
            this._container.visible = true;
            this._container.findChildByName("get").visible = false;
            this._container.findChildByName("countdown").visible = true;
        } else {
            this._container.visible = false;
        }
        this.refreshTimer();
    }

    private refreshTimer(): void {
        let _loc1_: IWidgetWindow = castGuarded(this._container.findChildByName("countdown"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc2_: ICountdownWidget = castGuarded(_loc1_.widget, isICountdownWidget, "com.sulake.habbo.window.widgets.ICountdownWidget");
        _loc2_.seconds = this._appearsInSeconds;
        _loc2_.running = true;
    }

    private setModeSwitchTimer(param1: number): void {
        if (param1 <= 0) {
            return;
        }
        if (this._SafeStr_2925 != null) {
            this._SafeStr_2925.stop();
            this._SafeStr_2925 = null;
        }
        this._SafeStr_2925 = new Timer((param1 + 1) * 1000, 1);
        this._SafeStr_2925.addEventListener("timer", this.requestLimitedOfferAppearingNextMessage);
        this._SafeStr_2925.start();
    }

    private onLimitedOfferAppearingNextMessage = (param1: LimitedOfferAppearingNextMessageEvent): void => {
        this._appearsInSeconds = param1.getParser().appearsInSeconds;
        this._pageId = param1.getParser().pageId;
        this._offerId = param1.getParser().offerId;
        this._productType = param1.getParser().productType;
        this.refreshContent();
        this.setModeSwitchTimer(this._appearsInSeconds);
    };

    private onOpenCatalogButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._landingView.catalog.openCatalogPageById(this._pageId, this._offerId, "NORMAL");
            this._landingView.tracking.trackGoogle("landingView", "click_goToNextLimitedCatalogPage");
        }
    };

    public set settings(param1: CommonWidgetSettings) {
        WidgetContainerLayout.applyCommonWidgetSettings(this._container, param1);
    }

    get [IDisposable](): true {
        return true;
    }

    get [ISettingsAwareWidget](): true {
        return true;
    }
}
