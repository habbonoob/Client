import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class Game2StageLoadMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.arena::Game2StageLoadMessageParser'); }

    constructor() {
    }

    declare private _gameType: number;
    static { (this.prototype as any)._gameType = 0; }

    public get gameType(): number {
        return this._gameType;
    }

    public flush(): boolean {
        this._gameType = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._gameType = param1.readInteger();
        return true;
    }
}
