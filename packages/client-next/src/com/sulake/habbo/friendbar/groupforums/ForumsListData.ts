import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ForumData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ForumData';
import type { GetForumsListMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/GetForumsListMessageParser';

export class ForumsListData {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.groupforums::ForumsListData'); }

    declare private _listCode: number;
    static { (this.prototype as any)._listCode = 0; }

    declare private _totalAmount: number;
    static { (this.prototype as any)._totalAmount = 0; }

    declare private _startIndex: number;
    static { (this.prototype as any)._startIndex = 0; }

    declare private _forums: any[];

    constructor(param1: GetForumsListMessageParser) {
        this._listCode = param1.listCode;
        this._totalAmount = param1.totalAmount;
        this._startIndex = param1.startIndex;
        this._forums = param1.forums;
    }

    public get listCode(): number {
        return this._listCode;
    }

    public get totalAmount(): number {
        return this._totalAmount;
    }

    public get startIndex(): number {
        return this._startIndex;
    }

    public get forums(): any[] {
        return this._forums;
    }

    public get unreadForumsCount(): number {
        let _loc3_: number = 0;
        let _loc1_: ForumData = null;
        let _loc2_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._forums.length) {
            _loc1_ = this._forums[_loc3_];
            if (_loc1_.unreadMessages > 0) {
                _loc2_++;
            }
            _loc3_++;
        }
        return _loc2_;
    }

    public getForumData(param1: number): ForumData {
        for (const _loc2_ of this._forums ?? []) {
            if (_loc2_.groupId == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public updateUnreadMessages(param1: ForumData, param2: number): void {
        let _loc3_: ForumData = this.getForumData(param1.groupId);
        if (_loc3_ != null) {
            _loc3_.updateFrom(param1);
            _loc3_.lastReadMessageId = param2;
        }
    }
}
