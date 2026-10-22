import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { ITabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/ITabPageDecorator';

export class CategoriesTabPageDecorator implements ITabPageDecorator {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview.tabpagedecorators::CategoriesTabPageDecorator'); }

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: HabboNavigator;

    public get filterCategory(): string {
        return null;
    }

    public refreshCustomContent(param1: IWindowContainer): void {
    }

    public tabSelected(): void {
    }

    public navigatorOpenedWhileInTab(): void {
        this._navigator.mainViewCtrl.startSearch(6, 21);
    }

    public refreshFooter(param1: IWindowContainer): void {
    }

    public setSubSelection(param1: number): void {
    }

    public processSearchParam(param1: string): string {
        return "";
    }
}
