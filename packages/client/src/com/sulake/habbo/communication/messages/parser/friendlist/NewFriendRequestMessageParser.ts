import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { FriendRequestData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendRequestData';

export class NewFriendRequestMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::NewFriendRequestMessageParser'); }

    constructor() {
    }

    declare private _req: FriendRequestData;

    public get req(): FriendRequestData {
        return this._req;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._req = new FriendRequestData(param1);
        return true;
    }
}
