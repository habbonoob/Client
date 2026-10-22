import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IContainerButtonWindow extends IInteractiveWindow, IWindowContainer {
}

export const IContainerButtonWindow = Symbol('com.sulake.core.window.components::IContainerButtonWindow');
registerClassName(IContainerButtonWindow, 'com.sulake.core.window.components::IContainerButtonWindow');

export function isIContainerButtonWindow(value: unknown): value is IContainerButtonWindow {
    return (value as { [IContainerButtonWindow]?: true } | null | undefined)?.[IContainerButtonWindow] === true;
}
