import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { Friend } from '@/com/sulake/habbo/friendlist/domain/Friend';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class FriendCategory implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.domain::FriendCategory'); }

    public static readonly PAGE_SIZE: number = 100;
    public static readonly CATID_ONLINE: number = 0;
    public static readonly CATID_OFFLINE: number = -1;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _name: string;

    declare private _open: boolean;
    static { (this.prototype as any)._open = false; }

    private _friends: UtilsMap = new UtilsMap();
    private _SafeStr_3034: UtilsMap = null;

    declare private _SafeStr_7263: boolean;
    static { (this.prototype as any)._SafeStr_7263 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _view: IWindowContainer;

    declare private _pageIndex: number;
    static { (this.prototype as any)._pageIndex = 0; }

    private _filter: string = "";

    constructor(param1: number, param2: string) {
        this._id = param1;
        this._name = param2;
        this._open = this._id != -1;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._view = null;
    }

    public addFriend(param1: Friend): void {
        this.removeFriend(param1.id);
        this._friends.add(param1.id, param1);
        if (this._SafeStr_3034 != null && this.acceptFilter(param1)) {
            this._SafeStr_3034.add(param1.id, param1);
        }
    }

    public sort(): void {
        let _loc2_: any[] = this._friends.getValues();
        _loc2_.sort((a, b) => (String(a.name).toLowerCase() < String(b.name).toLowerCase() ? -1 : String(a.name).toLowerCase() > String(b.name).toLowerCase() ? 1 : 0));
        this._friends = new UtilsMap();
        for (const _loc1_ of _loc2_ ?? []) {
            this._friends.add(_loc1_.id, _loc1_);
        }
        this.updateFilteredFriends();
    }

    public getSelectedFriends(param1: any[]): void {
        for (const _loc2_ of this._friends.getValues() ?? []) {
            if (_loc2_.selected) {
                param1.push(_loc2_);
            }
        }
    }

    public getFriendCount(param1: boolean, param2: boolean = false): number {
        if (!param1 && !param2) {
            return this._friends.length | 0;
        }
        let _loc3_: number = 0;
        for (const _loc4_ of this._friends.getValues() ?? []) {
            if ((!param1 || _loc4_.online) && (!param2 || _loc4_.followingAllowed)) {
                _loc3_ += 1;
            }
        }
        return _loc3_;
    }

    public removeFriend(param1: number): Friend {
        let _loc2_: Friend = this._friends.remove(param1);
        if (_loc2_ == null) {
            return null;
        }
        if (this._SafeStr_3034 != null && this.acceptFilter(_loc2_)) {
            this._SafeStr_3034.remove(param1);
        }
        return _loc2_;
    }

    private checkPageIndex(): void {
        if (this._pageIndex >= this.getPageCount()) {
            this._pageIndex = Math.max(0, this.getPageCount() - 1) | 0;
        }
    }

    public getPageCount(): number {
        return Math.ceil(this.filteredFriends.length / 100) | 0;
    }

    public getStartFriendIndex(): number {
        this.checkPageIndex();
        return this._pageIndex * 100;
    }

    public getEndFriendIndex(): number {
        this.checkPageIndex();
        return Math.min((this._pageIndex + 1) * 100, this.filteredFriends.length) | 0;
    }

    public setOpen(param1: boolean): void {
        this._open = param1;
        if (!param1) {
            for (const _loc2_ of this._friends.getValues() ?? []) {
                _loc2_.selected = false;
            }
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get received(): boolean {
        return this._SafeStr_7263;
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get friends(): any[] {
        return this._friends.getValues();
    }

    public get view(): IWindowContainer {
        return this._view;
    }

    public get open(): boolean {
        return this._open;
    }

    public get pageIndex(): number {
        return this._pageIndex;
    }

    public set id(param1: number) {
        this._id = param1;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    public set view(param1: IWindowContainer) {
        this._view = param1;
    }

    public set received(param1: boolean) {
        this._SafeStr_7263 = param1;
    }

    public set pageIndex(param1: number) {
        this._pageIndex = param1;
    }

    public get filter(): string {
        return this._filter;
    }

    public set filter(param1: string) {
        if (param1 != this._filter) {
            this._filter = param1;
            this.updateFilteredFriends();
        }
    }

    private acceptFilter(param1: Friend): boolean {
        return this._filter.length == 0 || param1.name.toLowerCase().indexOf(this._filter) != -1;
    }

    private updateFilteredFriends(): void {
        if (this._friends == null) {
            return;
        }
        if (this._filter.length == 0) {
            this._SafeStr_3034 = null;
            return;
        }
        this._SafeStr_3034 = new UtilsMap();
        for (const _loc1_ of this._friends.getValues() ?? []) {
            if (this.acceptFilter(_loc1_)) {
                this._SafeStr_3034.add(_loc1_.id, _loc1_);
            }
        }
    }

    public get filteredFriends(): any[] {
        return this._SafeStr_3034 == null ? this._friends.getValues() : this._SafeStr_3034.getValues();
    }

    get [IDisposable](): true {
        return true;
    }
}
