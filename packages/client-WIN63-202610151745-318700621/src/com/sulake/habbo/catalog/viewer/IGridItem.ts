import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IItemGrid } from '@/com/sulake/habbo/catalog/viewer/IItemGrid';

export interface IGridItem extends IDisposable {
    get view(): IWindowContainer;
    set view(param1: IWindowContainer);
    set grid(param1: IItemGrid);
    setDraggable(param1: boolean): void;
    activate(): void;
    deactivate(): void;
}

export const IGridItem = Symbol('com.sulake.habbo.catalog.viewer::IGridItem');
registerClassName(IGridItem, 'com.sulake.habbo.catalog.viewer::IGridItem');

export function isIGridItem(value: unknown): value is IGridItem {
    return (value as { [IGridItem]?: true } | null | undefined)?.[IGridItem] === true;
}
