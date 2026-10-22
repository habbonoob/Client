import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class IncomeRewardClaimResponseMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.vault::IncomeRewardClaimResponseMessageEventParser'); }

    declare private _rewardCategory: number;
    static { (this.prototype as any)._rewardCategory = 0; }

    declare private _result: boolean;
    static { (this.prototype as any)._result = false; }

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._rewardCategory = param1.readByte();
        this._result = param1.readBoolean();
        return true;
    }

    public flush(): boolean {
        return true;
    }

    public get rewardCategory(): number {
        return this._rewardCategory;
    }

    public get result(): boolean {
        return this._result;
    }
}
