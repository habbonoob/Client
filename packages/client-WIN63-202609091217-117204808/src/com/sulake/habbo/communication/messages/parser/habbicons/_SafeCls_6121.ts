import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { _SafeCls_6004 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6004';
import { _SafeCls_6120 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6120';

export class _SafeCls_6121 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.habbicons::_SafeCls_6121'); }

    declare private _SafeStr_14832: _SafeCls_6120;

    constructor() {
        this._SafeStr_14832 = new _SafeCls_6120();
    }

    public parse(param1: IMessageDataWrapper): _SafeCls_6004 {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: _SafeCls_6004 = new _SafeCls_6004();
        _loc4_.collectionId = param1.readInteger();
        _loc4_.name = param1.readString();
        _loc4_.completed = param1.readBoolean();
        _loc4_._SafeStr_14096 = param1.readInteger();
        _loc4_._SafeStr_14097 = param1.readInteger();
        _loc4_.priceCredits = param1.readInteger();
        _loc4_.priceActivityPoints = param1.readInteger();
        _loc4_.activityPointType = param1.readInteger();
        _loc4_.habbicons = [];
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_.habbicons.push(this._SafeStr_14832.parse(param1));
            _loc3_++;
        }
        return _loc4_;
    }
}
