import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class SecondsUntilMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.competition::SecondsUntilMessageParser'); }

    constructor() {
    }

    declare private _secondsUntil: number;
    static { (this.prototype as any)._secondsUntil = 0; }

    declare private _timeStr: string;

    public get timeStr(): string {
        return this._timeStr;
    }

    public get secondsUntil(): number {
        return this._secondsUntil;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._timeStr = param1.readString();
        this._secondsUntil = param1.readInteger();
        return true;
    }
}
