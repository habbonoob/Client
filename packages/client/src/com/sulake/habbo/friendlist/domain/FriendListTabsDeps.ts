import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFriendListTabsDeps } from '@/com/sulake/habbo/friendlist/domain/IFriendListTabsDeps';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';

export class FriendListTabsDeps implements IFriendListTabsDeps {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.domain::FriendListTabsDeps'); }

    constructor(param1: HabboFriendList) {
        this._friendList = param1;
    }

    declare private _friendList: HabboFriendList;

    public getFriendList(): HabboFriendList {
        return this._friendList;
    }

    public getWindowHeight(): number {
        return this._friendList.view.mainWindow.height;
    }
}
