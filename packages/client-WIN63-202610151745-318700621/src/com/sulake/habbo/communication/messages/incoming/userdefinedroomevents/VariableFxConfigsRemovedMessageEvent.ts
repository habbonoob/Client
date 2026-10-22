import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { VariableFxConfigsRemovedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/VariableFxConfigsRemovedMessageParser';

export class VariableFxConfigsRemovedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::VariableFxConfigsRemovedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, VariableFxConfigsRemovedMessageParser);
    }

    public getParser(): VariableFxConfigsRemovedMessageParser {
        return this._parser instanceof VariableFxConfigsRemovedMessageParser ? this._parser : null;
    }
}
