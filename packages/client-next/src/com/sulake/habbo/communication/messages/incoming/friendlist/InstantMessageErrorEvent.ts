import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { InstantMessageErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/InstantMessageErrorMessageParser';

export class InstantMessageErrorEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::InstantMessageErrorEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, InstantMessageErrorMessageParser);
    }

    public getParser(): InstantMessageErrorMessageParser {
        return this._parser instanceof InstantMessageErrorMessageParser ? this._parser : null;
    }
}
