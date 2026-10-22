import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MiniMailNewMessageMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/MiniMailNewMessageMessageParser';

export class MiniMailNewMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::MiniMailNewMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MiniMailNewMessageMessageParser);
    }

    public getParser(): MiniMailNewMessageMessageParser {
        return this._parser instanceof MiniMailNewMessageMessageParser ? this._parser : null;
    }
}
