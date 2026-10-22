import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UpdateMessageMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/UpdateMessageMessageParser';

export class UpdateMessageMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.groupforums::UpdateMessageMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UpdateMessageMessageParser);
    }

    public getParser(): UpdateMessageMessageParser {
        return this._parser instanceof UpdateMessageMessageParser ? this._parser : null;
    }
}
