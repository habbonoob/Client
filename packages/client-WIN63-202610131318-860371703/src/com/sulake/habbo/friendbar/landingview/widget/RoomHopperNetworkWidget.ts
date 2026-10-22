import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import type { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WidgetContainerLayout } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { ISettingsAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISettingsAwareWidget';

export class RoomHopperNetworkWidget implements ILandingViewWidget, ISettingsAwareWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::RoomHopperNetworkWidget'); }

    declare private _landingView: HabboLandingView;

    declare private _container: IWindowContainer;

    private _disposed: boolean = false;

    declare private _SafeStr_7204: number;
    static { (this.prototype as any)._SafeStr_7204 = 0; }

    private _SafeStr_5360: any[] = [];

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
        this._SafeStr_5360.push("title");
        this._SafeStr_5360.push("header");
        this._SafeStr_5360.push("info");
    }

    protected static get xmlAssetName(): string {
        return "room_hopper_network";
    }

    public initialize(): void {
        this._container = castGuarded(this._landingView.getXmlWindow(RoomHopperNetworkWidget.xmlAssetName), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_7204 = this._landingView.getInteger("landing.view.roomhopper.network.id", 0);
        let _loc1_: IStaticBitmapWrapperWindow = castGuarded(this._container.findChildByName("bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        _loc1_.assetUri = this._landingView.getProperty("landing.view.roomhopper.image.uri");
        this._container.findChildByName("button").procedure = this.onRoomForwardButton;
    }

    public refresh(): void {
    }

    public get container(): IWindow {
        return this._container;
    }

    public dispose(): void {
        if (!this.disposed) {
            if (this._container) {
                this._container.dispose();
                this._container = null;
            }
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set settings(param1: CommonWidgetSettings) {
        WidgetContainerLayout.applyCommonWidgetSettings(this._container, param1);
    }

    private onRoomForwardButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._landingView.navigator.goToRoomNetwork(this._SafeStr_7204, false);
        }
    };

    get [IDisposable](): true {
        return true;
    }

    get [ISettingsAwareWidget](): true {
        return true;
    }
}
