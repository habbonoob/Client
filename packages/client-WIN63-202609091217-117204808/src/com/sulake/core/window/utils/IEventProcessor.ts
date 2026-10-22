import type { EventProcessorState } from '@/com/sulake/core/window/utils/EventProcessorState';
import type { IEventQueue } from '@/com/sulake/core/window/utils/IEventQueue';

export interface IEventProcessor {
    process(param1: EventProcessorState, param2: IEventQueue): void;
}
