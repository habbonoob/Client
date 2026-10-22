import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { _SafeCls_6050 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6050';

export class _SafeCls_6060 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.habbicons::_SafeCls_6060'); }

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): _SafeCls_6050 {
        let _loc2_: _SafeCls_6050 = new _SafeCls_6050();
        _loc2_.habbiconId = param1.readInteger();
        _loc2_.habbiconState = param1.readInteger();
        return _loc2_;
    }
}
