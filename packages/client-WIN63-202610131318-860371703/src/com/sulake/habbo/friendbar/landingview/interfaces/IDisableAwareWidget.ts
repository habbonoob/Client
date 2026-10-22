import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IDisableAwareWidget {
    disable(): void;
}

export const IDisableAwareWidget = Symbol('com.sulake.habbo.friendbar.landingview.interfaces::IDisableAwareWidget');
registerClassName(IDisableAwareWidget, 'com.sulake.habbo.friendbar.landingview.interfaces::IDisableAwareWidget');

export function isIDisableAwareWidget(value: unknown): value is IDisableAwareWidget {
    return (value as { [IDisableAwareWidget]?: true } | null | undefined)?.[IDisableAwareWidget] === true;
}
