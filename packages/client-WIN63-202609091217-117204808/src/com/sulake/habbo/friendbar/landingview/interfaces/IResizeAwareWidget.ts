import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IResizeAwareWidget {
    windowResized(): void;
}

export const IResizeAwareWidget = Symbol('com.sulake.habbo.friendbar.landingview.interfaces::IResizeAwareWidget');
registerClassName(IResizeAwareWidget, 'com.sulake.habbo.friendbar.landingview.interfaces::IResizeAwareWidget');

export function isIResizeAwareWidget(value: unknown): value is IResizeAwareWidget {
    return (value as { [IResizeAwareWidget]?: true } | null | undefined)?.[IResizeAwareWidget] === true;
}
