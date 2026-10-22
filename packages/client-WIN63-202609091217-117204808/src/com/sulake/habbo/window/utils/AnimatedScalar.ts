import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AnimatedScalar {
    static { registerClassName(this, 'com.sulake.habbo.window.utils::AnimatedScalar'); }

    private static readonly MAX_INTEGRATION_STEP_MS: number = 8;

    declare private _SafeStr_14515: number;
    static { (this.prototype as any)._SafeStr_14515 = NaN; }

    declare private _SafeStr_14517: number;
    static { (this.prototype as any)._SafeStr_14517 = NaN; }

    declare private _SafeStr_14518: number;
    static { (this.prototype as any)._SafeStr_14518 = NaN; }

    private _lastUpdateTimeMs: number = 0;
    private _SafeStr_14519: number = 0;
    private _target: number = 0;
    private _value: number = 0;

    constructor(param1: number, param2: number, param3: number) {
        this._SafeStr_14515 = Math.max(0, param1);
        this._SafeStr_14517 = Math.max(0, param2);
        this._SafeStr_14518 = Math.max(0, param3);
    }

    public get value(): number {
        return this._value;
    }

    public snapTo(param1: number, param2: number): void {
        this._lastUpdateTimeMs = param2;
        this._SafeStr_14519 = 0;
        this._target = param1;
        this._value = param1;
    }

    public setTarget(param1: number, param2: number): void {
        this.update(param2);
        this._target = param1;
        this._lastUpdateTimeMs = param2;
        let _loc3_: number = this.resolveDirectionToTarget();
        if (_loc3_ == 0) {
            this.settle();
            return;
        }
        this._SafeStr_14519 = _loc3_ * Math.min(Math.abs(this._SafeStr_14519), this._SafeStr_14517);
    }

    public needsUpdate(param1: number, param2: number = 1): boolean {
        if (param2 > 0 && (this._target * param2 | 0) != (this._value * param2 | 0)) {
            return true;
        }
        return Math.abs(this._target - this._value) > this._SafeStr_14518 || Math.abs(this._SafeStr_14519) > this._SafeStr_14518;
    }

    public update(param1: number): boolean {
        let _loc4_: number = NaN;
        let _loc2_: number = Math.max(0, param1 - this._lastUpdateTimeMs);
        if (_loc2_ <= 0 || this.isSettled()) {
            this._lastUpdateTimeMs = param1;
            return false;
        }
        let _loc3_: number = this._value;
        while (_loc2_ > 0 && !this.isSettled()) {
            _loc4_ = Math.min(_loc2_, 8);
            this.integrateStep(_loc4_);
            _loc2_ -= _loc4_;
        }
        this._lastUpdateTimeMs = param1;
        return this._value != _loc3_;
    }

    private settle(): boolean {
        let _loc1_: boolean = this._value != this._target || this._SafeStr_14519 != 0;
        this._value = this._target;
        this._SafeStr_14519 = 0;
        return _loc1_;
    }

    private integrateStep(param1: number): void {
        let _loc3_: number = this._target - this._value;
        let _loc6_: number = this.sign(_loc3_);
        if (_loc6_ == 0 || Math.abs(_loc3_) <= this._SafeStr_14518) {
            this.settle();
            return;
        }
        let _loc2_: number = this.resolveAcceleration(_loc6_);
        let _loc5_: number = this._value + this._SafeStr_14519 * param1 + 0.5 * _loc2_ * param1 * param1;
        let _loc4_: number = this._SafeStr_14519 + _loc2_ * param1;
        if (this.sign(this._target - _loc5_) != _loc6_ || Math.abs(this._target - _loc5_) <= this._SafeStr_14518) {
            this.settle();
            return;
        }
        if (this._SafeStr_14517 > 0 && Math.abs(_loc4_) > this._SafeStr_14517) {
            _loc4_ = this.sign(_loc4_) * this._SafeStr_14517;
        }
        if (this._SafeStr_14519 != 0 && this.sign(_loc4_) != this.sign(this._SafeStr_14519) && this.sign(_loc2_) != _loc6_) {
            _loc4_ = 0;
        }
        this._value = _loc5_;
        this._SafeStr_14519 = _loc4_;
    }

    private resolveAcceleration(param1: number): number {
        if (this._SafeStr_14515 <= 0) {
            return 0;
        }
        let _loc3_: number = this._SafeStr_14519 * param1;
        if (_loc3_ < 0) {
            return param1 * this._SafeStr_14515;
        }
        let _loc2_: number = _loc3_ * _loc3_ / (2 * this._SafeStr_14515);
        if (_loc2_ >= Math.abs(this._target - this._value)) {
            return -param1 * this._SafeStr_14515;
        }
        if (this._SafeStr_14517 > 0 && _loc3_ >= this._SafeStr_14517) {
            return 0;
        }
        return param1 * this._SafeStr_14515;
    }

    private resolveDirectionToTarget(): number {
        let _loc1_: number = this._target - this._value;
        return Math.abs(_loc1_) <= this._SafeStr_14518 ? 0 : this.sign(_loc1_);
    }

    private isSettled(): boolean {
        return Math.abs(this._target - this._value) <= this._SafeStr_14518 && Math.abs(this._SafeStr_14519) <= this._SafeStr_14518;
    }

    private sign(param1: number): number {
        if (param1 > 0) {
            return 1;
        }
        if (param1 < 0) {
            return -1;
        }
        return 0;
    }
}
