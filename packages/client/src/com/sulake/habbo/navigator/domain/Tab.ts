import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { ITabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/ITabPageDecorator';

export class Tab {
    static { registerClassName(this, 'com.sulake.habbo.navigator.domain::Tab'); }

    constructor(param1: HabboNavigator, param2: number, param3: number, param4: ITabPageDecorator, param5: number = 1) {
        this._navigator = param1;
        this._id = param2;
        this._defaultSearchType = param3;
        this._tabPageDecorator = param4;
        this._searchMsg = param5;
    }

    declare private _navigator: HabboNavigator;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _defaultSearchType: number;
    static { (this.prototype as any)._defaultSearchType = 0; }

    declare private _tabPageDecorator: ITabPageDecorator;

    declare private _button: ITabButtonWindow;

    public get button(): ITabButtonWindow {
        return this._button;
    }

    public set button(param1: ITabButtonWindow) {
        this._button = param1;
    }

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(param1: boolean) {
        this._selected = param1;
    }

    declare private _searchMsg: number;
    static { (this.prototype as any)._searchMsg = 0; }

    public get searchMsg(): number {
        return this._searchMsg;
    }

    public get id(): number {
        return this._id;
    }

    public get defaultSearchType(): number {
        return this._defaultSearchType;
    }

    public get tabPageDecorator(): ITabPageDecorator {
        return this._tabPageDecorator;
    }

    public sendSearchRequest(): void {
        let _loc1_: boolean = this._navigator.context.configuration.getBoolean("navigator.2014.personalized.navigator");
        if (_loc1_ && this.id == 2) {
            this._defaultSearchType = 22;
        }
        this._navigator.mainViewCtrl.startSearch(this._id, this._defaultSearchType, "-1", this._searchMsg);
    }
}
