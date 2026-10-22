import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IGameStage } from '@/com/sulake/habbo/game/snowwar/arena/IGameStage';
import type { SynchronizedGameArena } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameArena';

export interface IGameArenaExtension extends IDisposable {
    createGameStage(): IGameStage;
    set gameArena(param1: SynchronizedGameArena);
    pulse(): void;
    getPulseInterval(): number;
    getNumberOfSubTurns(): number;
}
