import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class HabboSearchResultData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::HabboSearchResultData'); }

    declare private _avatarId: number;
    static { (this.prototype as any)._avatarId = 0; }

    declare private _avatarName: string;

    declare private _SafeStr_7430: string;

    declare private _SafeStr_7355: boolean;
    static { (this.prototype as any)._SafeStr_7355 = false; }

    declare private _SafeStr_7347: boolean;
    static { (this.prototype as any)._SafeStr_7347 = false; }

    declare private _SafeStr_7353: number;
    static { (this.prototype as any)._SafeStr_7353 = 0; }

    declare private _SafeStr_7402: string;

    declare private _avatarFigure: string;

    declare private _realName: string;

    constructor(param1: IMessageDataWrapper) {
        this._avatarId = param1.readInteger();
        this._avatarName = param1.readString();
        this._SafeStr_7430 = param1.readString();
        this._SafeStr_7355 = param1.readBoolean();
        this._SafeStr_7347 = param1.readBoolean();
        param1.readString();
        this._SafeStr_7353 = param1.readInteger();
        this._SafeStr_7402 = param1.readString();
        this._realName = param1.readString();
    }

    public get avatarId(): number {
        return this._avatarId;
    }

    public get avatarName(): string {
        return this._avatarName;
    }

    public get avatarMotto(): string {
        return this._SafeStr_7430;
    }

    public get isAvatarOnline(): boolean {
        return this._SafeStr_7355;
    }

    public get canFollow(): boolean {
        return this._SafeStr_7347;
    }

    public get avatarGender(): number {
        return this._SafeStr_7353;
    }

    public get avatarFigure(): string {
        return this._SafeStr_7402;
    }

    public get lastOnlineDate(): string {
        return this._avatarFigure;
    }

    public get realName(): string {
        return this._realName;
    }
}
