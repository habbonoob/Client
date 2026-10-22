import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class HotLookInfo {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.hotlooks::HotLookInfo'); }

    constructor(param1: IMessageDataWrapper) {
        this._gender = param1.readString();
        this._figureString = param1.readString();
    }

    declare private _gender: string;

    declare private _figureString: string;

    public get figureString(): string {
        return this._figureString;
    }

    public get gender(): string {
        return this._gender;
    }
}
