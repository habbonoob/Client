import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class Game2GameRejoinMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.arena::Game2GameRejoinMessageParser'); }

    constructor() {
    }

    declare private _roomBeforeGame: number;
    static { (this.prototype as any)._roomBeforeGame = 0; }

    public get roomBeforeGame(): number {
        return this._roomBeforeGame;
    }

    public flush(): boolean {
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomBeforeGame = param1.readInteger();
        return true;
    }
}
