import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6029 } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/_SafeCls_6029';
import type { RewardTrack } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrack';

export class RewardTrackPrize {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.data::RewardTrackPrize'); }

    declare private _id: string;

    declare private _SafeStr_14085: number;
    static { (this.prototype as any)._SafeStr_14085 = 0; }

    declare private _productItemTypeId: number;
    static { (this.prototype as any)._productItemTypeId = 0; }

    declare private _SafeStr_7136: string;

    declare private _extraParams: string;

    declare private _rewardAmount: number;
    static { (this.prototype as any)._rewardAmount = 0; }

    declare private _SafeStr_14083: boolean;
    static { (this.prototype as any)._SafeStr_14083 = false; }

    declare private _SafeStr_4012: boolean;
    static { (this.prototype as any)._SafeStr_4012 = false; }

    declare private _SafeStr_14086: boolean;
    static { (this.prototype as any)._SafeStr_14086 = false; }

    constructor(param1: _SafeCls_6029) {
        this._id = param1.id;
        this._SafeStr_14085 = param1.requiredPoints;
        this._productItemTypeId = param1.productItemTypeId;
        this._SafeStr_7136 = param1.rewardTypeId;
        this._extraParams = param1.extraParams;
        this._rewardAmount = param1.rewardAmount;
        this._SafeStr_14083 = param1.premium;
        this._SafeStr_4012 = param1.available;
        this._SafeStr_14086 = param1.claimed;
    }

    public isPremiumLocked(param1: RewardTrack): boolean {
        return this._SafeStr_14083 && !param1.premium;
    }

    public isAvailable(param1: RewardTrack): boolean {
        return !this.isPremiumLocked(param1) && this.hasEnoughPoints(param1);
    }

    public hasEnoughPoints(param1: RewardTrack): boolean {
        return param1.points >= this._SafeStr_14085;
    }

    public isClaimable(param1: RewardTrack): boolean {
        return this.isAvailable(param1) && !this._SafeStr_14086;
    }

    public refreshAvailability(param1: RewardTrack): void {
        this._SafeStr_4012 = this.isAvailable(param1);
    }

    public get id(): string {
        return this._id;
    }

    public get requiredPoints(): number {
        return this._SafeStr_14085;
    }

    public get productItemTypeId(): number {
        return this._productItemTypeId;
    }

    public get rewardTypeId(): string {
        return this._SafeStr_7136;
    }

    public get extraParams(): string {
        return this._extraParams;
    }

    public get rewardAmount(): number {
        return this._rewardAmount;
    }

    public get premium(): boolean {
        return this._SafeStr_14083;
    }

    public get available(): boolean {
        return this._SafeStr_4012;
    }

    public get claimed(): boolean {
        return this._SafeStr_14086;
    }

    public set claimed(param1: boolean) {
        this._SafeStr_14086 = param1;
    }
}
