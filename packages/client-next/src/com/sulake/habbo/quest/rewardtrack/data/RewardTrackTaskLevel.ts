import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6065 } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/_SafeCls_6065';

export class RewardTrackTaskLevel {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.data::RewardTrackTaskLevel'); }

    declare private _SafeStr_14373: number;
    static { (this.prototype as any)._SafeStr_14373 = 0; }

    declare private _SafeStr_14374: number;
    static { (this.prototype as any)._SafeStr_14374 = 0; }

    declare private _SafeStr_14367: boolean;
    static { (this.prototype as any)._SafeStr_14367 = false; }

    constructor(param1: _SafeCls_6065) {
        this._SafeStr_14373 = param1.requiredCount;
        this._SafeStr_14374 = param1.pointsReward;
        this._SafeStr_14367 = param1.premium;
    }

    public get requiredCount(): number {
        return this._SafeStr_14373;
    }

    public get pointsReward(): number {
        return this._SafeStr_14374;
    }

    public get premium(): boolean {
        return this._SafeStr_14367;
    }
}
