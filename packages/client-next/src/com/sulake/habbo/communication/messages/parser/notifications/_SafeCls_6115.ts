import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class _SafeCls_6115 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.notifications::_SafeCls_6115'); }

    private _SafeStr_14802: number = 0;

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14802 = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_14802 = param1.readInteger();
        return true;
    }

    public get triggeringMessageId(): number {
        return this._SafeStr_14802;
    }
}
