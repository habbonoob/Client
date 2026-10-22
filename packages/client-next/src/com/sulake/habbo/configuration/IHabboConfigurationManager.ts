import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboConfigurationManager extends ICoreConfiguration {
    isInitialized(): boolean;
    updateEnvironmentId(param1: string): void;
    resetAll(): void;
    initConfigurationDownload(): void;
    get events(): IEventDispatcher;
}
