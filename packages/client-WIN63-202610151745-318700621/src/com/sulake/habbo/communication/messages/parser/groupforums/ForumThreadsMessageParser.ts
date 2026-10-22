import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ThreadData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ThreadData';

export class ForumThreadsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.groupforums::ForumThreadsMessageParser'); }

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    declare private _startIndex: number;
    static { (this.prototype as any)._startIndex = 0; }

    declare private _amount: number;
    static { (this.prototype as any)._amount = 0; }

    declare private _threads: any[];

    constructor() {
    }

    public get groupId(): number {
        return this._groupId;
    }

    public get startIndex(): number {
        return this._startIndex;
    }

    public get amount(): number {
        return this._amount;
    }

    public get threads(): any[] {
        return this._threads;
    }

    public flush(): boolean {
        this._groupId = -1;
        this._startIndex = -1;
        this._amount = -1;
        this._threads = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        this._groupId = param1.readInteger();
        this._startIndex = param1.readInteger();
        this._amount = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < this.amount) {
            this._threads.push(ThreadData.readFromMessage(param1));
            _loc2_++;
        }
        return true;
    }
}
