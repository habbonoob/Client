import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class TreasureHuntWinnerInfo {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.treasurehunt::TreasureHuntWinnerInfo'); }

    declare private _huntId: string;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _userName: string;

    declare private _userFigure: string;

    declare private _userGender: string;

    constructor(param1: IMessageDataWrapper) {
        this._huntId = param1.readString();
        this._userId = param1.readInteger();
        this._userName = param1.readString();
        this._userFigure = param1.readString();
        this._userGender = param1.readString();
    }

    public get huntId(): string {
        return this._huntId;
    }

    public get userId(): number {
        return this._userId;
    }

    public get userName(): string {
        return this._userName;
    }

    public get userFigure(): string {
        return this._userFigure;
    }

    public get userGender(): string {
        return this._userGender;
    }
}
