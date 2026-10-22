import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { _SafeCls_6061 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6061';

export class _SafeCls_6048 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.habbicons::_SafeCls_6048'); }

    declare private _SafeStr_14121: any[];

    declare private _SafeStr_14122: _SafeCls_6061;

    constructor() {
        this._SafeStr_14122 = new _SafeCls_6061();
        this._SafeStr_14121 = [];
    }

    public get collections(): any[] {
        return this._SafeStr_14121;
    }

    public flush(): boolean {
        this._SafeStr_14121 = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._SafeStr_14121 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14121.push(this._SafeStr_14122.parse(param1));
            _loc3_++;
        }
        return true;
    }
}
