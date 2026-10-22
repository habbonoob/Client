import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CraftingResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/crafting/CraftingResultMessageParser';

export class CraftingResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.crafting::CraftingResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CraftingResultMessageParser);
    }

    public getParser(): CraftingResultMessageParser {
        return this._parser instanceof CraftingResultMessageParser ? this._parser : null;
    }
}
