import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface ILocalizable {
    set localization(param1: string);
}

export const ILocalizable = Symbol('com.sulake.core.localization::ILocalizable');
registerClassName(ILocalizable, 'com.sulake.core.localization::ILocalizable');

export function isILocalizable(value: unknown): value is ILocalizable {
    return (value as { [ILocalizable]?: true } | null | undefined)?.[ILocalizable] === true;
}
