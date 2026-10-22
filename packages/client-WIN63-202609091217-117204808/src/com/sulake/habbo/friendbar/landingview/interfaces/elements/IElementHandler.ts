import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';

export interface IElementHandler {
    initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void;
    refresh(): void;
}

export const IElementHandler = Symbol('com.sulake.habbo.friendbar.landingview.interfaces.elements::IElementHandler');
registerClassName(IElementHandler, 'com.sulake.habbo.friendbar.landingview.interfaces.elements::IElementHandler');

export function isIElementHandler(value: unknown): value is IElementHandler {
    return (value as { [IElementHandler]?: true } | null | undefined)?.[IElementHandler] === true;
}
