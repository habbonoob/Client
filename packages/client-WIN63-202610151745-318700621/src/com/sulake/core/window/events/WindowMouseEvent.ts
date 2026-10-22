import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';

export class WindowMouseEvent extends WindowEvent {
    static { registerClassName(this, 'com.sulake.core.window.events::WindowMouseEvent'); }

    public static readonly CLICK: string = "WME_CLICK";
    public static readonly DOUBLE_CLICK: string = "WME_DOUBLE_CLICK";
    public static readonly DOWN: string = "WME_DOWN";
    public static readonly MIDDLE_CLICK: string = "WME_MIDDLE_CLICK";
    public static readonly _SafeStr_7830: string = "WME_MIDDLE_DOWN";
    public static readonly _SafeStr_8030: string = "WME_MIDDLE_UP";
    public static readonly MOVE: string = "WME_MOVE";
    public static readonly _SafeStr_8041: string = "WME_OUT";
    public static readonly OVER: string = "WME_OVER";
    public static readonly _SafeStr_7416: string = "WME_UP";
    public static readonly UP_OUTSIDE: string = "WME_UP_OUTSIDE";
    public static readonly _SafeStr_8359: string = "WME_WHEEL";
    public static readonly WHEEL_HORIZONTAL: string = "WME_WHEEL_HORIZONTAL";
    public static readonly RIGHT_CLICK: string = "WME_RIGHT_CLICK";
    public static readonly _SafeStr_8163: string = "WME_RIGHT_DOWN";
    public static readonly _SafeStr_7854: string = "WME_RIGHT_UP";
    public static readonly ROLL_OUT: string = "WME_ROLL_OUT";
    public static readonly ROLL_OVER: string = "WME_ROLL_OVER";
    public static readonly HOVERING: string = "WME_HOVERING";
    public static readonly CLICK_AWAY: string = "WME_CLICK_AWAY";
    private static readonly _SafeStr_4348_WindowMouseEvent: any[] = [];

    declare public delta: number;
    static { (this.prototype as any).delta = 0; }

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

    declare public buttonDown: boolean;
    static { (this.prototype as any).buttonDown = false; }

    constructor() {
        super();
    }

    public static allocate_WindowMouseEvent(param1: string, param2: IWindow, param3: IWindow, param4: number, param5: number, param6: number, param7: number, param8: boolean, param9: boolean, param10: boolean, param11: boolean, param12: number): WindowMouseEvent {
        let _loc13_: WindowMouseEvent = WindowMouseEvent._SafeStr_4348_WindowMouseEvent.length > 0 ? WindowMouseEvent._SafeStr_4348_WindowMouseEvent.pop() : new WindowMouseEvent();
        _loc13_._type = param1;
        _loc13_._window = param2;
        _loc13_._related = param3;
        _loc13_._recycled = false;
        _loc13_._cancelable = true;
        _loc13_._SafeStr_3571 = WindowMouseEvent._SafeStr_4348_WindowMouseEvent;
        _loc13_.localX = param4;
        _loc13_.localY = param5;
        _loc13_.stageX = param6;
        _loc13_.stageY = param7;
        _loc13_.altKey = param8;
        _loc13_.ctrlKey = param9;
        _loc13_.shiftKey = param10;
        _loc13_.buttonDown = param11;
        _loc13_.delta = param12;
        return _loc13_;
    }

    public override clone(): WindowEvent {
        return WindowMouseEvent.allocate_WindowMouseEvent(this._type, this.window, this.related, this.localX, this.localY, this.stageX, this.stageY, this.altKey, this.ctrlKey, this.shiftKey, this.buttonDown, this.delta);
    }

    public override toString(): string {
        return "WindowMouseEvent { type: " + this._type + " cancelable: " + this._cancelable + " window: " + this._window + " localX: " + this.localX + " localY: " + this.localY + " }";
    }
}
