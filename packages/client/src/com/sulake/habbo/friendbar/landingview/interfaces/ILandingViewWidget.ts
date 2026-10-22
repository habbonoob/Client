import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface ILandingViewWidget extends IDisposable {
    get container(): IWindow;
    initialize(): void;
    refresh(): void;
}
