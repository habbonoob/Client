import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BotInventoryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/bots/BotInventoryMessageParser';

export class BotInventoryEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.bots::BotInventoryEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BotInventoryMessageParser);
    }

    public getParser(): BotInventoryMessageParser {
        return this._parser instanceof BotInventoryMessageParser ? this._parser : null;
    }
}
