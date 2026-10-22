import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface ILandingViewWidget extends IDisposable {
    initialize(): void;
    refresh(): void;
    get container(): IWindow;
}
