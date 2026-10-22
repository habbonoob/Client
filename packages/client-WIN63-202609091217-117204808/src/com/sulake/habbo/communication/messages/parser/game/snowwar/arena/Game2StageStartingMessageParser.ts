import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { GameObjectsData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameObjectsData';

export class Game2StageStartingMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.arena::Game2StageStartingMessageParser'); }

    declare private _gameObjects: GameObjectsData;

    declare private _gameType: number;
    static { (this.prototype as any)._gameType = 0; }

    declare private _roomType: string;

    declare private _countDown: number;
    static { (this.prototype as any)._countDown = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._gameType = param1.readInteger();
        this._roomType = param1.readString();
        this._countDown = param1.readInteger();
        this._gameObjects = new GameObjectsData(param1);
        return true;
    }

    public get gameObjects(): GameObjectsData {
        return this._gameObjects;
    }

    public get gameType(): number {
        return this._gameType;
    }

    public get roomType(): string {
        return this._roomType;
    }

    public get countDown(): number {
        return this._countDown;
    }
}
