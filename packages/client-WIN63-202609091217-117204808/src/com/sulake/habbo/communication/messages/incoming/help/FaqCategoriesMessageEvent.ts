import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FaqCategoriesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/FaqCategoriesMessageParser';

export class FaqCategoriesMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::FaqCategoriesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FaqCategoriesMessageParser);
    }

    public getParser(): FaqCategoriesMessageParser {
        return this._parser instanceof FaqCategoriesMessageParser ? this._parser : null;
    }
}
