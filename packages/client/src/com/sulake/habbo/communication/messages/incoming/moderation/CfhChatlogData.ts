import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { ChatRecordData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ChatRecordData';

export class CfhChatlogData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::CfhChatlogData'); }

    constructor(param1: IMessageDataWrapper) {
        this._callId = param1.readInteger();
        this._callerUserId = param1.readInteger();
        this._reportedUserId = param1.readInteger();
        this._chatRecordId = param1.readInteger();
        this._chatRecord = new ChatRecordData(param1);
    }

    declare private _callId: number;
    static { (this.prototype as any)._callId = 0; }

    declare private _callerUserId: number;
    static { (this.prototype as any)._callerUserId = 0; }

    declare private _reportedUserId: number;
    static { (this.prototype as any)._reportedUserId = 0; }

    declare private _chatRecordId: number;
    static { (this.prototype as any)._chatRecordId = 0; }

    declare private _chatRecord: ChatRecordData;

    public get callId(): number {
        return this._callId;
    }

    public get callerUserId(): number {
        return this._callerUserId;
    }

    public get reportedUserId(): number {
        return this._reportedUserId;
    }

    public get chatRecordId(): number {
        return this._chatRecordId;
    }

    public get chatRecord(): ChatRecordData {
        return this._chatRecord;
    }
}
