import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IConfigurationCodeAwareWidget {
    set configurationCode(param1: string);
}

export const IConfigurationCodeAwareWidget = Symbol('com.sulake.habbo.friendbar.landingview.interfaces::IConfigurationCodeAwareWidget');
registerClassName(IConfigurationCodeAwareWidget, 'com.sulake.habbo.friendbar.landingview.interfaces::IConfigurationCodeAwareWidget');

export function isIConfigurationCodeAwareWidget(value: unknown): value is IConfigurationCodeAwareWidget {
    return (value as { [IConfigurationCodeAwareWidget]?: true } | null | undefined)?.[IConfigurationCodeAwareWidget] === true;
}
