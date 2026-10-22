import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface ILocalization {
    get isInitialized(): boolean;
    get value(): string;
    get raw(): string;
}

export const ILocalization = Symbol('com.sulake.core.localization::ILocalization');
registerClassName(ILocalization, 'com.sulake.core.localization::ILocalization');

export function isILocalization(value: unknown): value is ILocalization {
    return (value as { [ILocalization]?: true } | null | undefined)?.[ILocalization] === true;
}
