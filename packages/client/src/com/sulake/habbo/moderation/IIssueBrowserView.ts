import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IIssueBrowserView {
    set visible(param1: boolean);
    get view(): IWindowContainer;
    update(): void;
}
