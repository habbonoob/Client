import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { _SafeCls_6005 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6005';

export class _SafeCls_6120 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.habbicons::_SafeCls_6120'); }

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): _SafeCls_6005 {
        let _loc2_: _SafeCls_6005 = new _SafeCls_6005();
        _loc2_.habbiconId = param1.readInteger();
        _loc2_.name = param1.readString();
        _loc2_.collectionId = param1.readInteger();
        _loc2_.state = param1.readInteger();
        _loc2_.priceCredits = param1.readInteger();
        _loc2_.priceActivityPoints = param1.readInteger();
        _loc2_.activityPointType = param1.readInteger();
        return _loc2_;
    }
}
