import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class MessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.groupforums::MessageData'); }

    public static readFromMessage(param1: IMessageDataWrapper): MessageData {
        let _loc2_: MessageData = new MessageData();
        _loc2_.messageId = param1.readInteger();
        _loc2_.messageIndex = param1.readInteger();
        _loc2_.authorId = param1.readInteger();
        _loc2_.authorName = param1.readString();
        _loc2_.authorFigure = param1.readString();
        _loc2_.creationTimeAsSecondsAgo = param1.readInteger();
        _loc2_.messageText = param1.readString();
        _loc2_.state = param1.readByte();
        _loc2_.adminId = param1.readInteger();
        _loc2_.adminName = param1.readString();
        _loc2_.adminOperationTimeAsSeccondsAgo = param1.readInteger();
        _loc2_.authorPostCount = param1.readInteger();
        return _loc2_;
    }

    constructor() {
    }

    declare private _SafeStr_4730: number;
    static { (this.prototype as any)._SafeStr_4730 = 0; }

    declare private _messageIndex: number;
    static { (this.prototype as any)._messageIndex = 0; }

    declare private _authorId: number;
    static { (this.prototype as any)._authorId = 0; }

    declare private _threadId: number;
    static { (this.prototype as any)._threadId = 0; }

    declare private _messageText: string;

    declare private _authorName: string;

    declare private _authorFigure: string;

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _adminId: number;
    static { (this.prototype as any)._adminId = 0; }

    declare private _adminName: string;

    declare private _adminOperationTimeAsSeccondsAgo: number;
    static { (this.prototype as any)._adminOperationTimeAsSeccondsAgo = 0; }

    declare private _authorPostCount: number;
    static { (this.prototype as any)._authorPostCount = 0; }

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    public get groupId(): number {
        return this._groupId;
    }

    declare private _creationTime: number;
    static { (this.prototype as any)._creationTime = 0; }

    public get creationTime(): number {
        return this._creationTime;
    }

    public set creationTime(param1: number) {
        this._creationTime = param1;
    }

    public get state(): number {
        return this._state;
    }

    public set state(param1: number) {
        this._state = param1;
    }

    public get adminId(): number {
        return this._adminId;
    }

    public set adminId(param1: number) {
        this._adminId = param1;
    }

    public get adminName(): string {
        return this._adminName;
    }

    public set adminName(param1: string) {
        this._adminName = param1;
    }

    public get adminOperationTimeAsSeccondsAgo(): number {
        return this._adminOperationTimeAsSeccondsAgo;
    }

    public set adminOperationTimeAsSeccondsAgo(param1: number) {
        this._adminOperationTimeAsSeccondsAgo = param1;
    }

    public get MessageId(): number {
        return this._SafeStr_4730;
    }

    public set MessageId(param1: number) {
        this._SafeStr_4730 = param1;
    }

    public get authorName(): string {
        return this._authorName;
    }

    public set authorName(param1: string) {
        this._authorName = param1;
    }

    public get authorFigure(): string {
        return this._authorFigure;
    }

    public set authorFigure(param1: string) {
        this._authorFigure = param1;
    }

    public get threadId(): number {
        return this._threadId;
    }

    public set threadId(param1: number) {
        this._threadId = param1;
    }

    public get messageId(): number {
        return this._SafeStr_4730;
    }

    public set messageId(param1: number) {
        this._SafeStr_4730 = param1;
    }

    public get messageIndex(): number {
        return this._messageIndex;
    }

    public set messageIndex(param1: number) {
        this._messageIndex = param1;
    }

    public set groupID(param1: number) {
        this._groupId = param1;
    }

    public get authorId(): number {
        return this._authorId;
    }

    public set authorId(param1: number) {
        this._authorId = param1;
    }

    public get creationTimeAsSecondsAgo(): number {
        return this._creationTime;
    }

    public set creationTimeAsSecondsAgo(param1: number) {
        this._creationTime = param1;
    }

    public get messageText(): string {
        return this._messageText;
    }

    public set messageText(param1: string) {
        this._messageText = param1;
    }

    public get authorPostCount(): number {
        return this._authorPostCount;
    }

    public set authorPostCount(param1: number) {
        this._authorPostCount = param1;
    }
}
