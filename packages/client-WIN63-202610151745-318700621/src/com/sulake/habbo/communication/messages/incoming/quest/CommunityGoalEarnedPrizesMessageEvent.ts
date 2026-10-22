import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CommunityGoalEarnedPrizesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/CommunityGoalEarnedPrizesMessageParser';

export class CommunityGoalEarnedPrizesMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::CommunityGoalEarnedPrizesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CommunityGoalEarnedPrizesMessageParser);
    }

    public getParser(): CommunityGoalEarnedPrizesMessageParser {
        return this._parser instanceof CommunityGoalEarnedPrizesMessageParser ? this._parser : null;
    }
}
