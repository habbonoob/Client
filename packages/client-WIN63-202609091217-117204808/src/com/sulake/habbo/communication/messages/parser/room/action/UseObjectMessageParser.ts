import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class UseObjectMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.action::UseObjectMessageParser'); }

    private _userId: number = 0;

    declare private _itemType: number;
    static { (this.prototype as any)._itemType = 0; }

    constructor() {
    }

    public get userId(): number {
        return this._userId;
    }

    public get itemType(): number {
        return this._itemType;
    }

    public flush(): boolean {
        this._userId = 0;
        this._itemType = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._userId = param1.readInteger();
        this._itemType = param1.readInteger();
        return true;
    }
}
