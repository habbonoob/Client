import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IWiredChestController extends IDisposable {
    open(param1: number): void;
    close(): void;
}
