import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GamePlayerValueMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.session::GamePlayerValueMessageParser'); }

    private _userId: number = 0;
    private _value: number = 0;

    constructor() {
    }

    public get userId(): number {
        return this._userId;
    }

    public get value(): number {
        return this._value;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._userId = param1.readInteger();
        this._value = param1.readInteger();
        return true;
    }
}
