import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { SellablePetPalettesParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/SellablePetPalettesParser';

export class SellablePetPalettesMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::SellablePetPalettesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, SellablePetPalettesParser);
    }

    public getParser(): SellablePetPalettesParser {
        return this._parser instanceof SellablePetPalettesParser ? this._parser : null;
    }
}
