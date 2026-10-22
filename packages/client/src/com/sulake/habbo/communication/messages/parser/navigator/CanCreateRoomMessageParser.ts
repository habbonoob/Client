import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CanCreateRoomMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::CanCreateRoomMessageParser'); }

    public static readonly _SafeStr_7618: number = 0;
    public static readonly _SafeStr_8712: number = 1;

    constructor() {
    }

    declare private _resultCode: number;
    static { (this.prototype as any)._resultCode = 0; }

    declare private _roomLimit: number;
    static { (this.prototype as any)._roomLimit = 0; }

    public get resultCode(): number {
        return this._resultCode;
    }

    public get roomLimit(): number {
        return this._roomLimit;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._resultCode = param1.readInteger();
        this._roomLimit = param1.readInteger();
        return true;
    }
}
