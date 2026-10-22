import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { GameLobbyData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLobbyData';

export class Game2GameStartedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.directory::Game2GameStartedMessageParser'); }

    constructor() {
    }

    declare private _lobbyData: GameLobbyData;

    public get lobbyData(): GameLobbyData {
        return this._lobbyData;
    }

    public flush(): boolean {
        this._lobbyData = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._lobbyData = new GameLobbyData(param1);
        return true;
    }
}
