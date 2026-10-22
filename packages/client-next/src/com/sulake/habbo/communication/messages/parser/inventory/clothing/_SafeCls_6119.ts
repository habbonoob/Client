import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class _SafeCls_6119 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.clothing::_SafeCls_6119'); }

    declare private _itemId: number;
    static { (this.prototype as any)._itemId = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._itemId = param1.readInteger();
        return true;
    }

    public get itemId(): number {
        return this._itemId;
    }
}
