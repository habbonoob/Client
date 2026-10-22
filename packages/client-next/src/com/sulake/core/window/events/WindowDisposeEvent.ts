import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';

export class WindowDisposeEvent extends WindowEvent {
    static { registerClassName(this, 'com.sulake.core.window.events::WindowDisposeEvent'); }

    public static readonly _SafeStr_8486: string = "WINDOW_DISPOSE_EVENT";
    private static readonly _SafeStr_4348_WindowDisposeEvent: any[] = [];

    constructor() {
        super();
        this._type = "WINDOW_DISPOSE_EVENT";
    }

    public static allocate_WindowDisposeEvent(param1: IWindow): WindowDisposeEvent {
        let _loc2_: WindowDisposeEvent = WindowDisposeEvent._SafeStr_4348_WindowDisposeEvent.length > 0 ? WindowDisposeEvent._SafeStr_4348_WindowDisposeEvent.pop() : new WindowDisposeEvent();
        _loc2_._window = param1;
        _loc2_._recycled = false;
        _loc2_._SafeStr_3571 = WindowDisposeEvent._SafeStr_4348_WindowDisposeEvent;
        return _loc2_;
    }

    public override clone(): WindowEvent {
        return WindowDisposeEvent.allocate_WindowDisposeEvent(this.window);
    }

    public override toString(): string {
        return "WindowDisposeEvent { type: " + this._type + " window: " + this._window + " }";
    }
}
