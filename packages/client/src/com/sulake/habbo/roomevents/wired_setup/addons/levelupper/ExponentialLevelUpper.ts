import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AbstractLevelUpConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/levelupper/AbstractLevelUpConfig';

export class ExponentialLevelUpper extends AbstractLevelUpConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.levelupper::ExponentialLevelUpper'); }

    constructor(param1: number, param2: number, param3: number) {
        super();
        this._SafeStr_6202 = param1;
        this._strength = param2 / 100;
        this._maxLevel = param3;
    }

    declare private _SafeStr_6202: number;
    static { (this.prototype as any)._SafeStr_6202 = 0; }

    declare private _strength: number;
    static { (this.prototype as any)._strength = NaN; }

    declare private _maxLevel: number;
    static { (this.prototype as any)._maxLevel = 0; }

    public override get maxLevel(): number {
        return this._maxLevel;
    }

    public override xpForLevel(param1: number): number {
        if (param1 < 1) {
            return 0;
        }
        return this._SafeStr_6202 * ((Math.pow(1 + this._strength, param1 - 1) - 1 + 1e-9) / this._strength);
    }
}
