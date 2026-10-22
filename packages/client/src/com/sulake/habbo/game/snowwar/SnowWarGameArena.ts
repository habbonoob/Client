import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGameArenaExtension } from '@/com/sulake/habbo/game/snowwar/arena/IGameArenaExtension';
import type { IGameStage } from '@/com/sulake/habbo/game/snowwar/arena/IGameStage';
import type { SynchronizedGameArena } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameArena';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { SnowWarGameStage } from '@/com/sulake/habbo/game/HabboGameManager.group';

export class SnowWarGameArena implements IGameArenaExtension {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar::SnowWarGameArena'); }

    constructor() {
    }

    declare private _gameArena: SynchronizedGameArena;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public set gameArena(param1: SynchronizedGameArena) {
        this._gameArena = param1;
    }

    public dispose(): void {
        this._disposed = true;
        this._gameArena = null;
    }

    public getPulseInterval(): number {
        return 50;
    }

    public getNumberOfSubTurns(): number {
        return 3;
    }

    public createGameStage(): IGameStage {
        return new SnowWarGameStage();
    }

    public pulse(): void {
    }

    public isDeathMatch(): boolean {
        return this._gameArena.numberOfTeams == 1;
    }

    get [IDisposable](): true {
        return true;
    }
}
