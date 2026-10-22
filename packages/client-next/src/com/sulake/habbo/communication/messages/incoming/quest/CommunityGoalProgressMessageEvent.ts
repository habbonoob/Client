import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CommunityGoalProgressMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/CommunityGoalProgressMessageParser';

export class CommunityGoalProgressMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::CommunityGoalProgressMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CommunityGoalProgressMessageParser);
    }

    public getParser(): CommunityGoalProgressMessageParser {
        return this._parser instanceof CommunityGoalProgressMessageParser ? this._parser : null;
    }
}
