import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class _SafeCls_6055 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.raidprotection::_SafeCls_6055'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _SafeStr_14836: boolean;
    static { (this.prototype as any)._SafeStr_14836 = false; }

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomId = param1.readInteger();
        this._SafeStr_14836 = param1.readBoolean();
        return true;
    }

    public flush(): boolean {
        this._roomId = 0;
        this._SafeStr_14836 = false;
        return true;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get canManage(): boolean {
        return this._SafeStr_14836;
    }
}
