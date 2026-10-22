import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CraftingRecipesAvailableMessageParser } from '@/com/sulake/habbo/communication/messages/parser/crafting/CraftingRecipesAvailableMessageParser';

export class CraftingRecipesAvailableMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.crafting::CraftingRecipesAvailableMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CraftingRecipesAvailableMessageParser);
    }

    public getParser(): CraftingRecipesAvailableMessageParser {
        return this._parser instanceof CraftingRecipesAvailableMessageParser ? this._parser : null;
    }
}
