import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ApproveNameMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::ApproveNameMessageParser'); }

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    declare private _nameValidationInfo: string;

    constructor() {
    }

    public get result(): number {
        return this._result;
    }

    public get nameValidationInfo(): string {
        return this._nameValidationInfo;
    }

    public flush(): boolean {
        this._result = -1;
        this._nameValidationInfo = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._result = param1.readInteger();
        this._nameValidationInfo = param1.readString();
        return true;
    }
}
