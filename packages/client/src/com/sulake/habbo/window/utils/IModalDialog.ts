import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IModalDialog extends IDisposable {
    get rootWindow(): IWindow;
    get background(): IBitmapWrapperWindow;
}
