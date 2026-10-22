import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import type { _SafeCls_6014 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6014';
import { _SafeCls_6013 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6013';

export class _SafeCls_6017 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.habbicons::_SafeCls_6017'); }

    declare private _SafeStr_14063: _SafeCls_6014;

    declare private _SafeStr_14064: _SafeCls_6013;

    constructor() {
        this._SafeStr_14064 = new _SafeCls_6013();
    }

    public get habbicon(): _SafeCls_6014 {
        return this._SafeStr_14063;
    }

    public flush(): boolean {
        this._SafeStr_14063 = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_14063 = this._SafeStr_14064.parse(param1);
        return true;
    }
}
