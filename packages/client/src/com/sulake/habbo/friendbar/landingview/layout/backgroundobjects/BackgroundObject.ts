import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';

export class BackgroundObject implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.layout.backgroundobjects::BackgroundObject'); }

    constructor(param1: number, param2: IWindowContainer, param3: EventDispatcher, param4: HabboLandingView, param5: string, param6: boolean = false) {
        this._id = param1;
        this._window = param2;
        this._events = param3;
        if (param6) {
            this._sprite = castGuarded(param4.getXmlWindow("moving_object"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        } else {
            this._sprite = castGuarded(param4.getXmlWindow("moving_object_floating"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        }
        param2.addChild(this._sprite);
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _events: EventDispatcher;

    declare private _sprite: IStaticBitmapWrapperWindow;

    declare private _window: IWindow;

    public get window(): IWindow {
        return this._window;
    }

    public set window(param1: IWindow) {
        this._window = param1;
    }

    public get disposed(): boolean {
        return this._window == null;
    }

    public get sprite(): IStaticBitmapWrapperWindow {
        return this._sprite;
    }

    public set sprite(param1: IStaticBitmapWrapperWindow) {
        this._sprite = param1;
    }

    public get events(): EventDispatcher {
        return this._events;
    }

    public get id(): number {
        return this._id;
    }

    public dispose(): void {
        this._window = null;
        this._sprite = null;
    }

    public update(param1: number): void {
        if (!this._sprite) {
        }
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
