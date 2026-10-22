import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { QuestsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/QuestsMessageParser';

export class QuestsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::QuestsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, QuestsMessageParser);
    }

    public getParser(): QuestsMessageParser {
        return this._parser instanceof QuestsMessageParser ? this._parser : null;
    }
}
