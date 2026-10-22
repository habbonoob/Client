import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FigureUpdateParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.avatar::FigureUpdateParser'); }

    declare private _figure: string;

    declare private _gender: string;

    constructor() {
    }

    public get figure(): string {
        return this._figure;
    }

    public get gender(): string {
        return this._gender;
    }

    public flush(): boolean {
        this._figure = "";
        this._gender = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._figure = param1.readString();
        this._gender = param1.readString();
        if (this._gender) {
            this._gender = this._gender.toUpperCase();
        }
        return true;
    }
}
