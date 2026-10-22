import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IFloatingElement {
    isFloating(param1: boolean): boolean;
}

export const IFloatingElement = Symbol('com.sulake.habbo.friendbar.landingview.interfaces.elements::IFloatingElement');
registerClassName(IFloatingElement, 'com.sulake.habbo.friendbar.landingview.interfaces.elements::IFloatingElement');

export function isIFloatingElement(value: unknown): value is IFloatingElement {
    return (value as { [IFloatingElement]?: true } | null | undefined)?.[IFloatingElement] === true;
}
