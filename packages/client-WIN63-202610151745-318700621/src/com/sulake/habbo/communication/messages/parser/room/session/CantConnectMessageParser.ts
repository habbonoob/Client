import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CantConnectMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.session::CantConnectMessageParser'); }

    public static readonly _SafeStr_8212: number = 1;
    public static readonly _SafeStr_7660: number = 2;
    public static readonly _SafeStr_8272: number = 3;
    public static readonly _SafeStr_7725: number = 4;
    public static readonly _SafeStr_7875: number = 5;
    private _reason: number = 0;
    private _parameter: string = "";

    constructor() {
    }

    public flush(): boolean {
        this._reason = 0;
        this._parameter = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._reason = param1.readInteger();
        if (this._reason == 3) {
            this._parameter = param1.readString();
        } else {
            this._parameter = "";
        }
        return true;
    }

    public get reason(): number {
        return this._reason;
    }

    public get parameter(): string {
        return this._parameter;
    }
}
