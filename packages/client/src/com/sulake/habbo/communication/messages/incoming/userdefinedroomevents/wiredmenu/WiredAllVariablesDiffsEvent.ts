import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredAllVariablesDiffsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/WiredAllVariablesDiffsMessageParser';

export class WiredAllVariablesDiffsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu::WiredAllVariablesDiffsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredAllVariablesDiffsMessageParser);
    }

    public getParser(): WiredAllVariablesDiffsMessageParser {
        return this._parser instanceof WiredAllVariablesDiffsMessageParser ? this._parser : null;
    }
}
