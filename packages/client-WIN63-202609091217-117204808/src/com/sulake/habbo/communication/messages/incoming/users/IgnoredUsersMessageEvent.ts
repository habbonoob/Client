import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { IgnoredUsersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/IgnoredUsersMessageParser';

export class IgnoredUsersMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::IgnoredUsersMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, IgnoredUsersMessageParser);
    }

    public get ignoredUserIds(): any[] {
        return (this._parser instanceof IgnoredUsersMessageParser ? this._parser : null).ignoredUsers;
    }
}
