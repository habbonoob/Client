import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BotAddedToInventoryParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/bots/BotAddedToInventoryParser';

export class BotAddedToInventoryEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.bots::BotAddedToInventoryEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BotAddedToInventoryParser);
    }

    public getParser(): BotAddedToInventoryParser {
        return this._parser instanceof BotAddedToInventoryParser ? this._parser : null;
    }
}
