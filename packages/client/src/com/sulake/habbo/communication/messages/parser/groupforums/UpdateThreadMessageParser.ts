import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ThreadData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ThreadData';

export class UpdateThreadMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.groupforums::UpdateThreadMessageParser'); }

    constructor() {
    }

    declare private _thread: ThreadData;

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    public get groupId(): number {
        return this._groupId;
    }

    public get thread(): ThreadData {
        return this._thread;
    }

    public flush(): boolean {
        this._groupId = -1;
        this._thread = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._groupId = param1.readInteger();
        this._thread = ThreadData.readFromMessage(param1);
        return true;
    }
}
