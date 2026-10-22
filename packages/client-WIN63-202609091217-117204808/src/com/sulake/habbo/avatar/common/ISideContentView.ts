import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface ISideContentView {
    dispose(): void;
    getWindowContainer(): IWindowContainer;
}
