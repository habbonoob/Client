import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';

export interface ISettingsAwareWidget {
    set settings(param1: CommonWidgetSettings);
}

export const ISettingsAwareWidget = Symbol('com.sulake.habbo.friendbar.landingview.interfaces::ISettingsAwareWidget');
registerClassName(ISettingsAwareWidget, 'com.sulake.habbo.friendbar.landingview.interfaces::ISettingsAwareWidget');

export function isISettingsAwareWidget(value: unknown): value is ISettingsAwareWidget {
    return (value as { [ISettingsAwareWidget]?: true } | null | undefined)?.[ISettingsAwareWidget] === true;
}
