import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class DailyTasksTaskUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest.dailytasks::DailyTasksTaskUpdateMessageParser'); }

    constructor() {
    }

    declare private _taskId: number;
    static { (this.prototype as any)._taskId = NaN; }

    declare private _repeats: number;
    static { (this.prototype as any)._repeats = 0; }

    declare private _SafeStr_4808: number;
    static { (this.prototype as any)._SafeStr_4808 = 0; }

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    public get status(): number {
        return this._status;
    }

    public get taskId(): number {
        return this._taskId;
    }

    public get repeats(): number {
        return this._repeats;
    }

    public get secondsLeft(): number {
        return this._SafeStr_4808;
    }

    public flush(): boolean {
        this._taskId = 0;
        this._repeats = 0;
        this._status = 0;
        this._SafeStr_4808 = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._taskId = param1.readLong();
        this._repeats = param1.readInteger();
        this._status = param1.readByte();
        this._SafeStr_4808 = param1.readInteger();
        return true;
    }
}
