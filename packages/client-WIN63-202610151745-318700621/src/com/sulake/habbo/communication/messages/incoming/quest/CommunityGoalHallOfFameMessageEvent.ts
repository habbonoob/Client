import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CommunityGoalHallOfFameMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/CommunityGoalHallOfFameMessageParser';

export class CommunityGoalHallOfFameMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::CommunityGoalHallOfFameMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CommunityGoalHallOfFameMessageParser);
    }

    public getParser(): CommunityGoalHallOfFameMessageParser {
        return this._parser instanceof CommunityGoalHallOfFameMessageParser ? this._parser : null;
    }
}
