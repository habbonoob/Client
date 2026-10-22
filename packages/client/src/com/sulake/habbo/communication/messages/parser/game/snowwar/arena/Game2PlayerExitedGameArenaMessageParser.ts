import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class Game2PlayerExitedGameArenaMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.arena::Game2PlayerExitedGameArenaMessageParser'); }

    constructor() {
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _playerGameObjectId: number;
    static { (this.prototype as any)._playerGameObjectId = 0; }

    public get userId(): number {
        return this._userId;
    }

    public get playerGameObjectId(): number {
        return this._playerGameObjectId;
    }

    public flush(): boolean {
        this._userId = NaN | 0;
        this._playerGameObjectId = NaN | 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._userId = param1.readInteger();
        this._playerGameObjectId = param1.readInteger();
        return true;
    }
}
