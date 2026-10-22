import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class SecondsUntilMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.competition::SecondsUntilMessageParser'); }

    declare private _timeStr: string;

    declare private _SafeStr_6381: number;
    static { (this.prototype as any)._SafeStr_6381 = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._timeStr = param1.readString();
        this._SafeStr_6381 = param1.readInteger();
        return true;
    }

    public get timeStr(): string {
        return this._timeStr;
    }

    public get secondsUntil(): number {
        return this._SafeStr_6381;
    }
}
