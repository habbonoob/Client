import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_6137 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.healthpoints::_SafeCls_6137'); }

    private static readonly _SafeStr_14696: number = 0.0001;
    private static readonly SINGLE_HEART_ANIMATION_MS: number = 200;
    private static readonly MIN_HEART_FADE_DURATION_MS: number = 100;
    private static readonly MAX_ANIMATION_DURATION_MS: number = 1400;
    private _changedIndices: any[] = [];
    private _durationMs: number = 0;
    private _SafeStr_14697: number = 0;
    private _opacities: any[] = [];
    private _SafeStr_14698: number = 0;
    private _startOpacities: any[] = [];
    private _SafeStr_6328: number = 0;
    private _target: number = 0;
    private _targetOpacities: any[] = [];

    constructor() {
    }

    private static filledArray(param1: number, param2: number): any[] {
        let _loc4_: number = 0;
        let _loc3_: any[] = new Array(Math.max(0, param1));
        _loc4_ = 0;
        while (_loc4_ < _loc3_.length) {
            _loc3_[_loc4_] = param2;
            _loc4_++;
        }
        return _loc3_;
    }

    private static ascendingNumeric(param1: any, param2: any): number {
        return Number(param1) - Number(param2);
    }

    private static descendingNumeric(param1: any, param2: any): number {
        return Number(param2) - Number(param1);
    }

    public get visibleHeartCount(): number {
        let _loc2_: number = 0;
        let _loc1_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._opacities.length) {
            if (Number(this._opacities[_loc2_]) > 0.0001) {
                _loc1_ = Math.max(_loc1_, _loc2_ + 1) | 0;
            }
            _loc2_++;
        }
        return _loc1_;
    }

    public getOpacity(param1: number): number {
        return param1 >= 0 && param1 < this._opacities.length ? Number(this._opacities[param1]) : 0;
    }

    public snapTo(param1: number, param2: number): void {
        this._durationMs = 0;
        this._SafeStr_14697 = 0;
        this._SafeStr_14698 = 0;
        this._SafeStr_6328 = param2;
        this._target = param1;
        this._opacities = _SafeCls_6137.filledArray(param1, 1);
        this._startOpacities = this._opacities.concat();
        this._targetOpacities = this._opacities.concat();
        this._changedIndices = [];
    }

    public setTarget(param1: number, param2: number): void {
        let _loc7_: number = 0;
        let _loc4_: number = NaN;
        let _loc6_: boolean = false;
        let _loc8_: number = 0;
        let _loc10_: number = NaN;
        let _loc3_: number = NaN;
        let _loc9_: number = NaN;
        let _loc5_: number = 0;
        this.update(param2);
        _loc7_ = Math.max(this._opacities.length, param1) | 0;
        _loc4_ = this.calculateCurrentWeight(_loc7_);
        _loc6_ = param1 >= _loc4_;
        this._SafeStr_6328 = param2;
        this._target = param1;
        this._startOpacities = new Array(_loc7_);
        this._targetOpacities = new Array(_loc7_);
        this._changedIndices = [];
        _loc8_ = 0;
        while (_loc8_ < _loc7_) {
            _loc10_ = _loc8_ < this._opacities.length ? Number(this._opacities[_loc8_]) : 0;
            _loc3_ = _loc8_ < param1 ? 1 : 0;
            _loc9_ = Number(Math.abs(_loc3_ - _loc10_));
            this._startOpacities[_loc8_] = _loc10_;
            this._targetOpacities[_loc8_] = _loc3_;
            _loc5_ += _loc9_;
            if (_loc9_ > 0.0001) {
                this._changedIndices.push(_loc8_);
            }
            _loc8_++;
        }
        this._changedIndices.sort(_loc6_ ? _SafeCls_6137.ascendingNumeric : _SafeCls_6137.descendingNumeric);
        this._durationMs = this.resolveDuration(_loc5_);
        if (this._durationMs <= 0 || this._changedIndices.length == 0) {
            this.settle();
            return;
        }
        this._SafeStr_14697 = this.resolveFadeDuration(_loc5_);
        this._SafeStr_14698 = this._changedIndices.length > 1 ? (this._durationMs - this._SafeStr_14697) / (this._changedIndices.length - 1) : 0;
    }

    public needsUpdate(param1: number, param2: number): boolean {
        return this._changedIndices.length > 0;
    }

    public update(param1: number): boolean {
        let _loc4_: number = NaN;
        let _loc3_: number = 0;
        let _loc2_: number = NaN;
        let _loc5_: boolean = false;
        if (this._durationMs <= 0 || this._changedIndices.length == 0) {
            return false;
        }
        _loc4_ = Number(Math.max(0, param1 - this._SafeStr_6328));
        if (_loc4_ >= this._durationMs) {
            return this.settle();
        }
        _loc3_ = 0;
        while (_loc3_ < this._targetOpacities.length) {
            _loc2_ = this.resolveNextOpacity(_loc3_, _loc4_);
            if (_loc2_ != Number(this._opacities[_loc3_])) {
                this._opacities[_loc3_] = _loc2_;
                _loc5_ = true;
            }
            _loc3_++;
        }
        this.trimTrailingInvisibleHearts();
        return _loc5_;
    }

    private settle(): boolean {
        let _loc1_: any[] = _SafeCls_6137.filledArray(this._target, 1);
        let _loc2_: boolean = this._durationMs != 0 || !this.opacitiesEqual(this._opacities, _loc1_);
        this._opacities = _loc1_;
        this._startOpacities = _loc1_.concat();
        this._targetOpacities = _loc1_.concat();
        this._changedIndices = [];
        this._durationMs = 0;
        this._SafeStr_14697 = 0;
        this._SafeStr_14698 = 0;
        return _loc2_;
    }

    private calculateCurrentWeight(param1: number): number {
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < param1) {
            _loc2_ += _loc3_ < this._opacities.length ? Number(this._opacities[_loc3_]) : 0;
            _loc3_++;
        }
        return _loc2_;
    }

    private resolveDuration(param1: number): number {
        let _loc2_: number = NaN;
        if (param1 <= 0.0001) {
            return 0;
        }
        _loc2_ = (1400 - 200) / 1400;
        return 1400 * (1 - Math.pow(_loc2_, param1));
    }

    private resolveFadeDuration(param1: number): number {
        let _loc2_: number = this._durationMs / param1;
        let _loc3_: number = Number(Math.max(100, Math.round(_loc2_ * 1.5)));
        return Math.min(this._durationMs, _loc3_);
    }

    private resolveNextOpacity(param1: number, param2: number): number {
        let _loc3_: number = NaN;
        let _loc5_: number = NaN;
        let _loc7_: number = NaN;
        let _loc4_: number = NaN;
        let _loc6_: number = this._changedIndices.indexOf(param1);
        if (_loc6_ == -1) {
            return param1 < this._targetOpacities.length ? Number(this._targetOpacities[param1]) : 0;
        }
        _loc3_ = param2 - _loc6_ * this._SafeStr_14698;
        _loc5_ = Number(Math.max(0, Math.min(1, _loc3_ / this._SafeStr_14697)));
        _loc7_ = param1 < this._startOpacities.length ? Number(this._startOpacities[param1]) : 0;
        _loc4_ = param1 < this._targetOpacities.length ? Number(this._targetOpacities[param1]) : 0;
        return _loc7_ + (_loc4_ - _loc7_) * _loc5_;
    }

    private trimTrailingInvisibleHearts(): void {
        while (this._opacities.length > this._target && Number(this._opacities[this._opacities.length - 1]) <= 0.0001) {
            this._opacities.pop();
        }
    }

    private opacitiesEqual(param1: any[], param2: any[]): boolean {
        let _loc3_: number = 0;
        if (param1.length != param2.length) {
            return false;
        }
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            if (Math.abs(Number(param1[_loc3_]) - Number(param2[_loc3_])) > 0.0001) {
                return false;
            }
            _loc3_++;
        }
        return true;
    }
}
