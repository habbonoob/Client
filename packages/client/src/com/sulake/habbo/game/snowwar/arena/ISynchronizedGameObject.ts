import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IGameObject } from '@/com/sulake/habbo/game/snowwar/arena/IGameObject';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';

export interface ISynchronizedGameObject extends IGameObject, IDisposable {
    get isActive(): boolean;
    set isActive(param1: boolean);
    get numberOfVariables(): number;
    getVariable(param1: number): number;
    subturn(param1: SynchronizedGameStage): void;
    onRemove(): void;
}

export const ISynchronizedGameObject = Symbol('com.sulake.habbo.game.snowwar.arena::ISynchronizedGameObject');
registerClassName(ISynchronizedGameObject, 'com.sulake.habbo.game.snowwar.arena::ISynchronizedGameObject');

export function isISynchronizedGameObject(value: unknown): value is ISynchronizedGameObject {
    return (value as { [ISynchronizedGameObject]?: true } | null | undefined)?.[ISynchronizedGameObject] === true;
}
