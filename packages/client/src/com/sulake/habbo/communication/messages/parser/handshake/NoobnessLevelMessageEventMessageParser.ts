import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class NoobnessLevelMessageEventMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.handshake::NoobnessLevelMessageEventMessageParser'); }

    constructor() {
    }

    declare private _noobnessLevel: number;
    static { (this.prototype as any)._noobnessLevel = 0; }

    public get noobnessLevel(): number {
        return this._noobnessLevel;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._noobnessLevel = param1.readInteger();
        return true;
    }
}
