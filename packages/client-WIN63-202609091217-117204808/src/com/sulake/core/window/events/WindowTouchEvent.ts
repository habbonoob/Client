import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';

export class WindowTouchEvent extends WindowEvent {
    static { registerClassName(this, 'com.sulake.core.window.events::WindowTouchEvent'); }

    public static readonly WINDOW_EVENT_TOUCH_BEGIN: string = "WTE_BEGIN";
    public static readonly _SafeStr_8320: string = "WTE_END";
    public static readonly WINDOW_EVENT_TOUCH_MOVE: string = "WTE_MOVE";
    public static readonly _SafeStr_7674: string = "WTE_OUT";
    public static readonly WINDOW_EVENT_TOUCH_OVER: string = "WTE_OVER";
    public static readonly _SafeStr_8718: string = "WTE_ROLL_OUT";
    public static readonly WINDOW_EVENT_TOUCH_ROLL_OVER: string = "WTE_ROLL_OVER";
    public static readonly _SafeStr_7682: string = "WTE_TAP";
    private static readonly _SafeStr_4348_WindowTouchEvent: any[] = [];

    declare public localX: number;
    static { (this.prototype as any).localX = NaN; }

    declare public localY: number;
    static { (this.prototype as any).localY = NaN; }

    declare public stageX: number;
    static { (this.prototype as any).stageX = NaN; }

    declare public stageY: number;
    static { (this.prototype as any).stageY = NaN; }

    declare public altKey: boolean;
    static { (this.prototype as any).altKey = false; }

    declare public ctrlKey: boolean;
    static { (this.prototype as any).ctrlKey = false; }

    declare public shiftKey: boolean;
    static { (this.prototype as any).shiftKey = false; }

    declare public _SafeStr_7403: number;
    static { (this.prototype as any)._SafeStr_7403 = NaN; }

    declare public sizeX: number;
    static { (this.prototype as any).sizeX = NaN; }

    declare public sizeY: number;
    static { (this.prototype as any).sizeY = NaN; }

    constructor() {
        super();
    }

    public static allocate_WindowTouchEvent(param1: string, param2: IWindow, param3: IWindow, param4: number, param5: number, param6: number, param7: number, param8: number, param9: number, param10: number, param11: boolean, param12: boolean, param13: boolean): WindowTouchEvent {
        let _loc14_: WindowTouchEvent = WindowTouchEvent._SafeStr_4348_WindowTouchEvent.length > 0 ? WindowTouchEvent._SafeStr_4348_WindowTouchEvent.pop() : new WindowTouchEvent();
        _loc14_._type = param1;
        _loc14_._window = param2;
        _loc14_._related = param3;
        _loc14_._recycled = false;
        _loc14_._SafeStr_3571 = WindowTouchEvent._SafeStr_4348_WindowTouchEvent;
        _loc14_.sizeX = param6;
        _loc14_.sizeY = param7;
        _loc14_.localX = param4;
        _loc14_.localY = param5;
        _loc14_.stageX = param8;
        _loc14_.stageY = param9;
        _loc14_._SafeStr_7403 = param10;
        _loc14_.altKey = param11;
        _loc14_.ctrlKey = param12;
        _loc14_.shiftKey = param13;
        return _loc14_;
    }

    public override clone(): WindowEvent {
        return WindowTouchEvent.allocate_WindowTouchEvent(this._type, this.window, this.related, this.localX, this.localY, this.sizeX, this.sizeY, this.stageX, this.stageY, this._SafeStr_7403, this.altKey, this.ctrlKey, this.shiftKey);
    }

    public override toString(): string {
        return "WindowTouchEvent { type: " + this._type + " cancelable: " + this._cancelable + " window: " + this._window + " localX: " + this.localX + " localY: " + this.localY + " }";
    }
}
