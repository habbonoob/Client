import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AchievementsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/achievements/AchievementsMessageParser';

export class AchievementsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.achievements::AchievementsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AchievementsMessageParser);
    }

    public getParser(): AchievementsMessageParser {
        return this._parser instanceof AchievementsMessageParser ? this._parser : null;
    }
}
