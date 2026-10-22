import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { _SafeCls_6053 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6053';
import { _SafeCls_6059 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6059';

export class _SafeCls_6061 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.habbicons::_SafeCls_6061'); }

    declare private _SafeStr_14117: _SafeCls_6059;

    constructor() {
        this._SafeStr_14117 = new _SafeCls_6059();
    }

    public parse(param1: IMessageDataWrapper): _SafeCls_6053 {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: _SafeCls_6053 = new _SafeCls_6053();
        _loc4_.collectionId = param1.readInteger();
        _loc4_.name = param1.readString();
        _loc4_.completed = param1.readBoolean();
        _loc4_._SafeStr_14086 = param1.readInteger();
        _loc4_._SafeStr_14087 = param1.readInteger();
        _loc4_.priceCredits = param1.readInteger();
        _loc4_.priceActivityPoints = param1.readInteger();
        _loc4_.activityPointType = param1.readInteger();
        _loc4_.habbicons = [];
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_.habbicons.push(this._SafeStr_14117.parse(param1));
            _loc3_++;
        }
        return _loc4_;
    }
}
