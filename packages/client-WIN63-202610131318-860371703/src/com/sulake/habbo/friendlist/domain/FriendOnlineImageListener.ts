import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { Friend } from '@/com/sulake/habbo/friendlist/domain/Friend';
import type { FriendCategories } from '@/com/sulake/habbo/friendlist/domain/FriendCategories';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class FriendOnlineImageListener implements IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.domain::FriendOnlineImageListener'); }

    declare private _friend: Friend;

    declare private _friendCategories: FriendCategories;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: Friend, param2: FriendCategories) {
        this._friend = param1;
        this._friendCategories = param2;
    }

    public avatarImageReady(param1: string): void {
        let _loc2_: IAvatarImage = null;
        if (this._friendCategories != null) {
            _loc2_ = this._friendCategories.deps.avatarManager.createAvatarImage(this._friend.figure, "h", null, null);
            if (_loc2_ && !_loc2_.isPlaceholder()) {
                this._friendCategories.notifyFriendOnline(this._friend, _loc2_);
            } else if (_loc2_ != null) {
                _loc2_.dispose();
            }
        }
    }

    public dispose(): void {
        this._friend = null;
        this._friendCategories = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
