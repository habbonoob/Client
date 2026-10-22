import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class PromoArticleData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.landingview::PromoArticleData'); }

    public static readonly _SafeStr_8729: number = 0;
    public static readonly _SafeStr_8333: number = 1;
    public static readonly _SafeStr_8172: number = 2;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _title: string;

    declare private _bodyText: string;

    declare private _buttonText: string;

    declare private _linkType: number;
    static { (this.prototype as any)._linkType = 0; }

    declare private _linkContent: string;

    declare private _imageUrl: string;

    constructor(param1: IMessageDataWrapper) {
        this._id = param1.readInteger();
        this._title = param1.readString();
        this._bodyText = param1.readString();
        this._buttonText = param1.readString();
        this._linkType = param1.readInteger();
        this._linkContent = param1.readString();
        this._imageUrl = param1.readString();
    }

    public get id(): number {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get bodyText(): string {
        return this._bodyText;
    }

    public get buttonText(): string {
        return this._buttonText;
    }

    public get linkType(): number {
        return this._linkType;
    }

    public get linkContent(): string {
        return this._linkContent;
    }

    public get imageUrl(): string {
        return this._imageUrl;
    }
}
