import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BotSkillListUpdateParser } from '@/com/sulake/habbo/communication/messages/parser/room/bots/BotSkillListUpdateParser';

export class BotSkillListUpdateEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.bots::BotSkillListUpdateEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BotSkillListUpdateParser);
    }

    public getParser(): BotSkillListUpdateParser {
        return this._parser instanceof BotSkillListUpdateParser ? this._parser : null;
    }
}
