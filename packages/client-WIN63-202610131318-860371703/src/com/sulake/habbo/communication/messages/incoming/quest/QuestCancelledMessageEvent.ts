import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { QuestCancelledMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/QuestCancelledMessageParser';

export class QuestCancelledMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::QuestCancelledMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, QuestCancelledMessageParser);
    }

    public getParser(): QuestCancelledMessageParser {
        return this._parser instanceof QuestCancelledMessageParser ? this._parser : null;
    }
}
