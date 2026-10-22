import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';

export interface ICollectorHub {
    itemAddedToInventory(param1: number, param2: number, param3: boolean): void;
    itemRemovedFromInventory(param1: number, param2: number, param3: boolean): void;
    getProductName(param1: IProductDisplayInfo): string;
    getProductType(param1: IProductDisplayInfo): string;
}
