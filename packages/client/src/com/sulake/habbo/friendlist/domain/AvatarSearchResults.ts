import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboSearchResultData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/HabboSearchResultData';
import type { IAvatarSearchDeps } from '@/com/sulake/habbo/friendlist/domain/IAvatarSearchDeps';

export class AvatarSearchResults {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.domain::AvatarSearchResults'); }

    constructor(param1: IAvatarSearchDeps) {
        this._deps = param1;
    }

    declare private _deps: IAvatarSearchDeps;

    declare private _friends: any[];

    private _SafeStr_5947: Map<any, any> = new Dictionary();

    declare private _others: any[];

    public get others(): any[] {
        return this._others;
    }

    public get friends(): any[] {
        return this._friends;
    }

    public getResult(param1: number): HabboSearchResultData {
        for (const _loc3_ of this._friends ?? []) {
            if (_loc3_.avatarId == param1) {
                return _loc3_;
            }
        }
        for (const _loc2_ of this._others ?? []) {
            if (_loc2_.avatarId == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public searchReceived(param1: any[], param2: any[]): void {
        this._friends = param1;
        this._others = param2;
        this._deps.view.refreshList();
    }

    public setFriendRequestSent(param1: number): void {
        this._SafeStr_5947.set(param1, "yes");
    }

    public isFriendRequestSent(param1: number): boolean {
        return this._SafeStr_5947.get(param1) != null;
    }
}
