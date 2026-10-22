import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IGuildData } from '@/com/sulake/habbo/communication/messages/incoming/users/IGuildData';
import { GuildBadgeSettings } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildBadgeSettings';
import { RoomEntryData } from '@/com/sulake/habbo/communication/messages/incoming/users/RoomEntryData';

export class GuildEditData implements IGuildData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildEditData'); }

    declare private _ownedRooms: any[];

    declare private _isOwner: boolean;
    static { (this.prototype as any)._isOwner = false; }

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    declare private _groupName: string;

    declare private _SafeStr_6239: string;

    declare private _baseRoomId: number;
    static { (this.prototype as any)._baseRoomId = 0; }

    declare private _SafeStr_7281: number;
    static { (this.prototype as any)._SafeStr_7281 = 0; }

    declare private _SafeStr_7245: number;
    static { (this.prototype as any)._SafeStr_7245 = 0; }

    declare private _SafeStr_3562: boolean;
    static { (this.prototype as any)._SafeStr_3562 = false; }

    declare private _SafeStr_2991: string;

    declare private _guildType: number;
    static { (this.prototype as any)._guildType = 0; }

    declare private _SafeStr_7106: number;
    static { (this.prototype as any)._SafeStr_7106 = 0; }

    declare private _badgeSettings: any[];

    declare private _badgeCode: string;

    declare private _membershipCount: number;
    static { (this.prototype as any)._membershipCount = 0; }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        this._ownedRooms = [];
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._ownedRooms.push(new RoomEntryData(param1.readInteger(), param1.readString(), param1.readBoolean()));
            _loc3_++;
        }
        this._isOwner = param1.readBoolean();
        this._groupId = param1.readInteger();
        this._groupName = param1.readString();
        this._SafeStr_6239 = param1.readString();
        this._baseRoomId = param1.readInteger();
        this._SafeStr_7281 = param1.readInteger();
        this._SafeStr_7245 = param1.readInteger();
        this._guildType = param1.readInteger();
        this._SafeStr_7106 = param1.readInteger();
        this._SafeStr_3562 = param1.readBoolean();
        this._SafeStr_2991 = param1.readString();
        this._badgeSettings = [];
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._badgeSettings.push(new GuildBadgeSettings(param1));
            _loc3_++;
        }
        this._badgeCode = param1.readString();
        this._membershipCount = param1.readInteger();
    }

    public get ownedRooms(): any[] {
        return this._ownedRooms;
    }

    public get exists(): boolean {
        return true;
    }

    public get isOwner(): boolean {
        return this._isOwner;
    }

    public get groupId(): number {
        return this._groupId;
    }

    public get groupName(): string {
        return this._groupName;
    }

    public get groupDesc(): string {
        return this._SafeStr_6239;
    }

    public get baseRoomId(): number {
        return this._baseRoomId;
    }

    public get primaryColorId(): number {
        return this._SafeStr_7281;
    }

    public get secondaryColorId(): number {
        return this._SafeStr_7245;
    }

    public get badgeSettings(): any[] {
        return this._badgeSettings;
    }

    public get locked(): boolean {
        return this._SafeStr_3562;
    }

    public get url(): string {
        return this._SafeStr_2991;
    }

    public get guildType(): number {
        return this._guildType;
    }

    public get guildRightsLevel(): number {
        return this._SafeStr_7106;
    }

    public get badgeCode(): string {
        return this._badgeCode;
    }

    public get membershipCount(): number {
        return this._membershipCount;
    }
}
