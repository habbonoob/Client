import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredClickUserResponseMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredClickUserResponseMessageParser';

export class WiredClickUserResponseEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredClickUserResponseEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredClickUserResponseMessageParser);
    }

    public getParser(): WiredClickUserResponseMessageParser {
        return this._parser instanceof WiredClickUserResponseMessageParser ? this._parser : null;
    }
}
