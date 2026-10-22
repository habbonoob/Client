import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WeeklyGameRewardWinnersParser } from '@/com/sulake/habbo/communication/messages/parser/game/score/WeeklyGameRewardWinnersParser';

export class WeeklyGameRewardWinnersEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.score::WeeklyGameRewardWinnersEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WeeklyGameRewardWinnersParser);
    }

    public getParser(): WeeklyGameRewardWinnersParser {
        return this._parser instanceof WeeklyGameRewardWinnersParser ? this._parser : null;
    }
}
