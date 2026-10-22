import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class MemberData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::MemberData'); }

    private static readonly _SafeStr_7777: number = 0;
    private static readonly _SafeStr_8713: number = 1;
    private static readonly _SafeStr_7902: number = 2;
    private static readonly _SafeStr_8373: number = 3;
    private static readonly _SafeStr_7966: number = 4;

    constructor(param1: IMessageDataWrapper) {
        this._type = param1.readInteger();
        this._userId = param1.readInteger();
        this._userName = param1.readString();
        this._figure = param1.readString();
        this._memberSince = param1.readString();
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _figure: string;

    declare private _memberSince: string;

    declare private _userName: string;

    public get userName(): string {
        return this._userName;
    }

    public get userId(): number {
        return this._userId;
    }

    public get admin(): boolean {
        return this._type == 1;
    }

    public get owner(): boolean {
        return this._type == 0;
    }

    public get member(): boolean {
        return this._type != 3;
    }

    public get blocked(): boolean {
        return this._type == 4;
    }

    public get figure(): string {
        return this._figure;
    }

    public get memberSince(): string {
        return this._memberSince;
    }
}
