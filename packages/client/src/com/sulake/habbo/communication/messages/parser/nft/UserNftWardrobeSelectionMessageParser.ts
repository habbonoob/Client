import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class UserNftWardrobeSelectionMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.nft::UserNftWardrobeSelectionMessageParser'); }

    constructor() {
    }

    declare private _currentTokenId: string;

    declare private _fallbackFigureString: string;

    declare private _fallbackFigureGender: string;

    public get currentTokenId(): string {
        return this._currentTokenId;
    }

    public get fallbackFigureString(): string {
        return this._fallbackFigureString;
    }

    public get fallbackFigureGender(): string {
        return this._fallbackFigureGender;
    }

    public flush(): boolean {
        this._fallbackFigureString = "";
        this._fallbackFigureGender = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._currentTokenId = param1.readString();
        this._fallbackFigureString = param1.readString();
        this._fallbackFigureGender = param1.readString();
        return true;
    }
}
