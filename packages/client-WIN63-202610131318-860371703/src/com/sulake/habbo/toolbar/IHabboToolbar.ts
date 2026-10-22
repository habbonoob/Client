import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { Motion } from '@/com/sulake/core/window/motion/Motion';
import type { IExtensionView } from '@/com/sulake/habbo/toolbar/IExtensionView';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export interface IHabboToolbar extends IUnknown {
    get events(): IEventDispatcher;
    getIconLocation(param1: string): Rectangle;
    createTransitionToIcon(param1: string, param2: BitmapData, param3: number, param4: number): Motion;
    setToolbarState(param1: string): void;
    getToolbarState(): string;
    setIconBitmap(param1: string, param2: BitmapData): void;
    getRect(): Rectangle;
    get extensionView(): IExtensionView;
    setIconVisibility(param1: string, param2: boolean): void;
    toggleWindowVisibility(param1: string): void;
    set onDuty(param1: boolean);
    get toolBarAreaWidth(): number;
    getIcon(param1: string): IWindow;
    refreshPurseAreaIndicators(): void;
}

export const IHabboToolbar = Symbol('com.sulake.habbo.toolbar::IHabboToolbar');
registerClassName(IHabboToolbar, 'com.sulake.habbo.toolbar::IHabboToolbar');

export function isIHabboToolbar(value: unknown): value is IHabboToolbar {
    return (value as { [IHabboToolbar]?: true } | null | undefined)?.[IHabboToolbar] === true;
}
