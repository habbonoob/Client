import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { GameLobbyPlayerData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLobbyPlayerData';

export class Game2UserJoinedGameMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.directory::Game2UserJoinedGameMessageParser'); }

    declare private _user: GameLobbyPlayerData;

    declare private _wasTeamSwitched: boolean;
    static { (this.prototype as any)._wasTeamSwitched = false; }

    constructor() {
    }

    public flush(): boolean {
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._user = new GameLobbyPlayerData(param1);
        this._wasTeamSwitched = param1.readBoolean();
        return true;
    }

    public get user(): GameLobbyPlayerData {
        return this._user;
    }

    public get wasTeamSwitched(): boolean {
        return this._wasTeamSwitched;
    }
}
