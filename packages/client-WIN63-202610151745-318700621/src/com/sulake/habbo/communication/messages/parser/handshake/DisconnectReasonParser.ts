import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class DisconnectReasonParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.handshake::DisconnectReasonParser'); }

    declare private _reason: number;
    static { (this.prototype as any)._reason = 0; }

    constructor() {
        this._reason = -1;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1.bytesAvailable) {
            this._reason = param1.readInteger();
        }
        return true;
    }

    public get reason(): number {
        return this._reason;
    }
}
