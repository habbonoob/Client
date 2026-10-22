import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { MessageData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/MessageData';

export class MessagesListData {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.groupforums::MessagesListData'); }

    constructor(param1: number, param2: number, param3: number, param4: any[]) {
        let _loc5_: number = 0;
        let _loc6_: MessageData = null;
        this._threadId = param1;
        this._startIndex = param3;
        this._totalMessages = param2;
        this._messages = param4;
        this._messagesById = new Dictionary();
        _loc5_ = 0;
        while (_loc5_ < param4.length) {
            _loc6_ = param4[_loc5_];
            this._messagesById.set(_loc6_.messageId, _loc6_);
            _loc5_++;
        }
    }

    declare private _threadId: number;
    static { (this.prototype as any)._threadId = 0; }

    declare private _startIndex: number;
    static { (this.prototype as any)._startIndex = 0; }

    declare private _messagesById: Map<any, any>;

    declare private _totalMessages: number;
    static { (this.prototype as any)._totalMessages = 0; }

    public get totalMessages(): number {
        return this._totalMessages;
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

    public get messagesById(): Map<any, any> {
        return this._messagesById;
    }

    public get size(): number {
        return this._messages.length | 0;
    }
}
