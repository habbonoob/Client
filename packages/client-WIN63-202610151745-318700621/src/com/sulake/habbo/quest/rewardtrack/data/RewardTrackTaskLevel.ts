import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6028 } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/_SafeCls_6028';

export class RewardTrackTaskLevel {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.data::RewardTrackTaskLevel'); }

    declare private _SafeStr_14097: number;
    static { (this.prototype as any)._SafeStr_14097 = 0; }

    declare private _SafeStr_14098: number;
    static { (this.prototype as any)._SafeStr_14098 = 0; }

    declare private _SafeStr_14083: boolean;
    static { (this.prototype as any)._SafeStr_14083 = false; }

    constructor(param1: _SafeCls_6028) {
        this._SafeStr_14097 = param1.requiredCount;
        this._SafeStr_14098 = param1.pointsReward;
        this._SafeStr_14083 = param1.premium;
    }

    public get requiredCount(): number {
        return this._SafeStr_14097;
    }

    public get pointsReward(): number {
        return this._SafeStr_14098;
    }

    public get premium(): boolean {
        return this._SafeStr_14083;
    }
}
