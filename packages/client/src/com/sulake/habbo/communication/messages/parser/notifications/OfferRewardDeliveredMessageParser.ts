import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class OfferRewardDeliveredMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.notifications::OfferRewardDeliveredMessageParser'); }

    constructor() {
    }

    declare private _contentType: string;

    declare private _classId: number;
    static { (this.prototype as any)._classId = 0; }

    declare private _description: string;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get contentType(): string {
        return this._contentType;
    }

    public get classId(): number {
        return this._classId;
    }

    public get description(): string {
        return this._description;
    }

    public flush(): boolean {
        this._contentType = null;
        this._classId = 0;
        this._name = null;
        this._description = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._contentType = param1.readString();
        this._classId = param1.readInteger();
        this._name = param1.readString();
        this._description = param1.readString();
        return true;
    }
}
