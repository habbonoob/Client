import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class UserPurchasableChatStyleChangedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.chatstyles::UserPurchasableChatStyleChangedMessageParser'); }

    declare private _added: boolean;
    static { (this.prototype as any)._added = false; }

    declare private _styleId: number;
    static { (this.prototype as any)._styleId = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._added = false;
        this._styleId = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._added = param1.readBoolean();
        this._styleId = param1.readInteger();
        return true;
    }

    public get added(): boolean {
        return this._added;
    }

    public get styleId(): number {
        return this._styleId;
    }
}
