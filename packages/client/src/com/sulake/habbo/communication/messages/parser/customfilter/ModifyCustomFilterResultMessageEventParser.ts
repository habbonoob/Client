import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ModifyCustomFilterResultMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.customfilter::ModifyCustomFilterResultMessageEventParser'); }

    constructor() {
        this._result = -1;
    }

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    declare private _word: string;

    public get result(): number {
        return this._result;
    }

    public get word(): string {
        return this._word;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._result = param1.readInteger();
        this._word = param1.readString();
        return true;
    }
}
