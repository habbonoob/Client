import { asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextLinkWindow } from '@/com/sulake/core/window/components/ITextLinkWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextLinkWindow } from '@/com/sulake/core/window/components/ITextLinkWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class SimpleAlertDialog implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.window.utils::SimpleAlertDialog'); }

    private static readonly WINDOW_MARGIN: number = 10;

    constructor(param1: HabboWindowManagerComponent, param2: string, param3: string, param4: string, param5: string, param6: string, param7: UtilsMap, param8: string, param9: (...args: any[]) => any, param10: (...args: any[]) => any) {
        let _loc11_: any;
        let _loc12_: string = null;
        this._SafeStr_4706 = param9;
        this._SafeStr_4618 = param10;
        this._windowManager = param1;
        let _loc14_: IAsset = param1.assets.getAssetByName("simple_alert_xml");
        this._SafeStr_2492 = param1.buildModalDialogFromXML(asInstanceOf(_loc14_.content, XML));
        this._window = castGuarded(this._SafeStr_2492.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2221 = castGuarded(this._window.findChildByName("list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_3431 = castGuarded(this._window.findChildByName("list_top"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_4758 = castGuarded(this._window.findChildByName("list_bottom"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_5365 = this._window.findChildByName("message");
        this._SafeStr_3811 = this._window.findChildByName("subtitle");
        this._link = castGuarded(this._window.findChildByName("link"), isITextLinkWindow, "com.sulake.core.window.components.ITextLinkWindow");
        this._SafeStr_2814 = castGuarded(this._window.findChildByName("illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        this._window.findChildByName("header_button_close").dispose();
        this._window.procedure = this.windowProcedure;
        this._window.caption = param2;
        this._SafeStr_5365.caption = param4;
        if (param7 != null) {
            for (const _loc13_ of [param2, param3, param4, param5]) {
                if (_loc13_ != null && _loc13_.substr(0, 2) == "${" && _loc13_.indexOf("}") > 0) {
                    _loc12_ = stringOrNull(_loc13_.substring(2, _loc13_.indexOf("}")));
                    for (_loc11_ of keysOf(param7)) {
                        param1.localization.registerParameter(_loc12_, stringOrNull(_loc11_), stringOrNull(param7.getValue(_loc11_)));
                    }
                }
            }
        }
        if (param3 != null && param3 != "") {
            this._SafeStr_3811.caption = param3;
        } else {
            this._SafeStr_3811.dispose();
            this._SafeStr_3811 = null;
        }
        param6 = param1.interpolate(param6);
        if (param5 != null && param5 != "" && (param6 != null && param6 != "" || param9 != null)) {
            this._link.caption = param5;
            this._link.addEventListener("WME_CLICK", this.onSimpleAlertClick);
            this._link.immediateClickMode = true;
            this._SafeStr_2991 = param6;
        } else {
            this._link.dispose();
            this._link = null;
        }
        if (param8 != null && param8 != "") {
            this._SafeStr_2814.addEventListener("WE_RESIZED", this.onIllustrationResized);
            this._SafeStr_2814.assetUri = param8;
        } else {
            this._SafeStr_2814.dispose();
            this._SafeStr_2814 = null;
        }
        this.resizeWindow();
    }

    declare private _SafeStr_2492: IModalDialog;

    declare private _SafeStr_2991: string;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _SafeStr_3431: IItemListWindow;

    declare private _SafeStr_4758: IItemListWindow;

    declare private _SafeStr_5365: IWindow;

    declare private _SafeStr_3811: IWindow;

    declare private _link: ITextLinkWindow;

    declare private _SafeStr_2814: IStaticBitmapWrapperWindow;

    declare private _SafeStr_4706: (...args: any[]) => any;

    declare private _SafeStr_4618: (...args: any[]) => any;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            this.close();
            this._windowManager = null;
            this._disposed = true;
        }
    }

    private close(): void {
        if (this._SafeStr_4618 != null) {
            this._SafeStr_4618();
        }
        if (this._SafeStr_2492 != null) {
            if (this._link != null) {
                this._link.removeEventListener("WME_CLICK", this.onSimpleAlertClick);
                this._link = null;
            }
            if (this._SafeStr_2814) {
                this._SafeStr_2814.removeEventListener("WE_RESIZED", this.onIllustrationResized);
                this._SafeStr_2814 = null;
            }
            this._window = null;
            this._SafeStr_2221 = null;
            this._SafeStr_3431 = null;
            this._SafeStr_4758 = null;
            this._SafeStr_5365 = null;
            this._SafeStr_3811 = null;
            this._SafeStr_4706 = null;
            this._SafeStr_4618 = null;
            this._SafeStr_2492.dispose();
            this._SafeStr_2492 = null;
        }
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK" && param2.name == "close_button") {
            this.dispose();
        }
    };

    private onSimpleAlertClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2991 != null && this._SafeStr_2991.length > 0) {
            if (this._SafeStr_2991.substr(0, 6) == "event:") {
                this._windowManager.context.createLinkEvent(this._SafeStr_2991.substr(6));
                this.dispose();
            } else {
                HabboWebTools.openWebPage(this._SafeStr_2991, "habboMain");
            }
        } else if (this._SafeStr_4706 != null) {
            this._SafeStr_4706();
            this.dispose();
        }
    };

    private onIllustrationResized = (param1: WindowEvent): void => {
        this._SafeStr_3431.x = this._SafeStr_2814.width + 10;
        this._SafeStr_4758.width = this._SafeStr_3431.right;
        this._window.width = this._SafeStr_3431.right + 2 * 10;
        this._SafeStr_3431.limits.minHeight = this._SafeStr_2814.height + 10;
        this.resizeWindow();
    };

    private resizeWindow(): void {
        this._SafeStr_3431.arrangeListItems();
        this._SafeStr_4758.arrangeListItems();
        this._SafeStr_2221.arrangeListItems();
        this._window.height = this._SafeStr_2221.height + 40;
        this._window.center();
    }

    get [IDisposable](): true {
        return true;
    }
}
