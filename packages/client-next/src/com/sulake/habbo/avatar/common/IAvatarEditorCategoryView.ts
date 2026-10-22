import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IAvatarEditorCategoryView {
    dispose(): void;
    init(): void;
    reset(): void;
    getWindowContainer(): IWindowContainer;
    switchCategory(param1: string): void;
    showPalettes(param1: string, param2: number): void;
}
