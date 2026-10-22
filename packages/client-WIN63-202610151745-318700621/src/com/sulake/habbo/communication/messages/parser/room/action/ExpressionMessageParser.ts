import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ExpressionMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.action::ExpressionMessageParser'); }

    private _userId: number = 0;
    private _expressionType: number = -1;

    constructor() {
    }

    public get userId(): number {
        return this._userId;
    }

    public get expressionType(): number {
        return this._expressionType;
    }

    public flush(): boolean {
        this._userId = 0;
        this._expressionType = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._userId = param1.readInteger();
        this._expressionType = param1.readInteger();
        return true;
    }
}
