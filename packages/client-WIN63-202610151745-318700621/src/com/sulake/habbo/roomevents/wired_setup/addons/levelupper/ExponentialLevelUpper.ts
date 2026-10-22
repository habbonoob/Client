import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AbstractLevelUpConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/levelupper/AbstractLevelUpConfig';

export class ExponentialLevelUpper extends AbstractLevelUpConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.levelupper::ExponentialLevelUpper'); }

    declare private _SafeStr_6202: number;
    static { (this.prototype as any)._SafeStr_6202 = 0; }

    declare private _strength: number;
    static { (this.prototype as any)._strength = NaN; }

    declare private _maxLevel: number;
    static { (this.prototype as any)._maxLevel = 0; }

    declare private _SafeStr_14534: number;
    static { (this.prototype as any)._SafeStr_14534 = NaN; }

    constructor(param1: number, param2: number, param3: number) {
        super();
        this._SafeStr_6202 = param1;
        this._strength = param2 / 100;
        this._maxLevel = param3;
        this._SafeStr_14534 = this.xpForLevel(param3);
    }

    public override get maxLevel(): number {
        return this._maxLevel;
    }

    public override get maxXp(): number {
        return this._SafeStr_14534;
    }

    public override xpForLevel(param1: number): number {
        if (param1 < 1) {
            return 0;
        }
        if (param1 > this._maxLevel) {
            return this._SafeStr_14534;
        }
        return this._SafeStr_6202 * ((Math.pow(1 + this._strength, param1 - 1) - 1 + 1e-9) / this._strength) | 0;
    }

    public override currentLevel(param1: number): number {
        param1 = this.boundedValue(param1);
        if (param1 <= 0) {
            return 1;
        }
        let _loc2_: number = 1 + this._strength;
        let _loc3_: number = (Math.log(param1 * this._strength / this._SafeStr_6202 + 1) / Math.log(_loc2_) | 0) + 1;
        if (_loc3_ > this._maxLevel) {
            return this._maxLevel;
        }
        if (_loc3_ < 1) {
            return 1;
        }
        if (param1 < this.xpForLevel(_loc3_)) {
            return Math.max(1, _loc3_ - 1) | 0;
        }
        if (param1 >= this.xpForLevel(_loc3_ + 1)) {
            return Math.min(this._maxLevel, _loc3_ + 1) | 0;
        }
        return _loc3_;
    }

    public override totalXpRequired(param1: number): number {
        param1 = this.boundedValue(param1);
        if (this.isMaxed(param1)) {
            return 0;
        }
        let _loc2_: number = this.currentLevel(param1);
        return this.xpForLevel(_loc2_ + 1) - this.xpForLevel(_loc2_);
    }

    public override progress(param1: number): number {
        param1 = this.boundedValue(param1);
        if (this.isMaxed(param1)) {
            return 0;
        }
        let _loc2_: number = this.currentLevel(param1);
        return param1 - this.xpForLevel(_loc2_);
    }

    public override progressPercentage(param1: number): number {
        param1 = this.boundedValue(param1);
        if (this.isMaxed(param1)) {
            return 0;
        }
        let _loc4_: number = this.currentLevel(param1);
        let _loc3_: number = this.xpForLevel(_loc4_);
        let _loc5_: number = this.xpForLevel(_loc4_ + 1);
        let _loc2_: number = param1 - _loc3_;
        if (_loc3_ == _loc5_) {
            return 100;
        }
        return _loc2_ / (_loc5_ - _loc3_) * 100 | 0;
    }

    public override xpRemaining(param1: number): number {
        param1 = this.boundedValue(param1);
        if (this.isMaxed(param1)) {
            return 0;
        }
        return this.xpForLevel(this.currentLevel(param1) + 1) - param1;
    }

    public override isMaxed(param1: number): boolean {
        param1 = this.boundedValue(param1);
        return this.currentLevel(param1) >= this._maxLevel;
    }
}
