import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AchievementsScoreMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/achievements/AchievementsScoreMessageParser';

export class AchievementsScoreEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.achievements::AchievementsScoreEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AchievementsScoreMessageParser);
    }

    public getParser(): AchievementsScoreMessageParser {
        return this._parser instanceof AchievementsScoreMessageParser ? this._parser : null;
    }
}
