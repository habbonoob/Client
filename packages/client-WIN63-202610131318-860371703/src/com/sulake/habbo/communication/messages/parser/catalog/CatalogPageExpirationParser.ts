import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CatalogPageExpirationParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::CatalogPageExpirationParser'); }

    declare private _pageName: string;

    declare private _pageId: number;
    static { (this.prototype as any)._pageId = 0; }

    declare private _secondsToExpiry: number;
    static { (this.prototype as any)._secondsToExpiry = 0; }

    declare private _image: string;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._pageId = param1.readInteger();
        this._pageName = param1.readString();
        this._secondsToExpiry = param1.readInteger();
        this._image = param1.readString();
        return true;
    }

    public get pageName(): string {
        return this._pageName;
    }

    public get pageId(): number {
        return this._pageId;
    }

    public get secondsToExpiry(): number {
        return this._secondsToExpiry;
    }

    public get image(): string {
        return this._image;
    }
}
