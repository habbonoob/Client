import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IViewCtrl {
    refresh(): void;
    set content(param1: IWindowContainer);
    get content(): IWindowContainer;
}
