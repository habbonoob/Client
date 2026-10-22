import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';

export interface ISynchronizedGameEvent extends IDisposable {
    apply(param1: SynchronizedGameStage): void;
}

export const ISynchronizedGameEvent = Symbol('com.sulake.habbo.game.snowwar.arena::ISynchronizedGameEvent');
registerClassName(ISynchronizedGameEvent, 'com.sulake.habbo.game.snowwar.arena::ISynchronizedGameEvent');

export function isISynchronizedGameEvent(value: unknown): value is ISynchronizedGameEvent {
    return (value as { [ISynchronizedGameEvent]?: true } | null | undefined)?.[ISynchronizedGameEvent] === true;
}
