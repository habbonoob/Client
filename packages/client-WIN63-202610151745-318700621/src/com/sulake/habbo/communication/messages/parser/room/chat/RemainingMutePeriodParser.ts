import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RemainingMutePeriodParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.chat::RemainingMutePeriodParser'); }

    private _secondsRemaining: number = 0;

    constructor() {
    }

    public get secondsRemaining(): number {
        return this._secondsRemaining;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._secondsRemaining = param1.readInteger();
        return true;
    }
}
