import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export interface SubMenuController extends IDisposable {
    getIconPosition(param1: string): Rectangle;
    getIcon(param1: string): IWindow;
    getUnseenItemCounter(param1: string): IWindowContainer;
    setUnseenItemCount(param1: string, param2: number): void;
    toggleVisibility(): void;
    reposition(): void;
}
