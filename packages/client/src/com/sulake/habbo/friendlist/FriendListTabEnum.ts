import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FriendListTabEnum {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::FriendListTabEnum'); }

    public static readonly VIEW_CLOSED: number = 0;
    public static readonly TABID_FRIENDS: number = 1;
    public static readonly TABID_FRIEND_REQUESTS: number = 2;
    public static readonly TABID_SEARCH: number = 3;
}
