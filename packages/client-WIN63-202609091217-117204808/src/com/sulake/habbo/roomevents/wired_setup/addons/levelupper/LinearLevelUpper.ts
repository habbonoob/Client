import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AbstractLevelUpConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/levelupper/AbstractLevelUpConfig';

export class LinearLevelUpper extends AbstractLevelUpConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.levelupper::LinearLevelUpper'); }

    declare private _SafeStr_7339: number;
    static { (this.prototype as any)._SafeStr_7339 = 0; }

    declare private _maxLevel: number;
    static { (this.prototype as any)._maxLevel = 0; }

    constructor(param1: number, param2: number) {
        super();
        this._SafeStr_7339 = param1;
        this._maxLevel = param2;
    }

    public override get maxLevel(): number {
        return this._maxLevel;
    }

    public override get maxXp(): number {
        return this._maxLevel * this._SafeStr_7339;
    }

    public override xpForLevel(param1: number): number {
        if (param1 <= 1) {
            return 0;
        }
        return this._SafeStr_7339 * (param1 - 1);
    }

    public override currentLevel(param1: number): number {
        param1 = this.boundedValue(param1);
        if (param1 < 0) {
            return 1;
        }
        return Math.min(this._maxLevel, 1 + (param1 / this._SafeStr_7339 | 0)) | 0;
    }

    public override totalXpRequired(param1: number): number {
        if (this.isMaxed(param1)) {
            return 0;
        }
        return this._SafeStr_7339;
    }

    public override progress(param1: number): number {
        param1 = this.boundedValue(param1);
        if (this.isMaxed(param1)) {
            return 0;
        }
        return param1 % this._SafeStr_7339;
    }

    public override progressPercentage(param1: number): number {
        param1 = this.boundedValue(param1);
        if (this.isMaxed(param1)) {
            return 0;
        }
        return this.progress(param1) / this._SafeStr_7339 * 100 | 0;
    }

    public override xpRemaining(param1: number): number {
        param1 = this.boundedValue(param1);
        if (this.isMaxed(param1)) {
            return 0;
        }
        return this._SafeStr_7339 - param1 % this._SafeStr_7339;
    }

    public override isMaxed(param1: number): boolean {
        return this.currentLevel(param1) >= this._maxLevel;
    }
}
