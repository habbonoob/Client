import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { VariableFxStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/VariableFxStatusMessageParser';

export class VariableFxStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::VariableFxStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, VariableFxStatusMessageParser);
    }

    public getParser(): VariableFxStatusMessageParser {
        return this._parser instanceof VariableFxStatusMessageParser ? this._parser : null;
    }
}
