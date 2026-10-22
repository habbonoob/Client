import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { QuestDailyMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/QuestDailyMessageParser';

export class QuestDailyMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::QuestDailyMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, QuestDailyMessageParser);
    }

    public getParser(): QuestDailyMessageParser {
        return this._parser instanceof QuestDailyMessageParser ? this._parser : null;
    }
}
