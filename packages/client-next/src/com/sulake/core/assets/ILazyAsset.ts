import type { IAsset } from '@/com/sulake/core/assets/IAsset';

export interface ILazyAsset extends IAsset {
    prepareLazyContent(): void;
}
