import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class WiredErrorData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu::WiredErrorData'); }

    constructor(param1: IMessageDataWrapper) {
        this._errorId = param1.readInteger();
        this._errorName = param1.readString();
        this._category = param1.readString();
        this._throwCount = param1.readInteger();
        this._msSinceLastOccurrence = param1.readLong();
    }

    declare private _errorId: number;
    static { (this.prototype as any)._errorId = 0; }

    declare private _errorName: string;

    declare private _category: string;

    declare private _throwCount: number;
    static { (this.prototype as any)._throwCount = 0; }

    declare private _msSinceLastOccurrence: number;
    static { (this.prototype as any)._msSinceLastOccurrence = NaN; }

    public get errorId(): number {
        return this._errorId;
    }

    public get errorName(): string {
        return this._errorName;
    }

    public get category(): string {
        return this._category;
    }

    public get throwCount(): number {
        return this._throwCount;
    }

    public get msSinceLastOccurrence(): number {
        return this._msSinceLastOccurrence;
    }
}
