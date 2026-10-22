import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RecyclerStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.recycler::RecyclerStatusMessageParser'); }

    constructor() {
    }

    private _recyclerStatus: number = -1;
    private _recyclerTimeoutSeconds: number = 0;

    public get recyclerStatus(): number {
        return this._recyclerStatus;
    }

    public get recyclerTimeoutSeconds(): number {
        return this._recyclerTimeoutSeconds;
    }

    public flush(): boolean {
        this._recyclerStatus = -1;
        this._recyclerTimeoutSeconds = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._recyclerStatus = param1.readInteger();
        this._recyclerTimeoutSeconds = param1.readInteger();
        return true;
    }
}
