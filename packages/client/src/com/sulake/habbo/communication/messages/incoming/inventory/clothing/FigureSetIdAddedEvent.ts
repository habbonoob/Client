import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FigureSetIdAddedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/clothing/FigureSetIdAddedMessageParser';

export class FigureSetIdAddedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.clothing::FigureSetIdAddedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FigureSetIdAddedMessageParser);
    }

    public getParser(): FigureSetIdAddedMessageParser {
        return this._parser instanceof FigureSetIdAddedMessageParser ? this._parser : null;
    }
}
