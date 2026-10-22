import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';

export class WindowLinkEvent extends WindowEvent {
    static { registerClassName(this, 'com.sulake.core.window.events::WindowLinkEvent'); }

    public static readonly _SafeStr_7608: string = "WE_LINK";
    private static readonly _SafeStr_4348_WindowLinkEvent: any[] = [];

    declare private _link: string;

    constructor() {
        super();
        this._type = "WE_LINK";
    }

    public static allocate_WindowLinkEvent(param1: string, param2: IWindow, param3: IWindow): WindowEvent {
        let _loc4_: WindowLinkEvent = WindowLinkEvent._SafeStr_4348_WindowLinkEvent.length > 0 ? WindowLinkEvent._SafeStr_4348_WindowLinkEvent.pop() : new WindowLinkEvent();
        _loc4_._link = param1;
        _loc4_._window = param2;
        _loc4_._related = param3;
        _loc4_._recycled = false;
        _loc4_._SafeStr_3571 = WindowLinkEvent._SafeStr_4348_WindowLinkEvent;
        return _loc4_;
    }

    public get link(): string {
        return this._link;
    }

    public override clone(): WindowEvent {
        return WindowLinkEvent.allocate_WindowLinkEvent(this._link, this.window, this.related);
    }

    public override toString(): string {
        return "WindowLinkEvent { type: " + this._type + " link: " + this.link + " cancelable: " + this._cancelable + " window: " + this._window + " }";
    }
}
