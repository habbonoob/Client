import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class _SafeCls_6048 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::_SafeCls_6048'); }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _userName: string;

    declare private _figureString: string;

    declare private _rank: number;
    static { (this.prototype as any)._rank = 0; }

    declare private _score: number;
    static { (this.prototype as any)._score = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._userId = param1.readInteger();
        this._userName = param1.readString();
        this._figureString = param1.readString();
        this._rank = param1.readInteger();
        this._score = param1.readInteger();
    }

    public get userId(): number {
        return this._userId;
    }

    public get userName(): string {
        return this._userName;
    }

    public get figureString(): string {
        return this._figureString;
    }

    public get rank(): number {
        return this._rank;
    }

    public get score(): number {
        return this._score;
    }
}
