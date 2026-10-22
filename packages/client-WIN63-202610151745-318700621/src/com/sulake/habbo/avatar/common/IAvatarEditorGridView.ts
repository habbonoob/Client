import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';

export interface IAvatarEditorGridView {
    dispose(): void;
    get window(): IWindowContainer;
    initFromList(param1: IAvatarEditorCategoryModel, param2: string): void;
    showPalettes(param1: number): void;
}
