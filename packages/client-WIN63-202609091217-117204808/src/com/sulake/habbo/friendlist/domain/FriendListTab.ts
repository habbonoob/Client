import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import type { ITabView } from '@/com/sulake/habbo/friendlist/ITabView';

export class FriendListTab {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.domain::FriendListTab'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _name: string;

    declare private _footerName: string;

    declare private _headerPicName: string;

    declare private _tabView: ITabView;

    declare private _SafeStr_4092: boolean;
    static { (this.prototype as any)._SafeStr_4092 = false; }

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    declare private _view: IWindowContainer;

    constructor(param1: HabboFriendList, param2: number, param3: ITabView, param4: string, param5: string, param6: string) {
        this._id = param2;
        this._name = param4;
        this._tabView = param3;
        this._footerName = param5;
        this._headerPicName = param6;
        this._tabView.init(param1);
    }

    public setSelected(param1: boolean): void {
        if (param1) {
            this._SafeStr_4092 = false;
        }
        this._selected = param1;
    }

    public setNewMessageArrived(param1: boolean): void {
        if (this.selected) {
            this._SafeStr_4092 = false;
        } else {
            this._SafeStr_4092 = param1;
        }
    }

    public get newMessageArrived(): boolean {
        return this._SafeStr_4092;
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get footerName(): string {
        return this._footerName;
    }

    public get headerPicName(): string {
        return this._headerPicName;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public get tabView(): ITabView {
        return this._tabView;
    }

    public get view(): IWindowContainer {
        return this._view;
    }

    public set view(param1: IWindowContainer) {
        this._view = param1;
    }
}
