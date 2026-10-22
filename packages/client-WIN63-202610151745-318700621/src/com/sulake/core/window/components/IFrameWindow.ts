import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICloseButtonWindow } from '@/com/sulake/core/window/components/ICloseButtonWindow';
import type { IHeaderWindow } from '@/com/sulake/core/window/components/IHeaderWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { IScalerWindow } from '@/com/sulake/core/window/components/IScalerWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IMargins } from '@/com/sulake/core/window/utils/IMargins';

export interface IFrameWindow extends IWindowContainer {
    get title(): ILabelWindow;
    get header(): IHeaderWindow;
    get content(): IWindowContainer;
    get margins(): IMargins;
    get scaler(): IScalerWindow;
    resizeToFitContent(): void;
    set helpButtonAction(param1: (...args: any[]) => any);
    get helpPage(): string;
    set helpPage(param1: string);
    get menuButton(): ICloseButtonWindow;
    get menuButtonVisible(): boolean;
    set menuButtonVisible(param1: boolean);
}

export const IFrameWindow = Symbol('com.sulake.core.window.components::IFrameWindow');
registerClassName(IFrameWindow, 'com.sulake.core.window.components::IFrameWindow');

export function isIFrameWindow(value: unknown): value is IFrameWindow {
    return (value as { [IFrameWindow]?: true } | null | undefined)?.[IFrameWindow] === true;
}
