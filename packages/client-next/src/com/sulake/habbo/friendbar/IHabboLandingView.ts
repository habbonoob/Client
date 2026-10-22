import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';

export interface IHabboLandingView extends IUnknown {
    activate(): void;
    disable(): void;
}

export const IHabboLandingView = Symbol('com.sulake.habbo.friendbar::IHabboLandingView');
registerClassName(IHabboLandingView, 'com.sulake.habbo.friendbar::IHabboLandingView');

export function isIHabboLandingView(value: unknown): value is IHabboLandingView {
    return (value as { [IHabboLandingView]?: true } | null | undefined)?.[IHabboLandingView] === true;
}
