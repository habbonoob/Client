import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ObjectRemoveMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ObjectRemoveMessageParser'); }

    constructor() {
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _isExpired: boolean;
    static { (this.prototype as any)._isExpired = false; }

    declare private _pickerId: number;
    static { (this.prototype as any)._pickerId = 0; }

    declare private _SafeStr_5060: number;
    static { (this.prototype as any)._SafeStr_5060 = 0; }

    public get id(): number {
        return this._id;
    }

    public get isExpired(): boolean {
        return this._isExpired;
    }

    public get pickerId(): number {
        return this._pickerId;
    }

    public get delay(): number {
        return this._SafeStr_5060;
    }

    public flush(): boolean {
        this._id = 0;
        this._SafeStr_5060 = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._id = Number(param1.readString()) | 0;
        this._isExpired = param1.readBoolean();
        this._pickerId = param1.readInteger();
        this._SafeStr_5060 = param1.readInteger();
        return true;
    }
}
