import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FriendNotificationMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::FriendNotificationMessageParser'); }

    private _typeCode: number = -1;

    declare private _avatarId: string;

    declare private _message: string;

    constructor() {
    }

    public get typeCode(): number {
        return this._typeCode;
    }

    public get avatarId(): string {
        return this._avatarId;
    }

    public get message(): string {
        return this._message;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._avatarId = param1.readString();
        this._typeCode = param1.readInteger();
        this._message = param1.readString();
        return true;
    }
}
