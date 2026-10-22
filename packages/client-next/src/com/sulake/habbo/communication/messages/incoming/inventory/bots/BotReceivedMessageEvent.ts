import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BotReceivedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/bots/BotReceivedMessageParser';

export class BotReceivedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.bots::BotReceivedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BotReceivedMessageParser);
    }

    public getParser(): BotReceivedMessageParser {
        return this._parser instanceof BotReceivedMessageParser ? this._parser : null;
    }
}
