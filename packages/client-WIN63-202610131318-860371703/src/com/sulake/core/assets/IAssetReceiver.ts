import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IAssetReceiver extends IDisposable {
    receiveAsset(param1: IAsset, param2: string): void;
}
