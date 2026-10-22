import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredUserVariablesListMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredUserVariablesListMessageParser';

export class WiredUserVariablesListEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu.variables_management::WiredUserVariablesListEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredUserVariablesListMessageParser);
    }

    public getParser(): WiredUserVariablesListMessageParser {
        return this._parser instanceof WiredUserVariablesListMessageParser ? this._parser : null;
    }
}
