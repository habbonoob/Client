import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CallForHelpResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::CallForHelpResultMessageParser'); }

    constructor() {
    }

    declare private _resultType: number;
    static { (this.prototype as any)._resultType = 0; }

    declare private _messageText: string;

    public get resultType(): number {
        return this._resultType;
    }

    public get messageText(): string {
        return this._messageText;
    }

    public flush(): boolean {
        this._resultType = -1;
        this._messageText = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._resultType = param1.readInteger();
        this._messageText = param1.readString();
        return true;
    }
}
