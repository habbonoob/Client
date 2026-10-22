import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class HabboGroupDetailsData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::HabboGroupDetailsData'); }

    public static readonly TYPE_REGULAR: number = 0;
    public static readonly TYPE_EXCLUSIVE: number = 1;
    public static readonly _SafeStr_7478: number = 2;
    public static readonly TYPE_LARGE: number = 3;
    public static readonly _SafeStr_7435: number = 4;
    public static readonly _SafeStr_8754: number = 0;
    public static readonly _SafeStr_8783: number = 1;
    public static readonly _SafeStr_7312: number = 2;

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    declare private _isGuild: boolean;
    static { (this.prototype as any)._isGuild = false; }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _groupName: string;

    declare private _description: string;

    declare private _badgeCode: string;

    private _roomId: number = -1;
    private _roomName: string = "";

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    declare private _SafeStr_6228: number;
    static { (this.prototype as any)._SafeStr_6228 = 0; }

    declare private _favourite: boolean;
    static { (this.prototype as any)._favourite = false; }

    declare private _SafeStr_6298: string;

    declare private _isOwner: boolean;
    static { (this.prototype as any)._isOwner = false; }

    declare private _isAdmin: boolean;
    static { (this.prototype as any)._isAdmin = false; }

    declare private _ownerName: string;

    declare private _openDetails: boolean;
    static { (this.prototype as any)._openDetails = false; }

    declare private _hasBoard: boolean;
    static { (this.prototype as any)._hasBoard = false; }

    declare private _membersCanDecorate: boolean;
    static { (this.prototype as any)._membersCanDecorate = false; }

    declare private _pendingMemberCount: number;
    static { (this.prototype as any)._pendingMemberCount = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._groupId = param1.readInteger();
        this._isGuild = param1.readBoolean();
        this._type = param1.readInteger();
        this._groupName = param1.readString();
        this._description = param1.readString();
        this._badgeCode = param1.readString();
        this._roomId = param1.readInteger();
        this._roomName = param1.readString();
        this._status = param1.readInteger();
        this._SafeStr_6228 = param1.readInteger();
        this._favourite = param1.readBoolean();
        this._SafeStr_6298 = param1.readString();
        this._isOwner = param1.readBoolean();
        this._isAdmin = param1.readBoolean();
        this._ownerName = param1.readString();
        this._openDetails = param1.readBoolean();
        this._membersCanDecorate = param1.readBoolean();
        this._pendingMemberCount = param1.readInteger();
        this._hasBoard = param1.readBoolean();
    }

    public get groupId(): number {
        return this._groupId;
    }

    public get isGuild(): boolean {
        return this._isGuild;
    }

    public get type(): number {
        return this._type;
    }

    public get groupName(): string {
        return this._groupName;
    }

    public get description(): string {
        return this._description;
    }

    public get badgeCode(): string {
        return this._badgeCode;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get roomName(): string {
        return this._roomName;
    }

    public get status(): number {
        return this._status;
    }

    public get totalMembers(): number {
        return this._SafeStr_6228;
    }

    public get favourite(): boolean {
        return this._favourite;
    }

    public get creationDate(): string {
        return this._SafeStr_6298;
    }

    public get isOwner(): boolean {
        return this._isOwner;
    }

    public get isAdmin(): boolean {
        return this._isAdmin;
    }

    public get ownerName(): string {
        return this._ownerName;
    }

    public get openDetails(): boolean {
        return this._openDetails;
    }

    public get membersCanDecorate(): boolean {
        return this._membersCanDecorate;
    }

    public get pendingMemberCount(): number {
        return this._pendingMemberCount;
    }

    public get hasBoard(): boolean {
        return this._hasBoard;
    }

    public get joiningAllowed(): boolean {
        return this._status == 0 && (this._type == 0 || this._type == 4);
    }

    public get requestMembershipAllowed(): boolean {
        return this._status == 0 && this._type == 1;
    }

    public get leaveAllowed(): boolean {
        return this._isGuild && !this._isOwner && this._status == 1;
    }
}
