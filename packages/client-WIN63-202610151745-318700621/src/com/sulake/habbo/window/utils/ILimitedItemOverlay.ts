import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface ILimitedItemOverlay extends IDisposable {
    get window(): IWindowContainer;
    set serialNumber(param1: number);
    set seriesSize(param1: number);
}
