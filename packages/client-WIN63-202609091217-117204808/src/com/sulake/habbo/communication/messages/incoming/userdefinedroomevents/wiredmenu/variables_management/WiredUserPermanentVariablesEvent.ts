import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredUserPermanentVariablesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredUserPermanentVariablesMessageParser';

export class WiredUserPermanentVariablesEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu.variables_management::WiredUserPermanentVariablesEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredUserPermanentVariablesMessageParser);
    }

    public getParser(): WiredUserPermanentVariablesMessageParser {
        return this._parser instanceof WiredUserPermanentVariablesMessageParser ? this._parser : null;
    }
}
