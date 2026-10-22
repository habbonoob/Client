import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFriendListTabsDeps } from '@/com/sulake/habbo/friendlist/domain/IFriendListTabsDeps';
import { FriendListTab } from '@/com/sulake/habbo/friendlist/domain/FriendListTab';
import { FriendRequestsView } from '@/com/sulake/habbo/friendlist/FriendRequestsView';
import { FriendsView } from '@/com/sulake/habbo/friendlist/FriendsView';
import { SearchView } from '@/com/sulake/habbo/friendlist/SearchView';

export class FriendListTabs {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.domain::FriendListTabs'); }

    constructor(param1: IFriendListTabsDeps) {
        this._deps = param1;
        this._tabs.push(new FriendListTab(this._deps.getFriendList(), 1, new FriendsView(), "${friendlist.friends}", "friends_footer", "hdr_friends"));
        this._tabs.push(new FriendListTab(this._deps.getFriendList(), 2, new FriendRequestsView(), "${friendlist.tab.friendrequests}", "friend_requests_footer", "hdr_friend_requests"));
        this._tabs.push(new FriendListTab(this._deps.getFriendList(), 3, new SearchView(), "${generic.search}", "search_footer", "hdr_search"));
        this.toggleSelected(null);
    }

    declare private _deps: IFriendListTabsDeps;

    private _tabs: any[] = [];

    declare private _SafeStr_5611: FriendListTab;

    private _tabContentHeight: number = 200;
    private _SafeStr_6648: number = 200;
    private _windowWidth: number = 230;

    public get windowWidth(): number {
        return this._windowWidth;
    }

    public set windowWidth(param1: number) {
        this._windowWidth = param1;
    }

    public get tabContentHeight(): number {
        return this._tabContentHeight;
    }

    public set tabContentHeight(param1: number) {
        this._tabContentHeight = param1;
    }

    public get tabContentWidth(): number {
        return this._windowWidth - 2;
    }

    public getTabs(): any[] {
        return this._tabs;
    }

    public findTab(param1: number): FriendListTab {
        for (const _loc2_ of this._tabs ?? []) {
            if (_loc2_.id == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public clearSelections(): void {
        for (const _loc1_ of this._tabs ?? []) {
            _loc1_.setSelected(false);
        }
    }

    public findSelectedTab(): FriendListTab {
        for (const _loc1_ of this._tabs ?? []) {
            if (_loc1_.selected) {
                return _loc1_;
            }
        }
        return null;
    }

    public toggleSelected(param1: FriendListTab): void {
        let _loc2_: FriendListTab = this.findSelectedTab();
        if (_loc2_ == null) {
            this._tabContentHeight = this._SafeStr_6648;
            this.setSelected(this.determineDisplayedTab(param1), true);
        } else if (_loc2_ == param1 || param1 == null) {
            this._SafeStr_6648 = this._tabContentHeight;
            this._tabContentHeight = 0;
            this.clearSelections();
        } else {
            this.setSelected(this.determineDisplayedTab(param1), true);
        }
    }

    private setSelected(param1: FriendListTab, param2: boolean): void {
        let _loc3_: FriendListTab = this.findSelectedTab();
        this.clearSelections();
        param1.setSelected(param2);
        if (param2) {
            this._SafeStr_5611 = param1;
        }
    }

    private determineDisplayedTab(param1: FriendListTab): FriendListTab {
        if (param1 != null) {
            return param1;
        }
        if (this._SafeStr_5611 != null) {
            return this._SafeStr_5611;
        }
        return this._tabs[0];
    }
}
