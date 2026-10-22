import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';
import { IUpdatingTimeStampWidget } from '@/com/sulake/habbo/window/widgets/IUpdatingTimeStampWidget';

export class UpdatingTimeStampWidget implements IUpdatingTimeStampWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::UpdatingTimeStampWidget'); }

    static #staticsReady = false;

    public static get TYPE(): string {
        UpdatingTimeStampWidget.#initStatics();
        return UpdatingTimeStampWidget.TYPE;
    }

    private static get UPDATE_TIMER(): Timer {
        UpdatingTimeStampWidget.#initStatics();
        return UpdatingTimeStampWidget.UPDATE_TIMER;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: ILabelWindow;

    declare private _timeStamp: number;
    static { (this.prototype as any)._timeStamp = NaN; }

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = asGuarded(this._windowManager.create("", 12, 100, 16, new Rectangle()), isILabelWindow);
        this._root.textColor = 5592405;
        this._SafeStr_2293.rootWindow = this._root;
        UpdatingTimeStampWidget.UPDATE_TIMER.addEventListener("timer", this.onTimerTick);
        this.reset();
    }

    public reset(): void {
        this._timeStamp = new Date().getTime();
        this.onTimerTick();
    }

    public get properties(): any[] {
        return [];
    }

    public set properties(param1: any[]) {
    }

    public set align(param1: string) {
        this._root.defaultTextFormat.align = param1;
    }

    public dispose(): void {
        if (!this._disposed) {
            UpdatingTimeStampWidget.UPDATE_TIMER.removeEventListener("timer", this.onTimerTick);
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
            if (this._SafeStr_2293 != null) {
                this._SafeStr_2293.rootWindow = null;
                this._SafeStr_2293 = null;
            }
            this._windowManager = null;
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public get timeStamp(): number {
        return this._timeStamp;
    }

    public set timeStamp(param1: number) {
        this._timeStamp = param1;
        this.onTimerTick();
    }

    private onTimerTick = (param1: TimerEvent = null): void => {
        if (this._disposed || !this._root || !this._windowManager || !this._windowManager.localization) {
            return;
        }
        this._root.caption = FriendlyTime.getFriendlyTime(this._windowManager.localization, (new Date().getTime() - Math.abs(this._timeStamp)) / 1000, ".ago", 1);
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (UpdatingTimeStampWidget.#staticsReady) return;
        UpdatingTimeStampWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(UpdatingTimeStampWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("TYPE", null);
        set("UPDATE_TIMER", null);
        set("TYPE", "updating_timestamp");
        set("UPDATE_TIMER", new Timer(60000));
        UpdatingTimeStampWidget.UPDATE_TIMER.start();
    }

    get [IUpdatingTimeStampWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
