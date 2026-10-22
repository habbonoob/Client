import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { ITabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/ITabPageDecorator';

export class OfficialTabPageDecorator implements ITabPageDecorator {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview.tabpagedecorators::OfficialTabPageDecorator'); }

    declare private _navigator: HabboNavigator;

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
    }

    public refreshCustomContent(param1: IWindowContainer): void {
    }

    public tabSelected(): void {
    }

    public refreshFooter(param1: IWindowContainer): void {
        this._navigator.officialRoomEntryManager.refreshAdFooter(param1);
    }

    public navigatorOpenedWhileInTab(): void {
        this._navigator.mainViewCtrl.startSearch(4, 11, "-1", 4);
    }

    public get filterCategory(): string {
        return null;
    }

    public setSubSelection(param1: number): void {
    }

    public processSearchParam(param1: string): string {
        return param1;
    }
}
