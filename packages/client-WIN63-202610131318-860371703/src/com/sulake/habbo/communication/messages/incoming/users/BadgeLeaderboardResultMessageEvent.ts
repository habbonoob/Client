import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BadgeLeaderboardResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/BadgeLeaderboardResultMessageParser';

export class BadgeLeaderboardResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::BadgeLeaderboardResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BadgeLeaderboardResultMessageParser);
    }

    public getParser(): BadgeLeaderboardResultMessageParser {
        return this._parser instanceof BadgeLeaderboardResultMessageParser ? this._parser : null;
    }
}
