import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CurrentTimingCodeMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.competition::CurrentTimingCodeMessageParser'); }

    constructor() {
    }

    declare private _schedulingStr: string;

    public get schedulingStr(): string {
        return this._schedulingStr;
    }

    declare private _code: string;

    public get code(): string {
        return this._code;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._schedulingStr = param1.readString();
        this._code = param1.readString();
        return true;
    }
}
