import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { _SafeCls_6018 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6018';

export class _SafeCls_6020 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.habbicons::_SafeCls_6020'); }

    declare private _SafeStr_14065: any[];

    declare private _SafeStr_14066: any[];

    declare private _SafeStr_14064: _SafeCls_6018;

    constructor() {
        this._SafeStr_14064 = new _SafeCls_6018();
        this._SafeStr_14065 = [];
        this._SafeStr_14066 = [];
    }

    public get habbicons(): any[] {
        return this._SafeStr_14065;
    }

    public get recentHabbiconIds(): any[] {
        return this._SafeStr_14066;
    }

    public flush(): boolean {
        this._SafeStr_14065 = [];
        this._SafeStr_14066 = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._SafeStr_14065 = [];
        this._SafeStr_14066 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14065.push(this._SafeStr_14064.parse(param1));
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14066.push(param1.readInteger());
            _loc3_++;
        }
        return true;
    }
}
