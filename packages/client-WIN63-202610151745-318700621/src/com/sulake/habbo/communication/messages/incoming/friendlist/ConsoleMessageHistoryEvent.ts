import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ConsoleMessageHistoryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/ConsoleMessageHistoryMessageParser';

export class ConsoleMessageHistoryEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::ConsoleMessageHistoryEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ConsoleMessageHistoryMessageParser);
    }

    public getParser(): ConsoleMessageHistoryMessageParser {
        return this._parser instanceof ConsoleMessageHistoryMessageParser ? this._parser : null;
    }
}
