import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class MiniMailUnreadCountMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::MiniMailUnreadCountMessageParser'); }

    constructor() {
    }

    declare private _unreadMessageCount: number;
    static { (this.prototype as any)._unreadMessageCount = 0; }

    public get unreadMessageCount(): number {
        return this._unreadMessageCount;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._unreadMessageCount = param1.readInteger();
        return true;
    }
}
