import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class Game2EnterArenaFailedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.arena::Game2EnterArenaFailedMessageParser'); }

    public static readonly _SafeStr_8756: number = 1;
    public static readonly _SafeStr_8313: number = 2;
    public static readonly _SafeStr_8725: number = 3;
    public static readonly _SafeStr_8548: number = 4;

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
