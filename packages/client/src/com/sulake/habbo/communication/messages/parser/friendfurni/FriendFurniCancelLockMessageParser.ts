import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FriendFurniCancelLockMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendfurni::FriendFurniCancelLockMessageParser'); }

    constructor() {
    }

    declare private _stuffId: number;
    static { (this.prototype as any)._stuffId = 0; }

    public get stuffId(): number {
        return this._stuffId;
    }

    public flush(): boolean {
        this._stuffId = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._stuffId = param1.readInteger();
        return true;
    }
}
