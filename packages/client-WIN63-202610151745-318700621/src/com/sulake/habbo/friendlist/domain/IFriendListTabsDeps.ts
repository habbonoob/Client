import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';

export interface IFriendListTabsDeps {
    getFriendList(): HabboFriendList;
    getWindowHeight(): number;
}
