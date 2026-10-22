import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class Game2GameResult {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::Game2GameResult'); }

    public static readonly _SafeStr_7941: number = 0;
    public static readonly _SafeStr_8252: number = 1;
    public static readonly _SafeStr_7953: number = 2;

    declare private _isDeathMatch: boolean;
    static { (this.prototype as any)._isDeathMatch = false; }

    declare private _resultType: number;
    static { (this.prototype as any)._resultType = 0; }

    declare private _winnerId: number;
    static { (this.prototype as any)._winnerId = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._isDeathMatch = param1.readBoolean();
        this._resultType = param1.readInteger();
        this._winnerId = param1.readInteger();
    }

    public get isDeathMatch(): boolean {
        return this._isDeathMatch;
    }

    public get resultType(): number {
        return this._resultType;
    }

    public get winnerId(): number {
        return this._winnerId;
    }
}
