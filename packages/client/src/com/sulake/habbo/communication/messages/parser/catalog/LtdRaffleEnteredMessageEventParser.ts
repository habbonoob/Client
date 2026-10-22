import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class LtdRaffleEnteredMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::LtdRaffleEnteredMessageEventParser'); }

    constructor() {
    }

    declare private _className: string;

    public get className(): string {
        return this._className;
    }

    public flush(): boolean {
        this._className = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._className = param1.readString();
        return true;
    }
}
