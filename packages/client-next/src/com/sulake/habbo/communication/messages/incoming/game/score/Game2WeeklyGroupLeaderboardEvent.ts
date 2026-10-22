import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2WeeklyGroupLeaderboardParser } from '@/com/sulake/habbo/communication/messages/parser/game/score/Game2WeeklyGroupLeaderboardParser';

export class Game2WeeklyGroupLeaderboardEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.score::Game2WeeklyGroupLeaderboardEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2WeeklyGroupLeaderboardParser);
    }

    public getParser(): Game2WeeklyGroupLeaderboardParser {
        return this._parser instanceof Game2WeeklyGroupLeaderboardParser ? this._parser : null;
    }
}
