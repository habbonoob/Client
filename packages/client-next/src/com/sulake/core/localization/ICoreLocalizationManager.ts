import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGameDataResources } from '@/com/sulake/core/localization/IGameDataResources';
import type { ILocalizable } from '@/com/sulake/core/localization/ILocalizable';
import type { ILocalization } from '@/com/sulake/core/localization/ILocalization';
import type { ILocalizationDefinition } from '@/com/sulake/core/localization/ILocalizationDefinition';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export interface ICoreLocalizationManager extends IUnknown {
    registerListener(param1: string, param2: ILocalizable): boolean;
    removeListener(param1: string, param2: ILocalizable): boolean;
    loadLocalizationFromURL(param1: string, param2: string, param3?: boolean): void;
    hasLocalization(param1: string): boolean;
    getLocalization(param1: string, param2?: string): string;
    getProperty(param1: string, param2?: Map<any, any>): string;
    updateLocalization(param1: string, param2: string): void;
    registerParameter(param1: string, param2: string, param3: string, param4?: string): string;
    getLocalizationRaw(param1: string): ILocalization;
    getKeys(): any[];
    registerLocalizationDefinition(param1: string, param2: string, param3: string, param4: string): void;
    activateLocalizationDefinition(param1: string): boolean;
    getLocalizationDefinitions(): UtilsMap;
    getLocalizationDefinition(param1: string): ILocalizationDefinition;
    getActiveLocalizationDefinition(): ILocalizationDefinition;
    printNonExistingKeys(): void;
    getGameDataResources(): IGameDataResources;
    interpolate(param1: string): string;
}

export const ICoreLocalizationManager = Symbol('com.sulake.core.localization::ICoreLocalizationManager');
registerClassName(ICoreLocalizationManager, 'com.sulake.core.localization::ICoreLocalizationManager');

export function isICoreLocalizationManager(value: unknown): value is ICoreLocalizationManager {
    return (value as { [ICoreLocalizationManager]?: true } | null | undefined)?.[ICoreLocalizationManager] === true;
}
