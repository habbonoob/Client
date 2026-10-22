import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FaqClientFaqsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/FaqClientFaqsMessageParser';

export class FaqClientFaqsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::FaqClientFaqsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FaqClientFaqsMessageParser);
    }

    public getParser(): FaqClientFaqsMessageParser {
        return this._parser instanceof FaqClientFaqsMessageParser ? this._parser : null;
    }
}
