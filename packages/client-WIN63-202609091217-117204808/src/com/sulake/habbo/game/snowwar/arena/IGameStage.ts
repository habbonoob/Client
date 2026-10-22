import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { GameLevelData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLevelData';
import type { SynchronizedGameArena } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameArena';

export interface IGameStage extends IDisposable {
    initialize(param1: SynchronizedGameArena, param2: GameLevelData): void;
    get gameArena(): SynchronizedGameArena;
    get roomType(): string;
}
