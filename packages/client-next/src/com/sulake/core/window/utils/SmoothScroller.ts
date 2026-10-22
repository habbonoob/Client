import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';

export class SmoothScroller {
    static { registerClassName(this, 'com.sulake.core.window.utils::SmoothScroller'); }

    public static readonly DEFAULT_SCROLL_STEP: number = 25;
    private static readonly DEFAULT_MAX_DURATION_MS: number = 200;
    private static readonly INVERSE_DELTA_RAMP_START_PX: number = 120;
    private static readonly INVERSE_DELTA_RAMP_END_PX: number = 480;
    private static readonly INVERSE_DELTA_MIN_DURATION_SCALE: number = 0.5;
    private static readonly VELOCITY_BOUND_FUDGE: number = 2.5;
    private static readonly _SafeStr_14055: number = 0.01;
    private static readonly CURVE_X1: number = 0.42;
    private static readonly CURVE_X2: number = 0.58;
    private static readonly CURVE_Y2: number = 1;
    private static readonly MAX_SLOPE: number = 1000;
    private static readonly NEWTON_ITERATIONS: number = 4;
    private static readonly BINARY_SEARCH_ITERATIONS: number = 8;

    declare private _SafeStr_14056: (...args: any[]) => any;

    declare private _SafeStr_14057: (...args: any[]) => any;

    declare private _SafeStr_14058: (...args: any[]) => any;

    declare private _SafeStr_14059: (...args: any[]) => any;

    private _SafeStr_3778: number = 25;
    private _SafeStr_14060: number = 200;
    private _SafeStr_14061: number = 100;
    private _SafeStr_14062: boolean = true;
    private _SafeStr_14063: boolean = true;

    declare private _SafeStr_14064: Timer;

    private _SafeStr_14065: number = 16.666666666666668;
    private _initialValue: number = 0;
    private _SafeStr_14066: number = 0;
    private _SafeStr_14067: number = 0;
    private _SafeStr_14068: number = 0;
    private _curveControlY1: number = 0;

    constructor(param1: (...args: any[]) => any, param2: (...args: any[]) => any, param3: (...args: any[]) => any, param4: number = 200, param5: number = 60, param6: boolean = true, param7: (...args: any[]) => any = null, param8: number = NaN, param9: boolean = true) {
        if (!isNaN(param8)) {
            this._SafeStr_3778 = param8;
        }
        this.duration = param4;
        this._SafeStr_14062 = param6;
        this._SafeStr_14063 = param9;
        this._SafeStr_14059 = param7;
        this._SafeStr_14056 = param1;
        this._SafeStr_14057 = param2;
        this._SafeStr_14058 = param3;
        this._SafeStr_14064 = new Timer(this._SafeStr_14065 = 1000 / param5 | 0);
        this._SafeStr_14064.addEventListener("timer", this.updateScrolling);
    }

    private static getBezierValue(param1: number, param2: number, param3: number, param4: number, param5: number): number {
        param1 = SmoothScroller.clamp(param1, 0, 1);
        let _loc6_: number = SmoothScroller.solveCurveTForX(param1, param2, param4);
        return SmoothScroller.sampleCurve(_loc6_, param3, param5);
    }

    private static getBezierSlope(param1: number, param2: number, param3: number, param4: number, param5: number): number {
        param1 = SmoothScroller.clamp(param1, 0, 1);
        let _loc6_: number = SmoothScroller.solveCurveTForX(param1, param2, param4);
        let _loc7_: number = SmoothScroller.sampleCurveDerivative(_loc6_, param2, param4);
        if (Math.abs(_loc7_) < 0.01) {
            return 0;
        }
        let _loc8_: number = SmoothScroller.sampleCurveDerivative(_loc6_, param3, param5);
        return _loc8_ / _loc7_;
    }

    private static solveCurveTForX(param1: number, param2: number, param3: number): number {
        let _loc9_: number = 0;
        let _loc6_: number = NaN;
        let _loc4_: number = NaN;
        let _loc5_: number = param1;
        _loc9_ = 0;
        while (_loc9_ < 4) {
            _loc6_ = SmoothScroller.sampleCurve(_loc5_, param2, param3) - param1;
            if (Math.abs(_loc6_) < 0.01) {
                return _loc5_;
            }
            _loc4_ = SmoothScroller.sampleCurveDerivative(_loc5_, param2, param3);
            if (Math.abs(_loc4_) < 0.01) {
                break;
            }
            _loc5_ -= _loc6_ / _loc4_;
            _loc9_++;
        }
        let _loc7_: number = 0;
        let _loc8_: number = 1;
        _loc5_ = param1;
        _loc9_ = 0;
        while (_loc9_ < 8) {
            _loc6_ = SmoothScroller.sampleCurve(_loc5_, param2, param3);
            if (Math.abs(_loc6_ - param1) < 0.01) {
                return _loc5_;
            }
            if (_loc6_ > param1) {
                _loc8_ = _loc5_;
            } else {
                _loc7_ = _loc5_;
            }
            _loc5_ = (_loc8_ + _loc7_) * 0.5;
            _loc9_++;
        }
        return _loc5_;
    }

    private static sampleCurve(param1: number, param2: number, param3: number): number {
        return ((SmoothScroller.getCurveA(param2, param3) * param1 + SmoothScroller.getCurveB(param2, param3)) * param1 + SmoothScroller.getCurveC(param2)) * param1;
    }

    private static sampleCurveDerivative(param1: number, param2: number, param3: number): number {
        return 3 * SmoothScroller.getCurveA(param2, param3) * param1 * param1 + 2 * SmoothScroller.getCurveB(param2, param3) * param1 + SmoothScroller.getCurveC(param2);
    }

    private static getCurveA(param1: number, param2: number): number {
        return 1 - 3 * param2 + 3 * param1;
    }

    private static getCurveB(param1: number, param2: number): number {
        return 3 * param2 - 6 * param1;
    }

    private static getCurveC(param1: number): number {
        return 3 * param1;
    }

    private static clamp(param1: number, param2: number, param3: number): number {
        if (param1 < param2) {
            return param2;
        }
        if (param1 > param3) {
            return param3;
        }
        return param1;
    }

    public dispose(): void {
        this.stop();
        if (this._SafeStr_14064 != null) {
            this._SafeStr_14064.removeEventListener("timer", this.updateScrolling);
            this._SafeStr_14064 = null;
        }
        this._SafeStr_14056 = null;
        this._SafeStr_14057 = null;
        this._SafeStr_14058 = null;
        this._SafeStr_14059 = null;
    }

    public get duration(): number {
        return this._SafeStr_14060;
    }

    public set duration(param1: number) {
        if (!isFinite(param1) || param1 <= 0) {
            param1 = 200;
        }
        this._SafeStr_14060 = param1;
        this._SafeStr_14061 = param1 * 0.5;
    }

    public get isScrolling(): boolean {
        return this._SafeStr_14064 != null && this._SafeStr_14064.running;
    }

    public adjustStartPosition(param1: number): void {
        if (!this.isScrolling || !isFinite(param1) || param1 == 0) {
            return;
        }
        this._initialValue = this.clampPosition(this._initialValue + param1);
        this._SafeStr_14066 = this.clampPosition(this._SafeStr_14066 + param1);
    }

    public scrollWithWheel(param1: number): boolean {
        return this.scrollBySteps(param1);
    }

    public scrollBySteps(param1: number): boolean {
        if (!isFinite(param1) || param1 == 0) {
            return false;
        }
        let _loc6_: number = this.getMaxScroll();
        if (this._SafeStr_14062 && (!isFinite(_loc6_) || _loc6_ <= 0)) {
            this.stop();
            return false;
        }
        let _loc2_: number = this.wheelDeltaToScrollDelta(param1, _loc6_);
        if (!isFinite(_loc2_) || _loc2_ == 0) {
            return false;
        }
        let _loc4_: number = getTimer();
        let _loc3_: number = this.getPosition();
        let _loc5_: number = this.clampPosition((this.isScrolling ? this._SafeStr_14066 : _loc3_) + _loc2_);
        if (Math.abs(_loc5_ - _loc3_) < 0.01 && (!this.isScrolling || Math.abs(_loc5_ - this._SafeStr_14066) < 0.01)) {
            if (_loc5_ != _loc3_) {
                this.setPosition(_loc5_);
                this.stop();
                return true;
            }
            this.stop();
            return false;
        }
        if (this.isScrolling) {
            this.updateTarget(_loc4_, _loc5_);
        } else {
            this.startAnimation(_loc4_, _loc3_, _loc5_);
        }
        if (this._SafeStr_14068 <= this._SafeStr_14067) {
            this.complete();
            return false;
        }
        this._SafeStr_14064.reset();
        this._SafeStr_14064.start();
        this.applyPositionAt(_loc4_ + this._SafeStr_14065);
        return true;
    }

    public stop(): void {
        this.stopInternal(false);
    }

    public complete(): void {
        if (this._SafeStr_14068 > this._SafeStr_14067) {
            this.setPosition(this.clampPosition(this._SafeStr_14066));
        }
        this.stopInternal(true);
    }

    private stopInternal(param1: boolean): void {
        if (this._SafeStr_14064 == null) {
            return;
        }
        let _loc2_: boolean = this._SafeStr_14064.running;
        this._SafeStr_14064.reset();
        this._SafeStr_14067 = 0;
        this._SafeStr_14068 = 0;
        this._initialValue = 0;
        this._SafeStr_14066 = 0;
        this._curveControlY1 = 0;
        if (param1 && _loc2_ && this._SafeStr_14059 != null) {
            this._SafeStr_14059();
        }
    }

    private startAnimation(param1: number, param2: number, param3: number): void {
        this._initialValue = this.clampPosition(param2);
        this._SafeStr_14066 = this.clampPosition(param3);
        this._curveControlY1 = 0;
        this._SafeStr_14067 = param1;
        this._SafeStr_14068 = param1 + this.getInverseDeltaDurationMs(this._SafeStr_14066 - this._initialValue);
    }

    private updateTarget(param1: number, param2: number): void {
        param2 = this.clampPosition(param2);
        if (Math.abs(this._SafeStr_14066 - param2) < 0.01) {
            this._SafeStr_14066 = param2;
            return;
        }
        let _loc4_: number = this.getValueAt(param1);
        let _loc7_: number = param2 - _loc4_;
        if (Math.abs(_loc7_) < 0.01) {
            this._initialValue = _loc4_;
            this._SafeStr_14066 = param2;
            this._SafeStr_14067 = param1;
            this._SafeStr_14068 = param1;
            return;
        }
        if (this._SafeStr_14068 - this._SafeStr_14067 <= 0.01) {
            this.startAnimation(param1, _loc4_, param2);
            return;
        }
        let _loc5_: number = this.calculateVelocity(param1);
        let _loc3_: number = this.getBoundedDurationMs(_loc7_, _loc5_);
        if (!isFinite(_loc3_) || _loc3_ < 0.01) {
            this._initialValue = _loc4_;
            this._SafeStr_14066 = param2;
            this._SafeStr_14067 = param1;
            this._SafeStr_14068 = param1;
            return;
        }
        let _loc6_: number = _loc5_ * (_loc3_ / _loc7_);
        _loc6_ = SmoothScroller.clamp(_loc6_, -1000, 1000);
        this._curveControlY1 = _loc6_ * 0.42;
        this._initialValue = _loc4_;
        this._SafeStr_14066 = param2;
        this._SafeStr_14067 = param1;
        this._SafeStr_14068 = param1 + _loc3_;
    }

    private updateScrolling = (param1: TimerEvent): void => {
        this.applyPositionAt(getTimer());
    };

    private applyPositionAt(param1: number): void {
        this.setPosition(this.getValueAt(param1));
        if (param1 >= this._SafeStr_14068 || this._SafeStr_14068 - this._SafeStr_14067 <= 0.01) {
            this.complete();
        }
    }

    private wheelDeltaToScrollDelta(param1: number, param2: number): number {
        if (this._SafeStr_14062) {
            return -param1 * this._SafeStr_3778 / param2;
        }
        return -param1 * this._SafeStr_3778;
    }

    private getInverseDeltaDurationMs(param1: number): number {
        let _loc3_: number = Math.abs(param1);
        let _loc2_: number = this._SafeStr_14060;
        if (_loc3_ > 120) {
            _loc2_ += (_loc3_ - 120) * (this._SafeStr_14061 - this._SafeStr_14060) / (480 - 120);
        }
        return SmoothScroller.clamp(_loc2_, this._SafeStr_14061, this._SafeStr_14060);
    }

    private getBoundedDurationMs(param1: number, param2: number): number {
        let _loc3_: number = this.getInverseDeltaDurationMs(param1);
        let _loc4_: number = this.getVelocityBasedDurationBoundMs(param1, param2);
        return Math.min(_loc3_, _loc4_);
    }

    private getVelocityBasedDurationBoundMs(param1: number, param2: number): number {
        if (Math.abs(param1) < 0.01) {
            return 0;
        }
        if (Math.abs(param2) < 0.01) {
            return 1.7976931348623157e+308;
        }
        let _loc3_: number = param1 / param2 * 2.5;
        return _loc3_ < 0 ? 1.7976931348623157e+308 : _loc3_;
    }

    private getValueAt(param1: number): number {
        let _loc4_: number = this._SafeStr_14068 - this._SafeStr_14067;
        if (_loc4_ <= 0.01 || param1 >= this._SafeStr_14068) {
            return this._SafeStr_14066;
        }
        if (param1 <= this._SafeStr_14067) {
            return this._initialValue;
        }
        let _loc3_: number = (param1 - this._SafeStr_14067) / _loc4_;
        let _loc2_: number = SmoothScroller.getBezierValue(_loc3_, 0.42, this._curveControlY1, 0.58, 1);
        return this._initialValue + (this._SafeStr_14066 - this._initialValue) * _loc2_;
    }

    private calculateVelocity(param1: number): number {
        let _loc4_: number = this._SafeStr_14068 - this._SafeStr_14067;
        if (_loc4_ <= 0.01) {
            return 0;
        }
        let _loc2_: number = SmoothScroller.clamp((param1 - this._SafeStr_14067) / _loc4_, 0, 1);
        let _loc3_: number = SmoothScroller.getBezierSlope(_loc2_, 0.42, this._curveControlY1, 0.58, 1);
        return _loc3_ * ((this._SafeStr_14066 - this._initialValue) / _loc4_);
    }

    private getPosition(): number {
        return Number(this._SafeStr_14056());
    }

    private setPosition(param1: number): void {
        this._SafeStr_14057(param1);
    }

    private getMaxScroll(): number {
        return Number(this._SafeStr_14058());
    }

    private clampPosition(param1: number): number {
        if (!this._SafeStr_14063 || !isFinite(param1)) {
            return param1;
        }
        let _loc2_: number = this.getMaxPosition();
        if (!isFinite(_loc2_)) {
            return param1;
        }
        return SmoothScroller.clamp(param1, 0, _loc2_);
    }

    private getMaxPosition(): number {
        if (this._SafeStr_14062) {
            return 1;
        }
        let _loc1_: number = this.getMaxScroll();
        if (!isFinite(_loc1_) || _loc1_ < 0) {
            return NaN;
        }
        return _loc1_;
    }
}
