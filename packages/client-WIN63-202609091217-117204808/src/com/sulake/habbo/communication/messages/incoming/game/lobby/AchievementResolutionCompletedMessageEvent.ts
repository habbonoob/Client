import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AchievementResolutionCompletedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/lobby/AchievementResolutionCompletedMessageParser';

export class AchievementResolutionCompletedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.lobby::AchievementResolutionCompletedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AchievementResolutionCompletedMessageParser);
    }

    public getParser(): AchievementResolutionCompletedMessageParser {
        return this._parser instanceof AchievementResolutionCompletedMessageParser ? this._parser : null;
    }
}
