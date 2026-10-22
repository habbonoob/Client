import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { VariableFxStatusRemovedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/VariableFxStatusRemovedMessageParser';

export class VariableFxStatusRemovedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::VariableFxStatusRemovedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, VariableFxStatusRemovedMessageParser);
    }

    public getParser(): VariableFxStatusRemovedMessageParser {
        return this._parser instanceof VariableFxStatusRemovedMessageParser ? this._parser : null;
    }
}
