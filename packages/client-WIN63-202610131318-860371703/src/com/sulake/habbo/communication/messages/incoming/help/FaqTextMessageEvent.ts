import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FaqTextMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/FaqTextMessageParser';

export class FaqTextMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::FaqTextMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FaqTextMessageParser);
    }

    public getParser(): FaqTextMessageParser {
        return this._parser instanceof FaqTextMessageParser ? this._parser : null;
    }
}
