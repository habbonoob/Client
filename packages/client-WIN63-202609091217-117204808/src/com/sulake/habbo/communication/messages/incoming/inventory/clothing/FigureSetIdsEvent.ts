import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FigureSetIdsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/clothing/FigureSetIdsMessageParser';

export class FigureSetIdsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.clothing::FigureSetIdsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FigureSetIdsMessageParser);
    }

    public getParser(): FigureSetIdsMessageParser {
        return this._parser instanceof FigureSetIdsMessageParser ? this._parser : null;
    }
}
