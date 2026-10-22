import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AnimatedScalar } from '@/com/sulake/habbo/room/object/visualization/variablefx/animation/AnimatedScalar';
import { LevelProgressPathSample } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelProgressPathSample';

export class LevelProgressPathAnimator {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.level::LevelProgressPathAnimator'); }

    private static readonly _SafeStr_14683: number = 0.000001;

    declare private _path: AnimatedScalar;

    private _target: LevelProgressPathSample = new LevelProgressPathSample(0, 0, false, null);

    constructor() {
        this._path = new AnimatedScalar(0.000008, 0.02, 0.0001, 0.000006);
    }

    public static resolveLevelProgressSampleProgress(param1: number, param2: number, param3: number, param4: number, param5: boolean): number {
        if (param5 && Boolean(isFinite(param2)) && Boolean(isFinite(param3)) && Boolean(isFinite(param4)) && param3 == param4 && param2 >= param4) {
            return 1;
        }
        return param1;
    }

    public static resolveLevelProgressPathDisplay(param1: number, param2: LevelProgressPathSample): any {
        let _loc3_: number = NaN;
        let _loc4_: number = 0;
        let _loc7_: number = NaN;
        let _loc5_: LevelProgressPathSample = LevelProgressPathSample.normalize(param2);
        let _loc6_: number = LevelProgressPathAnimator.resolveLevelProgressPath(_loc5_);
        if (Math.abs(param1 - _loc6_) <= 0.000001) {
            return { "level": _loc5_.level, "progress": _loc5_.progress };
        }
        _loc3_ = Number(isFinite(param1) ? Math.max(0, param1) : 0);
        _loc4_ = Math.floor(_loc3_) | 0;
        _loc7_ = _loc3_ - _loc4_;
        if (_loc7_ <= 0.000001) {
            return { "level": _loc4_, "progress": 0 };
        }
        if (1 - _loc7_ <= 0.000001) {
            return { "level": _loc4_ + 1, "progress": 0 };
        }
        return { "level": _loc4_, "progress": _loc7_ };
    }

    public static resolveLevelProgressPath(param1: LevelProgressPathSample): number {
        let _loc2_: LevelProgressPathSample = LevelProgressPathSample.normalize(param1);
        if (_loc2_.isMaxed && _loc2_.progress >= 1) {
            return _loc2_.level;
        }
        return _loc2_.level + _loc2_.progress;
    }

    public get displayedLevel(): number {
        return this.displayed.level | 0;
    }

    public get displayedProgress(): number {
        return Number(this.displayed.progress);
    }

    public get displayedPath(): number {
        return this._path.value;
    }

    public get target(): LevelProgressPathSample {
        return this._target;
    }

    public snapTo(param1: LevelProgressPathSample, param2: number): void {
        this._target = LevelProgressPathSample.normalize(param1);
        this._path.snapTo(LevelProgressPathAnimator.resolveLevelProgressPath(this._target), param2);
    }

    public setTarget(param1: LevelProgressPathSample, param2: number): void {
        this._target = LevelProgressPathSample.normalize(param1);
        this._path.setTarget(LevelProgressPathAnimator.resolveLevelProgressPath(this._target), param2);
    }

    public needsUpdate(param1: number, param2: number): boolean {
        return this._path.needsUpdate(param1, param2);
    }

    public update(param1: number): boolean {
        return this._path.update(param1);
    }

    private get displayed(): any {
        return LevelProgressPathAnimator.resolveLevelProgressPathDisplay(this._path.value, this._target);
    }
}
