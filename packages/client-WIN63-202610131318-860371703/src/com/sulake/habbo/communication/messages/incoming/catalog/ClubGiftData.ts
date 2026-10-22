import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class ClubGiftData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::ClubGiftData'); }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    declare private _isVip: boolean;
    static { (this.prototype as any)._isVip = false; }

    declare private _isSelectable: boolean;
    static { (this.prototype as any)._isSelectable = false; }

    declare private _daysRequired: number;
    static { (this.prototype as any)._daysRequired = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._offerId = param1.readInteger();
        this._isVip = param1.readBoolean();
        this._daysRequired = param1.readInteger();
        this._isSelectable = param1.readBoolean();
    }

    public get offerId(): number {
        return this._offerId;
    }

    public get isVip(): boolean {
        return this._isVip;
    }

    public get isSelectable(): boolean {
        return this._isSelectable;
    }

    public get daysRequired(): number {
        return this._daysRequired;
    }
}
