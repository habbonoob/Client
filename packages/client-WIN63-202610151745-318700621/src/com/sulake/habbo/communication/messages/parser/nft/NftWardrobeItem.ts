import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class NftWardrobeItem {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.nft::NftWardrobeItem'); }

    declare private _id: string;

    declare private _gender: string;

    declare private _figureString: string;

    declare private _tokenId: string;

    declare private _contractKey: string;

    constructor(param1: IMessageDataWrapper) {
        this._id = param1.readString();
        this._figureString = param1.readString();
        this._gender = param1.readString();
        this._tokenId = param1.readString();
        this._contractKey = param1.readString();
    }

    public get id(): string {
        return this._id;
    }

    public get gender(): string {
        return this._gender;
    }

    public get figureString(): string {
        return this._figureString;
    }

    public get contractKey(): string {
        return this._contractKey;
    }

    public get tokenId(): string {
        return this._tokenId;
    }
}
