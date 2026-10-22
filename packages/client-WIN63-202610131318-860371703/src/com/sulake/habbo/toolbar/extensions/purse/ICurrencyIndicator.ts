import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface ICurrencyIndicator {
    dispose(): void;
    get window(): IWindowContainer;
    registerUpdateEvents(param1: IEventDispatcher): void;
}
