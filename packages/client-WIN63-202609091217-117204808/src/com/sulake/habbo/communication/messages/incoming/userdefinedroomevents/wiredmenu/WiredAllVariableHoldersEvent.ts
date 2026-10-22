import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredAllVariableHoldersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/WiredAllVariableHoldersMessageParser';

export class WiredAllVariableHoldersEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu::WiredAllVariableHoldersEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredAllVariableHoldersMessageParser);
    }

    public getParser(): WiredAllVariableHoldersMessageParser {
        return this._parser instanceof WiredAllVariableHoldersMessageParser ? this._parser : null;
    }
}
