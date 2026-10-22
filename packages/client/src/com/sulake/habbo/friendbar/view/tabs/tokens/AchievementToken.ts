import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFriendEntity } from '@/com/sulake/habbo/friendbar/data/IFriendEntity';
import type { IFriendNotification } from '@/com/sulake/habbo/friendbar/data/IFriendNotification';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { Token } from '@/com/sulake/habbo/friendbar/view/tabs/tokens/Token';

export class AchievementToken extends Token {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.tabs.tokens::AchievementToken'); }

    constructor(param1: IFriendEntity, param2: IFriendNotification, param3: IHabboLocalizationManager) {
        super(param2);
        let _loc4_: string = param3.getBadgeName(param2.message);
        this.prepare("${friendbar.notify.achievement}", _loc4_, "message_piece_xml", "friend_bar_event_notification_icon");
    }
}
