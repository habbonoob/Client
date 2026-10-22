import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { GameLevelData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLevelData';
import type { IGameStage } from '@/com/sulake/habbo/game/snowwar/arena/IGameStage';
import type { SynchronizedGameArena } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameArena';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class DefaultGameStage implements IGameStage {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.arena::DefaultGameStage'); }

    constructor() {
    }

    declare protected _gameArena: SynchronizedGameArena;

    declare protected _SafeStr_5515: GameLevelData;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get gameArena(): SynchronizedGameArena {
        return this._gameArena;
    }

    public get gameLevelData(): GameLevelData {
        return this._SafeStr_5515;
    }

    public get roomType(): string {
        return "";
    }

    public dispose(): void {
        this._disposed = true;
        this._gameArena = null;
        this._SafeStr_5515 = null;
    }

    public initialize(param1: SynchronizedGameArena, param2: GameLevelData): void {
        this._gameArena = param1;
        this._SafeStr_5515 = param2;
    }

    get [IDisposable](): true {
        return true;
    }
}
