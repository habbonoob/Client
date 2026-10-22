import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IFocusWindow } from '@/com/sulake/core/window/components/IFocusWindow';

export interface IFocusManagerService extends IDisposable {
    registerFocusWindow(param1: IFocusWindow): void;
    removeFocusWindow(param1: IFocusWindow): void;
}
