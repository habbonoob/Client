import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class AcceptFriendFailureData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::AcceptFriendFailureData'); }

    declare private _senderId: number;
    static { (this.prototype as any)._senderId = 0; }

    declare private _errorCode: number;
    static { (this.prototype as any)._errorCode = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._senderId = param1.readInteger();
        this._errorCode = param1.readInteger();
    }

    public get senderId(): number {
        return this._senderId;
    }

    public get errorCode(): number {
        return this._errorCode;
    }
}
