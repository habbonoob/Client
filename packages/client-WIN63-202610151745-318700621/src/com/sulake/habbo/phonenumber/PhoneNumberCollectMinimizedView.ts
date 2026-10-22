import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboPhoneNumber } from '@/com/sulake/habbo/phonenumber/HabboPhoneNumber';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';

export class PhoneNumberCollectMinimizedView {
    static { registerClassName(this, 'com.sulake.habbo.phonenumber::PhoneNumberCollectMinimizedView'); }

    private static readonly BG_COLOR_LIGHT: number = 4286084205;
    private static readonly BG_COLOR_DARK: number = 4283781966;

    declare private _component: HabboPhoneNumber;

    declare private _window: IWindow;

    constructor(param1: HabboPhoneNumber) {
        this._component = param1;
        this.createWindow();
    }

    public dispose(): void {
        if (this._window) {
            this._window.removeEventListener("WME_CLICK", this.onClicked);
            this._window.dispose();
            this._window = null;
        }
        this._component = null;
    }

    public get window(): IWindow {
        return this._window;
    }

    private createWindow(): void {
        if (this._window) {
            return;
        }
        this._window = this._component.windowManager.buildFromXML(XML.from(this._component.assets.getAssetByName("phonenumber_collect_minimized_xml").content));
        this._window.addEventListener("WME_CLICK", this.onClicked);
        this._window.addEventListener("WME_OVER", this.onContainerMouseOver);
        this._window.addEventListener("WME_OUT", this.onContainerMouseOut);
        castGuarded(this._window, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").findChildByTag("BGCOLOR").color = 4283781966;
    }

    private onClicked = (param1: WindowMouseEvent): void => {
        this._component.setCollectViewMinimized(false);
    };

    private onContainerMouseOver = (param1: WindowMouseEvent): void => {
        castGuarded(this._window, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").findChildByTag("BGCOLOR").color = 4286084205;
    };

    private onContainerMouseOut = (param1: WindowMouseEvent): void => {
        castGuarded(this._window, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").findChildByTag("BGCOLOR").color = 4283781966;
    };
}
