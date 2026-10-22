import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HabboUserBadgesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/HabboUserBadgesMessageParser';

export class HabboUserBadgesMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::HabboUserBadgesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HabboUserBadgesMessageParser);
    }

    public get badges(): any[] {
        return (this._parser instanceof HabboUserBadgesMessageParser ? this._parser : null).badges;
    }

    public get userId(): number {
        return (this._parser instanceof HabboUserBadgesMessageParser ? this._parser : null).userId;
    }
}
