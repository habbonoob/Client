import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class DoorbellMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::DoorbellMessageParser'); }

    declare private _userName: string;

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._userName = param1.readString();
        return true;
    }

    public flush(): boolean {
        this._userName = null;
        return true;
    }

    public get userName(): string {
        return this._userName;
    }
}
