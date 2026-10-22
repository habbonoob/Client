import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredSetUserPermanentVariableResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredSetUserPermanentVariableResultMessageParser';

export class WiredSetUserPermanentVariableResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu.variables_management::WiredSetUserPermanentVariableResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredSetUserPermanentVariableResultMessageParser);
    }

    public getParser(): WiredSetUserPermanentVariableResultMessageParser {
        return this._parser instanceof WiredSetUserPermanentVariableResultMessageParser ? this._parser : null;
    }
}
