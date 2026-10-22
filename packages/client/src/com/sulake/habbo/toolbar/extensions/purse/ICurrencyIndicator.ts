import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface ICurrencyIndicator {
    get window(): IWindowContainer;
    dispose(): void;
    registerUpdateEvents(param1: IEventDispatcher): void;
}
