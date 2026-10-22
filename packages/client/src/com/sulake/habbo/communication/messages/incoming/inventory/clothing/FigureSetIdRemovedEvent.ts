import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FigureSetIdRemovedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/clothing/FigureSetIdRemovedMessageParser';

export class FigureSetIdRemovedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.clothing::FigureSetIdRemovedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FigureSetIdRemovedMessageParser);
    }

    public getParser(): FigureSetIdRemovedMessageParser {
        return this._parser instanceof FigureSetIdRemovedMessageParser ? this._parser : null;
    }
}
