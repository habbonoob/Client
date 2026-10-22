import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { INotify } from '@/com/sulake/core/window/utils/INotify';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface ICoreWindowManager {
    create(param1: string, param2: number, param3: number, param4: number, param5: Rectangle, param6?: (...args: any[]) => any, param7?: string, param8?: number, param9?: any[], param10?: IWindow, param11?: any[], param12?: string): IWindow;
    destroy(param1: IWindow): void;
    buildFromXML(param1: XML, param2?: number, param3?: UtilsMap): IWindow;
    windowToXMLString(param1: IWindow): string;
    getDesktop(param1: number): IDesktopWindow;
    notify(param1: string, param2: string, param3: (...args: any[]) => any, param4?: number): INotify;
    confirm(param1: string, param2: string, param3: number, param4: (...args: any[]) => any): IConfirmDialog;
    confirmWithModal(param1: string, param2: string, param3: number, param4: (...args: any[]) => any): IConfirmDialog;
    findWindowByName(param1: string): IWindow;
    findWindowByTag(param1: string): IWindow;
    groupWindowsWithTag(param1: string, param2: any[], param3?: number): number;
}

export const ICoreWindowManager = Symbol('com.sulake.core.window::ICoreWindowManager');
registerClassName(ICoreWindowManager, 'com.sulake.core.window::ICoreWindowManager');

export function isICoreWindowManager(value: unknown): value is ICoreWindowManager {
    return (value as { [ICoreWindowManager]?: true } | null | undefined)?.[ICoreWindowManager] === true;
}
