import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BotErrorParser } from '@/com/sulake/habbo/communication/messages/parser/room/bots/BotErrorParser';

export class BotErrorEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.bots::BotErrorEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BotErrorParser);
    }

    public getParser(): BotErrorParser {
        return this._parser instanceof BotErrorParser ? this._parser : null;
    }
}
