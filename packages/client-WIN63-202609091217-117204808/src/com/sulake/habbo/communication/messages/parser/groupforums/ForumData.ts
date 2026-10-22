import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { ThreadData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ThreadData';

export class ForumData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.groupforums::ForumData'); }

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    declare private _name: string;

    declare private _description: string;

    declare private _icon: string;

    declare private _totalThreads: number;
    static { (this.prototype as any)._totalThreads = 0; }

    declare private _SafeStr_7407: number;
    static { (this.prototype as any)._SafeStr_7407 = 0; }

    declare private _totalMessages: number;
    static { (this.prototype as any)._totalMessages = 0; }

    declare private _unreadMessages: number;
    static { (this.prototype as any)._unreadMessages = 0; }

    declare private _lastMessageId: number;
    static { (this.prototype as any)._lastMessageId = 0; }

    declare private _lastMessageAuthorId: number;
    static { (this.prototype as any)._lastMessageAuthorId = 0; }

    declare private _lastMessageAuthorName: string;

    declare private _lastMessageTimeAsSecondsAgo: number;
    static { (this.prototype as any)._lastMessageTimeAsSecondsAgo = 0; }

    constructor() {
    }

    public static readFromMessage(param1: IMessageDataWrapper): ForumData {
        return ForumData.fillFromMessage(new ForumData(), param1);
    }

    public static fillFromMessage(param1: ForumData, param2: IMessageDataWrapper): ForumData {
        param1._groupId = param2.readInteger();
        param1._name = param2.readString();
        param1._description = param2.readString();
        param1._icon = param2.readString();
        param1._totalThreads = param2.readInteger();
        param1._SafeStr_7407 = param2.readInteger();
        param1._totalMessages = param2.readInteger();
        param1._unreadMessages = param2.readInteger();
        param1._lastMessageId = param2.readInteger();
        param1._lastMessageAuthorId = param2.readInteger();
        param1._lastMessageAuthorName = param2.readString();
        param1._lastMessageTimeAsSecondsAgo = param2.readInteger();
        return param1;
    }

    public get groupId(): number {
        return this._groupId;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public get icon(): string {
        return this._icon;
    }

    public get totalThreads(): number {
        return this._totalThreads;
    }

    public get leaderboardScore(): number {
        return this._SafeStr_7407;
    }

    public get totalMessages(): number {
        return this._totalMessages;
    }

    public get unreadMessages(): number {
        return this._unreadMessages;
    }

    public get lastMessageId(): number {
        return this._lastMessageId;
    }

    public get lastMessageAuthorId(): number {
        return this._lastMessageAuthorId;
    }

    public get lastMessageAuthorName(): string {
        return this._lastMessageAuthorName;
    }

    public get lastMessageTimeAsSecondsAgo(): number {
        return this._lastMessageTimeAsSecondsAgo;
    }

    public updateFrom(param1: ForumData): void {
        this._totalThreads = param1._totalThreads;
        this._totalMessages = param1._totalMessages;
        this._unreadMessages = param1._unreadMessages;
        this._lastMessageAuthorId = param1._lastMessageAuthorId;
        this._lastMessageAuthorName = param1._lastMessageAuthorName;
        this._lastMessageId = param1._lastMessageId;
        this._lastMessageTimeAsSecondsAgo = param1._lastMessageTimeAsSecondsAgo;
    }

    public get lastReadMessageId(): number {
        return this._totalMessages - this._unreadMessages;
    }

    public set lastReadMessageId(param1: number) {
        this._unreadMessages = this._totalMessages - param1;
        if (this._unreadMessages < 0) {
            this._unreadMessages = 0;
        }
    }

    public addNewThread(param1: ThreadData): void {
        this._lastMessageAuthorId = param1.lastMessageAuthorId;
        this._lastMessageAuthorName = param1.lastMessageAuthorName;
        this._lastMessageId = param1.lastMessageId;
        this._lastMessageTimeAsSecondsAgo = param1.lastMessageTimeAsSecondsAgo;
        this._totalThreads = this._totalThreads + 1;
        this._totalMessages = this._totalMessages + 1;
        this._unreadMessages = 0;
    }
}
