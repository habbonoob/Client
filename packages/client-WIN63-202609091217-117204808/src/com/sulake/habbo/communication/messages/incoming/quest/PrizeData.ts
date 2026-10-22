import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class PrizeData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::PrizeData'); }

    declare private _SafeStr_6868: number;
    static { (this.prototype as any)._SafeStr_6868 = 0; }

    declare private _SafeStr_6447: string;

    declare private _SafeStr_6975: number;
    static { (this.prototype as any)._SafeStr_6975 = 0; }

    declare private _SafeStr_6362: string;

    declare private _SafeStr_7124: boolean;
    static { (this.prototype as any)._SafeStr_7124 = false; }

    declare private _localizedName: string;

    constructor(param1: IMessageDataWrapper) {
        this._SafeStr_6868 = param1.readInteger();
        this._SafeStr_6447 = param1.readString();
        this._SafeStr_6975 = param1.readInteger();
        this._SafeStr_6362 = param1.readString();
        this._SafeStr_7124 = param1.readBoolean();
        this._localizedName = param1.readString();
    }

    public get communityGoalId(): number {
        return this._SafeStr_6868;
    }

    public get communityGoalCode(): string {
        return this._SafeStr_6447;
    }

    public get userRank(): number {
        return this._SafeStr_6975;
    }

    public get rewardCode(): string {
        return this._SafeStr_6362;
    }

    public get badge(): boolean {
        return this._SafeStr_7124;
    }

    public get localizedName(): string {
        return this._localizedName;
    }
}
