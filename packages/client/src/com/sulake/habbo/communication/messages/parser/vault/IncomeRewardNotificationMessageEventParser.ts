import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class IncomeRewardNotificationMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.vault::IncomeRewardNotificationMessageEventParser'); }

    constructor() {
    }

    declare private _rewardCategory: number;
    static { (this.prototype as any)._rewardCategory = 0; }

    public get rewardCategory(): number {
        return this._rewardCategory;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._rewardCategory = param1.readByte();
        return true;
    }

    public flush(): boolean {
        return true;
    }
}
