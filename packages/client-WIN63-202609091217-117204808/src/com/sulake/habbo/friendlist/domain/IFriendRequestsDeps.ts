import type { IFriendRequestsView } from '@/com/sulake/habbo/friendlist/IFriendRequestsView';

export interface IFriendRequestsDeps {
    get view(): IFriendRequestsView;
}
