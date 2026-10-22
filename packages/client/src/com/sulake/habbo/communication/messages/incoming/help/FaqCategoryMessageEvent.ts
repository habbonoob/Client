import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FaqCategoryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/FaqCategoryMessageParser';

export class FaqCategoryMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::FaqCategoryMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FaqCategoryMessageParser);
    }

    public getParser(): FaqCategoryMessageParser {
        return this._parser instanceof FaqCategoryMessageParser ? this._parser : null;
    }
}
