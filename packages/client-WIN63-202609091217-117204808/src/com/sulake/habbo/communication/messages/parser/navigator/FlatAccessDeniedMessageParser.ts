import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FlatAccessDeniedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::FlatAccessDeniedMessageParser'); }

    private _flatId: number = 0;
    private _userName: string = null;

    constructor() {
    }

    public get flatId(): number {
        return this._flatId;
    }

    public get userName(): string {
        return this._userName;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._flatId = param1.readInteger();
        if (param1.bytesAvailable) {
            this._userName = param1.readString();
        }
        return true;
    }

    public flush(): boolean {
        this._userName = null;
        return true;
    }
}
