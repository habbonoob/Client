import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';

export interface IItemGrid {
    select(param1: IGridItem, param2: boolean): void;
    startDragAndDrop(param1: IGridItem): boolean;
    dispose(): void;
}
