import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ClaimProductResultParser } from '@/com/sulake/habbo/communication/messages/parser/peerservice/ClaimProductResultParser';
import type { HasClaimedProductResponseParser } from '@/com/sulake/habbo/communication/messages/parser/peerservice/HasClaimedProductResponseParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { HabboNotifications } from '@/com/sulake/habbo/notifications/HabboNotifications';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { ICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SecondsUntilMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/competition/SecondsUntilMessageEvent';
import { ClaimProductResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/peerservice/ClaimProductResultMessageEvent';
import { HasClaimedProductResponseMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/peerservice/HasClaimedProductResponseMessageEvent';
import { GetSecondsUntilMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/competition/GetSecondsUntilMessageComposer';
import { HasClaimedProductMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/peerservice/HasClaimedProductMessageComposer';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { isICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';
import { ColorConverter } from '@/com/sulake/room/utils/ColorConverter';

export class NewFeatureNotification implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.notifications.singular::NewFeatureNotification'); }

    private static readonly FEATURE_TYPE_NORMAL: string = "normal";
    private static readonly FEATURE_TYPE_PROMO: string = "promo";
    private static readonly _SafeStr_15006: string = "countdown";
    private static readonly AUTO_OPEN_CONDITION_NOT_CLAIMED: string = "not_claimed";
    private static readonly AUTO_OPEN_DELAY_MS: number = 5000;
    private static readonly BG_COLOR_NORMAL: string = "#686661";
    private static readonly LINK_COLOR_NORMAL: number = 16777215;
    private static readonly LINK_COLOR_HIGHLIGHT: number = 12247545;

    declare private _window: IWindowContainer;

    declare private _toolbar: IHabboToolbar;

    declare private _SafeStr_2259: IHabboLocalizationManager;

    declare private _linkText: ITextWindow;

    declare private _key: string;

    declare private _windowManager: IHabboWindowManager;

    declare private _assets: IAssetLibrary;

    declare private _initialized: boolean;
    static { (this.prototype as any)._initialized = false; }

    declare private _SafeStr_3004: SecondsUntilMessageEvent;

    declare private _notifications: HabboNotifications;

    declare private _SafeStr_15007: string;

    declare private _SafeStr_15008: string;

    declare private _SafeStr_15009: boolean;
    static { (this.prototype as any)._SafeStr_15009 = false; }

    declare private _SafeStr_15010: boolean;
    static { (this.prototype as any)._SafeStr_15010 = false; }

    private _SafeStr_15011: number = 0;
    private _SafeStr_3160: string = "normal";

    declare private _SafeStr_15012: string;

    declare private _SafeStr_15013: boolean;
    static { (this.prototype as any)._SafeStr_15013 = false; }

    declare private _SafeStr_15014: Timer;

    declare private _autoOpenMessageEvents: IMessageEvent[];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IAssetLibrary, param2: IHabboWindowManager, param3: IHabboToolbar, param4: IHabboLocalizationManager, param5: HabboNotifications, param6: string) {
        if (!param1 || !param2) {
            return;
        }
        this._key = param6;
        this._toolbar = param3;
        this._SafeStr_2259 = param4;
        this._assets = param1;
        this._windowManager = param2;
        this._notifications = param5;
        this._initialized = false;
        this._SafeStr_3160 = this.getString("notifications.new_feature.type." + this._key);
        if (this._SafeStr_3160 == null || this._SafeStr_3160.length == 0) {
            this._SafeStr_3160 = "normal";
        }
        this._SafeStr_15007 = this.getString("notifications.new_feature.expiry." + this._key);
        this._SafeStr_15008 = this.getString("notifications.new_feature.count_down_to." + this._key);
        this._SafeStr_15009 = this._SafeStr_15007 != null && this._SafeStr_15007.length > 0;
        this._SafeStr_15010 = this._SafeStr_3160 == "countdown" && this._SafeStr_15008 != null && this._SafeStr_15008.length > 0;
        if (this._SafeStr_15009 || this._SafeStr_15010) {
            this._SafeStr_3004 = new SecondsUntilMessageEvent(this.onTime);
            param5.communication.addHabboConnectionMessageEvent(this._SafeStr_3004);
            if (this._SafeStr_15009) {
                param5.communication.connection.send(new GetSecondsUntilMessageComposer(this._SafeStr_15007));
            }
            if (this._SafeStr_15010) {
                param5.communication.connection.send(new GetSecondsUntilMessageComposer(this._SafeStr_15008));
            }
        } else {
            this._initialized = true;
            this.init();
        }
    }

    private onTime = (param1: SecondsUntilMessageEvent): void => {
        if (this._disposed) {
            return;
        }
        let _loc3_: string = param1.getParser().timeStr;
        let _loc2_: number = param1.getParser().secondsUntil;
        if (this._SafeStr_15009 && _loc3_ == this._SafeStr_15007) {
            this._SafeStr_15009 = false;
            if (_loc2_ <= 0) {
                this.dispose();
                return;
            }
        }
        if (this._SafeStr_15010 && _loc3_ == this._SafeStr_15008) {
            this._SafeStr_15010 = false;
            this._SafeStr_15011 = Math.max(0, _loc2_) | 0;
        }
        this.tryInitialize();
    };

    private tryInitialize(): void {
        if (this._initialized || this._SafeStr_15009 || this._SafeStr_15010) {
            return;
        }
        this._initialized = true;
        if (this._SafeStr_3004 != null) {
            this._notifications.communication.removeHabboConnectionMessageEvent(this._SafeStr_3004);
            this._SafeStr_3004 = null;
        }
        this.init();
    }

    private init(): void {
        let _loc2_: IRegionWindow = null;
        let _loc3_: IWindow = null;
        let _loc1_: XmlAsset = asInstanceOf(this._assets.getAssetByName(this._SafeStr_3160 == "normal" ? "new_feature_notification_xml" : "new_feature_notification_" + this._SafeStr_3160 + "_xml"), XmlAsset);
        if (_loc1_ == null) {
            return;
        }
        this._window = asGuarded(this._windowManager.buildFromXML(asInstanceOf(_loc1_.content, XML)), isIWindowContainer);
        if (this._window == null) {
            return;
        }
        this._window.procedure = this.eventHandler;
        this._toolbar.extensionView.attachExtension("new_feature_" + this._key, this._window);
        if (this._SafeStr_3160 == "normal") {
            this._linkText = asGuarded(this._window.findChildByName("cancel_link"), isITextWindow);
            _loc2_ = asGuarded(this._window.findChildByName("cancel_link_region"), isIRegionWindow);
        } else if (this._SafeStr_3160 == "promo" || this._SafeStr_3160 == "countdown") {
            this._linkText = asGuarded(this._window.findChildByName("desc"), isITextWindow);
            _loc2_ = isIRegionWindow(this._window) ? this._window : null;
        }
        if (_loc2_) {
            _loc2_.addEventListener("WME_OVER", this.onMouseOver);
            _loc2_.addEventListener("WME_OUT", this.onMouseOut);
        }
        if (this._SafeStr_3160 == "countdown") {
            _loc3_ = this._window.findChildByName("cancel_link_region");
            if (_loc3_ != null && !_loc3_.visible) {
                _loc3_.visible = true;
            }
        }
        this.initLayout();
        this.initializeAutoOpen();
    }

    private initializeAutoOpen(): void {
        let _loc1_: string = this.getString("notifications.new_feature.auto_open_condition." + this._key);
        if (_loc1_ == null || _loc1_.length == 0) {
            return;
        }
        let _loc2_: any[] = _loc1_.split(":");
        if (_loc2_.length != 2 || _loc2_[0] != "not_claimed" || _loc2_[1].length == 0) {
            return;
        }
        this._SafeStr_15012 = stringOrNull(_loc2_[1]);
        this._SafeStr_15014 = new Timer(5000, 1);
        this._SafeStr_15014.addEventListener("timerComplete", this.onAutoOpenTimerComplete);
        this._autoOpenMessageEvents = Array.from([new HasClaimedProductResponseMessageEvent(this.onHasClaimedProductResponse), new ClaimProductResultMessageEvent(this.onClaimProductResult)]);
        for (const _loc3_ of this._autoOpenMessageEvents ?? []) {
            this._notifications.communication.addHabboConnectionMessageEvent(_loc3_);
        }
        this._toolbar.events.addEventListener("HTE_RESIZED", this.onToolbarStateChanged);
        this._notifications.communication.connection.send(new HasClaimedProductMessageComposer(this._SafeStr_15012));
    }

    private onHasClaimedProductResponse = (param1: HasClaimedProductResponseMessageEvent): void => {
        let _loc2_: HasClaimedProductResponseParser = param1.getParser();
        if (_loc2_.claimId != this._SafeStr_15012) {
            return;
        }
        if (_loc2_.hasClaimed) {
            this.stopAutoOpen();
            return;
        }
        this._SafeStr_15013 = true;
        this.onToolbarStateChanged();
    };

    private onClaimProductResult = (param1: ClaimProductResultMessageEvent): void => {
        let _loc2_: ClaimProductResultParser = param1.getParser();
        if (_loc2_.claimId == this._SafeStr_15012 && (_loc2_.result == 0 || _loc2_.result == 1)) {
            this.stopAutoOpen();
        }
    };

    private onToolbarStateChanged = (param1: HabboToolbarEvent = null): void => {
        if (this._SafeStr_15013 && this._toolbar.getToolbarState() == "HTE_STATE_HOTEL_VIEW") {
            if (!this._SafeStr_15014.running) {
                this._SafeStr_15014.start();
            }
        } else {
            this._SafeStr_15014.reset();
        }
    };

    private onAutoOpenTimerComplete = (param1: TimerEvent): void => {
        if (this._SafeStr_15013 && this._toolbar.getToolbarState() == "HTE_STATE_HOTEL_VIEW") {
            this.openConfiguredLink();
        }
    };

    private stopAutoOpen(): void {
        if (this._SafeStr_15014 == null) {
            return;
        }
        this._SafeStr_15014.stop();
        this._SafeStr_15014.removeEventListener("timerComplete", this.onAutoOpenTimerComplete);
        this._SafeStr_15014 = null;
        this._toolbar.events.removeEventListener("HTE_RESIZED", this.onToolbarStateChanged);
        for (const _loc1_ of this._autoOpenMessageEvents ?? []) {
            this._notifications.communication.removeHabboConnectionMessageEvent(_loc1_);
        }
        this._autoOpenMessageEvents = null;
        this._SafeStr_15012 = null;
        this._SafeStr_15013 = false;
    }

    private initLayout(): void {
        let _loc3_: any = 0;
        let _loc1_: IWidgetWindow = null;
        let _loc4_: ICountdownWidget = null;
        let _loc2_: string = this.getString("notifications.new_feature.image." + this._key);
        let _loc5_: string = this.getString("notifications.new_feature.color." + this._key);
        if (_loc5_ == "") {
            _loc5_ = "#686661";
        }
        let _loc10_: ITextWindow = asGuarded(this._window.findChildByName("desc"), isITextWindow);
        _loc10_.text = this._SafeStr_2259.getLocalization("notifications.new_feature." + this._key + ".desc");
        let _loc7_: IStaticBitmapWrapperWindow = asGuarded(this._window.findChildByName("static_bitmap"), isIStaticBitmapWrapperWindow);
        _loc7_.assetUri = _loc2_;
        let _loc8_: number = ColorConverter.hexToUint(_loc5_);
        let _loc9_: IWindow = this._window.findChildByName("border");
        if (_loc9_ == null) {
            _loc9_ = this._window;
        }
        _loc9_.color = _loc8_;
        let _loc6_: number = ColorConverter.rgbToHSL(_loc8_);
        let _loc11_: IButtonWindow = asGuarded(this._window.findChildByName("open_button"), isIButtonWindow);
        if (_loc11_ != null) {
            _loc3_ = (255 - ((255 - (_loc6_ & 0xFF)) / 2 | 0) | _loc6_ & 0xFFFF00) >>> 0;
            _loc11_.color = ColorConverter.hslToRGB(_loc3_ >>> 0);
        }
        if (this._SafeStr_3160 == "countdown") {
            _loc1_ = asGuarded(this._window.findChildByName("countdown_widget"), isIWidgetWindow);
            if (_loc1_ != null) {
                _loc4_ = castGuarded(_loc1_.widget, isICountdownWidget, "com.sulake.habbo.window.widgets.ICountdownWidget");
                _loc4_.seconds = this._SafeStr_15011;
                _loc4_.running = true;
            }
        }
    }

    private getBoolean(param1: string): boolean {
        return (this._toolbar instanceof Component ? this._toolbar : null).getBoolean(param1);
    }

    private getString(param1: string): string {
        return (this._toolbar instanceof Component ? this._toolbar : null).getProperty(param1);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.stopAutoOpen();
        if (this._SafeStr_3004 != null) {
            this._notifications.communication.removeHabboConnectionMessageEvent(this._SafeStr_3004);
            this._SafeStr_3004 = null;
        }
        if (this._toolbar && this._initialized) {
            this._toolbar.extensionView.detachExtension("new_feature_" + this._key);
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._windowManager = null;
        this._assets = null;
        this._linkText = null;
        this._toolbar = null;
        this._notifications = null;
        this._disposed = true;
    }

    private eventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "open_button":
            case "main_region":
                this.openConfiguredLink();
                break;
            case "cancel_link_region":
            case "cancel_link":
                this.dispose();
                return;
        }
    };

    private openConfiguredLink(): void {
        this.stopAutoOpen();
        let _loc2_: IWindow = this._window.findChildByName("cancel_link_region");
        if (_loc2_ != null && !_loc2_.visible) {
            _loc2_.visible = true;
        }
        let _loc3_: string = this.getString("notifications.new_feature.internal_link." + this._key);
        if (_loc3_ != "") {
            (this._toolbar instanceof Component ? this._toolbar : null).context.createLinkEvent(_loc3_);
            return;
        }
        let _loc1_: string = this.getString("notifications.new_feature.external_link." + this._key);
        if (_loc1_ != "") {
            HabboWebTools.openWebPage(_loc1_, "habboMain");
        }
    }

    private onMouseOver = (param1: WindowMouseEvent): void => {
        this._linkText.textColor = 12247545;
    };

    private onMouseOut = (param1: WindowMouseEvent): void => {
        this._linkText.textColor = 16777215;
    };

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
