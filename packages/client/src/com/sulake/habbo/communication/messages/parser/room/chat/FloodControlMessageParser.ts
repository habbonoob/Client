import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FloodControlMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.chat::FloodControlMessageParser'); }

    constructor() {
    }

    private _seconds: number = 0;

    public get seconds(): number {
        return this._seconds;
    }

    public flush(): boolean {
        this._seconds = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._seconds = param1.readInteger();
        return true;
    }
}
