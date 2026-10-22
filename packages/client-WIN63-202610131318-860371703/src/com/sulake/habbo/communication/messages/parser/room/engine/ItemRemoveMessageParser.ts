import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ItemRemoveMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ItemRemoveMessageParser'); }

    private _itemId: number = 0;
    private _pickerId: number = -1;

    declare private _SafeStr_14137: boolean;
    static { (this.prototype as any)._SafeStr_14137 = false; }

    constructor() {
    }

    public get itemId(): number {
        return this._itemId;
    }

    public get pickerId(): number {
        return this._pickerId;
    }

    public get byInvisibleFurniManager(): boolean {
        return this._SafeStr_14137;
    }

    public flush(): boolean {
        this._itemId = 0;
        this._SafeStr_14137 = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._itemId = Number(param1.readString()) | 0;
        this._pickerId = param1.readInteger();
        this._SafeStr_14137 = param1.readBoolean();
        return true;
    }
}
