import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CfhTopicsInitMessageParser } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/CfhTopicsInitMessageParser';

export class CfhTopicsInitMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.callforhelp::CfhTopicsInitMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CfhTopicsInitMessageParser);
    }

    public getParser(): CfhTopicsInitMessageParser {
        return this._parser instanceof CfhTopicsInitMessageParser ? this._parser : null;
    }
}
