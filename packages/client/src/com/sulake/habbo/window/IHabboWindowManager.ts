import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IResourceManager } from '@/com/sulake/core/assets/IResourceManager';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { ICoreWindowManager } from '@/com/sulake/core/window/ICoreWindowManager';
import type { IInputEventTracker } from '@/com/sulake/core/window/IInputEventTracker';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IWindowContext } from '@/com/sulake/core/window/IWindowContext';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IAlertDialogWithLink } from '@/com/sulake/core/window/utils/IAlertDialogWithLink';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IHabboWindowManager extends IUnknown, ICoreWindowManager {
    get resourceManager(): IResourceManager;
    get assets(): IAssetLibrary;
    get habboPagesStyleSheet(): StyleSheet;
    createWindow(param1: string, param2?: string, param3?: number, param4?: number, param5?: number, param6?: Rectangle, param7?: (...args: any[]) => any, param8?: number, param9?: number, param10?: string): IWindow;
    removeWindow(param1: string, param2?: number): void;
    getWindowByName(param1: string, param2?: number): IWindow;
    getActiveWindow(param1?: number): IWindow;
    toggleFullScreen(): void;
    getWindowContext(param1: number): IWindowContext;
    alert(param1: string, param2: string, param3: number, param4: (...args: any[]) => any): IAlertDialog;
    alertWithModal(param1: string, param2: string, param3: number, param4: (...args: any[]) => any): IAlertDialog;
    alertWithLink(param1: string, param2: string, param3: string, param4: string, param5: number, param6: (...args: any[]) => any): IAlertDialogWithLink;
    registerLocalizationParameter(param1: string, param2: string, param3: string, param4?: string): void;
    addMouseEventTracker(param1: IInputEventTracker): void;
    removeMouseEventTracker(param1: IInputEventTracker): void;
    createUnseenItemCounter(): IWindowContainer;
    buildModalDialogFromXML(param1: XML): IModalDialog;
    simpleAlert(param1: string, param2: string, param3: string, param4?: string, param5?: string, param6?: UtilsMap, param7?: string, param8?: (...args: any[]) => any, param9?: (...args: any[]) => any): void;
    registerHintWindow(param1: string, param2: IWindow, param3?: number): void;
    unregisterHintWindow(param1: string): void;
    showHint(param1: string, param2?: Rectangle): void;
    hideHint(): void;
    displayFloorPlanEditor(): void;
    openHelpPage(param1: string): void;
    hideMatchingHint(param1: string): void;
}

export const IHabboWindowManager = Symbol('com.sulake.habbo.window::IHabboWindowManager');
registerClassName(IHabboWindowManager, 'com.sulake.habbo.window::IHabboWindowManager');

export function isIHabboWindowManager(value: unknown): value is IHabboWindowManager {
    return (value as { [IHabboWindowManager]?: true } | null | undefined)?.[IHabboWindowManager] === true;
}
