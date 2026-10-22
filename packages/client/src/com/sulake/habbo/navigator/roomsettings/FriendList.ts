import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { FriendListUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FriendListUpdateMessageParser';
import type { FriendsListFragmentMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FriendsListFragmentMessageParser';
import { FriendListFragmentMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendListFragmentMessageEvent';
import { FriendListUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendListUpdateEvent';
import { FriendEntryData } from '@/com/sulake/habbo/navigator/roomsettings/FriendEntryData';

export class FriendList {
    static { registerClassName(this, 'com.sulake.habbo.navigator.roomsettings::FriendList'); }

    constructor() {
    }

    private _SafeStr_4174: Map<any, any> = new Dictionary();

    declare private _SafeStr_2221: any[];

    public get list(): any[] {
        let _loc3_: number = 0;
        let _loc2_: string = null;
        if (this._SafeStr_2221 == null) {
            this._SafeStr_2221 = [];
            for (const _loc1_ of this._SafeStr_4174?.keys() ?? []) {
                _loc3_ = _loc1_ | 0;
                _loc2_ = stringOrNull(this._SafeStr_4174.get(_loc3_));
                if (_loc2_ != null) {
                    this._SafeStr_2221.push(new FriendEntryData(_loc3_, _loc2_));
                }
            }
            this._SafeStr_2221.sort((a, b) => (String(a.userName).toLowerCase() < String(b.userName).toLowerCase() ? -1 : String(a.userName).toLowerCase() > String(b.userName).toLowerCase() ? 1 : 0));
        }
        return this._SafeStr_2221;
    }

    public onFriendsListFragment(param1: IMessageEvent): void {
        let _loc2_: FriendsListFragmentMessageParser = (param1 instanceof FriendListFragmentMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null) {
            return;
        }
        for (const _loc3_ of _loc2_.friendFragment ?? []) {
            this._SafeStr_4174.set(_loc3_.id, _loc3_.name);
        }
    }

    public onFriendListUpdate(param1: IMessageEvent): void {
        let _loc2_: FriendListUpdateMessageParser = (param1 instanceof FriendListUpdateEvent ? param1 : null).getParser();
        for (const _loc3_ of _loc2_.removedFriendIds ?? []) {
            this._SafeStr_4174.set(_loc3_, null);
        }
        for (const _loc4_ of _loc2_.addedFriends ?? []) {
            this._SafeStr_4174.set(_loc4_.id, _loc4_.name);
        }
        this._SafeStr_2221 = _loc2_.removedFriendIds.length > 0 || _loc2_.addedFriends.length > 0 ? null : this._SafeStr_2221;
    }
}
