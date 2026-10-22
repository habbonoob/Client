import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { CategoryData } from '@/com/sulake/habbo/avatar/common/CategoryData';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';

export interface IAvatarEditorCategoryModel {
    dispose(): void;
    reset(): void;
    get controller(): HabboAvatarEditor;
    getWindowContainer(): IWindow;
    switchCategory(param1?: string): void;
    getCategoryData(param1: string): CategoryData;
    selectPart(param1: string, param2: number): void;
    selectColor(param1: string, param2: number, param3: number): void;
    hasClubItemsOverLevel(param1: number): boolean;
    hasInvalidSellableItems(param1: IHabboInventory): boolean;
    stripClubItemsOverLevel(param1: number): boolean;
    stripInvalidSellableItems(): boolean;
}

export const IAvatarEditorCategoryModel = Symbol('com.sulake.habbo.avatar.common::IAvatarEditorCategoryModel');
registerClassName(IAvatarEditorCategoryModel, 'com.sulake.habbo.avatar.common::IAvatarEditorCategoryModel');

export function isIAvatarEditorCategoryModel(value: unknown): value is IAvatarEditorCategoryModel {
    return (value as { [IAvatarEditorCategoryModel]?: true } | null | undefined)?.[IAvatarEditorCategoryModel] === true;
}
