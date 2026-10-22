import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RecyclerFinishedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.recycler::RecyclerFinishedMessageParser'); }

    constructor() {
    }

    private _recyclerFinishedStatus: number = -1;
    private _prizeId: number = 0;

    public get recyclerFinishedStatus(): number {
        return this._recyclerFinishedStatus;
    }

    public get prizeId(): number {
        return this._prizeId;
    }

    public flush(): boolean {
        this._recyclerFinishedStatus = -1;
        this._prizeId = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._recyclerFinishedStatus = param1.readInteger();
        this._prizeId = param1.readInteger();
        return true;
    }
}
