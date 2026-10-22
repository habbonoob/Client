import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class EpicPopupMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest::EpicPopupMessageParser'); }

    declare private _imageUri: string;

    constructor() {
    }

    public flush(): boolean {
        this._imageUri = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._imageUri = param1.readString();
        return true;
    }

    public get imageUri(): string {
        return this._imageUri;
    }
}
