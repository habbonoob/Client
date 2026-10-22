import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CraftableProductsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/crafting/CraftableProductsMessageParser';

export class CraftableProductsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.crafting::CraftableProductsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CraftableProductsMessageParser);
    }

    public getParser(): CraftableProductsMessageParser {
        return this._parser instanceof CraftableProductsMessageParser ? this._parser : null;
    }
}
