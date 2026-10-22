import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class DeBouncer implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.utils::DeBouncer'); }

    constructor(param1: number, param2: number, param3: (...args: any[]) => any) {
        this._tolerateImmediateTimeout = param2;
        this._callback = param3;
        this._SafeStr_2458 = new Timer(param1, 1);
        this._SafeStr_2458.addEventListener("timerComplete", this.onTimerComplete);
    }

    private _SafeStr_4823: number = 0;

    declare private _tolerateImmediateTimeout: number;
    static { (this.prototype as any)._tolerateImmediateTimeout = 0; }

    declare private _SafeStr_2458: Timer;

    declare private _callback: (...args: any[]) => any;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public trigger(param1: boolean = false): void {
        if (param1 || this._SafeStr_4823 < getTimer() - this._tolerateImmediateTimeout) {
            this._SafeStr_2458.reset();
            this.execute();
            return;
        }
        this._SafeStr_2458.reset();
        this._SafeStr_2458.start();
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._SafeStr_2458.stop();
        this._SafeStr_2458.removeEventListener("timerComplete", this.execute);
        this._SafeStr_2458 = null;
        this._callback = null;
        this._tolerateImmediateTimeout = 0;
        this._SafeStr_4823 = 0;
        this._disposed = true;
    }

    private execute = (): void => {
        this._SafeStr_4823 = getTimer();
        this._callback();
    };

    private onTimerComplete = (param1: TimerEvent): void => {
        this.execute();
    };

    get [IDisposable](): true {
        return true;
    }
}
