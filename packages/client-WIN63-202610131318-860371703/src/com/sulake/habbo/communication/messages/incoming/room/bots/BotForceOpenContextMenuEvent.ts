import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BotForceOpenContextMenuParser } from '@/com/sulake/habbo/communication/messages/parser/room/bots/BotForceOpenContextMenuParser';

export class BotForceOpenContextMenuEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.bots::BotForceOpenContextMenuEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BotForceOpenContextMenuParser);
    }

    public getParser(): BotForceOpenContextMenuParser {
        return this._parser instanceof BotForceOpenContextMenuParser ? this._parser : null;
    }
}
