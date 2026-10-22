import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class SleepMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.action::SleepMessageParser'); }

    constructor() {
    }

    private _userId: number = 0;
    private _sleeping: boolean = false;

    public get userId(): number {
        return this._userId;
    }

    public get sleeping(): boolean {
        return this._sleeping;
    }

    public flush(): boolean {
        this._userId = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._userId = param1.readInteger();
        this._sleeping = param1.readBoolean();
        return true;
    }
}
