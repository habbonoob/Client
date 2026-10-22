import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import type { IScrollableWindow } from '@/com/sulake/core/window/components/IScrollableWindow';

export interface IScrollbarWindow extends IInteractiveWindow {
    get scrollH(): number;
    set scrollH(param1: number);
    get scrollV(): number;
    set scrollV(param1: number);
    get scrollable(): IScrollableWindow;
    set scrollable(param1: IScrollableWindow);
    get vertical(): boolean;
    get horizontal(): boolean;
}

export const IScrollbarWindow = Symbol('com.sulake.core.window.components::IScrollbarWindow');
registerClassName(IScrollbarWindow, 'com.sulake.core.window.components::IScrollbarWindow');

export function isIScrollbarWindow(value: unknown): value is IScrollbarWindow {
    return (value as { [IScrollbarWindow]?: true } | null | undefined)?.[IScrollbarWindow] === true;
}
