import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BotRemovedFromInventoryParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/bots/BotRemovedFromInventoryParser';

export class BotRemovedFromInventoryEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.bots::BotRemovedFromInventoryEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BotRemovedFromInventoryParser);
    }

    public getParser(): BotRemovedFromInventoryParser {
        return this._parser instanceof BotRemovedFromInventoryParser ? this._parser : null;
    }
}
