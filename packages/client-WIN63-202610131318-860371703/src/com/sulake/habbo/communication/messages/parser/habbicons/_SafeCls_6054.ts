import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import type { _SafeCls_6049 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6049';
import { _SafeCls_6059 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6059';

export class _SafeCls_6054 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.habbicons::_SafeCls_6054'); }

    declare private _SafeStr_14116: _SafeCls_6049;

    declare private _SafeStr_14117: _SafeCls_6059;

    constructor() {
        this._SafeStr_14117 = new _SafeCls_6059();
    }

    public get habbicon(): _SafeCls_6049 {
        return this._SafeStr_14116;
    }

    public flush(): boolean {
        this._SafeStr_14116 = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_14116 = this._SafeStr_14117.parse(param1);
        return true;
    }
}
