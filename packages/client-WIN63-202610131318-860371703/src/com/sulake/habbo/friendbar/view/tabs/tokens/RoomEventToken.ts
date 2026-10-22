import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFriendEntity } from '@/com/sulake/habbo/friendbar/data/IFriendEntity';
import type { IFriendNotification } from '@/com/sulake/habbo/friendbar/data/IFriendNotification';
import { Token } from '@/com/sulake/habbo/friendbar/view/tabs/tokens/Token';

export class RoomEventToken extends Token {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.tabs.tokens::RoomEventToken'); }

    constructor(param1: IFriendEntity, param2: IFriendNotification) {
        super(param2);
        this.prepare("${friendbar.notify.event}", param2.message, "message_piece_xml", "friend_bar_event_notification_icon");
    }
}
