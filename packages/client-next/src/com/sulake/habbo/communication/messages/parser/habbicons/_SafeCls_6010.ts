import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import type { _SafeCls_6005 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6005';
import { _SafeCls_6120 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6120';

export class _SafeCls_6010 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.habbicons::_SafeCls_6010'); }

    declare private _SafeStr_14474: _SafeCls_6005;

    declare private _SafeStr_14831: _SafeCls_6120;

    constructor() {
        this._SafeStr_14831 = new _SafeCls_6120();
    }

    public get habbicon(): _SafeCls_6005 {
        return this._SafeStr_14474;
    }

    public flush(): boolean {
        this._SafeStr_14474 = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_14474 = this._SafeStr_14831.parse(param1);
        return true;
    }
}
