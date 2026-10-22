import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IInputProcessorRoot extends IWindow {
    process(param1: WindowEvent): boolean;
}

export const IInputProcessorRoot = Symbol('com.sulake.core.window.utils::IInputProcessorRoot');
registerClassName(IInputProcessorRoot, 'com.sulake.core.window.utils::IInputProcessorRoot');

export function isIInputProcessorRoot(value: unknown): value is IInputProcessorRoot {
    return (value as { [IInputProcessorRoot]?: true } | null | undefined)?.[IInputProcessorRoot] === true;
}
