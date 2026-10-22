import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class HabboSearchResultData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::HabboSearchResultData'); }

    constructor(param1: IMessageDataWrapper) {
        this._avatarId = param1.readInteger();
        this._avatarName = param1.readString();
        this._avatarMotto = param1.readString();
        this._isAvatarOnline = param1.readBoolean();
        this._canFollow = param1.readBoolean();
        param1.readString();
        this._avatarGender = param1.readInteger();
        this._avatarFigure = param1.readString();
        this._realName = param1.readString();
    }

    declare private _avatarId: number;
    static { (this.prototype as any)._avatarId = 0; }

    declare private _avatarMotto: string;

    declare private _isAvatarOnline: boolean;
    static { (this.prototype as any)._isAvatarOnline = false; }

    declare private _canFollow: boolean;
    static { (this.prototype as any)._canFollow = false; }

    declare private _avatarGender: number;
    static { (this.prototype as any)._avatarGender = 0; }

    declare private _avatarFigure: string;

    declare private _lastOnlineDate: string;

    declare private _avatarName: string;

    public get avatarName(): string {
        return this._avatarName;
    }

    declare private _realName: string;

    public get realName(): string {
        return this._realName;
    }

    public get avatarId(): number {
        return this._avatarId;
    }

    public get avatarMotto(): string {
        return this._avatarMotto;
    }

    public get isAvatarOnline(): boolean {
        return this._isAvatarOnline;
    }

    public get canFollow(): boolean {
        return this._canFollow;
    }

    public get avatarGender(): number {
        return this._avatarGender;
    }

    public get avatarFigure(): string {
        return this._avatarFigure;
    }

    public get lastOnlineDate(): string {
        return this._lastOnlineDate;
    }
}
