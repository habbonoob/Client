import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredLinkConfigurationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredlink/WiredLinkConfigurationMessageParser';

export class WiredLinkConfigurationMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredlink::WiredLinkConfigurationMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredLinkConfigurationMessageParser);
    }

    public getParser(): WiredLinkConfigurationMessageParser {
        return this._parser instanceof WiredLinkConfigurationMessageParser ? this._parser : null;
    }
}
