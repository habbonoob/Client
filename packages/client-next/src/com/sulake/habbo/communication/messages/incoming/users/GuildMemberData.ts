import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { MemberData } from '@/com/sulake/habbo/communication/messages/incoming/users/MemberData';

export class GuildMemberData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildMemberData'); }

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    declare private _groupName: string;

    declare private _baseRoomId: number;
    static { (this.prototype as any)._baseRoomId = 0; }

    declare private _badgeCode: string;

    declare private _totalEntries: number;
    static { (this.prototype as any)._totalEntries = 0; }

    declare private _entries: any[];

    declare private _allowedToManage: boolean;
    static { (this.prototype as any)._allowedToManage = false; }

    declare private _pageSize: number;
    static { (this.prototype as any)._pageSize = 0; }

    declare private _pageIndex: number;
    static { (this.prototype as any)._pageIndex = 0; }

    declare private _searchType: number;
    static { (this.prototype as any)._searchType = 0; }

    declare private _userNameFilter: string;

    declare private _SafeStr_4378: Map<any, any>;

    constructor(param1: IMessageDataWrapper) {
        let _loc4_: number = 0;
        let _loc3_: MemberData = null;
        this._SafeStr_4378 = new Dictionary();
        this._groupId = param1.readInteger();
        this._groupName = param1.readString();
        this._baseRoomId = param1.readInteger();
        this._badgeCode = param1.readString();
        this._totalEntries = param1.readInteger();
        this._entries = [];
        let _loc2_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc2_) {
            _loc3_ = new MemberData(param1);
            this._entries.push(_loc3_);
            this._SafeStr_4378.set(_loc3_.userId, _loc3_);
            _loc4_++;
        }
        this._allowedToManage = param1.readBoolean();
        this._pageSize = param1.readInteger();
        this._pageIndex = param1.readInteger();
        this._searchType = param1.readInteger();
        this._userNameFilter = param1.readString();
    }

    private static removeFromArray(param1: number, param2: any[]): void {
        let _loc4_: number = 0;
        let _loc3_: MemberData = null;
        while (_loc4_ < param2.length) {
            _loc3_ = param2[_loc4_];
            if (_loc3_.userId == param1) {
                param2.splice(_loc4_, 1);
            } else {
                _loc4_++;
            }
        }
    }

    public get groupId(): number {
        return this._groupId;
    }

    public get groupName(): string {
        return this._groupName;
    }

    public get baseRoomId(): number {
        return this._baseRoomId;
    }

    public get badgeCode(): string {
        return this._badgeCode;
    }

    public get totalEntries(): number {
        return this._totalEntries;
    }

    public get pageSize(): number {
        return this._pageSize;
    }

    public get pageIndex(): number {
        return this._pageIndex;
    }

    public get searchType(): number {
        return this._searchType;
    }

    public get entries(): any[] {
        return this._entries;
    }

    public get allowedToManage(): boolean {
        return this._allowedToManage;
    }

    public get userNameFilter(): string {
        return this._userNameFilter;
    }

    public get totalPages(): number {
        return Math.max(1, Math.ceil(this._totalEntries / this._pageSize)) | 0;
    }

    public update(param1: MemberData): void {
        let _loc3_: number = 0;
        let _loc2_: MemberData = null;
        this._SafeStr_4378.set(param1.userId, param1);
        while (_loc3_ < this._entries.length) {
            _loc2_ = this._entries[_loc3_];
            if (_loc2_.userId == param1.userId) {
                this._entries[_loc3_] = param1;
                return;
            }
            _loc3_++;
        }
        this._entries.push(param1);
    }

    public remove(param1: number): void {
        GuildMemberData.removeFromArray(param1, this._entries);
        this._SafeStr_4378.delete(param1);
    }

    public getUser(param1: number): MemberData {
        return this._SafeStr_4378.get(param1);
    }
}
