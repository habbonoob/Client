import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFriendEntity } from '@/com/sulake/habbo/friendbar/data/IFriendEntity';
import type { IFriendNotification } from '@/com/sulake/habbo/friendbar/data/IFriendNotification';
import { Token } from '@/com/sulake/habbo/friendbar/view/tabs/tokens/Token';

export class GameToken extends Token {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.tabs.tokens::GameToken'); }

    constructor(param1: IFriendEntity, param2: IFriendNotification) {
        super(param2);
        let _loc3_: string = param2.message;
        let _loc4_: string = "${gamecenter." + _loc3_ + ".name}";
        this.prepare("${friendbar.notify.game}", _loc4_, "message_piece_xml", "game_center_snowball_notification_icon");
    }
}
