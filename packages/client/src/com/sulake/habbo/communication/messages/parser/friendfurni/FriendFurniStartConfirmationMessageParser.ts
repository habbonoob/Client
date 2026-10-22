import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FriendFurniStartConfirmationMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendfurni::FriendFurniStartConfirmationMessageParser'); }

    constructor() {
    }

    declare private _isOwner: boolean;
    static { (this.prototype as any)._isOwner = false; }

    declare private _stuffId: number;
    static { (this.prototype as any)._stuffId = 0; }

    public get stuffId(): number {
        return this._stuffId;
    }

    public get isOwner(): boolean {
        return this._isOwner;
    }

    public flush(): boolean {
        this._stuffId = -1;
        this._isOwner = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._stuffId = param1.readInteger();
        this._isOwner = param1.readBoolean();
        return true;
    }
}
