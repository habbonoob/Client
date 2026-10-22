import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredOpenContractMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.contracts::WiredOpenContractMessageParser'); }

    declare private _contractId: number;
    static { (this.prototype as any)._contractId = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._contractId = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._contractId = param1.readInteger();
        return true;
    }

    public get contractId(): number {
        return this._contractId;
    }
}
