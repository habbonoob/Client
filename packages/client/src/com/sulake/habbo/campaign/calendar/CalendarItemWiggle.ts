import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';

export class CalendarItemWiggle {
    static { registerClassName(this, 'com.sulake.habbo.campaign.calendar::CalendarItemWiggle'); }

    private static readonly TIMER_INTERVAL: number = 80;
    private static readonly WIGGLE_HEIGHT: number = 10;
    private static readonly SPEED_MULTIPLIER: number = 40;
    private static readonly BOUNCE_COUNT: number = 7;
    private static readonly MIN_STEP: number = 2;

    declare private _window: IWindow;

    declare private _timer: Timer;

    declare private _direction: number;
    static { (this.prototype as any)._direction = 0; }

    declare private _bounces: number;
    static { (this.prototype as any)._bounces = 0; }

    declare private _originalY: number;
    static { (this.prototype as any)._originalY = 0; }

    constructor(window: IWindow) {
        if (!window) {
            return;
        }
        this._window = window;
        this._originalY = window.y;
        window.y -= CalendarItemWiggle.WIGGLE_HEIGHT;
        this._direction = 1;
        this._timer = new Timer(CalendarItemWiggle.TIMER_INTERVAL);
        this._timer.addEventListener(TimerEvent.TIMER, this.onTimerEvent);
        this._timer.start();
    }

    private dispose(): void {
        this._window.y = this._originalY;
        this._window = null;
        this._timer.reset();
        this._timer = null;
    }

    private onTimerEvent = (event: TimerEvent): void => {
        if (!this._window) {
            this.dispose();
        }
        let height: number = CalendarItemWiggle.WIGGLE_HEIGHT * ((CalendarItemWiggle.BOUNCE_COUNT - this._bounces) / CalendarItemWiggle.BOUNCE_COUNT);
        let phase: number = Math.abs(this._window.y - this._originalY) / height;
        let step: number = Math.max(CalendarItemWiggle.MIN_STEP, Math.sin(phase) * CalendarItemWiggle.SPEED_MULTIPLIER) * this._direction;
        this._window.y += step;
        if (this._direction > 0) {
            if (this._window.y > this._originalY) {
                this._direction *= -1;
                this._window.y = this._originalY;
                this._bounces = this._bounces + 1;
            }
        } else if (this._window.y <= this._originalY - height) {
            this._direction *= -1;
            this._window.y = this._originalY - height | 0;
            this._bounces = this._bounces + 1;
        }
        if (this._bounces >= CalendarItemWiggle.BOUNCE_COUNT) {
            this.dispose();
        }
    };
}
