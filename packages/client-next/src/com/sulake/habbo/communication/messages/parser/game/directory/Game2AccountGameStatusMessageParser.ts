import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class Game2AccountGameStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.directory::Game2AccountGameStatusMessageParser'); }

    declare private _gameTypeId: number;
    static { (this.prototype as any)._gameTypeId = 0; }

    declare private _freeGamesLeft: number;
    static { (this.prototype as any)._freeGamesLeft = 0; }

    declare private _gamesPlayedTotal: number;
    static { (this.prototype as any)._gamesPlayedTotal = 0; }

    constructor() {
    }

    public get gameTypeId(): number {
        return this._gameTypeId;
    }

    public get freeGamesLeft(): number {
        return this._freeGamesLeft;
    }

    public get gamesPlayedTotal(): number {
        return this._gamesPlayedTotal;
    }

    public get hasUnlimitedGames(): boolean {
        return this._freeGamesLeft == -1;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._gameTypeId = param1.readInteger();
        this._freeGamesLeft = param1.readInteger();
        this._gamesPlayedTotal = param1.readInteger();
        return true;
    }
}
