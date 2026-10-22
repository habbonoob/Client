import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RentableSpaceStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::RentableSpaceStatusMessageParser'); }

    declare private _rented: boolean;
    static { (this.prototype as any)._rented = false; }

    declare private _renterId: number;
    static { (this.prototype as any)._renterId = 0; }

    declare private _renterName: string;

    declare private _canRent: boolean;
    static { (this.prototype as any)._canRent = false; }

    declare private _canRentErrorCode: number;
    static { (this.prototype as any)._canRentErrorCode = 0; }

    declare private _timeRemaining: number;
    static { (this.prototype as any)._timeRemaining = 0; }

    declare private _price: number;
    static { (this.prototype as any)._price = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._rented = param1.readBoolean();
        this._canRentErrorCode = param1.readInteger();
        this._canRent = this._canRentErrorCode === 0;
        this._renterId = param1.readInteger();
        this._renterName = param1.readString();
        this._timeRemaining = param1.readInteger();
        this._price = param1.readInteger();
        if (!this._rented) {
            this._renterId = -1;
            this._renterName = "";
        }
        return true;
    }

    public get rented(): boolean {
        return this._rented;
    }

    public get renterId(): number {
        return this._renterId;
    }

    public get renterName(): string {
        return this._renterName;
    }

    public get canRent(): boolean {
        return this._canRent;
    }

    public get price(): number {
        return this._price;
    }

    public get timeRemaining(): number {
        return this._timeRemaining;
    }

    public get canRentErrorCode(): number {
        return this._canRentErrorCode;
    }
}
