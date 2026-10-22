import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2WeeklyLeaderboardParser } from '@/com/sulake/habbo/communication/messages/parser/game/score/Game2WeeklyLeaderboardParser';

export class WeeklyCompetitiveFriendsLeaderboardEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.score::WeeklyCompetitiveFriendsLeaderboardEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2WeeklyLeaderboardParser);
    }

    public getParser(): Game2WeeklyLeaderboardParser {
        return this._parser instanceof Game2WeeklyLeaderboardParser ? this._parser : null;
    }
}
