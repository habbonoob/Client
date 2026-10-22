import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export interface IHabboLocalizationManager extends ICoreLocalizationManager, IUnknown {
    loadDefaultEmbedLocalizations(param1: string, param2?: boolean): boolean;
    requestLocalizationInit(): void;
    getActiveEnvironmentId(): string;
    getExternalVariablesUrl(): string;
    getExternalVariablesHash(): string;
    getGameDataResourceUrl(param1: string): string;
    getGameDataResourceHash(param1: string): string;
    getLocalizationWithParams(param1: string, param2?: string, ...rest: any[]): string;
    getLocalizationWithParamMap(param1: string, param2?: string, param3?: UtilsMap): string;
    getAchievementName(param1: string): string;
    getAchievementDesc(param1: string, param2: number): string;
    getAchievementInstruction(param1: string): string;
    getBadgeBaseName(param1: string): string;
    getBadgeName(param1: string): string;
    getBadgeDesc(param1: string): string;
    setBadgePointLimit(param1: string, param2: number): void;
    getPreviousLevelBadgeId(param1: string): string;
}

export const IHabboLocalizationManager = Symbol('com.sulake.habbo.localization::IHabboLocalizationManager');
registerClassName(IHabboLocalizationManager, 'com.sulake.habbo.localization::IHabboLocalizationManager');

export function isIHabboLocalizationManager(value: unknown): value is IHabboLocalizationManager {
    return (value as { [IHabboLocalizationManager]?: true } | null | undefined)?.[IHabboLocalizationManager] === true;
}
