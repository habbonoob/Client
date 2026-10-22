import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';

export class WindowMessage extends WindowEvent {
    static { registerClassName(this, 'com.sulake.core.window.events::WindowMessage'); }

    private static readonly WINDOW_EVENT_MESSAGE: string = "WE_MESSAGE";
    private static readonly _SafeStr_4348_WindowMessage: any[] = [];

    declare public message: string;

    constructor() {
        super();
        this._type = "WE_MESSAGE";
    }

    public static allocate(param1: string, param2: IWindow, param3: IWindow, param4: boolean = false): WindowEvent {
        let _loc5_: WindowMessage = WindowMessage._SafeStr_4348_WindowMessage.length > 0 ? WindowMessage._SafeStr_4348_WindowMessage.pop() : new WindowMessage();
        _loc5_.message = param1;
        _loc5_._window = param2;
        _loc5_._related = param3;
        _loc5_._cancelable = param4;
        _loc5_._recycled = false;
        _loc5_._SafeStr_3571 = WindowMessage._SafeStr_4348_WindowMessage;
        return _loc5_;
    }

    public override clone(): WindowEvent {
        return WindowMessage.allocate(this.message, this.window, this.related, this.cancelable);
    }

    public override toString(): string {
        return "WindowLinkEvent { type: " + this._type + " message: " + this.message + " cancelable: " + this._cancelable + " window: " + this._window + " }";
    }
}
