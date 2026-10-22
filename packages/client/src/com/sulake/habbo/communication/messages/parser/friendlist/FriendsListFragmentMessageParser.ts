import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { FriendData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendData';

export class FriendsListFragmentMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::FriendsListFragmentMessageParser'); }

    constructor() {
    }

    declare protected _totalFragments: number;
    static { (this.prototype as any)._totalFragments = 0; }

    declare protected _fragmentNo: number;
    static { (this.prototype as any)._fragmentNo = 0; }

    declare private _friendFragment: any[];

    public get totalFragments(): number {
        return this._totalFragments;
    }

    public get fragmentNo(): number {
        return this._fragmentNo;
    }

    public get friendFragment(): any[] {
        return this._friendFragment;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._totalFragments = param1.readInteger();
        this._fragmentNo = param1.readInteger();
        this._friendFragment = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._friendFragment.push(new FriendData(param1));
            _loc3_++;
        }
        return true;
    }

    public flush(): boolean {
        this._friendFragment = [];
        return true;
    }
}
