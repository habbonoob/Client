import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredLinkConnectionsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredlink/WiredLinkConnectionsMessageParser';

export class WiredLinkConnectionsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredlink::WiredLinkConnectionsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredLinkConnectionsMessageParser);
    }

    public getParser(): WiredLinkConnectionsMessageParser {
        return this._parser instanceof WiredLinkConnectionsMessageParser ? this._parser : null;
    }
}
