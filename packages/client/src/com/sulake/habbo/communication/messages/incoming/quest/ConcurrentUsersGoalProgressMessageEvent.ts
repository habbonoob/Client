import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ConcurrentUsersGoalProgressMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/ConcurrentUsersGoalProgressMessageParser';

export class ConcurrentUsersGoalProgressMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::ConcurrentUsersGoalProgressMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ConcurrentUsersGoalProgressMessageParser);
    }

    public getParser(): ConcurrentUsersGoalProgressMessageParser {
        return this._parser instanceof ConcurrentUsersGoalProgressMessageParser ? this._parser : null;
    }
}
