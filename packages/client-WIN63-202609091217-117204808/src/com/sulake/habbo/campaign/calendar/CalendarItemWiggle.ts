import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';

export class CalendarItemWiggle {
    static { registerClassName(this, 'com.sulake.habbo.campaign.calendar::CalendarItemWiggle'); }

    private static readonly TIMER_INTERVAL: number = 80;
    private static readonly WIGGLE_HEIGHT: number = 10;
    private static readonly SPEED_MULTIPLIER: number = 40;
    private static readonly BOUNCE_COUNT: number = 7;

    declare private _window: IWindow;

    declare private _SafeStr_2458: Timer;

    declare private _direction: number;
    static { (this.prototype as any)._direction = 0; }

    declare private _counter: number;
    static { (this.prototype as any)._counter = 0; }

    declare private _originalY: number;
    static { (this.prototype as any)._originalY = 0; }

    constructor(param1: IWindow) {
        if (!param1) {
            return;
        }
        this._window = param1;
        this._originalY = param1.y;
        param1.y -= 10;
        this._direction = 1;
        this._SafeStr_2458 = new Timer(80);
        this._SafeStr_2458.addEventListener("timer", this.onTimerEvent);
        this._SafeStr_2458.start();
    }

    private onTimerEvent = (param1: TimerEvent): void => {
        if (!this._window) {
            this.dispose();
        }
        let _loc3_: number = 10 * ((7 - this._counter) / 7);
        let _loc4_: number = Math.abs(this._window.y - this._originalY) / _loc3_;
        let _loc2_: number = Math.max(2, Math.sin(_loc4_) * 40) * this._direction;
        this._window.y += _loc2_;
        if (this._direction > 0) {
            if (this._window.y > this._originalY) {
                this._direction *= -1;
                this._window.y = this._originalY;
                this._counter = this._counter + 1;
            }
        } else if (this._window.y <= this._originalY - _loc3_) {
            this._direction *= -1;
            this._window.y = this._originalY - _loc3_ | 0;
            this._counter = this._counter + 1;
        }
        if (this._counter >= 7) {
            this.dispose();
        }
    };

    private dispose(): void {
        this._window.y = this._originalY;
        this._window = null;
        this._SafeStr_2458.reset();
        this._SafeStr_2458 = null;
    }
}
