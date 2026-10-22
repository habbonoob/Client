import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { _SafeCls_6060 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6060';

export class _SafeCls_6052 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.habbicons::_SafeCls_6052'); }

    declare private _SafeStr_14118: any[];

    declare private _SafeStr_14119: any[];

    declare private _SafeStr_14117: _SafeCls_6060;

    constructor() {
        this._SafeStr_14117 = new _SafeCls_6060();
        this._SafeStr_14118 = [];
        this._SafeStr_14119 = [];
    }

    public get habbicons(): any[] {
        return this._SafeStr_14118;
    }

    public get recentHabbiconIds(): any[] {
        return this._SafeStr_14119;
    }

    public flush(): boolean {
        this._SafeStr_14118 = [];
        this._SafeStr_14119 = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._SafeStr_14118 = [];
        this._SafeStr_14119 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14118.push(this._SafeStr_14117.parse(param1));
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14119.push(param1.readInteger());
            _loc3_++;
        }
        return true;
    }
}
