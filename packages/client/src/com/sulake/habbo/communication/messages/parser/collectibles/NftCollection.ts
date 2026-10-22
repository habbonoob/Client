import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { CollectibleItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleItem';
import { CollectibleItemClaim } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleItemClaim';

export class NftCollection {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::NftCollection'); }

    public static _SafeStr_8331: number = 0;
    public static _SafeStr_8721: number = 1;
    public static _SafeStr_8220: number = 2;
    public static _SafeStr_3827: number = 0;
    public static _SafeStr_6812: number = 1;

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        let _loc2_: CollectibleItem = null;
        this._claimingBonusStatus = NftCollection._SafeStr_3827;
        this._claimingRewardStatus = NftCollection._SafeStr_3827;
        let _loc6_: number = param1.readInteger();
        this._items = [];
        this._collectedItemCount = 0;
        _loc3_ = 0;
        while (_loc3_ < _loc6_) {
            _loc2_ = new CollectibleItem(param1);
            this._items.push(_loc2_);
            if (_loc2_.amount > 0) {
                this._collectedItemCount += 1;
            }
            _loc3_++;
        }
        this._collectionId = param1.readString();
        this._collectionName = param1.readString();
        this._collectionScore = param1.readInteger();
        this._collectionTotalScore = param1.readInteger();
        this._collectionBoostScore = param1.readInteger();
        let _loc4_: boolean = param1.readBoolean();
        if (_loc4_) {
            this._bonusItem = new CollectibleItem(param1);
        }
        let _loc5_: boolean = param1.readBoolean();
        if (_loc5_) {
            this._rewardItem = new CollectibleItem(param1);
        }
        this._releasedTime = param1.readLong();
        this._snapshotTime = param1.readLong();
        this._status = param1.readShort();
        if (_loc4_) {
            this._bonusItemClaim = new CollectibleItemClaim(param1);
        }
        if (_loc5_) {
            this._rewardItemClaim = new CollectibleItemClaim(param1);
        }
    }

    declare private _collectionId: string;

    declare private _collectionName: string;

    declare private _collectionScore: number;
    static { (this.prototype as any)._collectionScore = 0; }

    declare private _collectionTotalScore: number;
    static { (this.prototype as any)._collectionTotalScore = 0; }

    declare private _collectionBoostScore: number;
    static { (this.prototype as any)._collectionBoostScore = 0; }

    declare private _bonusItem: CollectibleItem;

    declare private _rewardItem: CollectibleItem;

    declare private _releasedTime: number;
    static { (this.prototype as any)._releasedTime = NaN; }

    declare private _snapshotTime: number;
    static { (this.prototype as any)._snapshotTime = NaN; }

    declare private _bonusItemClaim: CollectibleItemClaim;

    declare private _rewardItemClaim: CollectibleItemClaim;

    declare private _collectedItemCount: number;
    static { (this.prototype as any)._collectedItemCount = 0; }

    declare private _claimingBonusStatus: number;
    static { (this.prototype as any)._claimingBonusStatus = 0; }

    declare private _claimingRewardStatus: number;
    static { (this.prototype as any)._claimingRewardStatus = 0; }

    declare private _items: any[];

    public get items(): any[] {
        return this._items;
    }

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    public get status(): number {
        return this._status;
    }

    public get collectionId(): string {
        return this._collectionId;
    }

    public get collectionName(): string {
        return this._collectionName;
    }

    public get collectionScore(): number {
        return this._collectionScore;
    }

    public get collectionTotalScore(): number {
        return this._collectionTotalScore;
    }

    public get collectionBoostScore(): number {
        return this._collectionBoostScore;
    }

    public get bonusItem(): CollectibleItem {
        return this._bonusItem;
    }

    public get rewardItem(): CollectibleItem {
        return this._rewardItem;
    }

    public get releasedTime(): number {
        return this._releasedTime;
    }

    public get snapshotTime(): number {
        return this._snapshotTime;
    }

    public get bonusItemClaim(): CollectibleItemClaim {
        return this._bonusItemClaim;
    }

    public get rewardItemClaim(): CollectibleItemClaim {
        return this._rewardItemClaim;
    }

    public get collectedItemCount(): number {
        return this._collectedItemCount;
    }

    public get totalItemCount(): number {
        return this._items.length | 0;
    }

    public get progressPercentage(): number {
        return this.collectedItemCount * 100 / this.totalItemCount | 0;
    }

    public get claimingBonusStatus(): number {
        return this._claimingBonusStatus;
    }

    public get claimingRewardStatus(): number {
        return this._claimingRewardStatus;
    }

    public get hasRewardItem(): boolean {
        return this._rewardItem != null;
    }

    public get hasBonusItem(): boolean {
        return this._bonusItem != null;
    }

    public get rewardClaimed(): boolean {
        return this.hasRewardItem && this._rewardItemClaim != null && (this._rewardItemClaim.claimedAmount > 0 && this._rewardItemClaim.claimedAmount >= this._rewardItemClaim.claimLimit || this._claimingRewardStatus == NftCollection._SafeStr_6812);
    }

    public get bonusClaimed(): boolean {
        return this.hasBonusItem && this._bonusItemClaim != null && (this._bonusItemClaim.claimedAmount > 0 && this._bonusItemClaim.claimedAmount >= this._bonusItemClaim.claimLimit || this._claimingBonusStatus != NftCollection._SafeStr_3827);
    }

    public get canClaimReward(): boolean {
        return this.hasRewardItem && this._rewardItemClaim != null && this._rewardItemClaim.status == CollectibleItemClaim._SafeStr_7386 && !this.rewardClaimed && this._rewardItemClaim.claimedAmount < this._rewardItemClaim.claimLimit && this._claimingRewardStatus == NftCollection._SafeStr_3827;
    }

    public get canClaimBonus(): boolean {
        return this.hasBonusItem && this._bonusItemClaim != null && this._bonusItemClaim.status == CollectibleItemClaim._SafeStr_7386 && !this.bonusClaimed && this._bonusItemClaim.claimedAmount < this._bonusItemClaim.claimLimit && this._claimingBonusStatus == NftCollection._SafeStr_3827;
    }

    public claimRewardAwaiting(): void {
        this._claimingRewardStatus = NftCollection._SafeStr_6812;
    }

    public claimBonusAwaiting(): void {
        this._claimingBonusStatus = NftCollection._SafeStr_6812;
    }

    public claimRewardFinished(param1: boolean): void {
        this._claimingRewardStatus = NftCollection._SafeStr_3827;
        if (param1) {
            this.rewardItemClaim.claimedAmount += 1;
        }
    }

    public claimBonusFinished(param1: boolean): void {
        this._claimingBonusStatus = NftCollection._SafeStr_3827;
        if (param1) {
            this.bonusItemClaim.claimedAmount += 1;
        }
    }

    public isBonusSnapshotPassed(): boolean {
        return this._snapshotTime < new Date().getTime();
    }
}
