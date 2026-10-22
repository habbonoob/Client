import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class IsFirstLoginOfDayParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.handshake::IsFirstLoginOfDayParser'); }

    constructor() {
    }

    declare private _isFirstLoginOfDay: boolean;
    static { (this.prototype as any)._isFirstLoginOfDay = false; }

    public get isFirstLoginOfDay(): boolean {
        return this._isFirstLoginOfDay;
    }

    public flush(): boolean {
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._isFirstLoginOfDay = param1.readBoolean();
        return true;
    }
}
