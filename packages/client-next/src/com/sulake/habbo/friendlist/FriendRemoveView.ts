import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import { RemoveFriendMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/RemoveFriendMessageComposer';
import { AlertView } from '@/com/sulake/habbo/friendlist/AlertView';
import { Util } from '@/com/sulake/habbo/friendlist/Util';
import { Logger } from '@/com/sulake/habbo/Logger';

export class FriendRemoveView extends AlertView {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::FriendRemoveView'); }

    declare private _selected: any[];

    constructor(param1: HabboFriendList) {
        super(param1, "friend_remove_confirm");
        this._selected = param1.categories.getSelectedFriends();
    }

    public override dispose(): void {
        this._selected = null;
        super.dispose();
    }

    public override setupContent(param1: IWindowContainer): void {
        param1.findChildByName("cancel").procedure = this.onClose;
        param1.findChildByName("ok").procedure = this.onRemove;
        let _loc4_: any[] = [];
        for (const _loc2_ of this._selected ?? []) {
            _loc4_.push(_loc2_.name);
        }
        let _loc5_: string = Util.arrayToString(_loc4_);
        let _loc3_: Map<any, any> = new Dictionary();
        this.friendList.registerParameter("friendlist.removefriendconfirm.userlist", "user_names", _loc5_);
    }

    private onRemove = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        Logger.log("Remove Ok clicked");
        let _loc3_: RemoveFriendMessageComposer = new RemoveFriendMessageComposer();
        for (const _loc4_ of this._selected ?? []) {
            _loc3_.addRemovedFriend(_loc4_.id | 0);
        }
        this.friendList.send(_loc3_);
        this.dispose();
    };
}
