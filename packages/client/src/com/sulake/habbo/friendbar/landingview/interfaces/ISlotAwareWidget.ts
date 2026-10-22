import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface ISlotAwareWidget {
    set slot(param1: number);
}

export const ISlotAwareWidget = Symbol('com.sulake.habbo.friendbar.landingview.interfaces::ISlotAwareWidget');
registerClassName(ISlotAwareWidget, 'com.sulake.habbo.friendbar.landingview.interfaces::ISlotAwareWidget');

export function isISlotAwareWidget(value: unknown): value is ISlotAwareWidget {
    return (value as { [ISlotAwareWidget]?: true } | null | undefined)?.[ISlotAwareWidget] === true;
}
