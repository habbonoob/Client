import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarSearchDeps } from '@/com/sulake/habbo/friendlist/domain/IAvatarSearchDeps';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import type { ISearchView } from '@/com/sulake/habbo/friendlist/ISearchView';
import { isISearchView } from '@/com/sulake/habbo/friendlist/ISearchView';

export class AvatarSearchDeps implements IAvatarSearchDeps {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.domain::AvatarSearchDeps'); }

    constructor(param1: HabboFriendList) {
        this._friendList = param1;
    }

    declare private _friendList: HabboFriendList;

    public get view(): ISearchView {
        return asGuarded(this._friendList.tabs.findTab(3).tabView, isISearchView);
    }
}
