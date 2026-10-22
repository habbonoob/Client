import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export class WindowEvent {
    static { registerClassName(this, 'com.sulake.core.window.events::WindowEvent'); }

    public static readonly _SafeStr_8103: string = "WE_DESTROY";
    public static readonly _SafeStr_8387: string = "WE_DESTROYED";
    public static readonly _SafeStr_8393: string = "WE_OPEN";
    public static readonly _SafeStr_8190: string = "WE_OPENED";
    public static readonly _SafeStr_8634: string = "WE_CLOSE";
    public static readonly _SafeStr_8512: string = "WE_CLOSED";
    public static readonly WINDOW_EVENT_FOCUS: string = "WE_FOCUS";
    public static readonly _SafeStr_8065: string = "WE_FOCUSED";
    public static readonly WINDOW_EVENT_UNFOCUS: string = "WE_UNFOCUS";
    public static readonly _SafeStr_8569: string = "WE_UNFOCUSED";
    public static readonly _SafeStr_7811: string = "WE_ACTIVATE";
    public static readonly _SafeStr_8173: string = "WE_ACTIVATED";
    public static readonly _SafeStr_8155: string = "WE_DEACTIVATE";
    public static readonly _SafeStr_7665: string = "WE_DEACTIVATED";
    public static readonly _SafeStr_7801: string = "WE_SELECT";
    public static readonly _SafeStr_7592: string = "WE_SELECTED";
    public static readonly _SafeStr_8176: string = "WE_UNSELECT";
    public static readonly _SafeStr_8577: string = "WE_UNSELECTED";
    public static readonly WINDOW_EVENT_LOCK: string = "WE_LOCK";
    public static readonly _SafeStr_8093: string = "WE_LOCKED";
    public static readonly WINDOW_EVENT_UNLOCK: string = "WE_UNLOCK";
    public static readonly _SafeStr_8288: string = "WE_UNLOCKED";
    public static readonly _SafeStr_7786: string = "WE_ENABLE";
    public static readonly _SafeStr_8696: string = "WE_ENABLED";
    public static readonly _SafeStr_7596: string = "WE_DISABLE";
    public static readonly _SafeStr_8442: string = "WE_DISABLED";
    public static readonly _SafeStr_8249: string = "WE_RELOCATE";
    public static readonly _SafeStr_7968: string = "WE_RELOCATED";
    public static readonly _SafeStr_8599: string = "WE_RESIZE";
    public static readonly _SafeStr_8152: string = "WE_RESIZED";
    public static readonly _SafeStr_8150: string = "WE_MINIMIZE";
    public static readonly _SafeStr_8026: string = "WE_MINIMIZED";
    public static readonly _SafeStr_7799: string = "WE_MAXIMIZE";
    public static readonly _SafeStr_7722: string = "WE_MAXIMIZED";
    public static readonly WINDOW_EVENT_RESTORE: string = "WE_RESTORE";
    public static readonly _SafeStr_8171: string = "WE_RESTORED";
    public static readonly _SafeStr_8568: string = "WE_EXPANDED";
    public static readonly _SafeStr_8021: string = "WE_COLLAPSE";
    public static readonly _SafeStr_8403: string = "WE_CHILD_ADDED";
    public static readonly _SafeStr_8719: string = "WE_CHILD_REMOVED";
    public static readonly _SafeStr_8633: string = "WE_CHILD_RELOCATED";
    public static readonly _SafeStr_8290: string = "WE_CHILD_RESIZED";
    public static readonly _SafeStr_7633: string = "WE_CHILD_ACTIVATED";
    public static readonly _SafeStr_7844: string = "WE_CHILD_VISIBILITY";
    public static readonly _SafeStr_7836: string = "WE_PARENT_ADDED";
    public static readonly _SafeStr_8388: string = "WE_PARENT_REMOVED";
    public static readonly _SafeStr_8409: string = "WE_PARENT_RELOCATED";
    public static readonly _SafeStr_7743: string = "WE_PARENT_RESIZED";
    public static readonly _SafeStr_8226: string = "WE_PARENT_ACTIVATED";
    public static readonly _SafeStr_8657: string = "WE_OK";
    public static readonly _SafeStr_7997: string = "WE_CANCEL";
    public static readonly WINDOW_EVENT_CHANGE: string = "WE_CHANGE";
    public static readonly _SafeStr_7938: string = "WE_SCROLL";
    public static readonly UNKNOWN: string = "";
    private static readonly _SafeStr_4348: any[] = [];

    public static allocate(param1: string, param2: IWindow, param3: IWindow, param4: boolean = false): WindowEvent {
        let _loc5_: WindowEvent = WindowEvent._SafeStr_4348.length > 0 ? WindowEvent._SafeStr_4348.pop() : new WindowEvent();
        _loc5_._type = param1;
        _loc5_._window = param2;
        _loc5_._related = param3;
        _loc5_._cancelable = param4;
        _loc5_._recycled = false;
        _loc5_._SafeStr_3571 = WindowEvent._SafeStr_4348;
        return _loc5_;
    }

    constructor() {
    }

    declare protected _type: string;

    declare protected _related: IWindow;

    declare protected _SafeStr_3278: boolean;
    static { (this.prototype as any)._SafeStr_3278 = false; }

    declare protected _cancelable: boolean;
    static { (this.prototype as any)._cancelable = false; }

    declare protected _recycled: boolean;
    static { (this.prototype as any)._recycled = false; }

    declare protected _SafeStr_3571: any[];

    declare protected _window: IWindow;

    public get window(): IWindow {
        return this._window;
    }

    public get type(): string {
        return this._type;
    }

    public get target(): IWindow {
        return this._window;
    }

    public get related(): IWindow {
        return this._related;
    }

    public get cancelable(): boolean {
        return this._cancelable;
    }

    public recycle(): void {
        if (this._recycled) {
            throw new Error("Event already recycled!");
        }
        this._window = this._related = null;
        this._recycled = true;
        this._SafeStr_3278 = false;
        this._SafeStr_3571.push(this);
    }

    public clone(): WindowEvent {
        return WindowEvent.allocate(this._type, this.window, this.related, this.cancelable);
    }

    public preventDefault(): void {
        this.preventWindowOperation();
    }

    public isDefaultPrevented(): boolean {
        return this._SafeStr_3278;
    }

    public preventWindowOperation(): void {
        if (this.cancelable) {
            this._SafeStr_3278 = true;
            return;
        }
        throw new Error("Attempted to prevent window operation that is not cancelable!");
    }

    public isWindowOperationPrevented(): boolean {
        return this._SafeStr_3278;
    }

    public stopPropagation(): void {
        this._SafeStr_3278 = true;
    }

    public stopImmediatePropagation(): void {
        this._SafeStr_3278 = true;
    }

    public toString(): string {
        return "WindowEvent { type: " + this._type + " cancelable: " + this._cancelable + " window: " + this._window + " }";
    }
}
