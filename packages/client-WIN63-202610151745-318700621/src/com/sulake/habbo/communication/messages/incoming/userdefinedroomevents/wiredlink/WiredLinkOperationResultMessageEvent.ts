import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredLinkOperationResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredlink/WiredLinkOperationResultMessageParser';

export class WiredLinkOperationResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredlink::WiredLinkOperationResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredLinkOperationResultMessageParser);
    }

    public getParser(): WiredLinkOperationResultMessageParser {
        return this._parser instanceof WiredLinkOperationResultMessageParser ? this._parser : null;
    }
}
