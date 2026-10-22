import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6058 } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/_SafeCls_6058';

export class RewardTrackTaskLevel {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.data::RewardTrackTaskLevel'); }

    declare private _SafeStr_14094: number;
    static { (this.prototype as any)._SafeStr_14094 = 0; }

    declare private _SafeStr_14095: number;
    static { (this.prototype as any)._SafeStr_14095 = 0; }

    declare private _SafeStr_14092: boolean;
    static { (this.prototype as any)._SafeStr_14092 = false; }

    constructor(param1: _SafeCls_6058) {
        this._SafeStr_14094 = param1.requiredCount;
        this._SafeStr_14095 = param1.pointsReward;
        this._SafeStr_14092 = param1.premium;
    }

    public get requiredCount(): number {
        return this._SafeStr_14094;
    }

    public get pointsReward(): number {
        return this._SafeStr_14095;
    }

    public get premium(): boolean {
        return this._SafeStr_14092;
    }
}
