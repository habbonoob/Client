import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class HabboGroupEntryData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::HabboGroupEntryData'); }

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    declare private _groupName: string;

    declare private _badgeCode: string;

    declare private _primaryColor: string;

    declare private _secondaryColor: string;

    declare private _favourite: boolean;
    static { (this.prototype as any)._favourite = false; }

    declare private _ownerId: number;
    static { (this.prototype as any)._ownerId = 0; }

    declare private _hasForum: boolean;
    static { (this.prototype as any)._hasForum = false; }

    constructor(param1: IMessageDataWrapper) {
        this._groupId = param1.readInteger();
        this._groupName = param1.readString();
        this._badgeCode = param1.readString();
        this._primaryColor = param1.readString();
        this._secondaryColor = param1.readString();
        this._favourite = param1.readBoolean();
        this._ownerId = param1.readInteger();
        this._hasForum = param1.readBoolean();
    }

    public get groupId(): number {
        return this._groupId;
    }

    public get groupName(): string {
        return this._groupName;
    }

    public get badgeCode(): string {
        return this._badgeCode;
    }

    public get primaryColor(): string {
        return this._primaryColor;
    }

    public get secondaryColor(): string {
        return this._secondaryColor;
    }

    public get favourite(): boolean {
        return this._favourite;
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public get hasForum(): boolean {
        return this._hasForum;
    }
}
