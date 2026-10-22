import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetReceiver } from '@/com/sulake/core/assets/IAssetReceiver';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IResourceManager extends IDisposable {
    createAsset(param1: string, param2: any, param3: any): IAsset;
    retrieveAsset(param1: string, param2: IAssetReceiver): void;
    isSameAsset(param1: string, param2: string): boolean;
    removeAsset(param1: string): void;
}
