import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { MessageHistoryEntry } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/MessageHistoryEntry';

export class ConsoleMessageHistoryMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::ConsoleMessageHistoryMessageParser'); }

    constructor() {
    }

    declare private _chatId: number;
    static { (this.prototype as any)._chatId = 0; }

    declare private _historyFragment: any[];

    public get chatId(): number {
        return this._chatId;
    }

    public get historyFragment(): any[] {
        return this._historyFragment;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._chatId = param1.readInteger();
        this._historyFragment = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._historyFragment.push(new MessageHistoryEntry(param1));
            _loc3_++;
        }
        return true;
    }
}
