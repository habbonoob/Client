import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NewConsoleMessageMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/NewConsoleMessageMessageParser';

export class NewConsoleMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::NewConsoleMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NewConsoleMessageMessageParser);
    }

    public getParser(): NewConsoleMessageMessageParser {
        return this._parser instanceof NewConsoleMessageMessageParser ? this._parser : null;
    }
}
