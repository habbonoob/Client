import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { MessageData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/MessageData';

export class ThreadMessagesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.groupforums::ThreadMessagesMessageParser'); }

    constructor() {
    }

    declare private _threadId: number;
    static { (this.prototype as any)._threadId = 0; }

    declare private _startIndex: number;
    static { (this.prototype as any)._startIndex = 0; }

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    public get groupId(): number {
        return this._groupId;
    }

    declare private _amount: number;
    static { (this.prototype as any)._amount = 0; }

    public get amount(): number {
        return this._amount;
    }

    declare private _messages: any[];

    public get messages(): any[] {
        return this._messages;
    }

    public get threadId(): number {
        return this._threadId;
    }

    public get startIndex(): number {
        return this._startIndex;
    }

    public flush(): boolean {
        this._groupId = -1;
        this._threadId = -1;
        this._startIndex = -1;
        this._amount = -1;
        this._messages = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        let _loc3_: MessageData = null;
        this._groupId = param1.readInteger();
        this._threadId = param1.readInteger();
        this._startIndex = param1.readInteger();
        this._amount = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < this._amount) {
            _loc3_ = MessageData.readFromMessage(param1);
            _loc3_.groupID = this._groupId;
            _loc3_.threadId = this._threadId;
            this._messages.push(_loc3_);
            _loc2_++;
        }
        return true;
    }
}
