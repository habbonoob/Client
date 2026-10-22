import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { LevelProgressPathAnimator } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelProgressPathAnimator';

export class LevelDetailsNumberProgress {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.level::LevelDetailsNumberProgress'); }

    private static readonly _SafeStr_14558: string = "...";
    private static readonly PATH_EPSILON: number = 0.0001;
    private _initialized: boolean = false;
    private _SafeStr_14559: string = "0";
    private _sourcePath: number = 0;
    private _SafeStr_14560: number = 0;

    private _target: any = { "maxValue": 0, "pathSample": null, "value": 0 };

    private _SafeStr_14561: string = "0";
    private _targetPath: number = 0;
    private _SafeStr_14066: number = 0;

    constructor() {
    }

    public snapTo(param1: any): void {
        this._target = this.normalizeTarget(param1);
        this._targetPath = LevelProgressPathAnimator.resolveLevelProgressPath(this._target.pathSample);
        this._SafeStr_14066 = this.normalizeNumber(this._target.value);
        this._SafeStr_14561 = this.formatNumber(this._target.maxValue);
        this._sourcePath = this._targetPath;
        this._SafeStr_14560 = this._SafeStr_14066;
        this._SafeStr_14559 = this._SafeStr_14561;
        this._initialized = true;
    }

    public setTarget(param1: any, param2: number): void {
        let _loc3_: any = null;
        if (!this._initialized) {
            this.snapTo(param1);
            return;
        }
        _loc3_ = this.resolveDisplay(param2);
        this._sourcePath = this.normalizePath(param2);
        this._SafeStr_14560 = this.normalizeNumber(_loc3_.currentText);
        this._SafeStr_14559 = stringOrNull(_loc3_.maxText);
        this._target = this.normalizeTarget(param1);
        this._targetPath = LevelProgressPathAnimator.resolveLevelProgressPath(this._target.pathSample);
        this._SafeStr_14066 = this.normalizeNumber(this._target.value);
        this._SafeStr_14561 = this.formatNumber(this._target.maxValue);
    }

    public resolveDisplay(param1: number): any {
        let _loc2_: number = this.normalizePath(param1);
        return { "currentText": this.formatNumber(this.resolveCurrentValue(_loc2_)), "maxText": this.resolveMaxText(_loc2_) };
    }

    public isAtTarget(param1: number): boolean {
        return Math.abs(this.normalizePath(param1) - this._targetPath) <= 0.0001;
    }

    private resolveCurrentValue(param1: number): number {
        let _loc3_: number = NaN;
        let _loc4_: number = NaN;
        let _loc2_: number = this._targetPath - this._sourcePath;
        if (Math.abs(_loc2_) <= 0.0001) {
            return this._SafeStr_14066;
        }
        _loc3_ = Math.max(0, Math.min(1, (param1 - this._sourcePath) / _loc2_));
        _loc4_ = this._SafeStr_14560 + (this._SafeStr_14066 - this._SafeStr_14560) * _loc3_;
        if (_loc3_ >= 1 - 0.0001) {
            return this._SafeStr_14066;
        }
        if (_loc3_ <= 0.0001) {
            return this._SafeStr_14560;
        }
        return _loc4_ | 0;
    }

    private resolveMaxText(param1: number): string {
        let _loc2_: number = this._targetPath - this._sourcePath;
        if (Math.abs(_loc2_) <= 0.0001) {
            return this._SafeStr_14561;
        }
        return _loc2_ > 0 ? this.resolveForwardMaxText(param1) : this.resolveBackwardMaxText(param1);
    }

    private resolveForwardMaxText(param1: number): string {
        let _loc3_: number = Math.floor(this._sourcePath) + 1 | 0;
        let _loc2_: number = this.resolveTargetSegmentStart();
        if (param1 < _loc3_ - 0.0001) {
            return this._SafeStr_14559;
        }
        if (param1 >= _loc2_ - 0.0001) {
            return this._SafeStr_14561;
        }
        return "...";
    }

    private resolveBackwardMaxText(param1: number): string {
        let _loc3_: number = Math.floor(this._sourcePath) | 0;
        let _loc2_: number = Math.floor(this._targetPath) + 1 | 0;
        if (param1 >= _loc3_ + 0.0001) {
            return this._SafeStr_14559;
        }
        if (param1 <= _loc2_ + 0.0001) {
            return this._SafeStr_14561;
        }
        return "...";
    }

    private resolveTargetSegmentStart(): number {
        return this._target.pathSample.progress <= 0.0001 && this._targetPath > 0 ? this._targetPath - 1 : Math.floor(this._targetPath);
    }

    private normalizeTarget(param1: any): any {
        return { "maxValue": this.normalizeNumber(param1.maxValue), "pathSample": param1.pathSample, "value": this.normalizeNumber(param1.value) };
    }

    private normalizePath(param1: number): number {
        return isFinite(param1) ? Math.max(0, param1) : 0;
    }

    private normalizeNumber(param1: any): number {
        let _loc2_: number = Number(param1);
        if (!isFinite(_loc2_)) {
            return 0;
        }
        return Math.max(0, _loc2_ | 0) | 0;
    }

    private formatNumber(param1: any): string {
        return String(this.normalizeNumber(param1));
    }
}
