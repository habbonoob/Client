import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CatalogPageWithEarliestExpiryMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::CatalogPageWithEarliestExpiryMessageParser'); }

    constructor() {
    }

    declare private _secondsToExpiry: number;
    static { (this.prototype as any)._secondsToExpiry = 0; }

    declare private _image: string;

    declare private _pageName: string;

    public get pageName(): string {
        return this._pageName;
    }

    public get secondsToExpiry(): number {
        return this._secondsToExpiry;
    }

    public get image(): string {
        return this._image;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._pageName = param1.readString();
        this._secondsToExpiry = param1.readInteger();
        this._image = param1.readString();
        return true;
    }
}
