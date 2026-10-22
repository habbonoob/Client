import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { GameLobbyData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLobbyData';

export class Game2GameCreatedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.directory::Game2GameCreatedMessageParser'); }

    declare private _gameLobbyData: GameLobbyData;

    constructor() {
    }

    public flush(): boolean {
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._gameLobbyData = new GameLobbyData(param1);
        return true;
    }

    public get gameLobbyData(): GameLobbyData {
        return this._gameLobbyData;
    }
}
