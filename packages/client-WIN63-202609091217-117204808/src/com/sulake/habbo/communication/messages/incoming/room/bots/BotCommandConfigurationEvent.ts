import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BotCommandConfigurationParser } from '@/com/sulake/habbo/communication/messages/parser/room/bots/BotCommandConfigurationParser';

export class BotCommandConfigurationEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.bots::BotCommandConfigurationEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BotCommandConfigurationParser);
    }

    public getParser(): BotCommandConfigurationParser {
        return this._parser instanceof BotCommandConfigurationParser ? this._parser : null;
    }
}
