import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { BannedUserData } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/BannedUserData';

export class BannedUsersFromRoomParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.roomsettings::BannedUsersFromRoomParser'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _bannedUsers: any[];

    constructor() {
    }

    public flush(): boolean {
        this._bannedUsers = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._roomId = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._bannedUsers.push(new BannedUserData(param1));
            _loc3_++;
        }
        return true;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get bannedUsers(): any[] {
        return this._bannedUsers;
    }
}
