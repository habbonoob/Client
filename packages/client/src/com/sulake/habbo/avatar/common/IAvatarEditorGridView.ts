import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';

export interface IAvatarEditorGridView {
    get window(): IWindowContainer;
    dispose(): void;
    initFromList(param1: IAvatarEditorCategoryModel, param2: string): void;
    showPalettes(param1: number): void;
}
