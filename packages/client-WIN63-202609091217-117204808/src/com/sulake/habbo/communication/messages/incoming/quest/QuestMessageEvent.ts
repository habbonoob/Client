import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { QuestMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/QuestMessageParser';

export class QuestMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::QuestMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, QuestMessageParser);
    }

    public getParser(): QuestMessageParser {
        return this._parser instanceof QuestMessageParser ? this._parser : null;
    }
}
