import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class HasClaimedProductResponseParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.peerservice::HasClaimedProductResponseParser'); }

    constructor() {
    }

    declare private _claimId: string;

    declare private _hasClaimed: boolean;
    static { (this.prototype as any)._hasClaimed = false; }

    public get claimId(): string {
        return this._claimId;
    }

    public get hasClaimed(): boolean {
        return this._hasClaimed;
    }

    public flush(): boolean {
        this._claimId = null;
        this._hasClaimed = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._claimId = param1.readString();
        this._hasClaimed = param1.readBoolean();
        return true;
    }
}
