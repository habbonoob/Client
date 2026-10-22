import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class PrizeData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::PrizeData'); }

    constructor(param1: IMessageDataWrapper) {
        this._communityGoalId = param1.readInteger();
        this._communityGoalCode = param1.readString();
        this._userRank = param1.readInteger();
        this._rewardCode = param1.readString();
        this._badge = param1.readBoolean();
        this._localizedName = param1.readString();
    }

    declare private _communityGoalId: number;
    static { (this.prototype as any)._communityGoalId = 0; }

    declare private _communityGoalCode: string;

    declare private _userRank: number;
    static { (this.prototype as any)._userRank = 0; }

    declare private _rewardCode: string;

    declare private _badge: boolean;
    static { (this.prototype as any)._badge = false; }

    declare private _localizedName: string;

    public get localizedName(): string {
        return this._localizedName;
    }

    public get communityGoalId(): number {
        return this._communityGoalId;
    }

    public get communityGoalCode(): string {
        return this._communityGoalCode;
    }

    public get userRank(): number {
        return this._userRank;
    }

    public get rewardCode(): string {
        return this._rewardCode;
    }

    public get badge(): boolean {
        return this._badge;
    }
}
