import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IInventoryModel extends IDisposable {
    getWindowContainer(): IWindowContainer;
    requestInitialization(): void;
    categorySwitch(param1: string): void;
    subCategorySwitch(param1: string): void;
    closingInventoryView(): void;
    updateView(): void;
    selectItemById(param1: string): void;
}

export const IInventoryModel = Symbol('com.sulake.habbo.inventory::IInventoryModel');
registerClassName(IInventoryModel, 'com.sulake.habbo.inventory::IInventoryModel');

export function isIInventoryModel(value: unknown): value is IInventoryModel {
    return (value as { [IInventoryModel]?: true } | null | undefined)?.[IInventoryModel] === true;
}
