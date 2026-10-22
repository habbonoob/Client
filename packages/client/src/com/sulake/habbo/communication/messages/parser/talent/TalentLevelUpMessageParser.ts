import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { TalentTrackRewardPerk } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackRewardPerk';
import { TalentTrackRewardProduct } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackRewardProduct';

export class TalentLevelUpMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.talent::TalentLevelUpMessageParser'); }

    constructor() {
    }

    declare private _talentTrackName: string;

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    declare private _rewardPerks: TalentTrackRewardPerk[];

    declare private _rewardProducts: TalentTrackRewardProduct[];

    public get talentTrackName(): string {
        return this._talentTrackName;
    }

    public get level(): number {
        return this._level;
    }

    public get rewardPerks(): TalentTrackRewardPerk[] {
        return this._rewardPerks;
    }

    public get rewardProducts(): TalentTrackRewardProduct[] {
        return this._rewardProducts;
    }

    public flush(): boolean {
        this._talentTrackName = null;
        this._rewardPerks = null;
        this._rewardProducts = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._talentTrackName = param1.readString();
        this._level = param1.readInteger();
        this._rewardPerks = [];
        let _loc4_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc4_) {
            this._rewardPerks.push(new TalentTrackRewardPerk(param1));
            _loc3_++;
        }
        this._rewardProducts = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._rewardProducts.push(new TalentTrackRewardProduct(param1));
            _loc3_++;
        }
        return true;
    }
}
