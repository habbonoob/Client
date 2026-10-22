import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ItemRemoveMultipleMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ItemRemoveMultipleMessageParser'); }

    declare private _SafeStr_4929: any[];

    declare private _pickerId: number;
    static { (this.prototype as any)._pickerId = 0; }

    constructor() {
    }

    public get itemIds(): any[] {
        return this._SafeStr_4929;
    }

    public get pickerId(): number {
        return this._pickerId;
    }

    public flush(): boolean {
        this._SafeStr_4929 = [];
        this._pickerId = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        if (param1 == null) {
            return false;
        }
        let _loc2_: number = param1.readInteger();
        this._SafeStr_4929 = [];
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this.itemIds.push(param1.readInteger());
            _loc3_++;
        }
        this._pickerId = param1.readInteger();
        return true;
    }
}
