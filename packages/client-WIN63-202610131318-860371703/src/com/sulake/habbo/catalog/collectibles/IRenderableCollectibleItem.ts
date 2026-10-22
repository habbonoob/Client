import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';

export interface IRenderableCollectibleItem extends IProductDisplayInfo {
    get amount(): number;
}
