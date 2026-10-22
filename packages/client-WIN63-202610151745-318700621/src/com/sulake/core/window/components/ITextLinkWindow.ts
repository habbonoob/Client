import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';

export interface ITextLinkWindow extends ITextWindow, IInteractiveWindow {
}

export const ITextLinkWindow = Symbol('com.sulake.core.window.components::ITextLinkWindow');
registerClassName(ITextLinkWindow, 'com.sulake.core.window.components::ITextLinkWindow');

export function isITextLinkWindow(value: unknown): value is ITextLinkWindow {
    return (value as { [ITextLinkWindow]?: true } | null | undefined)?.[ITextLinkWindow] === true;
}
