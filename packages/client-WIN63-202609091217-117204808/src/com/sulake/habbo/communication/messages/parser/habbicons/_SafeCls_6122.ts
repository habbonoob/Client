import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { _SafeCls_6003 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6003';

export class _SafeCls_6122 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.habbicons::_SafeCls_6122'); }

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): _SafeCls_6003 {
        let _loc2_: _SafeCls_6003 = new _SafeCls_6003();
        _loc2_.habbiconId = param1.readInteger();
        _loc2_.habbiconState = param1.readInteger();
        return _loc2_;
    }
}
