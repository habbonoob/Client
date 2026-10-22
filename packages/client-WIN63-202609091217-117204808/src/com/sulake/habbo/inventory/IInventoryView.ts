import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IInventoryView extends IDisposable {
    getWindowContainer(): IWindowContainer;
}
