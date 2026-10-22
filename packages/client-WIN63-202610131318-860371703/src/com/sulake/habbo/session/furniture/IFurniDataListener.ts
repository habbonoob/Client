import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IFurniDataListener extends IDisposable {
    furniDataReady(): void;
}
