import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { HabboNotifications } from '@/com/sulake/habbo/notifications/HabboNotifications';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { ICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';
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
import { GetSecondsUntilMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/competition/GetSecondsUntilMessageComposer';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { isICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';
import { ColorConverter } from '@/com/sulake/room/utils/ColorConverter';

export class NewFeatureNotification implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.notifications.singular::NewFeatureNotification'); }

    private static readonly FEATURE_TYPE_NORMAL: string = "normal";
    private static readonly FEATURE_TYPE_PROMO: string = "promo";
    private static readonly _SafeStr_14351: string = "countdown";
    private static readonly BG_COLOR_NORMAL: string = "#686661";
    private static readonly LINK_COLOR_NORMAL: number = 16777215;
    private static readonly LINK_COLOR_HIGHLIGHT: number = 12247545;

    declare private _window: IWindowContainer;

    declare private _toolbar: IHabboToolbar;

    declare private _SafeStr_2259: IHabboLocalizationManager;

    declare private _SafeStr_3819: ITextWindow;

    declare private _key: string;

    declare private _windowManager: IHabboWindowManager;

    declare private _assets: IAssetLibrary;

    declare private _initialized: boolean;
    static { (this.prototype as any)._initialized = false; }

    declare private _SafeStr_3004: SecondsUntilMessageEvent;

    declare private _notifications: HabboNotifications;

    declare private _SafeStr_14352: string;

    declare private _SafeStr_14353: string;

    declare private _SafeStr_14354: boolean;
    static { (this.prototype as any)._SafeStr_14354 = false; }

    declare private _SafeStr_14355: boolean;
    static { (this.prototype as any)._SafeStr_14355 = false; }

    private _SafeStr_14356: number = 0;
    private _SafeStr_3160: string = "normal";

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
        this._SafeStr_14352 = this.getString("notifications.new_feature.expiry." + this._key);
        this._SafeStr_14353 = this.getString("notifications.new_feature.count_down_to." + this._key);
        this._SafeStr_14354 = this._SafeStr_14352 != null && this._SafeStr_14352.length > 0;
        this._SafeStr_14355 = this._SafeStr_3160 == "countdown" && this._SafeStr_14353 != null && this._SafeStr_14353.length > 0;
        if (this._SafeStr_14354 || this._SafeStr_14355) {
            this._SafeStr_3004 = new SecondsUntilMessageEvent(this.onTime);
            param5.communication.addHabboConnectionMessageEvent(this._SafeStr_3004);
            if (this._SafeStr_14354) {
                param5.communication.connection.send(new GetSecondsUntilMessageComposer(this._SafeStr_14352));
            }
            if (this._SafeStr_14355) {
                param5.communication.connection.send(new GetSecondsUntilMessageComposer(this._SafeStr_14353));
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
        if (this._SafeStr_14354 && _loc3_ == this._SafeStr_14352) {
            this._SafeStr_14354 = false;
            if (_loc2_ <= 0) {
                this.dispose();
                return;
            }
        }
        if (this._SafeStr_14355 && _loc3_ == this._SafeStr_14353) {
            this._SafeStr_14355 = false;
            this._SafeStr_14356 = Math.max(0, _loc2_) | 0;
        }
        this.tryInitialize();
    };

    private tryInitialize(): void {
        if (this._initialized || this._SafeStr_14354 || this._SafeStr_14355) {
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
            this._SafeStr_3819 = asGuarded(this._window.findChildByName("cancel_link"), isITextWindow);
            _loc2_ = asGuarded(this._window.findChildByName("cancel_link_region"), isIRegionWindow);
        } else if (this._SafeStr_3160 == "promo" || this._SafeStr_3160 == "countdown") {
            this._SafeStr_3819 = asGuarded(this._window.findChildByName("desc"), isITextWindow);
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
                _loc4_.seconds = this._SafeStr_14356;
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
        this._SafeStr_3819 = null;
        this._toolbar = null;
        this._notifications = null;
        this._disposed = true;
    }

    private eventHandler = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: IWindow = null;
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "open_button":
            case "main_region":
                this.openConfiguredLink();
                _loc3_ = this._window.findChildByName("cancel_link_region");
                if (_loc3_ != null && !_loc3_.visible) {
                    _loc3_.visible = true;
                }
                break;
            case "cancel_link_region":
            case "cancel_link":
                this.dispose();
                return;
        }
    };

    private openConfiguredLink(): void {
        let _loc2_: string = this.getString("notifications.new_feature.internal_link." + this._key);
        if (_loc2_ != "") {
            (this._toolbar instanceof Component ? this._toolbar : null).context.createLinkEvent(_loc2_);
            return;
        }
        let _loc1_: string = this.getString("notifications.new_feature.external_link." + this._key);
        if (_loc1_ != "") {
            HabboWebTools.openWebPage(_loc1_, "habboMain");
        }
    }

    private onMouseOver = (param1: WindowMouseEvent): void => {
        this._SafeStr_3819.textColor = 12247545;
    };

    private onMouseOut = (param1: WindowMouseEvent): void => {
        this._SafeStr_3819.textColor = 16777215;
    };

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
