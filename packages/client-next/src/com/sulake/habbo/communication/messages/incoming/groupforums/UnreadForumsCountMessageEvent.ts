import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UnreadForumsCountMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/UnreadForumsCountMessageParser';

export class UnreadForumsCountMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.groupforums::UnreadForumsCountMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UnreadForumsCountMessageParser);
    }

    public getParser(): UnreadForumsCountMessageParser {
        return this._parser instanceof UnreadForumsCountMessageParser ? this._parser : null;
    }
}
