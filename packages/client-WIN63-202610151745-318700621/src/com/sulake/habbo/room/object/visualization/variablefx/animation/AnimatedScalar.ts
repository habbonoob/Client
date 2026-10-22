import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AnimatedScalar {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.animation::AnimatedScalar'); }

    private static readonly MAX_INTEGRATION_STEP_MS: number = 8;

    declare private _SafeStr_14265: number;
    static { (this.prototype as any)._SafeStr_14265 = NaN; }

    declare private _SafeStr_14737: number;
    static { (this.prototype as any)._SafeStr_14737 = NaN; }

    private _lastUpdateTimeMs: number = 0;

    declare private _SafeStr_14266: number;
    static { (this.prototype as any)._SafeStr_14266 = NaN; }

    declare private _SafeStr_14267: number;
    static { (this.prototype as any)._SafeStr_14267 = NaN; }

    private _SafeStr_14268: number = 0;
    private _target: number = 0;
    private _value: number = 0;

    constructor(param1: number, param2: number, param3: number, param4: any = null) {
        this._SafeStr_14265 = Math.max(0, param1);
        this._SafeStr_14737 = Math.max(0, param4 == null ? param1 : Number(param4));
        this._SafeStr_14266 = Math.max(0, param2);
        this._SafeStr_14267 = Math.max(0, param3);
    }

    private static sign(param1: number): number {
        if (param1 > 0) {
            return 1;
        }
        if (param1 < 0) {
            return -1;
        }
        return 0;
    }

    public get value(): number {
        return this._value;
    }

    public snapTo(param1: number, param2: number): void {
        this._lastUpdateTimeMs = param2;
        this._SafeStr_14268 = 0;
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
        this._SafeStr_14268 = _loc3_ * Math.min(Math.abs(this._SafeStr_14268), this._SafeStr_14266);
    }

    public needsUpdate(param1: number, param2: number): boolean {
        if (param2 > 0 && (this._target * param2 | 0) != (this._value * param2 | 0)) {
            return true;
        }
        return Math.abs(this._target - this._value) > this._SafeStr_14267 || Math.abs(this._SafeStr_14268) > this._SafeStr_14267;
    }

    public update(param1: number): boolean {
        let _loc3_: number = NaN;
        let _loc4_: number = NaN;
        let _loc2_: number = Number(Math.max(0, param1 - this._lastUpdateTimeMs));
        if (_loc2_ <= 0 || this.isSettled()) {
            this._lastUpdateTimeMs = param1;
            return false;
        }
        _loc3_ = this._value;
        while (_loc2_ > 0 && !this.isSettled()) {
            _loc4_ = Number(Math.min(_loc2_, 8));
            this.integrateStep(_loc4_);
            _loc2_ -= _loc4_;
        }
        this._lastUpdateTimeMs = param1;
        return this._value != _loc3_;
    }

    private settle(): boolean {
        let _loc1_: boolean = this._value != this._target || this._SafeStr_14268 != 0;
        this._value = this._target;
        this._SafeStr_14268 = 0;
        return _loc1_;
    }

    private integrateStep(param1: number): void {
        let _loc2_: number = NaN;
        let _loc5_: number = NaN;
        let _loc4_: number = NaN;
        let _loc3_: number = this._target - this._value;
        let _loc6_: number = AnimatedScalar.sign(_loc3_);
        if (_loc6_ == 0 || Math.abs(_loc3_) <= this._SafeStr_14267) {
            this.settle();
            return;
        }
        _loc2_ = this.resolveAcceleration(_loc6_);
        _loc5_ = this._value + this._SafeStr_14268 * param1 + 0.5 * _loc2_ * param1 * param1;
        _loc4_ = this._SafeStr_14268 + _loc2_ * param1;
        if (AnimatedScalar.sign(this._target - _loc5_) != _loc6_ || Math.abs(this._target - _loc5_) <= this._SafeStr_14267) {
            this.settle();
            return;
        }
        if (this._SafeStr_14266 > 0 && Math.abs(_loc4_) > this._SafeStr_14266) {
            _loc4_ = AnimatedScalar.sign(_loc4_) * this._SafeStr_14266;
        }
        if (this._SafeStr_14268 != 0 && AnimatedScalar.sign(_loc4_) != AnimatedScalar.sign(this._SafeStr_14268) && AnimatedScalar.sign(_loc2_) != _loc6_) {
            _loc4_ = 0;
        }
        this._value = _loc5_;
        this._SafeStr_14268 = _loc4_;
    }

    private resolveAcceleration(param1: number): number {
        let _loc2_: number = NaN;
        let _loc3_: number = this._SafeStr_14268 * param1;
        if (_loc3_ < 0) {
            return param1 * this._SafeStr_14265;
        }
        _loc2_ = this._SafeStr_14737 > 0 ? _loc3_ * _loc3_ / (2 * this._SafeStr_14737) : 0;
        if (_loc2_ >= Math.abs(this._target - this._value)) {
            return -param1 * this._SafeStr_14737;
        }
        if (this._SafeStr_14266 > 0 && _loc3_ >= this._SafeStr_14266) {
            return 0;
        }
        return this._SafeStr_14265 <= 0 ? 0 : param1 * this._SafeStr_14265;
    }

    private resolveDirectionToTarget(): number {
        let _loc1_: number = this._target - this._value;
        return Math.abs(_loc1_) <= this._SafeStr_14267 ? 0 : AnimatedScalar.sign(_loc1_);
    }

    private isSettled(): boolean {
        return Math.abs(this._target - this._value) <= this._SafeStr_14267 && Math.abs(this._SafeStr_14268) <= this._SafeStr_14267;
    }
}
