import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ClaimProductResultParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.peerservice::ClaimProductResultParser'); }

    constructor() {
    }

    declare private _claimId: string;

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    public get claimId(): string {
        return this._claimId;
    }

    public get result(): number {
        return this._result;
    }

    public flush(): boolean {
        this._claimId = null;
        this._result = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._claimId = param1.readString();
        this._result = param1.readInteger();
        return true;
    }
}
