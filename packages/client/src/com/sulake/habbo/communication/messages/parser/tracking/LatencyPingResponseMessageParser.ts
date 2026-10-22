import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class LatencyPingResponseMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.tracking::LatencyPingResponseMessageParser'); }

    constructor() {
    }

    declare private _requestId: number;
    static { (this.prototype as any)._requestId = 0; }

    public get requestId(): number {
        return this._requestId;
    }

    public flush(): boolean {
        this._requestId = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._requestId = param1.readInteger();
        return true;
    }
}
