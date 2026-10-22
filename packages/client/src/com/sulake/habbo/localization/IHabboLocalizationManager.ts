import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export interface IHabboLocalizationManager extends ICoreLocalizationManager, IUnknown {
    loadDefaultEmbedLocalizations(environmentId: string, retryWithEnglish?: boolean): boolean;
    requestLocalizationInit(): void;
    getActiveEnvironmentId(): string;
    getExternalVariablesUrl(): string;
    getExternalVariablesHash(): string;
    getLocalizationWithParams(key: string, defaultValue?: string, ...rest: any[]): string;
    getLocalizationWithParamMap(key: string, defaultValue?: string, params?: UtilsMap): string;
    getAchievementName(badgeId: string): string;
    getAchievementDesc(badgeId: string, limit: number): string;
    getAchievementInstruction(badgeId: string): string;
    getBadgeBaseName(badgeId: string): string;
    getBadgeName(badgeId: string): string;
    getBadgeDesc(badgeId: string): string;
    setBadgePointLimit(badgeId: string, limit: number): void;
    getPreviousLevelBadgeId(badgeId: string): string;
}

export const IHabboLocalizationManager = Symbol('com.sulake.habbo.localization::IHabboLocalizationManager');
registerClassName(IHabboLocalizationManager, 'com.sulake.habbo.localization::IHabboLocalizationManager');

export function isIHabboLocalizationManager(value: unknown): value is IHabboLocalizationManager {
    return (value as { [IHabboLocalizationManager]?: true } | null | undefined)?.[IHabboLocalizationManager] === true;
}
