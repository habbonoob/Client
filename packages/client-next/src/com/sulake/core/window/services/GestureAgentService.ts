import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IGestureAgentService } from '@/com/sulake/core/window/services/IGestureAgentService';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class GestureAgentService implements IGestureAgentService, IDisposable {
    static { registerClassName(this, 'com.sulake.core.window.services::GestureAgentService'); }

    private _disposed: boolean = false;

    declare protected _working: boolean;
    static { (this.prototype as any)._working = false; }

    declare protected _window: IWindow;

    declare protected _SafeStr_2458: Timer;

    protected _flags: number = 0;

    declare protected _callback: (...args: any[]) => any;

    declare protected _SafeStr_4082: number;
    static { (this.prototype as any)._SafeStr_4082 = 0; }

    declare protected _SafeStr_4241: number;
    static { (this.prototype as any)._SafeStr_4241 = 0; }

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        this.end(this._window);
        this._disposed = true;
    }

    public begin(param1: IWindow, param2: (...args: any[]) => any, param3: number, param4: number, param5: number): IWindow {
        this._flags = param3;
        let _loc6_: IWindow = this._window;
        if (this._window != null) {
            this.end(this._window);
        }
        if (param1 && !param1.disposed) {
            this._window = param1;
            this._window.addEventListener("WE_DESTROYED", this.clientWindowDestroyed);
            this._callback = param2;
            this._working = true;
            this._SafeStr_4082 = param4;
            this._SafeStr_4241 = param5;
            this._SafeStr_2458 = new Timer(40, 0);
            this._SafeStr_2458.addEventListener("timer", this.operate);
            this._SafeStr_2458.start();
        }
        return _loc6_;
    }

    protected operate = (param1: TimerEvent): void => {
        this._SafeStr_4082 = this._SafeStr_4082 * 0.75 | 0;
        this._SafeStr_4241 = this._SafeStr_4241 * 0.75 | 0;
        if (Math.abs(this._SafeStr_4082) <= 1 && Math.abs(this._SafeStr_4241) <= 1) {
            this.end(this._window);
        } else if (this._callback != null) {
            this._callback(this._SafeStr_4082, this._SafeStr_4241);
        }
    };

    public end(param1: IWindow): IWindow {
        let _loc2_: IWindow = this._window;
        if (this._SafeStr_2458) {
            this._SafeStr_2458.stop();
            this._SafeStr_2458.removeEventListener("timer", this.operate);
            this._SafeStr_2458 = null;
        }
        if (this._working) {
            if (this._window == param1) {
                if (!this._window.disposed) {
                    this._window.removeEventListener("WE_DESTROYED", this.clientWindowDestroyed);
                }
                this._window = null;
                this._working = false;
            }
        }
        return _loc2_;
    }

    private clientWindowDestroyed = (param1: WindowEvent): void => {
        this.end(this._window);
    };

    get [IDisposable](): true {
        return true;
    }
}
