import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class FriendRequestData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::FriendRequestData'); }

    constructor(param1: IMessageDataWrapper) {
        this._requestId = param1.readInteger();
        this._requesterName = param1.readString();
        this._figureString = param1.readString();
        this._requesterUserId = this._requestId;
    }

    declare private _requestId: number;
    static { (this.prototype as any)._requestId = 0; }

    declare private _requesterUserId: number;
    static { (this.prototype as any)._requesterUserId = 0; }

    declare private _requesterName: string;

    public get requesterName(): string {
        return this._requesterName;
    }

    declare private _figureString: string;

    public get figureString(): string {
        return this._figureString;
    }

    public get requestId(): number {
        return this._requestId;
    }

    public get requesterUserId(): number {
        return this._requesterUserId;
    }
}
