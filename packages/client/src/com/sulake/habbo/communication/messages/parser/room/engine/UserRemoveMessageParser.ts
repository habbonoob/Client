import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class UserRemoveMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::UserRemoveMessageParser'); }

    constructor() {
    }

    private _id: number = 0;

    public get id(): number {
        return this._id;
    }

    public flush(): boolean {
        this._id = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._id = Number(param1.readString()) | 0;
        return true;
    }
}
