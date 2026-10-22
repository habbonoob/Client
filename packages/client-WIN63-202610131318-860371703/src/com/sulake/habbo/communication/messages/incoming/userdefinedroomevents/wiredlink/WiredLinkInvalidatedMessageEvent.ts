import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredLinkInvalidatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredlink/WiredLinkInvalidatedMessageParser';

export class WiredLinkInvalidatedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredlink::WiredLinkInvalidatedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredLinkInvalidatedMessageParser);
    }

    public getParser(): WiredLinkInvalidatedMessageParser {
        return this._parser instanceof WiredLinkInvalidatedMessageParser ? this._parser : null;
    }
}
