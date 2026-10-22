import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IViewCtrl {
    get content(): IWindowContainer;
    set content(param1: IWindowContainer);
    refresh(): void;
}
