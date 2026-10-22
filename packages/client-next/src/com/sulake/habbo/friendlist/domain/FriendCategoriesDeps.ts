import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IFriendCategoriesDeps } from '@/com/sulake/habbo/friendlist/domain/IFriendCategoriesDeps';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import type { IFriendsView } from '@/com/sulake/habbo/friendlist/IFriendsView';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboMessenger } from '@/com/sulake/habbo/messenger/IHabboMessenger';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import { isIFriendsView } from '@/com/sulake/habbo/friendlist/IFriendsView';

export class FriendCategoriesDeps implements IFriendCategoriesDeps {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.domain::FriendCategoriesDeps'); }

    declare private _friendList: HabboFriendList;

    constructor(param1: HabboFriendList) {
        this._friendList = param1;
    }

    public get view(): IFriendsView {
        return asGuarded(this._friendList.tabs.findTab(1).tabView, isIFriendsView);
    }

    public get messenger(): IHabboMessenger {
        return this._friendList.messenger;
    }

    public get notifications(): IHabboNotifications {
        return this._friendList.notifications;
    }

    public get avatarManager(): IAvatarRenderManager {
        return this._friendList.avatarManager;
    }

    public get localizations(): IHabboLocalizationManager {
        return this._friendList.localization;
    }
}
