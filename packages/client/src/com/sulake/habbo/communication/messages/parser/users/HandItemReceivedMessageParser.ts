import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class HandItemReceivedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::HandItemReceivedMessageParser'); }

    constructor() {
    }

    private _giverUserId: number = -1;
    private _handItemType: number = 0;

    public get giverUserId(): number {
        return this._giverUserId;
    }

    public get handItemType(): number {
        return this._handItemType;
    }

    public flush(): boolean {
        this._giverUserId = -1;
        this._handItemType = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._giverUserId = param1.readInteger();
        this._handItemType = param1.readInteger();
        return true;
    }
}
