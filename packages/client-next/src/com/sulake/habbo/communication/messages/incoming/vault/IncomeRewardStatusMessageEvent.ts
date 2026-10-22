import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { IncomeRewardStatusMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/vault/IncomeRewardStatusMessageEventParser';

export class IncomeRewardStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.vault::IncomeRewardStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, IncomeRewardStatusMessageEventParser);
    }

    public getParser(): IncomeRewardStatusMessageEventParser {
        return this._parser instanceof IncomeRewardStatusMessageEventParser ? this._parser : null;
    }
}
