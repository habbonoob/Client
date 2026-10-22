import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { OpenMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/OpenMessageParser';

export class OpenEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::OpenEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, OpenMessageParser);
    }

    public getParser(): OpenMessageParser {
        return this._parser instanceof OpenMessageParser ? this._parser : null;
    }
}
