import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredVariablesForObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/WiredVariablesForObjectMessageParser';

export class WiredVariablesForObjectEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu::WiredVariablesForObjectEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredVariablesForObjectMessageParser);
    }

    public getParser(): WiredVariablesForObjectMessageParser {
        return this._parser instanceof WiredVariablesForObjectMessageParser ? this._parser : null;
    }
}
