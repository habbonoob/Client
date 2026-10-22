import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface ILayoutNameProvider {
    get layoutName(): string;
}

export const ILayoutNameProvider = Symbol('com.sulake.habbo.friendbar.landingview.interfaces.elements::ILayoutNameProvider');
registerClassName(ILayoutNameProvider, 'com.sulake.habbo.friendbar.landingview.interfaces.elements::ILayoutNameProvider');

export function isILayoutNameProvider(value: unknown): value is ILayoutNameProvider {
    return (value as { [ILayoutNameProvider]?: true } | null | undefined)?.[ILayoutNameProvider] === true;
}
