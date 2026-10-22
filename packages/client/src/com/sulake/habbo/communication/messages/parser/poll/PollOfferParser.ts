import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PollOfferParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.poll::PollOfferParser'); }

    constructor() {
    }

    private _id: number = -1;
    private _type: string = "";
    private _summary: string = "";
    private _headline: string = "";

    public get headline(): string {
        return this._headline;
    }

    public get id(): number {
        return this._id;
    }

    public get type(): string {
        return this._type;
    }

    public get summary(): string {
        return this._summary;
    }

    public flush(): boolean {
        this._id = -1;
        this._type = "";
        this._summary = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._id = param1.readInteger();
        this._type = param1.readString();
        this._headline = param1.readString();
        this._summary = param1.readString();
        return true;
    }
}
