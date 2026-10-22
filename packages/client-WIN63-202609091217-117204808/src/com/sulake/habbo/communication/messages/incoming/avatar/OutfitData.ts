import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class OutfitData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.avatar::OutfitData'); }

    declare private _SafeStr_5501: number;
    static { (this.prototype as any)._SafeStr_5501 = 0; }

    declare private _figureString: string;

    declare private _gender: string;

    constructor(param1: IMessageDataWrapper) {
        this._SafeStr_5501 = param1.readInteger();
        this._figureString = param1.readString();
        this._gender = param1.readString();
    }

    public get slotId(): number {
        return this._SafeStr_5501;
    }

    public get figureString(): string {
        return this._figureString;
    }

    public get gender(): string {
        return this._gender;
    }
}
