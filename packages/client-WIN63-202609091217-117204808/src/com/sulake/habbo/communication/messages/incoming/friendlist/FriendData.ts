import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class FriendData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::FriendData'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _name: string;

    declare private _gender: number;
    static { (this.prototype as any)._gender = 0; }

    declare private _online: boolean;
    static { (this.prototype as any)._online = false; }

    declare private _followingAllowed: boolean;
    static { (this.prototype as any)._followingAllowed = false; }

    declare private _figure: string;

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    declare private _motto: string;

    declare private _SafeStr_4795: string;

    declare private _realName: string;

    declare private _SafeStr_7431: string;

    declare private _persistedMessageUser: boolean;
    static { (this.prototype as any)._persistedMessageUser = false; }

    declare private _vipMember: boolean;
    static { (this.prototype as any)._vipMember = false; }

    declare private _pocketHabboUser: boolean;
    static { (this.prototype as any)._pocketHabboUser = false; }

    declare private _relationshipStatus: number;
    static { (this.prototype as any)._relationshipStatus = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._id = param1.readInteger();
        this._name = param1.readString();
        this._gender = param1.readInteger();
        this._online = param1.readBoolean();
        this._followingAllowed = param1.readBoolean();
        this._figure = param1.readString();
        this._categoryId = param1.readInteger();
        this._motto = param1.readString();
        this._realName = param1.readString();
        this._SafeStr_7431 = param1.readString();
        this._persistedMessageUser = param1.readBoolean();
        this._vipMember = param1.readBoolean();
        this._pocketHabboUser = param1.readBoolean();
        this._relationshipStatus = param1.readShort();
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get gender(): number {
        return this._gender;
    }

    public get online(): boolean {
        return this._online;
    }

    public get followingAllowed(): boolean {
        return this._followingAllowed;
    }

    public get figure(): string {
        return this._figure;
    }

    public get categoryId(): number {
        return this._categoryId;
    }

    public get motto(): string {
        return this._motto;
    }

    public get lastAccess(): string {
        return this._SafeStr_4795;
    }

    public get realName(): string {
        return this._realName;
    }

    public get facebookId(): string {
        return this._SafeStr_7431;
    }

    public get persistedMessageUser(): boolean {
        return this._persistedMessageUser;
    }

    public get vipMember(): boolean {
        return this._vipMember;
    }

    public get pocketHabboUser(): boolean {
        return this._pocketHabboUser;
    }

    public get relationshipStatus(): number {
        return this._relationshipStatus;
    }
}
