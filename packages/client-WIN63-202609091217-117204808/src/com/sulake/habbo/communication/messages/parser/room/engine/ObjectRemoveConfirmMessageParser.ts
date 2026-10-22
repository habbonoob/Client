import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ObjectRemoveConfirmMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ObjectRemoveConfirmMessageParser'); }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _confirmTitle: string;

    declare private _confirmBody: string;

    constructor() {
    }

    public get category(): number {
        return this._category;
    }

    public get id(): number {
        return this._id;
    }

    public get confirmTitle(): string {
        return this._confirmTitle;
    }

    public get confirmBody(): string {
        return this._confirmBody;
    }

    public flush(): boolean {
        this._category = 0;
        this._id = 0;
        this._confirmBody = null;
        this._confirmTitle = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._category = param1.readInteger() == 1 ? 20 : 10;
        this._id = param1.readInteger();
        this._confirmTitle = param1.readString();
        this._confirmBody = param1.readString();
        return true;
    }
}
