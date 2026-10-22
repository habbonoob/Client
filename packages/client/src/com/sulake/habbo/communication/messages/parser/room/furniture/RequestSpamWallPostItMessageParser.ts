import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RequestSpamWallPostItMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::RequestSpamWallPostItMessageParser'); }

    constructor() {
    }

    declare private _itemId: number;
    static { (this.prototype as any)._itemId = 0; }

    declare private _location: string;

    public get itemId(): number {
        return this._itemId;
    }

    public get location(): string {
        return this._location;
    }

    public flush(): boolean {
        this._itemId = -1;
        this._location = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._itemId = param1.readInteger();
        this._location = param1.readString();
        return true;
    }
}
