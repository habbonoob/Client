import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredLinkOpenMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredlink/WiredLinkOpenMessageParser';

export class WiredLinkOpenMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredlink::WiredLinkOpenMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredLinkOpenMessageParser);
    }

    public getParser(): WiredLinkOpenMessageParser {
        return this._parser instanceof WiredLinkOpenMessageParser ? this._parser : null;
    }
}
