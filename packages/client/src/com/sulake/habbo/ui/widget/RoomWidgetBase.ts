import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IRoomWidgetMessageListener } from '@/com/sulake/habbo/ui/widget/IRoomWidgetMessageListener';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { IRoomWidget } from '@/com/sulake/habbo/ui/widget/IRoomWidget';

export class RoomWidgetBase implements IRoomWidget {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget::RoomWidgetBase'); }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null, param4: IHabboLocalizationManager = null) {
        this._SafeStr_2143 = param1;
        this._windowManager = param2;
        this._assets = param3;
        this._SafeStr_2259 = param4;
    }

    declare protected _SafeStr_2259: IHabboLocalizationManager;

    declare protected _SafeStr_2143: IRoomWidgetHandler;

    declare private _events: EventDispatcherWrapper;

    declare private _SafeStr_2333: IRoomWidgetMessageListener;

    declare private _reusable: boolean;
    static { (this.prototype as any)._reusable = false; }

    declare private _widgetType: string;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _windowManager: IHabboWindowManager;

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    declare protected _assets: IAssetLibrary;

    public get assets(): IAssetLibrary {
        return this._assets;
    }

    public get state(): number {
        return 0;
    }

    public get messageListener(): IRoomWidgetMessageListener {
        return this._SafeStr_2333;
    }

    public set messageListener(param1: IRoomWidgetMessageListener) {
        this._SafeStr_2333 = param1;
    }

    public get localizations(): IHabboLocalizationManager {
        return this._SafeStr_2259;
    }

    public get mainWindow(): IWindow {
        return null;
    }

    public get widgetHandler(): IRoomWidgetHandler {
        return this._SafeStr_2143;
    }

    public get reusable(): boolean {
        return this._reusable;
    }

    public set reusable(param1: boolean) {
        this._reusable = param1;
    }

    public get widgetType(): string {
        return this._widgetType;
    }

    public set widgetType(param1: string) {
        this._widgetType = param1;
    }

    public initialize(param1: number = 0): void {
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._SafeStr_2333 = null;
        this._windowManager = null;
        if (this._events != null && !this._events.disposed) {
            this.unregisterUpdateEvents(this._events);
        }
        if (this._SafeStr_2143) {
            this._SafeStr_2143.dispose();
            this._SafeStr_2143 = null;
        }
        this._events = null;
        this._assets = null;
        this._SafeStr_2259 = null;
        this._reusable = false;
        this._disposed = true;
    }

    public registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 instanceof EventDispatcherWrapper) {
            this._events = param1 instanceof EventDispatcherWrapper ? param1 : null;
        }
    }

    public unregisterUpdateEvents(param1: IEventDispatcher): void {
    }

    public release(): void {
        this._SafeStr_2143.container = null;
        this._SafeStr_2333 = null;
        if (this._events != null) {
            this.unregisterUpdateEvents(this._events);
            this._events = null;
        }
    }

    public reuse(param1: IRoomDesktop): void {
    }

    get [IRoomWidget](): true {
        return true;
    }
}
