import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { GameObjectsData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameObjectsData';
import { GameStatusData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameStatusData';

export class FullGameStatusData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::FullGameStatusData'); }

    declare private _remainingTimeSeconds: number;
    static { (this.prototype as any)._remainingTimeSeconds = 0; }

    declare private _durationInSeconds: number;
    static { (this.prototype as any)._durationInSeconds = 0; }

    declare private _gameObjects: GameObjectsData;

    declare private _numberOfTeams: number;
    static { (this.prototype as any)._numberOfTeams = 0; }

    declare private _gameStatus: GameStatusData;

    constructor(param1: IMessageDataWrapper) {
        this.parse(param1);
    }

    public get remainingTimeSeconds(): number {
        return this._remainingTimeSeconds;
    }

    public get durationInSeconds(): number {
        return this._durationInSeconds;
    }

    public get gameObjects(): GameObjectsData {
        return this._gameObjects;
    }

    public get numberOfTeams(): number {
        return this._numberOfTeams;
    }

    public get gameStatus(): GameStatusData {
        return this._gameStatus;
    }

    public parse(param1: IMessageDataWrapper): void {
        param1.readInteger();
        this._remainingTimeSeconds = param1.readInteger();
        this._durationInSeconds = param1.readInteger();
        this._gameObjects = new GameObjectsData(param1);
        param1.readInteger();
        this._numberOfTeams = param1.readInteger();
        this._gameStatus = new GameStatusData(param1);
    }
}
