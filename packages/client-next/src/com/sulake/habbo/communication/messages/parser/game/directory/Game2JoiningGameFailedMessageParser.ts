import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class Game2JoiningGameFailedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.directory::Game2JoiningGameFailedMessageParser'); }

    public static readonly _SafeStr_8722: number = 1;
    public static readonly _SafeStr_8304: number = 2;
    public static readonly _SafeStr_8329: number = 3;
    public static readonly _SafeStr_7688: number = 4;
    public static readonly _SafeStr_8136: number = 5;
    public static readonly _SafeStr_8778: number = 6;
    public static readonly _SafeStr_7607: number = 7;
    public static readonly _SafeStr_8016: number = 8;

    declare private _reason: number;
    static { (this.prototype as any)._reason = 0; }

    constructor() {
    }

    public get reason(): number {
        return this._reason;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._reason = param1.readInteger();
        return true;
    }
}
