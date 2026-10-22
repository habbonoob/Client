import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IFriendsView } from '@/com/sulake/habbo/friendlist/IFriendsView';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboMessenger } from '@/com/sulake/habbo/messenger/IHabboMessenger';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';

export interface IFriendCategoriesDeps {
    get view(): IFriendsView;
    get messenger(): IHabboMessenger;
    get notifications(): IHabboNotifications;
    get avatarManager(): IAvatarRenderManager;
    get localizations(): IHabboLocalizationManager;
}
