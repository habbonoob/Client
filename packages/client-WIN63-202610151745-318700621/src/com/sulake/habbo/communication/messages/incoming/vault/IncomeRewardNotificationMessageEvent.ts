import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { IncomeRewardNotificationMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/vault/IncomeRewardNotificationMessageEventParser';

export class IncomeRewardNotificationMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.vault::IncomeRewardNotificationMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, IncomeRewardNotificationMessageEventParser);
    }

    public getParser(): IncomeRewardNotificationMessageEventParser {
        return this._parser instanceof IncomeRewardNotificationMessageEventParser ? this._parser : null;
    }
}
