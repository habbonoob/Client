import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Game2PlayerData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2PlayerData';

export class Game2ArenaEnteredMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.arena::Game2ArenaEnteredMessageParser'); }

    constructor() {
    }

    declare private _player: Game2PlayerData;

    public get player(): Game2PlayerData {
        return this._player;
    }

    public flush(): boolean {
        if (this._player) {
            this._player.dispose();
            this._player = null;
        }
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._player = new Game2PlayerData();
        this._player.parse(param1);
        return true;
    }
}
