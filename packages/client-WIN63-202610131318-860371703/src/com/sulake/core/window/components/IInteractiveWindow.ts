import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IToolTipWindow } from '@/com/sulake/core/window/components/IToolTipWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IInteractiveWindow extends IWindow {
    set toolTipCaption(param1: string);
    get toolTipCaption(): string;
    set toolTipDelay(param1: number);
    get toolTipDelay(): number;
    set toolTipIsDynamic(param1: boolean);
    get toolTipIsDynamic(): boolean;
    get interactiveCursorDisabled(): boolean;
    set interactiveCursorDisabled(param1: boolean);
    showToolTip(param1: IToolTipWindow): void;
    hideToolTip(): void;
    setMouseCursorForState(param1: number, param2: number): number;
    getMouseCursorByState(param1: number): number;
}

export const IInteractiveWindow = Symbol('com.sulake.core.window.components::IInteractiveWindow');
registerClassName(IInteractiveWindow, 'com.sulake.core.window.components::IInteractiveWindow');

export function isIInteractiveWindow(value: unknown): value is IInteractiveWindow {
    return (value as { [IInteractiveWindow]?: true } | null | undefined)?.[IInteractiveWindow] === true;
}
