import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { VariableFxConfigsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/VariableFxConfigsMessageParser';

export class VariableFxConfigsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::VariableFxConfigsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, VariableFxConfigsMessageParser);
    }

    public getParser(): VariableFxConfigsMessageParser {
        return this._parser instanceof VariableFxConfigsMessageParser ? this._parser : null;
    }
}
