import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IInputEventTracker } from '@/com/sulake/core/window/IInputEventTracker';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IInternalWindowServices } from '@/com/sulake/core/window/services/IInternalWindowServices';
import type { IWindowParser } from '@/com/sulake/core/window/utils/IWindowParser';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export interface IWindowContext {
    getWindowServices(): IInternalWindowServices;
    getWindowParser(): IWindowParser;
    getDesktopWindow(): IDesktopWindow;
    registerLocalizationListener(param1: string, param2: IWindow): void;
    removeLocalizationListener(param1: string, param2: IWindow): void;
    findWindowByName(param1: string): IWindow;
    findWindowByTag(param1: string): IWindow;
    groupChildrenWithTag(param1: string, param2: any[], param3?: number): number;
    create(param1: string, param2: string, param3: number, param4: number, param5: number, param6: Rectangle, param7: (...args: any[]) => any, param8: IWindow, param9: number, param10?: any[], param11?: string, param12?: any[]): IWindow;
    destroy(param1: IWindow): boolean;
    invalidate(param1: IWindow, param2: Rectangle, param3: number): void;
    getLastError(): Error;
    getLastErrorCode(): number;
    flushError(): void;
    addMouseEventTracker(param1: IInputEventTracker): void;
    removeMouseEventTracker(param1: IInputEventTracker): void;
}

export const IWindowContext = Symbol('com.sulake.core.window::IWindowContext');
registerClassName(IWindowContext, 'com.sulake.core.window::IWindowContext');

export function isIWindowContext(value: unknown): value is IWindowContext {
    return (value as { [IWindowContext]?: true } | null | undefined)?.[IWindowContext] === true;
}
