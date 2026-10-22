import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { _SafeCls_6016 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6016';

export class _SafeCls_6015 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.habbicons::_SafeCls_6015'); }

    declare private _SafeStr_14061: any[];

    declare private _SafeStr_14062: _SafeCls_6016;

    constructor() {
        this._SafeStr_14062 = new _SafeCls_6016();
        this._SafeStr_14061 = [];
    }

    public get collections(): any[] {
        return this._SafeStr_14061;
    }

    public flush(): boolean {
        this._SafeStr_14061 = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._SafeStr_14061 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14061.push(this._SafeStr_14062.parse(param1));
            _loc3_++;
        }
        return true;
    }
}
