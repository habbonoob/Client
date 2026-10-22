import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface ILocalizationDefinition {
    get id(): string;
    get languageCode(): string;
    get countryCode(): string;
    get encoding(): string;
    get name(): string;
    get url(): string;
}

export const ILocalizationDefinition = Symbol('com.sulake.core.localization::ILocalizationDefinition');
registerClassName(ILocalizationDefinition, 'com.sulake.core.localization::ILocalizationDefinition');

export function isILocalizationDefinition(value: unknown): value is ILocalizationDefinition {
    return (value as { [ILocalizationDefinition]?: true } | null | undefined)?.[ILocalizationDefinition] === true;
}
