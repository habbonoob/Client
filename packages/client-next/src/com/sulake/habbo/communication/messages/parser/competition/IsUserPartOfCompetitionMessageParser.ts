import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class IsUserPartOfCompetitionMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.competition::IsUserPartOfCompetitionMessageParser'); }

    declare private _isPartOf: boolean;
    static { (this.prototype as any)._isPartOf = false; }

    declare private _targetId: number;
    static { (this.prototype as any)._targetId = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._isPartOf = param1.readBoolean();
        this._targetId = param1.readInteger();
        return true;
    }

    public get isPartOf(): boolean {
        return this._isPartOf;
    }

    public get targetId(): number {
        return this._targetId;
    }
}
