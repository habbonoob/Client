import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { ChatRecordData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ChatRecordData';

export class UserChatlogData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::UserChatlogData'); }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _userName: string;

    declare private _rooms: any[];

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._rooms = [];
        this._userId = param1.readInteger();
        this._userName = param1.readString();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._rooms.push(new ChatRecordData(param1));
            _loc3_++;
        }
    }

    public get userId(): number {
        return this._userId;
    }

    public get userName(): string {
        return this._userName;
    }

    public get rooms(): any[] {
        return this._rooms;
    }
}
