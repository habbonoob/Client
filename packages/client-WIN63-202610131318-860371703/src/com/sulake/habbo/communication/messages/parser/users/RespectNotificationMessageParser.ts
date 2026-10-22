import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RespectNotificationMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::RespectNotificationMessageParser'); }

    private _userId: number = 0;
    private _respectTotal: number = 0;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._userId = param1.readInteger();
        this._respectTotal = param1.readInteger();
        return true;
    }

    public get userId(): number {
        return this._userId;
    }

    public get respectTotal(): number {
        return this._respectTotal;
    }
}
