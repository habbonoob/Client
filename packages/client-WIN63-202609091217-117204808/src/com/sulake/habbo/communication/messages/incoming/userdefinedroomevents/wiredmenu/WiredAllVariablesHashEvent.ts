import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredAllVariablesHashMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/WiredAllVariablesHashMessageParser';

export class WiredAllVariablesHashEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu::WiredAllVariablesHashEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredAllVariablesHashMessageParser);
    }

    public getParser(): WiredAllVariablesHashMessageParser {
        return this._parser instanceof WiredAllVariablesHashMessageParser ? this._parser : null;
    }
}
