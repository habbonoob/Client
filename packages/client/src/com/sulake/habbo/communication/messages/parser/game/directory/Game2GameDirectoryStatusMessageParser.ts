import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class Game2GameDirectoryStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.directory::Game2GameDirectoryStatusMessageParser'); }

    public static readonly _SafeStr_8648: number = 0;
    public static readonly _SafeStr_8297: number = 1;
    public static readonly _SafeStr_8166: number = 2;
    public static readonly _SafeStr_8768: number = 3;

    constructor() {
    }

    declare private _blockLength: number;
    static { (this.prototype as any)._blockLength = 0; }

    declare private _gamesPlayed: number;
    static { (this.prototype as any)._gamesPlayed = 0; }

    declare private _freeGamesLeft: number;
    static { (this.prototype as any)._freeGamesLeft = 0; }

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    public get status(): number {
        return this._status;
    }

    public get blockLength(): number {
        return this._blockLength;
    }

    public get gamesPlayed(): number {
        return this._gamesPlayed;
    }

    public get freeGamesLeft(): number {
        return this._freeGamesLeft;
    }

    public get hasUnlimitedGames(): boolean {
        return this._freeGamesLeft == -1;
    }

    public flush(): boolean {
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._status = param1.readInteger();
        this._blockLength = param1.readInteger();
        this._gamesPlayed = param1.readInteger();
        this._freeGamesLeft = param1.readInteger();
        return true;
    }
}
