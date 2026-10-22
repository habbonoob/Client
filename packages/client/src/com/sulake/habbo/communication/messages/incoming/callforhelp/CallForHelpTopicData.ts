import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { INamed } from '@/com/sulake/habbo/communication/messages/incoming/moderation/INamed';

export class CallForHelpTopicData implements INamed {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.callforhelp::CallForHelpTopicData'); }

    constructor(param1: IMessageDataWrapper) {
        this._SafeStr_6514 = param1.readString();
        this._id = param1.readInteger();
        this._consequence = param1.readString();
    }

    declare private _SafeStr_6514: string;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _consequence: string;

    public get name(): string {
        return this._SafeStr_6514;
    }

    public get id(): number {
        return this._id;
    }

    public get consequence(): string {
        return this._consequence;
    }
}
