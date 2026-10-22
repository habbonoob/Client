import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { ICaption } from '@/com/sulake/core/window/utils/ICaption';
import type { INotify } from '@/com/sulake/core/window/utils/INotify';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import { AlertDialogCaption } from '@/com/sulake/habbo/window/utils/AlertDialogCaption';

export class AlertDialog implements IAlertDialog, INotify {
    static { registerClassName(this, 'com.sulake.habbo.window.utils::AlertDialog'); }

    protected static readonly LIST_BUTTONS: string = "_alert_button_list";
    protected static readonly _SafeStr_7897: string = "_alert_button_ok";
    protected static readonly _SafeStr_8007: string = "_alert_button_cancel";
    protected static readonly BUTTON_CUSTOM: string = "_alert_button_custom";
    protected static readonly _SafeStr_7631: string = "header_button_close";
    protected static readonly _SafeStr_7917: string = "_alert_text_summary";
    private static _counter: number = 0;
    protected _title: string = "";
    protected _SafeStr_5145: string = "";
    protected _disposed: boolean = false;
    protected _callback: (...args: any[]) => any = null;

    declare protected _window: IFrameWindow;

    declare protected _SafeStr_2492: IModalDialog;

    constructor(param1: IHabboWindowManager, param2: XML, param3: string, param4: string, param5: number, param6: (...args: any[]) => any, param7: boolean) {
        let _loc8_: IWindow = null;
        this.dialogEventProc = this.dialogEventProc.bind(this);
        this.initInstanceFields();
        AlertDialog._counter = AlertDialog._counter + 1 >>> 0;
        if (param7) {
            this._SafeStr_2492 = param1.buildModalDialogFromXML(param2);
            this._window = asGuarded(this._SafeStr_2492.rootWindow, isIFrameWindow);
        } else {
            this._window = asGuarded(param1.buildFromXML(param2, 2), isIFrameWindow);
        }
        if (param5 == 0) {
            param5 = (0x10 | 1 | 2) >>> 0;
        }
        let _loc9_: IItemListWindow = asGuarded(this._window.findChildByName("_alert_button_list"), isIItemListWindow);
        if (_loc9_) {
            if (!(param5 & 0x10)) {
                _loc8_ = _loc9_.getListItemByName("_alert_button_ok");
                _loc8_.dispose();
            }
            if (!(param5 & 0x20)) {
                _loc8_ = _loc9_.getListItemByName("_alert_button_cancel");
                _loc8_.dispose();
            }
            if (!(param5 & 0x40)) {
                _loc8_ = _loc9_.getListItemByName("_alert_button_custom");
                _loc8_.dispose();
            }
        }
        this._window.procedure = this.dialogEventProc;
        this._window.center();
        this.title = param3;
        this.summary = param4;
        this.callback = param6;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_2492 && !this._SafeStr_2492.disposed) {
                this._SafeStr_2492.dispose();
                this._SafeStr_2492 = null;
                this._window = null;
            }
            if (this._window && !this._window.disposed) {
                this._window.dispose();
                this._window = null;
            }
            this._callback = null;
            this._disposed = true;
        }
    }

    protected dialogEventProc(param1: WindowEvent, param2: IWindow): void {
        let _loc3_: WindowEvent = null;
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "_alert_button_ok":
                    if (this._callback != null) {
                        _loc3_ = WindowEvent.allocate("WE_OK", null, null);
                        this._callback(this, _loc3_);
                        _loc3_.recycle();
                    } else {
                        this.dispose();
                    }
                    break;
                case "header_button_close":
                case "_alert_button_cancel":
                    if (this._callback != null) {
                        _loc3_ = WindowEvent.allocate("WE_CANCEL", null, null);
                        this._callback(this, _loc3_);
                        _loc3_.recycle();
                    } else {
                        this.dispose();
                    }
            }
        }
    }

    public getButtonCaption(param1: number): ICaption {
        let _loc2_: IInteractiveWindow = null;
        if (!this._disposed) {
            switch (param1) {
                case 16:
                    _loc2_ = asGuarded(this._window.findChildByName("_alert_button_ok"), isIInteractiveWindow);
                    break;
                case 32:
                    _loc2_ = asGuarded(this._window.findChildByName("_alert_button_cancel"), isIInteractiveWindow);
                    break;
                case 64:
                    _loc2_ = asGuarded(this._window.findChildByName("_alert_button_custom"), isIInteractiveWindow);
            }
        }
        return _loc2_ ? new AlertDialogCaption(_loc2_.caption, _loc2_.toolTipCaption, _loc2_.visible) : null;
    }

    public setButtonCaption(param1: number, param2: ICaption): void {
        let _loc3_: IInteractiveWindow = null;
        if (!this._disposed) {
            switch (param1) {
                case 16:
                    _loc3_ = asGuarded(this._window.findChildByName("_alert_button_ok"), isIInteractiveWindow);
                    break;
                case 32:
                    _loc3_ = asGuarded(this._window.findChildByName("_alert_button_cancel"), isIInteractiveWindow);
                    break;
                case 64:
                    _loc3_ = asGuarded(this._window.findChildByName("_alert_button_custom"), isIInteractiveWindow);
            }
        }
        if (_loc3_) {
            _loc3_.caption = param2.text;
        }
    }

    public set title(param1: string) {
        this._title = param1;
        if (this._window) {
            this._window.caption = this._title;
        }
    }

    public get title(): string {
        return this._title;
    }

    public set summary(param1: string) {
        this._SafeStr_5145 = param1;
        if (this._window) {
            castGuarded(this._window.findChildByTag("DESCRIPTION"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text = this._SafeStr_5145;
        }
    }

    public get summary(): string {
        return this._SafeStr_5145;
    }

    public set titleBarColor(param1: number) {
        if (!this._window) {
            return;
        }
        this._window.color = param1;
    }

    public get titleBarColor(): number {
        if (!this._window) {
            return 0;
        }
        return this._window.color;
    }

    public set callback(param1: (...args: any[]) => any) {
        this._callback = param1;
    }

    public get callback(): (...args: any[]) => any {
        return this._callback;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }

    get [IDisposable](): true {
        return true;
    }
}
