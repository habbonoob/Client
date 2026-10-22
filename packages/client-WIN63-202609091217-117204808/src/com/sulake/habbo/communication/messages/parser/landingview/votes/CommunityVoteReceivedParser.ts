import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CommunityVoteReceivedParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.landingview.votes::CommunityVoteReceivedParser'); }

    declare private _acknowledged: boolean;
    static { (this.prototype as any)._acknowledged = false; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._acknowledged = param1.readBoolean();
        return true;
    }

    public get acknowledged(): boolean {
        return this._acknowledged;
    }
}
