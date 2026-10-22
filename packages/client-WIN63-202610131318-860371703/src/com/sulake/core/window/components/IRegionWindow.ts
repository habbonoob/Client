import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IRegionWindow extends IWindowContainer, IInteractiveWindow {
}

export const IRegionWindow = Symbol('com.sulake.core.window.components::IRegionWindow');
registerClassName(IRegionWindow, 'com.sulake.core.window.components::IRegionWindow');

export function isIRegionWindow(value: unknown): value is IRegionWindow {
    return (value as { [IRegionWindow]?: true } | null | undefined)?.[IRegionWindow] === true;
}
