import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FlatAccessibleMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.session::FlatAccessibleMessageParser'); }

    private _flatId: number = 0;
    private _userName: string = null;

    constructor() {
    }

    public get userName(): string {
        return this._userName;
    }

    public get flatId(): number {
        return this._flatId;
    }

    public flush(): boolean {
        this._userName = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._flatId = param1.readInteger();
        this._userName = param1.readString();
        return true;
    }
}
