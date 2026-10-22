import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredMenuErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/WiredMenuErrorMessageParser';

export class WiredMenuErrorEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu::WiredMenuErrorEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredMenuErrorMessageParser);
    }

    public getParser(): WiredMenuErrorMessageParser {
        return this._parser instanceof WiredMenuErrorMessageParser ? this._parser : null;
    }
}
