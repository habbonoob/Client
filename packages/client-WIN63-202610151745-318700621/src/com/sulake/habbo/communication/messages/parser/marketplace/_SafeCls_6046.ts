import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class _SafeCls_6046 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.marketplace::_SafeCls_6046'); }

    declare private _offerIds: number[];

    declare private _success: boolean;
    static { (this.prototype as any)._success = false; }

    constructor() {
    }

    public get offerIds(): number[] {
        return this._offerIds;
    }

    public get success(): boolean {
        return this._success;
    }

    public flush(): boolean {
        this._offerIds = null;
        this._success = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._offerIds = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._offerIds.push(param1.readInteger());
            _loc3_++;
        }
        this._success = param1.readBoolean();
        return true;
    }
}
