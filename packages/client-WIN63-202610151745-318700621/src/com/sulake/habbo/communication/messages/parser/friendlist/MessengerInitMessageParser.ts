import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { FriendCategoryData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendCategoryData';

export class MessengerInitMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::MessengerInitMessageParser'); }

    declare private _userFriendLimit: number;
    static { (this.prototype as any)._userFriendLimit = 0; }

    declare private _normalFriendLimit: number;
    static { (this.prototype as any)._normalFriendLimit = 0; }

    declare private _extendedFriendLimit: number;
    static { (this.prototype as any)._extendedFriendLimit = 0; }

    declare private _categories: any[];

    constructor() {
    }

    public flush(): boolean {
        this._categories = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._userFriendLimit = param1.readInteger();
        this._normalFriendLimit = param1.readInteger();
        this._extendedFriendLimit = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._categories.push(new FriendCategoryData(param1));
            _loc3_++;
        }
        return true;
    }

    public get userFriendLimit(): number {
        return this._userFriendLimit;
    }

    public get normalFriendLimit(): number {
        return this._normalFriendLimit;
    }

    public get extendedFriendLimit(): number {
        return this._extendedFriendLimit;
    }

    public get categories(): any[] {
        return this._categories;
    }
}
