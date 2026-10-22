import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AchievementResolutionProgressMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/lobby/AchievementResolutionProgressMessageParser';

export class AchievementResolutionProgressMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.lobby::AchievementResolutionProgressMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AchievementResolutionProgressMessageParser);
    }

    public getParser(): AchievementResolutionProgressMessageParser {
        return this._parser instanceof AchievementResolutionProgressMessageParser ? this._parser : null;
    }
}
