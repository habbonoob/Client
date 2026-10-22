import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface INativeApplicationProxy extends IEventDispatcher {
    dispose(): void;
    allowBackgroundExecution(param1: boolean): void;
}
