import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface ITabPageDecorator {
    get filterCategory(): string;
    refreshCustomContent(param1: IWindowContainer): void;
    tabSelected(): void;
    navigatorOpenedWhileInTab(): void;
    refreshFooter(param1: IWindowContainer): void;
    setSubSelection(param1: number): void;
    processSearchParam(param1: string): string;
}
