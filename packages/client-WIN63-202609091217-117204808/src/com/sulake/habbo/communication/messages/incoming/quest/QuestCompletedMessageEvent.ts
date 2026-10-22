import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { QuestCompletedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/QuestCompletedMessageParser';

export class QuestCompletedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::QuestCompletedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, QuestCompletedMessageParser);
    }

    public getParser(): QuestCompletedMessageParser {
        return this._parser instanceof QuestCompletedMessageParser ? this._parser : null;
    }
}
