import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CurrentTimingCodeMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.competition::CurrentTimingCodeMessageParser'); }

    declare private _schedulingStr: string;

    declare private _code: string;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._schedulingStr = param1.readString();
        this._code = param1.readString();
        return true;
    }

    public get schedulingStr(): string {
        return this._schedulingStr;
    }

    public get code(): string {
        return this._code;
    }
}
