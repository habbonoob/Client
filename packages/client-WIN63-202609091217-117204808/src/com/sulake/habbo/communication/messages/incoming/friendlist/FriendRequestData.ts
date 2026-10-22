import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class FriendRequestData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::FriendRequestData'); }

    declare private _requestId: number;
    static { (this.prototype as any)._requestId = 0; }

    declare private _requesterName: string;

    declare private _SafeStr_6109: number;
    static { (this.prototype as any)._SafeStr_6109 = 0; }

    declare private _figureString: string;

    constructor(param1: IMessageDataWrapper) {
        this._requestId = param1.readInteger();
        this._requesterName = param1.readString();
        this._figureString = param1.readString();
        this._SafeStr_6109 = this._requestId;
    }

    public get requestId(): number {
        return this._requestId;
    }

    public get requesterName(): string {
        return this._requesterName;
    }

    public get requesterUserId(): number {
        return this._SafeStr_6109;
    }

    public get figureString(): string {
        return this._figureString;
    }
}
