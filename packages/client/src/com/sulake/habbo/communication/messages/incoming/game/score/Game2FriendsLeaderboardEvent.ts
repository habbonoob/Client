import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2LeaderboardParser } from '@/com/sulake/habbo/communication/messages/parser/game/score/Game2LeaderboardParser';

export class Game2FriendsLeaderboardEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.score::Game2FriendsLeaderboardEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2LeaderboardParser);
    }

    public getParser(): Game2LeaderboardParser {
        return this._parser instanceof Game2LeaderboardParser ? this._parser : null;
    }
}
