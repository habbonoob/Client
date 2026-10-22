import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IDisableAwareElement {
    disable(): void;
}

export const IDisableAwareElement = Symbol('com.sulake.habbo.friendbar.landingview.interfaces.elements::IDisableAwareElement');
registerClassName(IDisableAwareElement, 'com.sulake.habbo.friendbar.landingview.interfaces.elements::IDisableAwareElement');

export function isIDisableAwareElement(value: unknown): value is IDisableAwareElement {
    return (value as { [IDisableAwareElement]?: true } | null | undefined)?.[IDisableAwareElement] === true;
}
