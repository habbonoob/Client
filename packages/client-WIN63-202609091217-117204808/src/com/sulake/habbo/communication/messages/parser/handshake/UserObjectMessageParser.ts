import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class UserObjectMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.handshake::UserObjectMessageParser'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _name: string;

    declare private _figure: string;

    declare private _sex: string;

    declare private _SafeStr_7410: string;

    declare private _realName: string;

    declare private _directMail: boolean;
    static { (this.prototype as any)._directMail = false; }

    declare private _respectTotal: number;
    static { (this.prototype as any)._respectTotal = 0; }

    declare private _respectLeft: number;
    static { (this.prototype as any)._respectLeft = 0; }

    declare private _petRespectLeft: number;
    static { (this.prototype as any)._petRespectLeft = 0; }

    declare private _streamPublishingAllowed: boolean;
    static { (this.prototype as any)._streamPublishingAllowed = false; }

    declare private _lastAccessDate: string;

    declare private _nameChangeAllowed: boolean;
    static { (this.prototype as any)._nameChangeAllowed = false; }

    private _accountSafetyLocked: boolean = false;
    private _accountTradeLocked: boolean = false;
    private _nameColor: string = "";
    private _respectReplenishesLeft: number = 0;
    private _maxRespectPerDay: number = 3;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._id = param1.readInteger();
        this._name = param1.readString();
        this._figure = param1.readString();
        this._sex = param1.readString();
        this._SafeStr_7410 = param1.readString();
        this._realName = param1.readString();
        this._directMail = param1.readBoolean();
        this._respectTotal = param1.readInteger();
        this._respectLeft = param1.readInteger();
        this._petRespectLeft = param1.readInteger();
        this._streamPublishingAllowed = param1.readBoolean();
        this._lastAccessDate = param1.readString();
        this._nameChangeAllowed = param1.readBoolean();
        this._accountSafetyLocked = param1.readBoolean();
        if (param1.bytesAvailable > 0) {
            this._accountTradeLocked = param1.readBoolean();
            this._nameColor = param1.readString();
        }
        if (param1.bytesAvailable > 0) {
            this._respectReplenishesLeft = param1.readInteger();
            this._maxRespectPerDay = param1.readInteger();
        }
        return true;
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get figure(): string {
        return this._figure;
    }

    public get sex(): string {
        return this._sex;
    }

    public get customData(): string {
        return this._SafeStr_7410;
    }

    public get realName(): string {
        return this._realName;
    }

    public get directMail(): boolean {
        return this._directMail;
    }

    public get respectTotal(): number {
        return this._respectTotal;
    }

    public get respectLeft(): number {
        return this._respectLeft;
    }

    public get petRespectLeft(): number {
        return this._petRespectLeft;
    }

    public get streamPublishingAllowed(): boolean {
        return this._streamPublishingAllowed;
    }

    public get lastAccessDate(): string {
        return this._lastAccessDate;
    }

    public get nameChangeAllowed(): boolean {
        return this._nameChangeAllowed;
    }

    public get accountSafetyLocked(): boolean {
        return this._accountSafetyLocked;
    }

    public get accountTradeLocked(): boolean {
        return this._accountTradeLocked;
    }

    public get nameColor(): string {
        return this._nameColor;
    }

    public get respectReplenishesLeft(): number {
        return this._respectReplenishesLeft;
    }

    public get maxRespectPerDay(): number {
        return this._maxRespectPerDay;
    }
}
