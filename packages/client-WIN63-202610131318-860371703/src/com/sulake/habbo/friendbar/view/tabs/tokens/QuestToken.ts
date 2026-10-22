import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFriendEntity } from '@/com/sulake/habbo/friendbar/data/IFriendEntity';
import type { IFriendNotification } from '@/com/sulake/habbo/friendbar/data/IFriendNotification';
import { Token } from '@/com/sulake/habbo/friendbar/view/tabs/tokens/Token';

export class QuestToken extends Token {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.tabs.tokens::QuestToken'); }

    constructor(param1: IFriendEntity, param2: IFriendNotification) {
        super(param2);
        let _loc3_: string = "${quests." + param2.message + ".name}";
        this.prepare("${friendbar.notify.quest}", _loc3_, "message_piece_xml", "friend_bar_event_notification_icon");
    }
}
