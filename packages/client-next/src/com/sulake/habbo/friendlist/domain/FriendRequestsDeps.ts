import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFriendRequestsDeps } from '@/com/sulake/habbo/friendlist/domain/IFriendRequestsDeps';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import type { IFriendRequestsView } from '@/com/sulake/habbo/friendlist/IFriendRequestsView';
import { isIFriendRequestsView } from '@/com/sulake/habbo/friendlist/IFriendRequestsView';

export class FriendRequestsDeps implements IFriendRequestsDeps {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.domain::FriendRequestsDeps'); }

    declare private _friendList: HabboFriendList;

    constructor(param1: HabboFriendList) {
        this._friendList = param1;
    }

    public get view(): IFriendRequestsView {
        return asGuarded(this._friendList.tabs.findTab(2).tabView, isIFriendRequestsView);
    }
}
