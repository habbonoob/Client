import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { FriendCategoryData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendCategoryData';
import { FriendData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendData';

export class FriendListUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::FriendListUpdateMessageParser'); }

    constructor() {
    }

    declare private _cats: any[];

    declare private _removedFriendIds: any[];

    declare private _addedFriends: any[];

    declare private _updatedFriends: any[];

    public get cats(): any[] {
        return this._cats;
    }

    public get removedFriendIds(): any[] {
        return this._removedFriendIds;
    }

    public get addedFriends(): any[] {
        return this._addedFriends;
    }

    public get updatedFriends(): any[] {
        return this._updatedFriends;
    }

    public flush(): boolean {
        this._cats = [];
        this._removedFriendIds = [];
        this._addedFriends = [];
        this._updatedFriends = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc2_) {
            this._cats.push(new FriendCategoryData(param1));
            _loc5_++;
        }
        let _loc3_: number = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc3_) {
            _loc6_ = param1.readInteger();
            if (_loc6_ == -1) {
                _loc4_ = param1.readInteger();
                this._removedFriendIds.push(_loc4_);
            } else if (_loc6_ == 0) {
                this._updatedFriends.push(new FriendData(param1));
            } else if (_loc6_ == 1) {
                this._addedFriends.push(new FriendData(param1));
            }
            _loc5_++;
        }
        return true;
    }
}
