import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2GroupLeaderboardParser } from '@/com/sulake/habbo/communication/messages/parser/game/score/Game2GroupLeaderboardParser';

export class Game2TotalGroupLeaderboardEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.score::Game2TotalGroupLeaderboardEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2GroupLeaderboardParser);
    }

    public getParser(): Game2GroupLeaderboardParser {
        return this._parser instanceof Game2GroupLeaderboardParser ? this._parser : null;
    }
}
