import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IProductDataListener extends IDisposable {
    productDataReady(): void;
}
