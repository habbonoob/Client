import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { _SafeCls_6122 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6122';

export class _SafeCls_6007 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.habbicons::_SafeCls_6007'); }

    declare private _SafeStr_14834: any[];

    declare private _SafeStr_14089: any[];

    declare private _SafeStr_14831: _SafeCls_6122;

    constructor() {
        this._SafeStr_14831 = new _SafeCls_6122();
        this._SafeStr_14834 = [];
        this._SafeStr_14089 = [];
    }

    public get habbicons(): any[] {
        return this._SafeStr_14834;
    }

    public get recentHabbiconIds(): any[] {
        return this._SafeStr_14089;
    }

    public flush(): boolean {
        this._SafeStr_14834 = [];
        this._SafeStr_14089 = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._SafeStr_14834 = [];
        this._SafeStr_14089 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14834.push(this._SafeStr_14831.parse(param1));
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14089.push(param1.readInteger());
            _loc3_++;
        }
        return true;
    }
}
