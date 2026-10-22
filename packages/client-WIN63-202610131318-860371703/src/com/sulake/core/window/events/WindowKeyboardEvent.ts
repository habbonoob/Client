import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { KeyboardEvent } from '@habbo-pixi/runtime/events/KeyboardEvent';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';

export class WindowKeyboardEvent extends WindowEvent {
    static { registerClassName(this, 'com.sulake.core.window.events::WindowKeyboardEvent'); }

    public static readonly _SafeStr_8236: string = "WKE_KEY_UP";
    public static readonly _SafeStr_8456: string = "WKE_KEY_DOWN";
    private static readonly _SafeStr_4348_WindowKeyboardEvent: any[] = [];

    declare private _SafeStr_3767: KeyboardEvent;

    constructor() {
        super();
    }

    public static allocate_WindowKeyboardEvent(param1: string, param2: Event, param3: IWindow, param4: IWindow, param5: boolean = false): WindowKeyboardEvent {
        let _loc6_: WindowKeyboardEvent = WindowKeyboardEvent._SafeStr_4348_WindowKeyboardEvent.length > 0 ? WindowKeyboardEvent._SafeStr_4348_WindowKeyboardEvent.pop() : new WindowKeyboardEvent();
        _loc6_._type = param1;
        _loc6_._SafeStr_3767 = param2 instanceof KeyboardEvent ? param2 : null;
        _loc6_._window = param3;
        _loc6_._related = param4;
        _loc6_._recycled = false;
        _loc6_._cancelable = param5;
        _loc6_._SafeStr_3571 = WindowKeyboardEvent._SafeStr_4348_WindowKeyboardEvent;
        return _loc6_;
    }

    public get charCode(): number {
        return this._SafeStr_3767.charCode;
    }

    public get keyCode(): number {
        return this._SafeStr_3767.keyCode;
    }

    public get keyLocation(): number {
        return this._SafeStr_3767.keyLocation;
    }

    public get altKey(): boolean {
        return this._SafeStr_3767.altKey;
    }

    public get shiftKey(): boolean {
        return this._SafeStr_3767.shiftKey;
    }

    public get ctrlKey(): boolean {
        return this._SafeStr_3767.ctrlKey;
    }

    public override clone(): WindowEvent {
        return WindowKeyboardEvent.allocate_WindowKeyboardEvent(this._type, this._SafeStr_3767, this.window, this.related, this.cancelable);
    }

    public override toString(): string {
        return "WindowKeyboardEvent { type: " + this._type + " cancelable: " + this._cancelable + " window: " + this._window + " charCode: " + this.charCode + " }";
    }
}
