import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class CfhReportMessage {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.callforhelp::CfhReportMessage'); }

    public static _SafeStr_7393: number = 0;
    public static _SafeStr_7312: number = 1;
    public static _SafeStr_7538: number = 2;
    public static _SafeStr_7515: number = 3;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _creationTime: number;
    static { (this.prototype as any)._creationTime = NaN; }

    declare private _userMessage: string;

    declare private _userCategory: number;
    static { (this.prototype as any)._userCategory = 0; }

    declare private _reportedAccountName: string;

    declare private _closeTime: number;
    static { (this.prototype as any)._closeTime = NaN; }

    declare private _sanctioned: boolean;
    static { (this.prototype as any)._sanctioned = false; }

    declare private _sanctionGivenByAutoModeration: boolean;
    static { (this.prototype as any)._sanctionGivenByAutoModeration = false; }

    declare private _appealStatus: number;
    static { (this.prototype as any)._appealStatus = 0; }

    declare private _appealCreationTime: number;
    static { (this.prototype as any)._appealCreationTime = NaN; }

    declare private _appealResolutionTime: number;
    static { (this.prototype as any)._appealResolutionTime = NaN; }

    constructor(param1: IMessageDataWrapper) {
        this._id = param1.readLong() | 0;
        this._creationTime = param1.readLong();
        this._userMessage = param1.readString();
        this._userCategory = param1.readInteger();
        this._reportedAccountName = param1.readString();
        this._closeTime = param1.readLong();
        this._sanctioned = param1.readBoolean();
        this._sanctionGivenByAutoModeration = param1.readBoolean();
        this._appealStatus = param1.readByte();
        this._appealCreationTime = param1.readLong();
        this._appealResolutionTime = param1.readLong();
    }

    public get id(): number {
        return this._id;
    }

    public get creationTime(): number {
        return this._creationTime;
    }

    public get userMessage(): string {
        return this._userMessage;
    }

    public get userCategory(): number {
        return this._userCategory;
    }

    public get reportedAccountName(): string {
        return this._reportedAccountName;
    }

    public get closeTime(): number {
        return this._closeTime;
    }

    public get sanctioned(): boolean {
        return this._sanctioned;
    }

    public get sanctionGivenByAutoModeration(): boolean {
        return this._sanctionGivenByAutoModeration;
    }

    public get appealStatus(): number {
        return this._appealStatus;
    }

    public get appealCreationTime(): number {
        return this._appealCreationTime;
    }

    public get appealResolutionTime(): number {
        return this._appealResolutionTime;
    }
}
