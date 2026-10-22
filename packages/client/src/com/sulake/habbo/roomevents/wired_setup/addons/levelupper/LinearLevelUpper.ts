import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AbstractLevelUpConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/levelupper/AbstractLevelUpConfig';

export class LinearLevelUpper extends AbstractLevelUpConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.levelupper::LinearLevelUpper'); }

    constructor(param1: number, param2: number) {
        super();
        this._SafeStr_7339 = param1;
        this._maxLevel = param2;
    }

    declare private _SafeStr_7339: number;
    static { (this.prototype as any)._SafeStr_7339 = 0; }

    declare private _maxLevel: number;
    static { (this.prototype as any)._maxLevel = 0; }

    public override get maxLevel(): number {
        return this._maxLevel;
    }

    public override xpForLevel(param1: number): number {
        if (param1 <= 1) {
            return 0;
        }
        return this._SafeStr_7339 * (param1 - 1);
    }
}
