import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class LevelProgressPathSample {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.level::LevelProgressPathSample'); }

    declare public isMaxed: boolean;
    static { (this.prototype as any).isMaxed = false; }

    declare public level: number;
    static { (this.prototype as any).level = 0; }

    declare public maxLevel: any;

    declare public progress: number;
    static { (this.prototype as any).progress = NaN; }

    constructor(param1: number, param2: number, param3: boolean, param4: any) {
        this.level = LevelProgressPathSample.normalizeLevel(param1);
        this.progress = LevelProgressPathSample.normalizeProgress(param2);
        this.isMaxed = param3;
        this.maxLevel = LevelProgressPathSample.normalizeMaxLevel(param4);
    }

    public static normalize(param1: LevelProgressPathSample): LevelProgressPathSample {
        return new LevelProgressPathSample(param1.level, param1.progress, param1.isMaxed, param1.maxLevel);
    }

    private static normalizeLevel(param1: number): number {
        if (!isFinite(param1) || param1 < 0) {
            return 0;
        }
        return param1 | 0;
    }

    private static normalizeProgress(param1: number): number {
        if (!isFinite(param1)) {
            return 0;
        }
        return Math.max(0, Math.min(1, param1));
    }

    private static normalizeMaxLevel(param1: any): any {
        let _loc2_: number = Number(param1);
        if (param1 == null || !isFinite(_loc2_) || _loc2_ < 0) {
            return null;
        }
        return _loc2_ | 0;
    }
}
