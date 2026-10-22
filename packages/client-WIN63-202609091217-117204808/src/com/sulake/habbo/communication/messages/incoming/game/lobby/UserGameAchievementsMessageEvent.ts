import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserGameAchievementsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/lobby/UserGameAchievementsMessageParser';

export class UserGameAchievementsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.lobby::UserGameAchievementsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserGameAchievementsMessageParser);
    }

    public getParser(): UserGameAchievementsMessageParser {
        return this._parser instanceof UserGameAchievementsMessageParser ? this._parser : null;
    }
}
