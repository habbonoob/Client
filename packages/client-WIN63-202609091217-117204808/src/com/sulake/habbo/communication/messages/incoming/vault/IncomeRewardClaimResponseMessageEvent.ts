import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { IncomeRewardClaimResponseMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/vault/IncomeRewardClaimResponseMessageEventParser';

export class IncomeRewardClaimResponseMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.vault::IncomeRewardClaimResponseMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, IncomeRewardClaimResponseMessageEventParser);
    }

    public getParser(): IncomeRewardClaimResponseMessageEventParser {
        return this._parser instanceof IncomeRewardClaimResponseMessageEventParser ? this._parser : null;
    }
}
