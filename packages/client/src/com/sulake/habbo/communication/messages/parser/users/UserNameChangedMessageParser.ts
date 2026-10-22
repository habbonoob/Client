import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class UserNameChangedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::UserNameChangedMessageParser'); }

    constructor() {
    }

    declare private _webId: number;
    static { (this.prototype as any)._webId = 0; }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _newName: string;

    public get newName(): string {
        return this._newName;
    }

    public get webId(): number {
        return this._webId;
    }

    public get id(): number {
        return this._id;
    }

    public flush(): boolean {
        this._webId = -1;
        this._id = -1;
        this._newName = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._webId = param1.readInteger();
        this._id = param1.readInteger();
        this._newName = param1.readString();
        return true;
    }
}
