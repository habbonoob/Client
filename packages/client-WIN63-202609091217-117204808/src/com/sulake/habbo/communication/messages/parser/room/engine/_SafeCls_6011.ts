import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class _SafeCls_6011 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::_SafeCls_6011'); }

    declare private _roomIndex: number;
    static { (this.prototype as any)._roomIndex = 0; }

    declare private _SafeStr_14156: number;
    static { (this.prototype as any)._SafeStr_14156 = 0; }

    constructor() {
    }

    public get roomIndex(): number {
        return this._roomIndex;
    }

    public get habbiconId(): number {
        return this._SafeStr_14156;
    }

    public flush(): boolean {
        this._roomIndex = 0;
        this._SafeStr_14156 = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomIndex = param1.readInteger();
        this._SafeStr_14156 = param1.readInteger();
        return true;
    }
}
