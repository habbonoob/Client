import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class RecyclerEngineAnimator implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.utils::RecyclerEngineAnimator'); }

    private static readonly _SafeStr_8500: number = -88;
    private static readonly MAX_ANGLE: number = 88;
    private static readonly _SafeStr_7870: number = 82;
    private static readonly _SafeStr_8590: number = 68;
    private static readonly ANGLE_BUFFER: number = 5;
    private static readonly _SafeStr_8447: number = 0.00008;
    private static readonly BASE_BIAS: number = 0.35;
    private static readonly FIRST_BIAS: number = 0.2;
    private static readonly _SafeStr_8550: number = 16;
    private static readonly RESET_TIME: number = 250;
    private static readonly SHAKE_TIMEOUT: number = 50;
    private static readonly SHAKE_PIXELS: number = 3;
    private static readonly MIN_TIME_ACTIVE: number = 3000;
    private static readonly SHAKE_PIXELS_E: number = 24;
    private static readonly STEP_SIZE_E: number = 70;
    private static readonly STEP_DURATION_E: number = 20;
    private static readonly TOTAL_DURATION_E: number = 5000;
    private static readonly STEP_DURATION_MIN: number = 400;
    private static readonly STEP_DURATION_MAX: number = 200;
    private static readonly STEP_SIZE_MIN: number = 20;
    private static readonly STEP_SIZE_MAX: number = 55;

    declare private _arrow: IStaticBitmapWrapperWindow;

    declare private _SafeStr_5526: IStaticBitmapWrapperWindow;

    declare private _onFinish: (...args: any[]) => any;

    declare private _startTime: number;
    static { (this.prototype as any)._startTime = 0; }

    declare private _stepBeginTime: number;
    static { (this.prototype as any)._stepBeginTime = 0; }

    declare private _SafeStr_3116: number;
    static { (this.prototype as any)._SafeStr_3116 = 0; }

    declare private _SafeStr_3474: number;
    static { (this.prototype as any)._SafeStr_3474 = 0; }

    declare private _animationTime: number;
    static { (this.prototype as any)._animationTime = 0; }

    declare private _shakeLastTime: number;
    static { (this.prototype as any)._shakeLastTime = 0; }

    declare private _SafeStr_2458: Timer;

    private _SafeStr_3164: boolean = false;

    declare private _SafeStr_6609: number;
    static { (this.prototype as any)._SafeStr_6609 = 0; }

    declare private _SafeStr_7135: number;
    static { (this.prototype as any)._SafeStr_7135 = 0; }

    private _easterEggMode: boolean = false;
    private _disposed: boolean = false;

    constructor(param1: IStaticBitmapWrapperWindow, param2: IStaticBitmapWrapperWindow, param3: (...args: any[]) => any) {
        this._arrow = param1;
        this._SafeStr_5526 = param2;
        this._SafeStr_6609 = param2.x;
        this._SafeStr_7135 = param2.y;
        this._onFinish = param3;
        this.setRotation(0);
    }

    private static rand(param1: number, param2: number): number {
        return param1 + Math.random() * (param2 - param1) | 0;
    }

    public start(param1: boolean = false): void {
        this.stopTimer();
        this._SafeStr_3164 = false;
        this._easterEggMode = param1;
        this._startTime = getTimer();
        this.setRotation(0);
        this.setShake(0, 0);
        this.nextStep(false, true);
        this.startTimer();
    }

    public stop(): void {
        this.stopTimer();
        this.setShake(0, 0);
        this._SafeStr_3164 = false;
    }

    public reset(): void {
        this.stopTimer();
        this._SafeStr_3164 = true;
        this._SafeStr_3116 = this._arrow.rotation | 0;
        this.setRotation(this._SafeStr_3116 % 360);
        this._SafeStr_3474 = 0;
        this._stepBeginTime = getTimer();
        this._animationTime = 250;
        this.setShake(0, 0);
        this.startTimer();
    }

    private startTimer(): void {
        this._SafeStr_2458 = new Timer(16);
        this._SafeStr_2458.addEventListener("timer", this.onTimerTick);
        this._SafeStr_2458.start();
    }

    private stopTimer(): void {
        if (this._SafeStr_2458) {
            this._SafeStr_2458.stop();
            this._SafeStr_2458.removeEventListener("timer", this.onTimerTick);
            this._SafeStr_2458 = null;
        }
    }

    private setRotation(param1: number): void {
        this._arrow.rotation = param1;
        this._arrow.invalidate();
    }

    private setShake(param1: number, param2: number): void {
        this._SafeStr_5526.x = this._SafeStr_6609 + param1;
        this._SafeStr_5526.y = this._SafeStr_7135 + param2;
    }

    private onTimerTick = (param1: TimerEvent): void => {
        let _loc3_: number = 0;
        let _loc2_: number = getTimer();
        let _loc6_: number = _loc2_ - this._stepBeginTime;
        let _loc5_: number = Number(Math.max(0, Math.min(1, _loc6_ / this._animationTime)));
        let _loc4_: number = (this._SafeStr_3474 - this._SafeStr_3116) * _loc5_ + this._SafeStr_3116 | 0;
        this.setRotation(_loc4_);
        if (this.isBusy() && _loc2_ > this._shakeLastTime + 50) {
            this._shakeLastTime = _loc2_;
            _loc3_ = this._easterEggMode ? 24 : 3;
            this.setShake(RecyclerEngineAnimator.rand(-_loc3_, _loc3_), RecyclerEngineAnimator.rand(-_loc3_, _loc3_));
        }
        if (_loc6_ >= this._animationTime) {
            if (this._SafeStr_3164) {
                this.stopTimer();
                this._SafeStr_3164 = false;
            } else if (_loc4_ >= 82 && !this._easterEggMode && _loc2_ - this._startTime > 3000 || this._easterEggMode && _loc2_ - this._startTime > 5000) {
                this.stopTimer();
                this.setShake(0, 0);
                this._onFinish();
            } else {
                this.nextStep(_loc4_ >= 68 && _loc2_ - this._startTime > 3000 - 300 && !this._easterEggMode);
            }
        }
    };

    private nextStep(param1: boolean = false, param2: boolean = false): void {
        let _loc4_: number = 0;
        let _loc3_: boolean = false;
        let _loc6_: number = NaN;
        let _loc5_: number = 0;
        this._SafeStr_3116 = this._arrow.rotation | 0;
        this._stepBeginTime = getTimer();
        if (param1) {
            this._SafeStr_3474 = 88;
        } else if (this._easterEggMode) {
            this._SafeStr_3474 = this._SafeStr_3116 - 70;
        } else {
            _loc4_ = getTimer() - this._startTime;
            if (this._SafeStr_3116 <= -88 + 5) {
                _loc3_ = false;
            } else if (this._SafeStr_3116 >= 88 - 5) {
                _loc3_ = true;
            } else {
                _loc6_ = param2 ? 0.2 : 0.35 + _loc4_ * 0.00008;
                _loc3_ = Math.random() > _loc6_;
            }
            _loc5_ = (_loc3_ ? -1 : 1) * RecyclerEngineAnimator.rand(20, 55);
            this._SafeStr_3474 = Math.max(-88, Math.min(88, this._SafeStr_3116 + _loc5_)) | 0;
        }
        this._animationTime = this._easterEggMode ? 20 : RecyclerEngineAnimator.rand(400, 200);
    }

    public isBusy(): boolean {
        return this._SafeStr_2458 != null && !this._SafeStr_3164;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.stopTimer();
        this._arrow = null;
        this._onFinish = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
