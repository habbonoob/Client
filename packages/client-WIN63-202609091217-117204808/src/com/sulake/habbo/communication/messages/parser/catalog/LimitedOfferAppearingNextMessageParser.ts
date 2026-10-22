import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class LimitedOfferAppearingNextMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::LimitedOfferAppearingNextMessageParser'); }

    declare private _appearsInSeconds: number;
    static { (this.prototype as any)._appearsInSeconds = 0; }

    declare private _pageId: number;
    static { (this.prototype as any)._pageId = 0; }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    declare private _productType: string;

    constructor() {
    }

    public flush(): boolean {
        this._appearsInSeconds = -1;
        this._pageId = -1;
        this._offerId = -1;
        this._productType = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._appearsInSeconds = param1.readInteger();
        this._pageId = param1.readInteger();
        this._offerId = param1.readInteger();
        this._productType = param1.readString();
        return true;
    }

    public get appearsInSeconds(): number {
        return this._appearsInSeconds;
    }

    public get pageId(): number {
        return this._pageId;
    }

    public get offerId(): number {
        return this._offerId;
    }

    public get productType(): string {
        return this._productType;
    }
}
